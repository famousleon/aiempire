/**
 * AI Empire Stock Data Proxy v3 — Cloudflare Worker
 * 美股 + 港股，Yahoo Finance 行情/K线 + 本地股票搜索
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function error(msg, status = 400) {
  return json({ error: msg }, status);
}

// ─── Yahoo Finance Quote ──────────────────────────────────
async function yahooQuote(symbol) {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
  const resp = await fetch(url, { headers: { "User-Agent": UA } });
  if (!resp.ok) return null;
  const d = await resp.json();
  const result = d?.chart?.result?.[0];
  if (!result) return null;

  const meta = result.meta || {};
  const regular = meta.regularMarketPrice;
  const prev = meta.chartPreviousClose ?? meta.previousClose;
  const change = regular != null && prev ? regular - prev : 0;
  const changePct = prev ? (change / prev) * 100 : 0;

  return {
    name: meta.shortName || meta.symbol || symbol,
    name_en: meta.longName || meta.shortName || "",
    symbol: meta.symbol || symbol,
    price: regular || 0,
    prev_close: prev || 0,
    open: meta.regularMarketOpen || 0,
    high: meta.regularMarketDayHigh || 0,
    low: meta.regularMarketDayLow || 0,
    volume: meta.regularMarketVolume || 0,
    market_cap: meta.marketCap || 0,
    pe: meta.trailingPE || 0,
    eps: meta.trailingEps || 0,
    high_52w: meta.fiftyTwoWeekHigh || 0,
    low_52w: meta.fiftyTwoWeekLow || 0,
    currency: meta.currency || "USD",
    change_pct: Math.round(changePct * 100) / 100,
    timestamp: meta.regularMarketTime
      ? new Date(meta.regularMarketTime * 1000).toISOString().replace("T", " ").slice(0, 19)
      : "",
    pb: meta.priceToBook || 0,
  };
}

// ─── Yahoo Finance K-line ─────────────────────────────────
async function yahooKline(symbol, interval = "1d", range = "6mo") {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`;
  const params = new URLSearchParams({ interval, range });
  const resp = await fetch(`${url}?${params}`, {
    headers: { "User-Agent": UA },
  });
  if (!resp.ok) return null;
  const d = await resp.json();
  const result = d?.chart?.result?.[0];
  if (!result) return null;

  const timestamps = result.timestamp || [];
  const quote = result.indicators?.quote?.[0] || {};
  const klines = [];

  for (let i = 0; i < timestamps.length; i++) {
    const ts = timestamps[i];
    const date = new Date(ts * 1000);
    const dateStr =
      interval.includes("m") || interval.includes("h")
        ? date.toISOString().slice(0, 16).replace("T", " ")
        : date.toISOString().slice(0, 10);

    klines.push({
      date: dateStr,
      open: round2(quote.open?.[i]),
      high: round2(quote.high?.[i]),
      low: round2(quote.low?.[i]),
      close: round2(quote.close?.[i]),
      volume: quote.volume?.[i] || 0,
    });
  }
  return klines;
}

function round2(v) {
  return v != null ? Math.round(v * 100) / 100 : 0;
}

// ─── Stock Universe (searchable) ──────────────────────────
const STOCKS = [
  // US Tech
  { code: "AAPL", name: "Apple 苹果", market: "US", sector: "科技" },
  { code: "MSFT", name: "Microsoft 微软", market: "US", sector: "科技" },
  { code: "GOOGL", name: "Alphabet 谷歌", market: "US", sector: "科技" },
  { code: "GOOG", name: "Alphabet-C 谷歌", market: "US", sector: "科技" },
  { code: "AMZN", name: "Amazon 亚马逊", market: "US", sector: "科技" },
  { code: "NVDA", name: "NVIDIA 英伟达", market: "US", sector: "科技" },
  { code: "META", name: "Meta 脸书", market: "US", sector: "科技" },
  { code: "TSLA", name: "Tesla 特斯拉", market: "US", sector: "科技" },
  { code: "AMD", name: "AMD 超威半导体", market: "US", sector: "科技" },
  { code: "INTC", name: "Intel 英特尔", market: "US", sector: "科技" },
  { code: "NFLX", name: "Netflix 奈飞", market: "US", sector: "科技" },
  { code: "CRM", name: "Salesforce", market: "US", sector: "科技" },
  { code: "ORCL", name: "Oracle 甲骨文", market: "US", sector: "科技" },
  { code: "CSCO", name: "Cisco 思科", market: "US", sector: "科技" },
  { code: "ADBE", name: "Adobe", market: "US", sector: "科技" },
  { code: "AVGO", name: "Broadcom 博通", market: "US", sector: "科技" },
  { code: "QCOM", name: "Qualcomm 高通", market: "US", sector: "科技" },
  { code: "TXN", name: "Texas Instruments 德州仪器", market: "US", sector: "科技" },
  { code: "IBM", name: "IBM", market: "US", sector: "科技" },
  { code: "BABA", name: "Alibaba 阿里巴巴", market: "US", sector: "科技" },
  { code: "PDD", name: "PDD 拼多多", market: "US", sector: "科技" },
  { code: "JD", name: "JD 京东", market: "US", sector: "科技" },
  { code: "BIDU", name: "Baidu 百度", market: "US", sector: "科技" },
  { code: "NIO", name: "NIO 蔚来", market: "US", sector: "科技" },
  { code: "LI", name: "Li Auto 理想", market: "US", sector: "科技" },
  { code: "XPEV", name: "XPeng 小鹏", market: "US", sector: "科技" },
  // US Finance
  { code: "JPM", name: "JPMorgan 摩根大通", market: "US", sector: "金融" },
  { code: "V", name: "Visa", market: "US", sector: "金融" },
  { code: "MA", name: "Mastercard 万事达", market: "US", sector: "金融" },
  { code: "BAC", name: "Bank of America 美国银行", market: "US", sector: "金融" },
  { code: "GS", name: "Goldman Sachs 高盛", market: "US", sector: "金融" },
  { code: "MS", name: "Morgan Stanley 摩根士丹利", market: "US", sector: "金融" },
  { code: "WFC", name: "Wells Fargo 富国银行", market: "US", sector: "金融" },
  { code: "C", name: "Citigroup 花旗", market: "US", sector: "金融" },
  { code: "BRK-B", name: "Berkshire Hathaway 伯克希尔", market: "US", sector: "金融" },
  // US Consumer
  { code: "WMT", name: "Walmart 沃尔玛", market: "US", sector: "消费" },
  { code: "HD", name: "Home Depot 家得宝", market: "US", sector: "消费" },
  { code: "DIS", name: "Disney 迪士尼", market: "US", sector: "消费" },
  { code: "MCD", name: "McDonalds 麦当劳", market: "US", sector: "消费" },
  { code: "NKE", name: "Nike 耐克", market: "US", sector: "消费" },
  { code: "SBUX", name: "Starbucks 星巴克", market: "US", sector: "消费" },
  { code: "KO", name: "Coca-Cola 可口可乐", market: "US", sector: "消费" },
  { code: "PEP", name: "PepsiCo 百事可乐", market: "US", sector: "消费" },
  // US Health
  { code: "JNJ", name: "Johnson & Johnson 强生", market: "US", sector: "医疗" },
  { code: "PFE", name: "Pfizer 辉瑞", market: "US", sector: "医疗" },
  { code: "MRK", name: "Merck 默克", market: "US", sector: "医疗" },
  { code: "ABT", name: "Abbott 雅培", market: "US", sector: "医疗" },
  { code: "TMO", name: "Thermo Fisher", market: "US", sector: "医疗" },
  { code: "LLY", name: "Eli Lilly 礼来", market: "US", sector: "医疗" },
  // US Energy
  { code: "XOM", name: "Exxon Mobil 埃克森美孚", market: "US", sector: "能源" },
  { code: "CVX", name: "Chevron 雪佛龙", market: "US", sector: "能源" },
  // US Other
  { code: "PG", name: "Procter & Gamble 宝洁", market: "US", sector: "消费" },
  { code: "UNH", name: "UnitedHealth 联合健康", market: "US", sector: "医疗" },
  { code: "AMGN", name: "Amgen 安进", market: "US", sector: "医疗" },
  { code: "PYPL", name: "PayPal", market: "US", sector: "金融" },
  { code: "SQ", name: "Block 方块", market: "US", sector: "金融" },
  { code: "UBER", name: "Uber", market: "US", sector: "科技" },
  { code: "ABNB", name: "Airbnb 爱彼迎", market: "US", sector: "科技" },
  { code: "COIN", name: "Coinbase", market: "US", sector: "金融" },
  { code: "PLTR", name: "Palantir", market: "US", sector: "科技" },
  { code: "SNOW", name: "Snowflake", market: "US", sector: "科技" },
  { code: "RIVN", name: "Rivian", market: "US", sector: "科技" },
  { code: "LCID", name: "Lucid", market: "US", sector: "科技" },
  // HK Tech
  { code: "0700", name: "腾讯控股", market: "HK", sector: "科技" },
  { code: "9988", name: "阿里巴巴", market: "HK", sector: "科技" },
  { code: "9618", name: "京东集团", market: "HK", sector: "科技" },
  { code: "1024", name: "快手", market: "HK", sector: "科技" },
  { code: "3690", name: "美团", market: "HK", sector: "科技" },
  { code: "9888", name: "百度集团", market: "HK", sector: "科技" },
  { code: "1810", name: "小米集团", market: "HK", sector: "科技" },
  { code: "0981", name: "中芯国际", market: "HK", sector: "科技" },
  { code: "2269", name: "药明生物", market: "HK", sector: "医疗" },
  { code: "9868", name: "小鹏汽车", market: "HK", sector: "科技" },
  { code: "2015", name: "理想汽车", market: "HK", sector: "科技" },
  { code: "9866", name: "蔚来", market: "HK", sector: "科技" },
  // HK Finance
  { code: "0388", name: "香港交易所", market: "HK", sector: "金融" },
  { code: "2318", name: "中国平安", market: "HK", sector: "金融" },
  { code: "1299", name: "友邦保险", market: "HK", sector: "金融" },
  { code: "0005", name: "汇丰控股", market: "HK", sector: "金融" },
  { code: "3968", name: "招商银行", market: "HK", sector: "金融" },
  { code: "6030", name: "中信证券", market: "HK", sector: "金融" },
  // HK Consumer
  { code: "2020", name: "安踏体育", market: "HK", sector: "消费" },
  { code: "1928", name: "金沙中国", market: "HK", sector: "消费" },
  { code: "0291", name: "华润啤酒", market: "HK", sector: "消费" },
  { code: "9633", name: "农夫山泉", market: "HK", sector: "消费" },
  { code: "9626", name: "哔哩哔哩", market: "HK", sector: "科技" },
];

function searchStocks(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return STOCKS.filter((s) => {
    const name = s.name.toLowerCase();
    const code = s.code.toLowerCase();
    const market = s.market.toLowerCase();
    const sector = s.sector.toLowerCase();
    return (
      name.includes(q) ||
      code.includes(q) ||
      sector.includes(q) ||
      (market === "us" && q === "us") ||
      (market === "hk" && q === "hk") ||
      (market === "hk" && q.includes("港")) ||
      (market === "us" && q.includes("美"))
    );
  }).slice(0, 30);
}

// ─── Main Handler ─────────────────────────────────────────
export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const action = url.searchParams.get("action");

    if (!action) {
      return error("Missing action parameter", 400);
    }

    try {
      switch (action) {
        case "quote": {
          const market = url.searchParams.get("market") || "us";
          let symbol;
          if (market === "hk") {
            const code = url.searchParams.get("code");
            if (!code) return error("Missing code for HK market");
            symbol = code.replace(/^0+/, "").padStart(4, "0") + ".HK";
          } else {
            const ticker = url.searchParams.get("ticker");
            if (!ticker) return error("Missing ticker for US market");
            symbol = ticker.toUpperCase();
          }

          const data = await yahooQuote(symbol);
          if (!data) return error("Failed to fetch quote data", 502);

          return json({ ...data, market, ticker: data.symbol, currency: data.currency });
        }

        case "kline": {
          const market = url.searchParams.get("market") || "us";
          const interval = url.searchParams.get("interval") || "1d";
          const range = url.searchParams.get("range") || "6mo";

          let symbol;
          if (market === "hk") {
            const code = url.searchParams.get("code");
            if (!code) return error("Missing code for HK market");
            symbol = code.replace(/^0+/, "").padStart(4, "0") + ".HK";
          } else {
            const ticker = url.searchParams.get("ticker");
            if (!ticker) return error("Missing ticker for US market");
            symbol = ticker.toUpperCase();
          }

          const klines = await yahooKline(symbol, interval, range);
          if (!klines) return error("Failed to fetch kline data", 502);

          return json({ market, symbol, interval, range, data: klines });
        }

        case "search": {
          const q = url.searchParams.get("q");
          if (!q) return error("Missing search query");
          const market = url.searchParams.get("market");
          let results = searchStocks(q);
          if (market) {
            results = results.filter(
              (r) => r.market === market.toUpperCase(),
            );
          }
          return json({ results });
        }

        case "list": {
          const market = url.searchParams.get("market") || "us";
          const list = STOCKS.filter(
            (s) => s.market === market.toUpperCase(),
          );
          return json({ market, total: list.length, results: list });
        }

        default:
          return error(
            `Unknown action: ${action}. Supported: quote, kline, search, list`,
          );
      }
    } catch (e) {
      return error(`Server error: ${e.message}`, 500);
    }
  },
};
