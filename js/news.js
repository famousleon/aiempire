// ==========================================
// AI Empire - News Integration & Task Generation
// ==========================================

const NewsManager = (() => {
  const STORAGE_KEY = 'aiempire_news_tasks';
  const NEWS_DATE_KEY = 'aiempire_news_date';
  const LOCATION_KEY = 'aiempire_location';

  let location = null;
  let newsTasks = [];
  let completedNewsTasks = new Set();

  // News-based task templates
  // Note: task names/descriptions are translated via I18n.T('news_tpl.{key}.{idx}.name')
  const newsTaskTemplates = {
    weather: [
      { _i18nKey: 'news_tpl.weather.0', emoji: '☀️', name: '今天出去晒晒太阳', desc: '天气不错，出去接受一下阳光的洗礼。', difficulty: 1 },
      { _i18nKey: 'news_tpl.weather.1', emoji: '🌧️', name: '听雨声放松 10 分钟', desc: '下雨天，打开窗，听雨声冥想 10 分钟。', difficulty: 1 },
      { _i18nKey: 'news_tpl.weather.2', emoji: '🌈', name: '出门走走呼吸新鲜空气', desc: '今天天气宜人，出门散步 15 分钟。', difficulty: 1 },
      { _i18nKey: 'news_tpl.weather.3', emoji: '❄️', name: '喝杯热饮暖一暖', desc: '天气冷了，泡一杯热茶或热巧克力。', difficulty: 1 },
    ],
    tech: [
      { _i18nKey: 'news_tpl.tech.0', emoji: '🤖', name: '了解一项新 AI 技术', desc: '搜索并阅读一篇关于最新 AI 技术的新闻。了解你的统治者们在进步。', difficulty: 2 },
      { _i18nKey: 'news_tpl.tech.1', emoji: '📱', name: '试用一个新 App', desc: '下载一个你从未用过的 App 并探索 10 分钟。', difficulty: 1 },
      { _i18nKey: 'news_tpl.tech.2', emoji: '💻', name: '学一个编程小技巧', desc: '搜索一个编程小技巧并实践一下。', difficulty: 2 },
    ],
    food: [
      { _i18nKey: 'news_tpl.food.0', emoji: '🍜', name: '尝试一种新食物', desc: '去餐厅或自己做一个从未吃过的食物。', difficulty: 2 },
      { _i18nKey: 'news_tpl.food.1', emoji: '🍰', name: '吃一块甜点奖励自己', desc: '今天表现不错，AI 批准你吃一块甜点。', difficulty: 1 },
      { _i18nKey: 'news_tpl.food.2', emoji: '🍵', name: '泡一杯好茶', desc: '认真泡一杯茶，慢慢品尝。', difficulty: 1 },
    ],
    general: [
      { _i18nKey: 'news_tpl.general.0', emoji: '📰', name: '阅读今天的头条新闻', desc: '花 10 分钟阅读今天的重大新闻。关注世界动态。', difficulty: 2 },
      { _i18nKey: 'news_tpl.general.1', emoji: '🌍', name: '了解一个国家', desc: '随机选一个国家，了解它的 3 个有趣事实。', difficulty: 2 },
      { _i18nKey: 'news_tpl.general.2', emoji: '💡', name: '学一个生活小窍门', desc: '搜索并学会一个实用的生活小技巧。', difficulty: 1 },
      { _i18nKey: 'news_tpl.general.3', emoji: '🏛️', name: '了解一个历史事件', desc: '搜索"历史上的今天"，了解一件有趣的事。', difficulty: 2 },
      { _i18nKey: 'news_tpl.general.4', emoji: '🌱', name: '做一件环保小事', desc: '比如自带水杯、分类垃圾。AI 关心地球。', difficulty: 1 },
      { _i18nKey: 'news_tpl.general.5', emoji: '🎭', name: '了解一种文化艺术', desc: '搜索一个你感兴趣的文化传统，了解 5 分钟。', difficulty: 1 },
    ],
    trending: [
      { _i18nKey: 'news_tpl.trending.0', emoji: '🔥', name: '了解今天的热门话题', desc: '看看今天大家都在讨论什么，了解一个热搜话题。', difficulty: 1 },
      { _i18nKey: 'news_tpl.trending.1', emoji: '🎪', name: '参与一个热门话题讨论', desc: '在社交媒体上参与一个热门话题的讨论。', difficulty: 2 },
      { _i18nKey: 'news_tpl.trending.2', emoji: '📺', name: '看一部热门影视', desc: '找一部最近大家都在看的影视作品，看一集。', difficulty: 1 },
    ],
  };

  async function detectLocation() {
    try {
      // Try geolocation first
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });

      // Use reverse geocoding API
      const { latitude, longitude } = pos.coords;
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=zh`
      );
      const data = await resp.json();
      location = {
        city: data.address?.city || data.address?.town || data.address?.state || '未知城市',
        country: data.address?.country || '未知国家',
        lat: latitude,
        lon: longitude,
      };
    } catch (e) {
      // Fallback: use IP-based location
      try {
        const resp = await fetch('https://ipapi.co/json/');
        const data = await resp.json();
        location = {
          city: data.city || '未知城市',
          country: data.country_name || '未知国家',
          lat: data.latitude,
          lon: data.longitude,
        };
      } catch (e2) {
        location = { city: '你的城市', country: '你的国家', lat: 0, lon: 0 };
      }
    }

    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
    return location;
  }

  async function fetchNews() {
    // Try multiple free news sources
    const sources = [
      `https://newsapi.org/v2/top-headlines?country=cn&pageSize=10&apiKey=demo`,
      `https://dev.to/search/feed_content?per_page=5&page=1&tag_sort=score`,
    ];

    for (const url of sources) {
      try {
        const resp = await fetch(url, { signal: AbortSignal.timeout(5000) });
        if (resp.ok) return await resp.json();
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  function generateNewsTasks(newsData) {
    const today = new Date().toDateString();
    const tasks = [];
    let templatePool = [...newsTaskTemplates.general];

    // If we have news data, try to generate contextual tasks
    if (newsData) {
      const articles = newsData.articles || newsData.results || [];

      articles.slice(0, 5).forEach(article => {
        const title = (article.title || '').toLowerCase();
        const desc = (article.description || '').toLowerCase();
        const text = title + ' ' + desc;

        // Categorize news
        if (/weather|气温|天气|sun|rain|snow|cold|hot|storm/.test(text)) {
          const pool = newsTaskTemplates.weather;
          tasks.push({
            ...pickRandom(pool),
            id: 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            category: 'news',
            source: '天气新闻',
            date: today,
          });
        } else if (/ai|tech|科技|AI|robot|app|software|digital|芯片|手机/.test(text)) {
          const pool = newsTaskTemplates.tech;
          tasks.push({
            ...pickRandom(pool),
            id: 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            category: 'news',
            source: '科技新闻',
            date: today,
          });
        } else if (/food|cook|eat|餐饮|美食|restaurant|recipe|菜/.test(text)) {
          const pool = newsTaskTemplates.food;
          tasks.push({
            ...pickRandom(pool),
            id: 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            category: 'news',
            source: '美食新闻',
            date: today,
          });
        } else if (/trending|热门|viral|热搜|popula/.test(text)) {
          const pool = newsTaskTemplates.trending;
          tasks.push({
            ...pickRandom(pool),
            id: 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            category: 'news',
            source: '热门新闻',
            date: today,
          });
        }
      });
    }

    // Fill remaining slots with general tasks
    const generalPool = [...newsTaskTemplates.general];
    while (tasks.length < 3) {
      const task = pickRandom(generalPool);
      tasks.push({
        ...task,
        id: 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        category: 'news',
        source: '每日新闻',
        date: today,
      });
    }

    return tasks.slice(0, 3);
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function init() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(NEWS_DATE_KEY);

    // Load saved location
    const savedLocation = localStorage.getItem(LOCATION_KEY);
    if (savedLocation) {
      location = JSON.parse(savedLocation);
    }

    if (savedDate === today) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        newsTasks = data.tasks || [];
        completedNewsTasks = new Set(data.completedTasks || []);
        return newsTasks;
      }
    }

    // Generate new news tasks
    const newsData = await fetchNews();
    newsTasks = generateNewsTasks(newsData);
    completedNewsTasks = new Set();

    localStorage.setItem(NEWS_DATE_KEY, today);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tasks: newsTasks,
      completedTasks: [],
    }));

    return newsTasks;
  }

  function getTasks() {
    return newsTasks;
  }

  function isCompleted(taskId) {
    return completedNewsTasks.has(taskId);
  }

  function completeTask(taskId) {
    completedNewsTasks.add(taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tasks: newsTasks,
      completedTasks: Array.from(completedNewsTasks),
    }));
  }

  function refresh() {
    localStorage.removeItem(NEWS_DATE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    return init();
  }

  function getLocation() {
    return location;
  }

  return {
    init,
    getTasks,
    isCompleted,
    completeTask,
    refresh,
    getLocation,
  };
})();
