/**
 * Technical Indicators — Pure JS
 * MA / EMA / MACD / RSI / KDJ / Bollinger Bands
 * Translated from global-stock-data Python implementation
 */

const Indicators = (() => {

  function ema(values, period) {
    const k = 2 / (period + 1);
    const result = [values[0]];
    for (let i = 1; i < values.length; i++) {
      result.push(values[i] * k + result[i - 1] * (1 - k));
    }
    return result;
  }

  function sma(values, period) {
    const result = [];
    for (let i = 0; i < values.length; i++) {
      if (i < period - 1) {
        result.push(null);
      } else {
        let sum = 0;
        for (let j = i - period + 1; j <= i; j++) {
          sum += values[j];
        }
        result.push(sum / period);
      }
    }
    return result;
  }

  // ─── MA / EMA ──────────────────────────────────────────
  function calcMA(klines, periods) {
    periods = periods || [5, 10, 20, 60];
    const closes = klines.map(k => k.close);
    const result = klines.map((k, i) => ({ date: k.date, close: k.close }));

    for (const p of periods) {
      const vals = sma(closes, p);
      const key = 'ma' + p;
      for (let i = 0; i < result.length; i++) {
        result[i][key] = vals[i] !== null ? round2(vals[i]) : null;
      }
    }

    // EMA 12 and 26
    const ema12 = ema(closes, 12);
    const ema26 = ema(closes, 26);
    for (let i = 0; i < result.length; i++) {
      result[i].ema12 = round2(ema12[i]);
      result[i].ema26 = round2(ema26[i]);
    }

    return result;
  }

  // ─── MACD ─────────────────────────────────────────────
  function calcMACD(klines) {
    const closes = klines.map(k => k.close);
    const ema12 = ema(closes, 12);
    const ema26 = ema(closes, 26);
    const dif = ema12.map((v, i) => v - ema26[i]);
    const dea = ema(dif, 9);
    const macd = dif.map((v, i) => 2 * (v - dea[i]));

    return klines.map((k, i) => ({
      date: k.date,
      dif: round2(dif[i]),
      dea: round2(dea[i]),
      macd: round2(macd[i]),
    }));
  }

  // ─── RSI ──────────────────────────────────────────────
  function calcRSI(klines, period) {
    period = period || 14;
    const closes = klines.map(k => k.close);
    const result = [];

    for (let i = 0; i < closes.length; i++) {
      if (i < period) {
        result.push({ date: klines[i].date, rsi: null });
        continue;
      }

      let gains = 0, losses = 0;
      for (let j = i - period + 1; j <= i; j++) {
        const diff = closes[j] - closes[j - 1];
        if (diff > 0) gains += diff;
        else losses += Math.abs(diff);
      }

      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = avgLoss === 0 ? 100 : round2(100 - 100 / (1 + rs));

      result.push({ date: klines[i].date, rsi });
    }

    return result;
  }

  // ─── KDJ ──────────────────────────────────────────────
  function calcKDJ(klines, n, m1, m2) {
    n = n || 9;
    m1 = m1 || 3;
    m2 = m2 || 3;

    const result = [];
    let k = 50, d = 50;

    for (let i = 0; i < klines.length; i++) {
      if (i < n - 1) {
        result.push({ date: klines[i].date, k: 50, d: 50, j: 50 });
        continue;
      }

      let lowest = Infinity, highest = -Infinity;
      for (let j = i - n + 1; j <= i; j++) {
        if (klines[j].low < lowest) lowest = klines[j].low;
        if (klines[j].high > highest) highest = klines[j].high;
      }

      const c = klines[i].close;
      const rsv = highest === lowest ? 50 : ((c - lowest) / (highest - lowest)) * 100;

      k = ((m1 - 1) / m1) * k + (1 / m1) * rsv;
      d = ((m2 - 1) / m2) * d + (1 / m2) * k;
      const j = 3 * k - 2 * d;

      result.push({
        date: klines[i].date,
        k: round2(k),
        d: round2(d),
        j: round2(j),
      });
    }

    return result;
  }

  // ─── Bollinger Bands ─────────────────────────────────
  function calcBollinger(klines, period, mult) {
    period = period || 20;
    mult = mult || 2;
    const closes = klines.map(k => k.close);
    const result = [];

    for (let i = 0; i < closes.length; i++) {
      if (i < period - 1) {
        result.push({ date: klines[i].date, upper: null, mid: null, lower: null });
        continue;
      }

      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) {
        sum += closes[j];
      }
      const mid = sum / period;

      let variance = 0;
      for (let j = i - period + 1; j <= i; j++) {
        variance += Math.pow(closes[j] - mid, 2);
      }
      const std = Math.sqrt(variance / period);

      result.push({
        date: klines[i].date,
        upper: round2(mid + mult * std),
        mid: round2(mid),
        lower: round2(mid - mult * std),
      });
    }

    return result;
  }

  function round2(v) {
    return v != null ? Math.round(v * 100) / 100 : null;
  }

  return { calcMA, calcMACD, calcRSI, calcKDJ, calcBollinger };
})();
