/**
 * AI Empire Stock Data Proxy — Cloudflare Worker
 * 美股 + 港股数据代理，排除 A 股
 * 部署到 api.aiempire.today
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

// ─── CORS Headers ───────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ─── GBK Decoder ────────────────────────────────────────────
async function decodeGbk(response) {
  const buffer = await response.arrayBuffer();
  return new TextDecoder("gbk").decode(buffer);
}

// ─── JSON Response Helper ───────────────────────────────────
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function error(msg, status = 400) {
  return json({ error: msg }, status);
}

// ─── Cache ──────────────────────────────────────────────────
async function cached(key, ttl, fn) {
  const cache = caches.default;
  const cacheKey = new Request(`https://stock-proxy/${key}`);
  const cached = await cache.match(cacheKey);
  if (cached) return JSON.parse(await cached.text());

  const data = await fn();
  const resp = new Response(JSON.stringify(data), {
    headers: { "Cache-Control": `public, max-age=${ttl}` },
  });
  cache.put(cacheKey, resp.clone());
  return data;
}

// ─── Quote: Sina US ─────────────────────────────────────────
async function quoteSinaUS(ticker) {
  const url = `https://hq.sinajs.cn/list=gb_${ticker.toLowerCase()}`;
  const resp = await fetch(url, {
    headers: { Referer: "https://finance.sina.com.cn/", "User-Agent": UA },
  });
  const text = await decodeGbk(resp);
  const m = text.match(/"(.+)"/);
  if (!m) return null;
  const f = m[1].split(",");
  if (f.length < 30) return null;
  return {
    source: "sina",
    name: f[0],
    price: parseFloat(f[1]) || 0,
    change_pct: parseFloat(f[2]) || 0,
    timestamp: f[3],
    open: parseFloat(f[5]) || 0,
    high: parseFloat(f[6]) || 0,
    low: parseFloat(f[7]) || 0,
    prev_close: parseFloat(f[26]) || 0,
    volume: parseFloat(f[10]) || 0,
    high_52w: parseFloat(f[8]) || 0,
    low_52w: parseFloat(f[9]) || 0,
    market_cap: parseFloat(f[12]) || 0,
    eps: parseFloat(f[13]) || 0,
    pe: parseFloat(f[14]) || 0,
  };
}

// ─── Quote: Tencent US ──────────────────────────────────────
async function quoteTencentUS(ticker) {
  const url = `https://qt.gtimg.cn/q=us${ticker.toUpperCase()}`;
  const resp = await fetch(url);
  const text = await decodeGbk(resp);
  const m = text.match(/"(.+)"/);
  if (!m) return null;
  const f = m[1].split("~");
  if (f.length < 52) return null;
  return {
    source: "tencent",
    name: f[1],
    name_en: f[46],
    price: parseFloat(f[3]) || 0,
    prev_close: parseFloat(f[4]) || 0,
    open: parseFloat(f[5]) || 0,
    volume: parseInt(parseFloat(f[6])) || 0,
    high: parseFloat(f[33]) || 0,
    low: parseFloat(f[34]) || 0,
    high_52w: parseFloat(f[48]) || 0,
    low_52w: parseFloat(f[49]) || 0,
    change_pct: parseFloat(f[32]) || 0,
    market_cap: parseFloat(f[45]) || 0,
    pe: parseFloat(f[39]) || 0,
    pb: parseFloat(f[51]) || 0,
    eps: parseFloat(f[47]) || 0,
    currency: f[35],
    timestamp: f[30],
  };
}

// ─── Quote: Sina HK ─────────────────────────────────────────
async function quoteSinaHK(code) {
  const url = `https://hq.sinajs.cn/list=rt_hk${code}`;
  const resp = await fetch(url, {
    headers: { Referer: "https://finance.sina.com.cn/", "User-Agent": UA },
  });
  const text = await decodeGbk(resp);
  const m = text.match(/"(.+)"/);
  if (!m) return null;
  const f = m[1].split(",");
  if (f.length < 15) return null;
  return {
    source: "sina",
    name: f[1],
    name_en: f[0],
    price: parseFloat(f[6]) || 0,
    change_pct: parseFloat(f[8]) || 0,
    open: parseFloat(f[2]) || 0,
    high: parseFloat(f[4]) || 0,
    low: parseFloat(f[5]) || 0,
    prev_close: parseFloat(f[3]) || 0,
    volume: parseFloat(f[12]) || 0,
    amount: parseFloat(f[11]) || 0,
  };
}

// ─── Quote: Tencent HK ──────────────────────────────────────
async function quoteTencentHK(code) {
  const url = `https://qt.gtimg.cn/q=r_hk${code}`;
  const resp = await fetch(url);
  const text = await decodeGbk(resp);
  const m = text.match(/"(.+)"/);
  if (!m) return null;
  const f = m[1].split("~");
  if (f.length < 76) return null;
  return {
    source: "tencent",
    name: f[1],
    code: f[2],
    name_en: f[46],
    price: parseFloat(f[3]) || 0,
    prev_close: parseFloat(f[4]) || 0,
    open: parseFloat(f[5]) || 0,
    volume: parseInt(parseFloat(f[6])) || 0,
    high: parseFloat(f[33]) || 0,
    low: parseFloat(f[34]) || 0,
    high_52w: parseFloat(f[48]) || 0,
    low_52w: parseFloat(f[49]) || 0,
    change_pct: parseFloat(f[32]) || 0,
    market_cap: parseFloat(f[45]) || 0,
    pe: parseFloat(f[39]) || 0,
    pb: parseFloat(f[58]) || 0,
    currency: f[75],
    timestamp: f[30],
  };
}

// ─── K-line: Sina US ────────────────────────────────────────
async function klineSinaUS(ticker, num = 120) {
  const url =
    "https://stock.finance.sina.com.cn/usstock/api/jsonp.php/var/US_MinKService.getDailyK";
  const resp = await fetch(
    `${url}?symbol=${encodeURIComponent(ticker.toUpperCase())}&num=${num}`,
    { headers: { Referer: "https://finance.sina.com.cn/", "User-Agent": UA } },
  );
  const text = await resp.text();
  const m = text.match(/\((\[.+\])\)/);
  if (!m) return null;
  const items = JSON.parse(m[1]);
  return items.map((it) => ({
    date: it.d,
    open: parseFloat(it.o) || 0,
    high: parseFloat(it.h) || 0,
    low: parseFloat(it.l) || 0,
    close: parseFloat(it.c) || 0,
    volume: parseInt(it.v) || 0,
  }));
}

// ─── K-line: Yahoo (US + HK) ────────────────────────────────
async function klineYahoo(symbol, interval = "1d", range = "6mo") {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`;
  const resp = await fetch(
    `${url}?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(range)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    },
  );
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

// ─── Search: Eastmoney ──────────────────────────────────────
async function stockSearch(q, market = "us") {
  const url =
    "https://push2.eastmoney.com/api/qt/stock.suggest";
  const secType = market === "hk" ? "116" : "105,106";
  const resp = await fetch(
    `${url}?keyword=${encodeURIComponent(q)}&secid_list=&cb=&client=WEB&type=&token=&_=${Date.now()}`,
    { headers: { "User-Agent": UA, Referer: "https://quote.eastmoney.com/" } },
  );
  const d = await resp.json();
  const items = d?.data?.diff || [];
  return items
    .filter((it) => {
      if (market === "us") {
        return it.market === 105 || it.market === 106;
      }
      return it.market === 116;
    })
    .slice(0, 20)
    .map((it) => ({
      code: it.code,
      name: it.name,
      market: it.market,
      market_name: it.market === 116 ? "HK" : "US",
      secid: `${it.market}.${it.code}`,
    }));
}

// ─── List: Eastmoney push2 ──────────────────────────────────
async function stockList(market) {
  const secid = market === "hk" ? "m:116" : "m:105,m:106";
  const url =
    "https://push2.eastmoney.com/api/qt/clist/get";
  const params = new URLSearchParams({
    pn: "1",
    pz: "500",
    np: "1",
    fltt: "2",
    invt: "2",
    fid: "f3",
    fs: secid,
    fields: "f2,f3,f4,f5,f6,f7,f12,f14",
  });
  const resp = await fetch(`${url}?${params}`, {
    headers: { "User-Agent": UA, Referer: "https://quote.eastmoney.com/" },
  });
  const d = await resp.json();
  const items = d?.data?.diff || [];
  return items.map((it) => ({
    code: it.f12,
    name: it.f14,
    price: it.f2 !== "-" ? it.f2 : null,
    change_pct: it.f3 !== "-" ? it.f3 : null,
    change: it.f4 !== "-" ? it.f4 : null,
    volume: it.f5 !== "-" ? it.f5 : null,
    amount: it.f6 !== "-" ? it.f6 : null,
    amplitude: it.f7 !== "-" ? it.f7 : null,
    market: market,
  }));
}

// ─── Main Handler ───────────────────────────────────────────
export default {
  async fetch(request) {
    // CORS preflight
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
          const ticker = url.searchParams.get("ticker");
          const code = url.searchParams.get("code");

          if (market === "us") {
            if (!ticker) return error("Missing ticker for US market");
            const [sina, tencent] = await Promise.allSettled([
              quoteSinaUS(ticker),
              quoteTencentUS(ticker),
            ]);
            const result = { market: "us", ticker, currency: "USD" };
            if (sina.status === "fulfilled" && sina.value)
              result.sina = sina.value;
            if (tencent.status === "fulfilled" && tencent.value)
              result.tencent = tencent.value;
            // Merge: prefer tencent (more fields)
            if (result.tencent) {
              result.name = result.tencent.name;
              result.price = result.tencent.price;
              result.change_pct = result.tencent.change_pct;
              result.open = result.tencent.open;
              result.high = result.tencent.high;
              result.low = result.tencent.low;
              result.prev_close = result.tencent.prev_close;
              result.volume = result.tencent.volume;
              result.pe = result.tencent.pe;
              result.pb = result.tencent.pb;
              result.market_cap = result.tencent.market_cap;
              result.eps = result.tencent.eps;
              result.high_52w = result.tencent.high_52w;
              result.low_52w = result.tencent.low_52w;
            } else if (result.sina) {
              Object.assign(result, result.sina);
            }
            return json(result);
          } else if (market === "hk") {
            if (!code) return error("Missing code for HK market");
            const cleanCode = code.replace(/^0+/, "").padStart(5, "0") || code;
            const [sina, tencent] = await Promise.allSettled([
              quoteSinaHK(cleanCode),
              quoteTencentHK(cleanCode),
            ]);
            const result = { market: "hk", code: cleanCode, currency: "HKD" };
            if (sina.status === "fulfilled" && sina.value)
              result.sina = sina.value;
            if (tencent.status === "fulfilled" && tencent.value)
              result.tencent = tencent.value;
            if (result.tencent) {
              result.name = result.tencent.name;
              result.price = result.tencent.price;
              result.change_pct = result.tencent.change_pct;
              result.open = result.tencent.open;
              result.high = result.tencent.high;
              result.low = result.tencent.low;
              result.prev_close = result.tencent.prev_close;
              result.volume = result.tencent.volume;
              result.pe = result.tencent.pe;
              result.pb = result.tencent.pb;
              result.market_cap = result.tencent.market_cap;
              result.high_52w = result.tencent.high_52w;
              result.low_52w = result.tencent.low_52w;
            } else if (result.sina) {
              Object.assign(result, result.sina);
            }
            return json(result);
          }
          return error("Invalid market. Use 'us' or 'hk'");
        }

        case "kline": {
          const market = url.searchParams.get("market") || "us";
          const interval = url.searchParams.get("interval") || "1d";
          const range = url.searchParams.get("range") || "6mo";

          if (market === "us") {
            const ticker = url.searchParams.get("ticker");
            if (!ticker) return error("Missing ticker for US market");
            // Try Sina first, fallback to Yahoo
            let klines = await klineSinaUS(
              ticker,
              interval === "1d"
                ? 250
                : interval === "1wk"
                  ? 120
                  : interval === "1mo"
                    ? 60
                    : 250,
            );
            if (!klines || klines.length === 0) {
              const yahooSymbol = ticker.toUpperCase();
              klines = await klineYahoo(yahooSymbol, interval, range);
            }
            return json({
              market: "us",
              ticker,
              interval,
              range,
              data: klines || [],
            });
          } else if (market === "hk") {
            const code = url.searchParams.get("code");
            if (!code) return error("Missing code for HK market");
            const cleanCode = code.replace(/^0+/, "").padStart(5, "0") || code;
            const klines = await klineYahoo(
              `${cleanCode}.HK`,
              interval,
              range,
            );
            return json({
              market: "hk",
              code: cleanCode,
              interval,
              range,
              data: klines || [],
            });
          }
          return error("Invalid market. Use 'us' or 'hk'");
        }

        case "search": {
          const q = url.searchParams.get("q");
          const market = url.searchParams.get("market") || "us";
          if (!q) return error("Missing search query");
          const results = await cached(
            `search_${market}_${q}`,
            3600,
            () => stockSearch(q, market),
          );
          return json({ market, query: q, results });
        }

        case "list": {
          const market = url.searchParams.get("market") || "us";
          const results = await cached(
            `list_${market}`,
            600,
            () => stockList(market),
          );
          return json({ market, total: results.length, results });
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
