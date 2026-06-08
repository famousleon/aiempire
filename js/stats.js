// ==========================================
// AI Empire - Statistics & Achievements
// ==========================================

const StatsManager = (() => {
  const STORAGE_KEY = 'aiempire_stats';

  const defaultStats = {
    totalCompleted: 0,
    streak: 0,
    bestStreak: 0,
    proofsSubmitted: 0,
    lastActiveDate: null,
    categoriesCompleted: new Set(),
    newsTasksCompleted: 0,
    weeklyCompletion: {},
  };

  let stats = {};

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      stats = {
        ...defaultStats,
        ...data,
        categoriesCompleted: new Set(data.categoriesCompleted || []),
      };
    } else {
      stats = {
        ...defaultStats,
        categoriesCompleted: new Set(),
      };
    }

    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (stats.lastActiveDate === today) {
      // Already active today, streak unchanged
    } else if (stats.lastActiveDate === yesterday) {
      // Continue streak
    } else if (stats.lastActiveDate) {
      // Streak broken
      stats.streak = 0;
    }
  }

  function recordCompletion(category) {
    const today = new Date().toDateString();
    const todayKey = new Date().toISOString().split('T')[0];

    // Update total
    stats.totalCompleted++;

    // Update streak
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (stats.lastActiveDate === yesterday || !stats.lastActiveDate) {
        stats.streak++;
      } else {
        stats.streak = 1;
      }
      stats.lastActiveDate = today;
    }

    // Update best streak
    if (stats.streak > stats.bestStreak) {
      stats.bestStreak = stats.streak;
    }

    // Update category
    stats.categoriesCompleted.add(category);

    // Update weekly chart
    if (!stats.weeklyCompletion[todayKey]) {
      stats.weeklyCompletion[todayKey] = 0;
    }
    stats.weeklyCompletion[todayKey]++;

    save();
  }

  function recordNewsCompletion() {
    stats.newsTasksCompleted++;
    save();
  }

  function recordProof() {
    stats.proofsSubmitted++;
    save();
  }

  function getStats() {
    return {
      totalCompleted: stats.totalCompleted,
      streak: stats.streak,
      bestStreak: stats.bestStreak,
      proofsSubmitted: stats.proofsSubmitted,
      categoriesCompleted: stats.categoriesCompleted,
      newsTasksCompleted: stats.newsTasksCompleted,
    };
  }

  function getWeeklyData() {
    const weekData = [];
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const key = date.toISOString().split('T')[0];
      weekData.push({
        day: '周' + dayNames[date.getDay()],
        count: stats.weeklyCompletion[key] || 0,
        isToday: i === 0,
      });
    }

    return weekData;
  }

  function checkAchievements() {
    const s = getStats();
    const achievements = [];

    // First task
    if (s.totalCompleted >= 1) achievements.push('first-task');
    // 3-day streak
    if (s.streak >= 3) achievements.push('streak-3');
    // 7-day streak
    if (s.streak >= 7) achievements.push('streak-7');
    // 5 proofs
    if (s.proofsSubmitted >= 5) achievements.push('proof-5');
    // All categories
    if (s.categoriesCompleted.size >= 4) achievements.push('all-cats');
    // News task
    if (s.newsTasksCompleted >= 1) achievements.push('news-1');

    return achievements;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...stats,
      categoriesCompleted: Array.from(stats.categoriesCompleted),
    }));
  }

  init();

  return {
    recordCompletion,
    recordNewsCompletion,
    recordProof,
    getStats,
    getWeeklyData,
    checkAchievements,
  };
})();
