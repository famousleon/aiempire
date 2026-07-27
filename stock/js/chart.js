/**
 * K-line Chart Renderer — Canvas
 * Candlestick chart with volume, MA, MACD, RSI overlays
 */

const Chart = (() => {

  // ─── Config ────────────────────────────────────────────
  const COLORS = {
    up: '#30d158',
    down: '#ff453a',
    upAlpha: 'rgba(48, 209, 88, 0.3)',
    downAlpha: 'rgba(255, 69, 58, 0.3)',
    grid: 'rgba(255, 255, 255, 0.06)',
    text: '#86868b',
    ma5: '#ffd60a',
    ma10: '#00b4d8',
    ma20: '#bf4dff',
    ma60: '#ff6b9d',
    bollUpper: '#bf4dff',
    bollMid: '#86868b',
    bollLower: '#bf4dff',
    dif: '#00b4d8',
    dea: '#ff6b9d',
    macdUp: 'rgba(48, 209, 88, 0.7)',
    macdDown: 'rgba(255, 69, 58, 0.7)',
    rsi: '#ffd60a',
    bg: '#141414',
  };

  // ─── Main Draw ─────────────────────────────────────────
  function draw(canvas, klines, options) {
    options = options || {};
    const indicator = options.indicator || 'ma';

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    if (!klines || klines.length === 0) {
      ctx.fillStyle = COLORS.text;
      ctx.font = '14px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无数据', W / 2, H / 2);
      return;
    }

    const marginLeft = 10;
    const marginRight = 60;
    const marginTop = 10;
    const marginBottom = 20;
    const chartW = W - marginLeft - marginRight;
    const padding = { left: marginLeft, right: marginRight, top: marginTop, bottom: marginBottom };

    // Calculate indicators
    const maData = Indicators.calcMA(klines);
    let macdData = null, rsiData = null, bollData = null;

    if (indicator === 'macd') macdData = Indicators.calcMACD(klines);
    else if (indicator === 'rsi') rsiData = Indicators.calcRSI(klines);
    else if (indicator === 'boll') bollData = Indicators.calcBollinger(klines);

    // Layout
    const mainH = indicator !== 'none' ? H * 0.65 : H * 0.8;
    const volumeH = H * 0.15;
    const subH = indicator !== 'none' ? H * 0.2 : 0;

    const mainTop = padding.top;
    const mainBottom = mainTop + mainH;
    const volTop = mainBottom + 4;
    const volBottom = volTop + volumeH;
    const subTop = volBottom + 4;
    const subBottom = subH > 0 ? subTop + subH : volBottom;

    // Candle width and spacing
    const candleW = Math.max(1, Math.min(12, (chartW / klines.length) * 0.6));
    const gap = chartW / klines.length;

    // Price range
    let priceMin = Infinity, priceMax = -Infinity;
    let volMax = 0;

    for (const k of klines) {
      if (k.high > priceMax) priceMax = k.high;
      if (k.low < priceMin) priceMin = k.low;
      if (k.volume > volMax) volMax = k.volume;
    }

    // Expand price range for MAs
    if (maData) {
      for (const m of maData) {
        if (m.ma5 !== null) { priceMax = Math.max(priceMax, m.ma5); priceMin = Math.min(priceMin, m.ma5); }
        if (m.ma10 !== null) { priceMax = Math.max(priceMax, m.ma10); priceMin = Math.min(priceMin, m.ma10); }
        if (m.ma20 !== null) { priceMax = Math.max(priceMax, m.ma20); priceMin = Math.min(priceMin, m.ma20); }
        if (m.ma60 !== null) { priceMax = Math.max(priceMax, m.ma60); priceMin = Math.min(priceMin, m.ma60); }
      }
    }

    const priceRange = priceMax - priceMin || 1;
    priceMax += priceRange * 0.05;
    priceMin -= priceRange * 0.05;

    // Helpers
    function xPos(i) { return padding.left + gap * i + gap / 2; }
    function yPos(price) { return mainTop + (1 - (price - priceMin) / (priceMax - priceMin)) * (mainBottom - mainTop); }
    function yVol(v) { return volBottom - (v / volMax) * (volBottom - volTop); }

    // ─── Grid Lines ────────────────────────────────────
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;

    const priceSteps = 5;
    for (let i = 0; i <= priceSteps; i++) {
      const p = priceMin + (priceMax - priceMin) * i / priceSteps;
      const y = yPos(p);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(W - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = COLORS.text;
      ctx.font = '10px SF Mono, Menlo, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(p.toFixed(2), W - padding.right + 4, y + 3);
    }

    // ─── Volume Bars ───────────────────────────────────
    for (let i = 0; i < klines.length; i++) {
      const k = klines[i];
      const x = xPos(i);
      const isUp = k.close >= klines[Math.max(0, i - 1)].close;
      ctx.fillStyle = isUp ? COLORS.upAlpha : COLORS.downAlpha;
      const barH = volBottom - yVol(k.volume);
      ctx.fillRect(x - candleW / 2, volBottom - barH, candleW, barH);
    }

    // ─── Candlesticks ──────────────────────────────────
    for (let i = 0; i < klines.length; i++) {
      const k = klines[i];
      const x = xPos(i);
      const isUp = k.close >= k.open;
      const color = isUp ? COLORS.up : COLORS.down;

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, yPos(k.high));
      ctx.lineTo(x, yPos(k.low));
      ctx.stroke();

      // Body
      const bodyTop = yPos(Math.max(k.open, k.close));
      const bodyBot = yPos(Math.min(k.open, k.close));
      const bodyH = Math.max(1, bodyBot - bodyTop);

      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    }

    // ─── MA Lines ──────────────────────────────────────
    if (maData && (indicator === 'ma' || indicator === 'boll')) {
      drawLine(ctx, maData, 'ma5', COLORS.ma5, xPos, yPos, klines.length);
      drawLine(ctx, maData, 'ma10', COLORS.ma10, xPos, yPos, klines.length);
      drawLine(ctx, maData, 'ma20', COLORS.ma20, xPos, yPos, klines.length);
      if (maData.some(m => m.ma60 !== null)) {
        drawLine(ctx, maData, 'ma60', COLORS.ma60, xPos, yPos, klines.length);
      }
    }

    // ─── Bollinger Bands ───────────────────────────────
    if (bollData) {
      drawBand(ctx, bollData, 'upper', 'lower', COLORS.bollUpper, xPos, yPos, klines.length);
      drawLine(ctx, bollData, 'mid', COLORS.bollMid, xPos, yPos, klines.length);
    }

    // ─── Sub-chart (MACD / RSI) ────────────────────────
    if (indicator === 'macd' && macdData) {
      drawMACDSub(ctx, macdData, candleW, gap, padding, subTop, subBottom, W);
    } else if (indicator === 'rsi' && rsiData) {
      drawRSISub(ctx, rsiData, gap, padding, subTop, subBottom, W);
    }

    // ─── Date Labels ───────────────────────────────────
    const labelCount = Math.min(6, klines.length);
    const labelStep = Math.floor(klines.length / labelCount);
    ctx.fillStyle = COLORS.text;
    ctx.font = '10px SF Mono, Menlo, monospace';
    ctx.textAlign = 'center';

    for (let i = 0; i < klines.length; i += labelStep) {
      const x = xPos(i);
      const date = klines[i].date;
      ctx.fillText(date.slice(5), x, H - 4);
    }

    // ─── MA Legend ─────────────────────────────────────
    if (indicator === 'ma' && klines.length > 0) {
      const last = maData[maData.length - 1];
      let legendX = padding.left + 4;
      const legendY = mainTop + 14;
      ctx.font = '10px SF Mono, Menlo, monospace';

      if (last.ma5 !== null) { ctx.fillStyle = COLORS.ma5; ctx.fillText(`MA5:${last.ma5.toFixed(2)}`, legendX, legendY); legendX += 70; }
      if (last.ma10 !== null) { ctx.fillStyle = COLORS.ma10; ctx.fillText(`MA10:${last.ma10.toFixed(2)}`, legendX, legendY); legendX += 75; }
      if (last.ma20 !== null) { ctx.fillStyle = COLORS.ma20; ctx.fillText(`MA20:${last.ma20.toFixed(2)}`, legendX, legendY); legendX += 75; }
      if (last.ma60 !== null) { ctx.fillStyle = COLORS.ma60; ctx.fillText(`MA60:${last.ma60.toFixed(2)}`, legendX, legendY); }
    }
  }

  // ─── Helper: Draw MA line ──────────────────────────────
  function drawLine(ctx, data, key, color, xPos, yPos, count) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    let started = false;

    for (let i = 0; i < count; i++) {
      const val = data[i]?.[key];
      if (val === null || val === undefined) {
        started = false;
        continue;
      }
      const x = xPos(i);
      const y = yPos(val);
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  // ─── Helper: Draw Bollinger band ───────────────────────
  function drawBand(ctx, data, upperKey, lowerKey, color, xPos, yPos, count) {
    ctx.fillStyle = color.replace(')', ', 0.05)').replace('rgb', 'rgba');
    ctx.beginPath();

    // Upper line
    let started = false;
    for (let i = 0; i < count; i++) {
      const u = data[i]?.[upperKey];
      if (u === null) { started = false; continue; }
      const x = xPos(i);
      const y = yPos(u);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }

    // Lower line (reverse)
    started = false;
    for (let i = count - 1; i >= 0; i--) {
      const l = data[i]?.[lowerKey];
      if (l === null) { started = false; continue; }
      const x = xPos(i);
      const y = yPos(l);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
  }

  // ─── Helper: MACD Sub-chart ────────────────────────────
  function drawMACDSub(ctx, data, candleW, gap, padding, top, bottom, W) {
    // Find range
    let maxVal = 0;
    for (const d of data) {
      maxVal = Math.max(maxVal, Math.abs(d.dif), Math.abs(d.dea), Math.abs(d.macd));
    }
    if (maxVal === 0) maxVal = 1;

    const midY = (top + bottom) / 2;
    const range = bottom - top;

    function yVal(v) { return midY - (v / maxVal) * (range / 2); }

    // Zero line
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(padding.left, midY);
    ctx.lineTo(W - padding.right, midY);
    ctx.stroke();

    // MACD bars
    const barW = Math.max(1, candleW * 0.6);
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const x = padding.left + gap * i + gap / 2;
      ctx.fillStyle = d.macd >= 0 ? COLORS.macdUp : COLORS.macdDown;
      const barH = Math.abs(yVal(d.macd) - midY);
      ctx.fillRect(x - barW / 2, d.macd >= 0 ? yVal(d.macd) : midY, barW, barH);
    }

    // DIF line
    ctx.strokeStyle = COLORS.dif;
    ctx.lineWidth = 1;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].dif === null) { started = false; continue; }
      const x = padding.left + gap * i + gap / 2;
      const y = yVal(data[i].dif);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // DEA line
    ctx.strokeStyle = COLORS.dea;
    ctx.beginPath();
    started = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].dea === null) { started = false; continue; }
      const x = padding.left + gap * i + gap / 2;
      const y = yVal(data[i].dea);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Label
    ctx.font = '10px SF Mono, Menlo, monospace';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'left';
    const last = data[data.length - 1];
    ctx.fillText(`DIF:${last.dif.toFixed(2)} DEA:${last.dea.toFixed(2)} MACD:${last.macd.toFixed(2)}`, padding.left + 4, top + 12);
  }

  // ─── Helper: RSI Sub-chart ─────────────────────────────
  function drawRSISub(ctx, data, gap, padding, top, bottom, W) {
    const rsiRange = bottom - top;

    // 70/30 lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (const level of [30, 70]) {
      const y = bottom - (level / 100) * rsiRange;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(W - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = COLORS.text;
      ctx.font = '10px SF Mono, Menlo, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(level.toString(), W - padding.right + 4, y + 3);
    }

    // RSI line
    ctx.strokeStyle = COLORS.rsi;
    ctx.lineWidth = 1;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].rsi === null) { started = false; continue; }
      const x = padding.left + gap * i + gap / 2;
      const y = bottom - (data[i].rsi / 100) * rsiRange;
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Label
    const last = data[data.length - 1];
    if (last.rsi !== null) {
      ctx.fillStyle = last.rsi > 70 ? COLORS.down : last.rsi < 30 ? COLORS.up : COLORS.rsi;
      ctx.font = '10px SF Mono, Menlo, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`RSI(14): ${last.rsi.toFixed(2)}`, padding.left + 4, top + 12);
    }
  }

  return { draw };
})();
