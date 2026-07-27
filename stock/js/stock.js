/**
 * AI Empire Stock Dashboard — Main App
 * US + HK stocks, watchlist, screener
 */

const StockApp = (() => {

  // ─── Config ────────────────────────────────────────────
  // Change this to your actual Cloudflare Worker URL after deployment
  const API_BASE = 'https://stock-proxy.lugdba.workers.dev';

  const WATCHLIST_KEY = 'stock_watchlist';
  const STATE_KEY = 'stock_state';

  // ─── State ─────────────────────────────────────────────
  let currentMarket = 'us';
  let currentTicker = null;
  let currentKlines = null;
  let currentInterval = '1d';
  let currentRange = '6mo';
  let currentIndicator = 'ma';
  let searchTimeout = null;
  let quoteRefreshTimer = null;

  // ─── DOM Cache ─────────────────────────────────────────
  const dom = {};

  function cacheDOM() {
    dom.searchInput = document.getElementById('searchInput');
    dom.searchSpinner = document.getElementById('searchSpinner');
    dom.searchResults = document.getElementById('searchResults');
    dom.quoteSection = document.getElementById('quoteSection');
    dom.quoteName = document.getElementById('quoteName');
    dom.quoteTicker = document.getElementById('quoteTicker');
    dom.quoteMarketTag = document.getElementById('quoteMarketTag');
    dom.quotePrice = document.getElementById('quotePrice');
    dom.quoteChange = document.getElementById('quoteChange');
    dom.quoteOpen = document.getElementById('quoteOpen');
    dom.quoteHigh = document.getElementById('quoteHigh');
    dom.quoteLow = document.getElementById('quoteLow');
    dom.quotePrevClose = document.getElementById('quotePrevClose');
    dom.quoteVolume = document.getElementById('quoteVolume');
    dom.quoteMarketCap = document.getElementById('quoteMarketCap');
    dom.quotePE = document.getElementById('quotePE');
    dom.quotePB = document.getElementById('quotePB');
    dom.quote52High = document.getElementById('quote52High');
    dom.quote52Low = document.getElementById('quote52Low');
    dom.quoteTime = document.getElementById('quoteTime');
    dom.btnWatchlist = document.getElementById('btnWatchlist');
    dom.chartSection = document.getElementById('chartSection');
    dom.klineCanvas = document.getElementById('klineCanvas');
    dom.screenerSection = document.getElementById('screenerSection');
    dom.screenerResults = document.getElementById('screenerResults');
    dom.watchlistGrid = document.getElementById('watchlistGrid');
    dom.watchlistCount = document.getElementById('watchlistCount');
    dom.watchlistEmpty = document.getElementById('watchlistEmpty');
    dom.navTabs = document.querySelectorAll('.nav-tab');
    dom.intervalBtns = document.querySelectorAll('.interval-btn');
    dom.rangeBtns = document.querySelectorAll('.range-btn');
    dom.indicatorBtns = document.querySelectorAll('.indicator-btn');
    dom.presetBtns = document.querySelectorAll('.preset-btn');
  }

  // ─── Init ──────────────────────────────────────────────
  function init() {
    cacheDOM();
    bindEvents();
    renderWatchlist();
    updateScreenerVisibility();
  }

  // ─── Events ────────────────────────────────────────────
  function bindEvents() {
    // Market tabs
    dom.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dom.navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMarket = tab.dataset.market;
        dom.searchInput.value = '';
        dom.searchResults.classList.remove('active');
        dom.searchInput.placeholder = currentMarket === 'us'
          ? '输入美股代码或公司名...'
          : '输入港股代码或公司名...';
        updateScreenerVisibility();
      });
    });

    // Search input with debounce
    dom.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      const q = dom.searchInput.value.trim();
      if (q.length < 1) {
        dom.searchResults.classList.remove('active');
        return;
      }
      dom.searchSpinner.style.display = 'block';
      searchTimeout = setTimeout(() => doSearch(q), 300);
    });

    // Close search results on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        dom.searchResults.classList.remove('active');
      }
    });

    // Watchlist button
    dom.btnWatchlist.addEventListener('click', toggleWatchlist);

    // Interval buttons
    dom.intervalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.intervalBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentInterval = btn.dataset.interval;
        if (currentTicker) loadKline(currentTicker, currentMarket);
      });
    });

    // Range buttons
    dom.rangeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.rangeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRange = btn.dataset.range;
        if (currentTicker) loadKline(currentTicker, currentMarket);
      });
    });

    // Indicator buttons
    dom.indicatorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.indicatorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentIndicator = btn.dataset.indicator;
        if (currentKlines) renderChart(currentKlines);
      });
    });

    // Screener preset buttons
    dom.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const condition = btn.dataset.condition;
        const days = btn.dataset.days;
        const value = btn.dataset.value;
        runScreener(condition, days, value);
      });
    });

    // Window resize — re-render chart
    window.addEventListener('resize', () => {
      if (currentKlines) renderChart(currentKlines);
    });
  }

  // ─── Search ────────────────────────────────────────────
  async function doSearch(q) {
    try {
      const url = `${API_BASE}/?action=search&q=${encodeURIComponent(q)}&market=${currentMarket}`;
      const resp = await fetch(url);
      const data = await resp.json();

      dom.searchSpinner.style.display = 'none';

      if (data.error) {
        dom.searchResults.innerHTML = `<div class="empty-state"><p>${data.error}</p></div>`;
        dom.searchResults.classList.add('active');
        return;
      }

      if (!data.results || data.results.length === 0) {
        dom.searchResults.innerHTML = '<div class="empty-state"><p>未找到匹配的股票</p></div>';
        dom.searchResults.classList.add('active');
        return;
      }

      dom.searchResults.innerHTML = data.results.map(r => `
        <div class="search-result-item" data-code="${r.code}" data-market="${r.market_name.toLowerCase() === 'hk' ? 'hk' : 'us'}">
          <div>
            <div class="search-result-name">${escapeHtml(r.name)}</div>
            <div class="search-result-code">${escapeHtml(r.code)}</div>
          </div>
          <span class="search-result-market" data-market="${r.market_name.toLowerCase() === 'hk' ? 'hk' : 'us'}">${r.market_name}</span>
        </div>
      `).join('');

      dom.searchResults.classList.add('active');

      // Bind click events
      dom.searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const code = item.dataset.code;
          const market = item.dataset.market;
          dom.searchResults.classList.remove('active');
          dom.searchInput.value = code;
          loadQuote(code, market);
        });
      });

    } catch (e) {
      dom.searchSpinner.style.display = 'none';
      console.error('Search error:', e);
    }
  }

  // ─── Quote ─────────────────────────────────────────────
  async function loadQuote(code, market) {
    clearQuoteRefresh();

    try {
      let url;
      if (market === 'us') {
        url = `${API_BASE}/?action=quote&ticker=${encodeURIComponent(code)}&market=us`;
      } else {
        url = `${API_BASE}/?action=quote&code=${encodeURIComponent(code)}&market=hk`;
      }

      const resp = await fetch(url);
      const data = await resp.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      currentTicker = code;
      currentMarket = market;

      renderQuote(data);
      dom.quoteSection.style.display = 'block';
      dom.chartSection.style.display = 'block';
      updateWatchlistBtn();
      loadKline(code, market);

      // Auto-refresh quote every 30s
      quoteRefreshTimer = setInterval(() => loadQuoteSilent(code, market), 30000);

    } catch (e) {
      console.error('Quote error:', e);
    }
  }

  async function loadQuoteSilent(code, market) {
    try {
      let url;
      if (market === 'us') {
        url = `${API_BASE}/?action=quote&ticker=${encodeURIComponent(code)}&market=us`;
      } else {
        url = `${API_BASE}/?action=quote&code=${encodeURIComponent(code)}&market=hk`;
      }
      const resp = await fetch(url);
      const data = await resp.json();
      if (!data.error) renderQuote(data);
    } catch (e) {
      // Silent fail
    }
  }

  function renderQuote(data) {
    const name = data.name || data.name_en || currentTicker;
    const ticker = data.ticker || data.code || currentTicker;
    const market = data.market || currentMarket;
    const currency = data.currency || (market === 'hk' ? 'HKD' : 'USD');
    const price = data.price || 0;
    const changePct = data.change_pct || 0;
    const prevClose = data.prev_close || 0;
    const change = prevClose ? (price - prevClose) : 0;

    dom.quoteName.textContent = name;
    dom.quoteTicker.textContent = ticker;
    dom.quoteMarketTag.textContent = market.toUpperCase();
    dom.quoteMarketTag.dataset.market = market;

    dom.quotePrice.textContent = `${currency === 'HKD' ? 'HK$' : '$'}${formatNum(price)}`;

    const sign = change >= 0 ? '+' : '';
    dom.quoteChange.textContent = `${sign}${formatNum(change)} (${sign}${changePct.toFixed(2)}%)`;
    dom.quoteChange.className = 'quote-change ' + (changePct > 0 ? 'up' : changePct < 0 ? 'down' : 'flat');

    dom.quoteOpen.textContent = data.open ? formatNum(data.open) : '—';
    dom.quoteHigh.textContent = data.high ? formatNum(data.high) : '—';
    dom.quoteLow.textContent = data.low ? formatNum(data.low) : '—';
    dom.quotePrevClose.textContent = prevClose ? formatNum(prevClose) : '—';
    dom.quoteVolume.textContent = data.volume ? formatVolume(data.volume) : '—';
    dom.quoteMarketCap.textContent = data.market_cap ? formatMarketCap(data.market_cap, currency) : '—';
    dom.quotePE.textContent = data.pe ? data.pe.toFixed(2) : '—';
    dom.quotePB.textContent = data.pb ? data.pb.toFixed(2) : '—';
    dom.quote52High.textContent = data.high_52w ? formatNum(data.high_52w) : '—';
    dom.quote52Low.textContent = data.low_52w ? formatNum(data.low_52w) : '—';
    dom.quoteTime.textContent = data.timestamp ? `最后更新: ${data.timestamp}` : '';
  }

  // ─── K-line ────────────────────────────────────────────
  async function loadKline(code, market) {
    try {
      let url;
      if (market === 'us') {
        url = `${API_BASE}/?action=kline&ticker=${encodeURIComponent(code)}&market=us&interval=${currentInterval}&range=${currentRange}`;
      } else {
        url = `${API_BASE}/?action=kline&code=${encodeURIComponent(code)}&market=hk&interval=${currentInterval}&range=${currentRange}`;
      }

      const resp = await fetch(url);
      const data = await resp.json();

      if (data.error || !data.data || data.data.length === 0) {
        dom.chartSection.style.display = 'block';
        dom.klineCanvas.parentElement.querySelector('.chart-container') || null;
        Chart.draw(dom.klineCanvas, [], { indicator: currentIndicator });
        return;
      }

      currentKlines = data.data;
      renderChart(currentKlines);

    } catch (e) {
      console.error('Kline error:', e);
    }
  }

  function renderChart(klines) {
    Chart.draw(dom.klineCanvas, klines, { indicator: currentIndicator });
  }

  // ─── Watchlist ─────────────────────────────────────────
  function getWatchlist() {
    try {
      return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
    } catch { return []; }
  }

  function saveWatchlist(list) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  }

  function isInWatchlist(code) {
    return getWatchlist().some(w => w.code === code);
  }

  function addToWatchlist(code, market, name) {
    const list = getWatchlist();
    if (list.some(w => w.code === code)) return;
    list.push({ code, market, name, added: Date.now() });
    saveWatchlist(list);
    updateWatchlistBtn();
    renderWatchlist();
  }

  function removeFromWatchlist(code) {
    const list = getWatchlist().filter(w => w.code !== code);
    saveWatchlist(list);
    updateWatchlistBtn();
    renderWatchlist();
  }

  function toggleWatchlist() {
    if (!currentTicker) return;
    if (isInWatchlist(currentTicker)) {
      removeFromWatchlist(currentTicker);
    } else {
      const name = dom.quoteName.textContent || currentTicker;
      addToWatchlist(currentTicker, currentMarket, name);
    }
  }

  function updateWatchlistBtn() {
    if (currentTicker && isInWatchlist(currentTicker)) {
      dom.btnWatchlist.classList.add('active');
    } else {
      dom.btnWatchlist.classList.remove('active');
    }
  }

  function renderWatchlist() {
    const list = getWatchlist();
    dom.watchlistCount.textContent = list.length;

    if (list.length === 0) {
      dom.watchlistGrid.innerHTML = `
        <div class="empty-state" id="watchlistEmpty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <p>还没有自选股</p>
          <p class="empty-hint">搜索股票后点击 ☆ 添加</p>
        </div>
      `;
      return;
    }

    dom.watchlistGrid.innerHTML = list.map(w => `
      <div class="watchlist-item" data-code="${w.code}" data-market="${w.market}">
        <div class="watchlist-item-info">
          <div class="watchlist-item-name">${escapeHtml(w.name || w.code)}</div>
          <div class="watchlist-item-code">${w.code} · ${w.market.toUpperCase()}</div>
        </div>
        <div class="watchlist-item-remove" data-remove="${w.code}" title="移除">✕</div>
      </div>
    `).join('');

    // Bind clicks
    dom.watchlistGrid.querySelectorAll('.watchlist-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.watchlist-item-remove')) {
          removeFromWatchlist(e.target.dataset.remove);
          return;
        }
        const code = item.dataset.code;
        const market = item.dataset.market;
        loadQuote(code, market);
      });
    });

    // Fetch prices for watchlist items
    fetchWatchlistPrices(list);
  }

  async function fetchWatchlistPrices(list) {
    for (const w of list) {
      try {
        let url;
        if (w.market === 'us') {
          url = `${API_BASE}/?action=quote&ticker=${encodeURIComponent(w.code)}&market=us`;
        } else {
          url = `${API_BASE}/?action=quote&code=${encodeURIComponent(w.code)}&market=hk`;
        }
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.error || !data.price) continue;

        const item = dom.watchlistGrid.querySelector(`[data-code="${w.code}"]`);
        if (!item) continue;

        let infoEl = item.querySelector('.watchlist-item-info');
        // Remove old price/change if exists
        const oldPrice = item.querySelector('.watchlist-item-price');
        const oldChange = item.querySelector('.watchlist-item-change');
        if (oldPrice) oldPrice.remove();
        if (oldChange) oldChange.remove();

        const currency = data.currency || (w.market === 'hk' ? 'HKD' : 'USD');
        const sym = currency === 'HKD' ? 'HK$' : '$';
        const changePct = data.change_pct || 0;
        const sign = changePct >= 0 ? '+' : '';

        const priceEl = document.createElement('span');
        priceEl.className = 'watchlist-item-price';
        priceEl.textContent = `${sym}${formatNum(data.price)}`;

        const changeEl = document.createElement('span');
        changeEl.className = 'watchlist-item-change ' + (changePct > 0 ? 'up' : changePct < 0 ? 'down' : '');
        changeEl.textContent = `${sign}${changePct.toFixed(2)}%`;

        infoEl.appendChild(priceEl);
        infoEl.appendChild(changeEl);

        // Update name
        if (data.name) {
          const nameEl = infoEl.querySelector('.watchlist-item-name');
          nameEl.textContent = data.name;
        }

      } catch (e) { /* skip */ }
    }
  }

  // ─── Screener ──────────────────────────────────────────
  async function runScreener(condition, days, value) {
    if (currentMarket !== 'us') return;

    dom.screenerResults.innerHTML = '<div class="loading">正在筛选...</div>';

    try {
      // Fetch full market list
      const listUrl = `${API_BASE}/?action=list&market=us`;
      const listResp = await fetch(listUrl);
      const listData = await listResp.json();

      if (listData.error || !listData.results) {
        dom.screenerResults.innerHTML = `<div class="empty-state"><p>获取股票列表失败</p></div>`;
        return;
      }

      let stocks = listData.results;

      // Apply filters based on condition
      let filtered = [];

      if (condition === 'pe_below') {
        const threshold = parseFloat(value) || 20;
        // PE filter: need to fetch individual quotes for PE
        // Batch fetch — only top 100 by volume for speed
        stocks.sort((a, b) => (b.volume || 0) - (a.volume || 0));
        const topStocks = stocks.slice(0, 100);
        for (const s of topStocks) {
          try {
            const qUrl = `${API_BASE}/?action=quote&ticker=${encodeURIComponent(s.code)}&market=us`;
            const qResp = await fetch(qUrl);
            const qData = await qResp.json();
            if (qData.pe && qData.pe > 0 && qData.pe < threshold) {
              filtered.push({
                code: s.code,
                name: qData.name || s.name,
                price: qData.price,
                change_pct: qData.change_pct,
                pe: qData.pe,
                volume: qData.volume,
              });
            }
          } catch { /* skip */ }
        }
      } else if (condition === 'consecutive_up' || condition === 'consecutive_down') {
        const daysN = parseInt(days) || 5;
        // Fetch K-lines for top stocks and check consecutive direction
        stocks.sort((a, b) => (b.volume || 0) - (a.volume || 0));
        const topStocks = stocks.slice(0, 50); // Limit for speed

        const results = await Promise.allSettled(
          topStocks.map(async (s) => {
            const kUrl = `${API_BASE}/?action=kline&ticker=${encodeURIComponent(s.code)}&market=us&interval=1d&range=1mo`;
            const kResp = await fetch(kUrl);
            const kData = await kResp.json();
            const klines = kData.data || [];
            if (klines.length < daysN + 1) return null;

            let consecutive = 1;
            for (let i = klines.length - 1; i > klines.length - 1 - daysN; i--) {
              const curr = klines[i].close;
              const prev = klines[i - 1].close;
              if (condition === 'consecutive_up' && curr > prev) consecutive++;
              else if (condition === 'consecutive_down' && curr < prev) consecutive++;
              else break;
            }

            if (consecutive > daysN) {
              const last = klines[klines.length - 1];
              const prev = klines[klines.length - 2];
              return {
                code: s.code,
                name: s.name,
                price: last.close,
                change_pct: prev ? ((last.close - prev.close) / prev.close * 100) : 0,
                consecutive,
              };
            }
            return null;
          })
        );

        filtered = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
      } else if (condition === 'change_above') {
        const threshold = parseFloat(value) || 3;
        // Filter from list data (which has change_pct)
        filtered = stocks
          .filter(s => s.change_pct != null && s.change_pct > threshold)
          .slice(0, 50)
          .map(s => ({
            code: s.code,
            name: s.name,
            price: s.price,
            change_pct: s.change_pct,
            volume: s.volume,
          }));
      } else if (condition === 'new_high') {
        const daysN = parseInt(days) || 20;
        stocks.sort((a, b) => (b.volume || 0) - (a.volume || 0));
        const topStocks = stocks.slice(0, 50);

        const results = await Promise.allSettled(
          topStocks.map(async (s) => {
            const kUrl = `${API_BASE}/?action=kline&ticker=${encodeURIComponent(s.code)}&market=us&interval=1d&range=3mo`;
            const kResp = await fetch(kUrl);
            const kData = await kResp.json();
            const klines = kData.data || [];
            if (klines.length < daysN + 1) return null;

            const recent = klines.slice(-daysN - 1, -1);
            const highest = Math.max(...recent.map(k => k.high));
            const last = klines[klines.length - 1];

            if (last.close > highest) {
              const prev = klines[klines.length - 2];
              return {
                code: s.code,
                name: s.name,
                price: last.close,
                change_pct: prev ? ((last.close - prev.close) / prev.close * 100) : 0,
                volume: last.volume,
              };
            }
            return null;
          })
        );

        filtered = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
      }

      renderScreenerResults(filtered, condition);

    } catch (e) {
      console.error('Screener error:', e);
      dom.screenerResults.innerHTML = '<div class="empty-state"><p>筛选失败，请稍后重试</p></div>';
    }
  }

  function renderScreenerResults(stocks, condition) {
    if (!stocks || stocks.length === 0) {
      dom.screenerResults.innerHTML = '<div class="empty-state"><p>没有找到符合条件的股票</p></div>';
      return;
    }

    const headers = ['代码', '名称', '价格', '涨跌幅', '成交量'];
    if (condition === 'pe_below') headers.push('PE');
    if (condition === 'consecutive_up' || condition === 'consecutive_down') headers.push('连续天数');

    let html = '<table class="screener-table"><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    for (const s of stocks) {
      const sign = s.change_pct >= 0 ? '+' : '';
      const cls = s.change_pct > 0 ? 'up' : s.change_pct < 0 ? 'down' : '';

      html += `<tr>
        <td class="code-cell" data-code="${s.code}" data-market="us">${s.code}</td>
        <td>${escapeHtml(s.name)}</td>
        <td>${s.price != null ? formatNum(s.price) : '—'}</td>
        <td class="${cls}">${s.change_pct != null ? sign + s.change_pct.toFixed(2) + '%' : '—'}</td>
        <td>${s.volume != null ? formatVolume(s.volume) : '—'}</td>`;

      if (condition === 'pe_below' && s.pe) {
        html += `<td>${s.pe.toFixed(2)}</td>`;
      }
      if ((condition === 'consecutive_up' || condition === 'consecutive_down') && s.consecutive) {
        html += `<td class="${condition === 'consecutive_up' ? 'up' : 'down'}">${s.consecutive} 天</td>`;
      }

      html += '</tr>';
    }

    html += '</tbody></table>';
    dom.screenerResults.innerHTML = html;

    // Bind click on code cells
    dom.screenerResults.querySelectorAll('.code-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        loadQuote(cell.dataset.code, cell.dataset.market);
      });
    });
  }

  function updateScreenerVisibility() {
    dom.screenerSection.style.display = currentMarket === 'us' ? 'block' : 'none';
  }

  // ─── Helpers ───────────────────────────────────────────
  function formatNum(n) {
    if (n == null || isNaN(n)) return '—';
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatVolume(v) {
    if (!v || isNaN(v)) return '—';
    if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return (v / 1e3).toFixed(2) + 'K';
    return v.toFixed(0);
  }

  function formatMarketCap(v, currency) {
    if (!v || isNaN(v)) return '—';
    // Value is already in 亿 (100 million)
    if (currency === 'HKD') {
      if (v >= 10000) return (v / 10000).toFixed(2) + '万亿';
      return v.toFixed(2) + '亿';
    } else {
      if (v >= 10000) return '$' + (v / 10000).toFixed(2) + '万亿';
      return '$' + v.toFixed(2) + '亿';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function clearQuoteRefresh() {
    if (quoteRefreshTimer) {
      clearInterval(quoteRefreshTimer);
      quoteRefreshTimer = null;
    }
  }

  return { init };
})();

// Initialize
document.addEventListener('DOMContentLoaded', StockApp.init);
