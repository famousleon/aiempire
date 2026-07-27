/**
 * AI Empire Stock Data Proxy v2 — Cloudflare Worker
 * 美股 + 港股，全部使用 Yahoo Finance 全球 API
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

// ─── Helpers ──────────────────────────────────────────────
function formatLargeNum(n) {
  if (!n || isNaN(n)) return null;
  return n;
}

// ─── Quote: Yahoo Finance ─────────────────────────────────
async function yahooQuote(symbol) {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
  const resp = await fetch(url, {
    headers: { "User-Agent": UA },
  });
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

// ─── K-line: Yahoo Finance ────────────────────────────────
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

// ─── Search: Yahoo Finance ────────────────────────────────
async function yahooSearch(query) {
  // Yahoo Finance autocomplete API
  const url = `https://query2.finance.yahoo.com/v1/finance/symbols`;
  const params = new URLSearchParams({ query: encodeURIComponent(query) });
  const resp = await fetch(`${url}?${params}`, {
    headers: { "User-Agent": UA },
  });
  if (!resp.ok) return [];
  const d = await resp.json();
  const items = d?.symbols || [];
  return items
    .filter((it) => {
      // Filter out mutual funds, ETFs that aren't individual stocks
      const type = (it.quoteType || "").toLowerCase();
      return type === "equity" || type === "";
    })
    .slice(0, 20)
    .map((it) => {
      const sym = it.symbol || "";
      const isHK = sym.endsWith(".HK");
      return {
        code: isHK ? sym.replace(".HK", "") : sym,
        name: it.shortName || it.longName || sym,
        market: isHK ? "HK" : "US",
        type: it.quoteType || "EQUITY",
      };
    });
}

// ─── List: Yahoo Finance — Not directly available ─────────
// Yahoo doesn't provide a full market list API.
// We'll return a curated popular list instead.
const POPULAR_US = [
  { code: "AAPL", name: "Apple Inc.", market: "US" },
  { code: "MSFT", name: "Microsoft Corporation", market: "US" },
  { code: "GOOGL", name: "Alphabet Inc.", market: "US" },
  { code: "AMZN", name: "Amazon.com Inc.", market: "US" },
  { code: "NVDA", name: "NVIDIA Corporation", market: "US" },
  { code: "META", name: "Meta Platforms Inc.", market: "US" },
  { code: "TSLA", name: "Tesla Inc.", market: "US" },
  { code: "BRK-B", name: "Berkshire Hathaway Inc.", market: "US" },
  { code: "JPM", name: "JPMorgan Chase & Co.", market: "US" },
  { code: "V", name: "Visa Inc.", market: "US" },
  { code: "JNJ", name: "Johnson & Johnson", market: "US" },
  { code: "WMT", name: "Walmart Inc.", market: "US" },
  { code: "XOM", name: "Exxon Mobil Corporation", market: "US" },
  { code: "PG", name: "Procter & Gamble Co.", market: "US" },
  { code: "MA", name: "Mastercard Inc.", market: "US" },
  { code: "HD", name: "Home Depot Inc.", market: "US" },
  { code: "DIS", name: "Walt Disney Co.", market: "US" },
  { code: "BABA", name: "Alibaba Group Holding Ltd.", market: "US" },
  { code: "NFLX", name: "Netflix Inc.", market: "US" },
  { code: "AMD", name: "Advanced Micro Devices Inc.", market: "US" },
  { code: "INTC", name: "Intel Corporation", market: "US" },
  { code: "CSCO", name: "Cisco Systems Inc.", market: "US" },
  { code: "PFE", name: "Pfizer Inc.", market: "US" },
  { code: "KO", name: "Coca-Cola Co.", market: "US" },
  { code: "PEP", name: "PepsiCo Inc.", market: "US" },
  { code: "ABT", name: "Abbott Laboratories", market: "US" },
  { code: "CRM", name: "Salesforce Inc.", market: "US" },
  { code: "ORCL", name: "Oracle Corporation", market: "US" },
  { code: "TMO", name: "Thermo Fisher Scientific Inc.", market: "US" },
  { code: "MRK", name: "Merck & Co. Inc.", market: "US" },
];

const POPULAR_HK = [
  { code: "0700", name: "腾讯控股", market: "HK" },
  { code: "9988", name: "阿里巴巴", market: "HK" },
  { code: "9618", name: "京东集团", market: "HK" },
  { code: "1024", name: "快手", market: "HK" },
  { code: "3690", name: "美团", market: "HK" },
  { code: "9888", name: "百度集团", market: "HK" },
  { code: "2269", name: "药明生物", market: "HK" },
  { code: "1810", name: "小米集团", market: "HK" },
  { code: "0981", name: "中芯国际", market: "HK" },
  { code: "0941", name: "中国移动", market: "HK" },
  { code: "2318", name: "中国平安", market: "HK" },
  { code: "0388", name: "香港交易所", market: "HK" },
  { code: "1299", name: "友邦保险", market: "HK" },
  { code: "0005", name: "汇丰控股", market: "HK" },
  { code: "2020", name: "安踏体育", market: "HK" },
];

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

          return json({
            ...data,
            market: market,
            ticker: data.symbol,
            currency: data.currency,
          });
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

          return json({
            market,
            symbol,
            interval,
            range,
            data: klines,
          });
        }

        case "search": {
          const q = url.searchParams.get("q");
          if (!q) return error("Missing search query");
          const results = await yahooSearch(q);
          // Filter by market if specified
          const market = url.searchParams.get("market");
          const filtered = market
            ? results.filter((r) => r.market === market.toUpperCase())
            : results;
          return json({ results: filtered });
        }

        case "list": {
          const market = url.searchParams.get("market") || "us";
          const list = market === "hk" ? POPULAR_HK : POPULAR_US;
          return json({
            market,
            total: list.length,
            results: list,
          });
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
