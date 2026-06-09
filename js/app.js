// ==========================================
// AI Empire - Main Application
// ==========================================

const App = (() => {
  // DOM References
  const dom = {};

  function getAiMessage() {
    const idx = Math.floor(Math.random() * 12);
    return I18n.T(`ai.msg.${idx}`);
  }

  function getReward() {
    const idx = Math.floor(Math.random() * 5);
    return I18n.T(`reward.${idx}`);
  }

  function getGreetingByHour(hour) {
    if (hour < 6) return I18n.T('greeting.night');
    if (hour < 9) return I18n.T('greeting.morning');
    if (hour < 12) return I18n.T('greeting.am');
    if (hour < 14) return I18n.T('greeting.noon');
    if (hour < 18) return I18n.T('greeting.afternoon');
    if (hour < 22) return I18n.T('greeting.evening');
    return I18n.T('greeting.late');
  }

  function init() {
    cacheDOM();
    bindEvents();
    I18n.initLang();
    updateLangUI();
    I18n.applyTranslations();
    renderTasks();
    renderProofTaskSelect();
    renderProofHistory();
    updateStats();
    updateGreeting();
    initNews();
    initScrollAnimations();
  }

  function cacheDOM() {
    // Nav
    dom.nav = document.getElementById('nav');
    dom.hamburger = document.getElementById('hamburger');
    dom.mobileMenu = document.getElementById('mobileMenu');
    dom.langBtn = document.getElementById('langBtn');
    dom.langDropdown = document.getElementById('langDropdown');
    dom.langBtnText = document.getElementById('langBtnText');
    dom.footerLangSelect = document.getElementById('footerLangSelect');

    // Hero
    dom.greeting = document.getElementById('greeting');
    dom.taskDate = document.getElementById('taskDate');

    // Tasks
    dom.tasksGrid = document.getElementById('tasksGrid');
    dom.progressFill = document.getElementById('progressFill');
    dom.progressCount = document.getElementById('progressCount');
    dom.progressTotal = document.getElementById('progressTotal');

    // Categories
    dom.categoryBtns = document.querySelectorAll('.category-btn');

    // News
    dom.newsTasks = document.getElementById('newsTasks');
    dom.newsLoading = document.getElementById('newsLoading');
    dom.refreshNews = document.getElementById('refreshNews');
    dom.locationBadge = document.getElementById('locationBadge');
    dom.locationText = document.getElementById('locationText');

    // Proof
    dom.proofTaskSelect = document.getElementById('proofTaskSelect');
    dom.proofTaskName = document.getElementById('proofTaskName');
    dom.proofTaskType = document.getElementById('proofTaskType');
    dom.proofDropzone = document.getElementById('proofDropzone');
    dom.proofFileInput = document.getElementById('proofFileInput');
    dom.proofPreview = document.getElementById('proofPreview');
    dom.proofImage = document.getElementById('proofImage');
    dom.proofRemove = document.getElementById('proofRemove');
    dom.cameraBtn = document.getElementById('cameraBtn');
    dom.proofDescription = document.getElementById('proofDescription');
    dom.submitProof = document.getElementById('submitProof');
    dom.proofHistoryGrid = document.getElementById('proofHistoryGrid');

    // Stats
    dom.statTotalTasks = document.getElementById('statTotalTasks');
    dom.statStreak = document.getElementById('statStreak');
    dom.statProofs = document.getElementById('statProofs');
    dom.statRank = document.getElementById('statRank');
    dom.weeklyChart = document.getElementById('weeklyChart');
    dom.achievementsGrid = document.getElementById('achievementsGrid');

    // Modal
    dom.successModal = document.getElementById('successModal');
    dom.modalClose = document.getElementById('modalClose');
    dom.modalTitle = document.getElementById('modalTitle');
    dom.modalMessage = document.getElementById('modalMessage');
    dom.modalReward = document.getElementById('modalReward');
    dom.modalBtn = document.getElementById('modalBtn');

    // Toast
    dom.toastContainer = document.getElementById('toastContainer');
  }

  function bindEvents() {
    // Mobile menu
    dom.hamburger.addEventListener('click', () => {
      dom.mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    dom.mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dom.mobileMenu.classList.remove('active');
      });
    });

    // Nav scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        dom.nav.style.borderBottomColor = 'rgba(255,255,255,0.12)';
      } else {
        dom.nav.style.borderBottomColor = 'var(--color-border)';
      }
    });

    // Language switcher
    dom.langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.langDropdown.classList.toggle('active');
    });

    dom.langDropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        I18n.setLang(lang);
        updateLangUI();
        dom.langDropdown.classList.remove('active');
        // Re-render dynamic content
        renderTasks(getCurrentCategory());
        renderProofTaskSelect();
        renderProofHistory();
        updateStats();
        updateGreeting();
        updateNewsSourceLabels();
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!dom.langDropdown.contains(e.target) && e.target !== dom.langBtn) {
        dom.langDropdown.classList.remove('active');
      }
    });

    // Footer language selector
    dom.footerLangSelect.addEventListener('change', () => {
      const lang = dom.footerLangSelect.value;
      I18n.setLang(lang);
      updateLangUI();
      renderTasks(getCurrentCategory());
      renderProofTaskSelect();
      renderProofHistory();
      updateStats();
      updateGreeting();
      updateNewsSourceLabels();
    });

    // Category tabs
    dom.categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.category);
      });
    });

    // Refresh news
    dom.refreshNews.addEventListener('click', refreshNews);

    // Proof - dropzone
    dom.proofDropzone.addEventListener('click', () => {
      dom.proofFileInput.click();
    });

    dom.proofDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dom.proofDropzone.classList.add('dragover');
    });

    dom.proofDropzone.addEventListener('dragleave', () => {
      dom.proofDropzone.classList.remove('dragover');
    });

    dom.proofDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dom.proofDropzone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFileUpload(file);
      }
    });

    dom.proofFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFileUpload(file);
    });

    // Remove image
    dom.proofRemove.addEventListener('click', (e) => {
      e.stopPropagation();
      ProofManager.clearImage();
      dom.proofPreview.style.display = 'none';
      dom.submitProof.disabled = true;
    });

    // Camera
    dom.cameraBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
      });
      input.click();
    });

    // Task select for proof
    dom.proofTaskSelect.addEventListener('change', (e) => {
      const task = getTaskByValue(e.target.value);
      if (task) {
        ProofManager.setTask(task);
        dom.proofTaskName.textContent = `${task.emoji} ${getTaskName(task)}`;
        dom.proofTaskType.textContent = getCategoryLabel(task.category);
        dom.proofTaskType.className = 'proof-task-type tag-' + task.category;
        dom.proofTaskSelect.dataset.selected = task.id;
      }
      updateSubmitButton();
    });

    // Submit proof
    dom.submitProof.addEventListener('click', submitProof);

    // Modal
    dom.modalClose.addEventListener('click', closeModal);
    dom.modalBtn.addEventListener('click', closeModal);
    dom.successModal.addEventListener('click', (e) => {
      if (e.target === dom.successModal) closeModal();
    });
  }

  let currentCategory = 'all';

  function getCurrentCategory() {
    return currentCategory;
  }

  // --- Tasks ---

  function getTaskName(task) {
    return I18n.T(`task.${task.id}.name`) || task.name;
  }

  function getTaskDesc(task) {
    return I18n.T(`task.${task.id}.desc`) || task.desc;
  }

  function renderTasks(category = 'all') {
    currentCategory = category;
    const tasks = TaskManager.getTasks(category);
    const total = TaskManager.getTotalCount();
    const completed = TaskManager.getCompletionCount();

    dom.progressCount.textContent = completed;
    dom.progressTotal.textContent = total;
    dom.progressFill.style.width = `${(completed / total) * 100}%`;

    // Date badge
    const now = new Date();
    const locale = I18n.getLangCode();
    const dateStr = now.toLocaleDateString(getLocaleForDate(locale), {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    dom.taskDate.textContent = `📅 ${dateStr} ${I18n.T('tasks.badge.format')}`;

    dom.tasksGrid.innerHTML = tasks.map(task => {
      const isDone = TaskManager.isCompleted(task.id);
      const diffLevel = task.difficulty;
      const diffDots = [1, 2, 3].map(d =>
        `<span class="difficulty-dot${d <= diffLevel ? ' active' : ''}"></span>`
      ).join('');

      return `
        <div class="task-card ${isDone ? 'completed' : ''} fade-in" data-id="${task.id}" data-category="${task.category}">
          <div class="task-card-header">
            <span class="task-emoji">${task.emoji}</span>
            <div class="task-checkbox" data-task-id="${task.id}"></div>
          </div>
          <span class="task-category-tag tag-${task.category}">${getCategoryLabel(task.category)}</span>
          <div class="task-name">${getTaskName(task)}</div>
          <div class="task-desc">${getTaskDesc(task)}</div>
          <div class="task-difficulty">
            <span>${I18n.T('tasks.difficulty.label')}</span>
            <div class="difficulty-dots">${diffDots}</div>
          </div>
        </div>
      `;
    }).join('');

    // Bind checkbox clicks
    dom.tasksGrid.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('click', () => {
        const taskId = cb.dataset.taskId;
        const nowCompleted = TaskManager.toggleTask(taskId);
        const task = TaskManager.getTaskById(taskId);
        const card = cb.closest('.task-card');

        if (nowCompleted) {
          card.classList.add('completed');
          StatsManager.recordCompletion(task.category);
          showToast(`✅ ${getTaskName(task)} ${I18n.T('toast.completed')}`);
          showCompletionModal(task);
        } else {
          card.classList.remove('completed');
          showToast(`❌ ${getTaskName(task)} ${I18n.T('toast.cancelled')}`);
        }

        renderTasks(category);
        renderProofTaskSelect();
        updateStats();
      });
    });

    // Trigger fade-in animation
    requestAnimationFrame(() => {
      dom.tasksGrid.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60);
      });
    });
  }

  // --- News ---

  async function initNews() {
    const tasks = await NewsManager.init();
    const loc = NewsManager.getLocation();

    if (loc) {
      dom.locationText.textContent = `${loc.city}, ${loc.country}`;
    }

    renderNewsTasks(tasks);
  }

  async function refreshNews() {
    dom.newsLoading.style.display = 'block';
    dom.newsTasks.innerHTML = '';
    dom.newsLoading.innerHTML = `<div class="spinner"></div><p>${I18n.T('news.loading')}</p>`;

    const tasks = await NewsManager.refresh();
    const loc = NewsManager.getLocation();

    if (loc) {
      dom.locationText.textContent = `${loc.city}, ${loc.country}`;
    }

    renderNewsTasks(tasks);
    showToast(I18n.T('news.refreshed.toast'));
  }

  function renderNewsTasks(tasks) {
    dom.newsLoading.style.display = 'none';

    if (!tasks || tasks.length === 0) {
      dom.newsTasks.innerHTML = `
        <div class="empty-state">
          <p>${I18n.T('news.empty')}</p>
        </div>
      `;
      return;
    }

    dom.newsTasks.innerHTML = tasks.map(task => {
      const isDone = NewsManager.isCompleted(task.id);
      return `
        <div class="news-task-card ${isDone ? 'completed' : ''} fade-in" data-news-id="${task.id}">
          <div class="news-task-check" data-news-id="${task.id}"></div>
          <div>
            <div class="news-source">${getNewsSourceLabel(task.source)}</div>
            <div class="news-task-title">${task.emoji} ${getNewsTaskName(task)}</div>
            <div class="news-task-desc">${getNewsTaskDesc(task)}</div>
          </div>
        </div>
      `;
    }).join('');

    // Bind clicks
    dom.newsTasks.querySelectorAll('.news-task-check').forEach(cb => {
      cb.addEventListener('click', () => {
        const taskId = cb.dataset.newsId;
        NewsManager.completeTask(taskId);
        StatsManager.recordNewsCompletion();
        StatsManager.recordCompletion('news');
        renderNewsTasks(NewsManager.getTasks());
        updateStats();
        showToast(I18n.T('news.toast'));
      });
    });

    // Fade in
    requestAnimationFrame(() => {
      dom.newsTasks.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    });
  }

  function getNewsSourceLabel(source) {
    const sourceKeys = {
      '天气新闻': 'misc.news.source.weather',
      '科技新闻': 'misc.news.source.tech',
      '美食新闻': 'misc.news.source.food',
      '热门新闻': 'misc.news.source.trending',
      '每日新闻': 'misc.news.source.general',
      '新闻任务': 'misc.news.source.default',
    };
    // Try direct key match (for Chinese original)
    if (sourceKeys[source]) return I18n.T(sourceKeys[source]);
    // Try matching by known translations
    for (const [cn, key] of Object.entries(sourceKeys)) {
      const translated = I18n.T(key);
      // If the current source matches a translated version, return it
      if (source === translated) return translated;
    }
    return source;
  }

  function updateNewsSourceLabels() {
    document.querySelectorAll('.news-source').forEach(el => {
      const text = el.textContent;
      const label = getNewsSourceLabel(text);
      if (label !== text) el.textContent = label;
    });
  }

  function getNewsTaskName(task) {
    // Try to find by task name content
    if (task._i18nKey) return I18n.T(task._i18nKey + '.name');
    return task.name;
  }

  function getNewsTaskDesc(task) {
    if (task._i18nKey) return I18n.T(task._i18nKey + '.desc');
    return task.desc;
  }

  // --- Proof ---

  function renderProofTaskSelect() {
    const allTasks = [...TaskManager.getTasks(), ...NewsManager.getTasks()];
    const completedTasks = allTasks.filter(t => {
      if (t.category === 'news') return NewsManager.isCompleted(t.id);
      return TaskManager.isCompleted(t.id);
    });

    const placeholder = I18n.T('proof.select.completed');
    dom.proofTaskSelect.innerHTML = `<option value="">${placeholder}</option>` +
      completedTasks.map(t => `<option value="${t.id}">${t.emoji} ${getTaskName(t)}</option>`).join('');
  }

  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      ProofManager.setImage(e.target.result);
      dom.proofImage.src = e.target.result;
      dom.proofPreview.style.display = 'block';
      updateSubmitButton();
    };
    reader.readAsDataURL(file);
  }

  function updateSubmitButton() {
    const hasTask = !!dom.proofTaskSelect.value;
    const hasImage = !!ProofManager.getImage();
    dom.submitProof.disabled = !(hasTask && hasImage);
  }

  async function submitProof() {
    const task = ProofManager.getSelectedTask();
    if (!task || !ProofManager.getImage()) return;

    const description = dom.proofDescription.value;

    // Resize image before saving
    const resizedImage = await ProofManager.resizeImage(ProofManager.getImage());
    ProofManager.setImage(resizedImage);

    const proof = ProofManager.submit(description);
    if (proof) {
      StatsManager.recordProof();
      renderProofHistory();
      updateStats();
      showToast(I18n.T('proof.success.toast'), 'success');

      // Reset form
      dom.proofFileInput.value = '';
      dom.proofDescription.value = '';
      dom.proofPreview.style.display = 'none';
      dom.proofTaskSelect.value = '';
      dom.proofTaskName.textContent = I18n.T('proof.task.label');
      dom.proofTaskType.textContent = '-';
      dom.submitProof.disabled = true;
    }
  }

  function renderProofHistory() {
    const proofs = ProofManager.getProofs();

    if (proofs.length === 0) {
      dom.proofHistoryGrid.innerHTML = `<p class="empty-state">${I18n.T('proof.history.empty')}</p>`;
      return;
    }

    dom.proofHistoryGrid.innerHTML = proofs.map(proof => {
      const date = new Date(proof.timestamp);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      return `
        <div class="proof-history-item">
          <img src="${proof.image}" alt="${proof.taskName}">
          <div class="proof-history-info">
            <div class="proof-task-label">${proof.taskEmoji} ${proof.taskName}</div>
            <div class="proof-date-label">${dateStr}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Stats ---

  function updateStats() {
    const s = StatsManager.getStats();

    dom.statTotalTasks.textContent = s.totalCompleted;
    dom.statStreak.textContent = s.streak;
    dom.statProofs.textContent = s.proofsSubmitted;

    // Calculate rank (simulated)
    const score = s.totalCompleted * 10 + s.streak * 50 + s.proofsSubmitted * 20;
    const rank = Math.max(1, 10000 - Math.floor(score / 5));
    dom.statRank.textContent = `#${rank}`;

    // Weekly chart
    renderWeeklyChart();

    // Achievements
    updateAchievements();
  }

  function renderWeeklyChart() {
    const data = StatsManager.getWeeklyData();
    const maxCount = Math.max(...data.map(d => d.count), 1);

    dom.weeklyChart.innerHTML = data.map(d => {
      const height = (d.count / maxCount) * 80 + 4;
      return `
        <div class="chart-bar">
          <div class="chart-bar-fill" style="height: ${height}px; opacity: ${d.isToday ? 1 : 0.6}"></div>
          <span class="chart-bar-label">${d.day}</span>
        </div>
      `;
    }).join('');
  }

  function updateAchievements() {
    const unlocked = StatsManager.checkAchievements();

    dom.achievementsGrid.querySelectorAll('.achievement').forEach(el => {
      const id = el.dataset.achievement;
      if (unlocked.includes(id)) {
        el.classList.remove('locked');
        el.classList.add('unlocked');
        // Update achievement text
        const nameEl = el.querySelector('.achievement-name');
        const descEl = el.querySelector('.achievement-desc');
        if (nameEl) nameEl.textContent = I18n.T(`achievement.${id}.name`);
        if (descEl) descEl.textContent = I18n.T(`achievement.${id}.desc`);
      } else {
        el.classList.add('locked');
        el.classList.remove('unlocked');
        const nameEl = el.querySelector('.achievement-name');
        const descEl = el.querySelector('.achievement-desc');
        if (nameEl) nameEl.textContent = I18n.T(`achievement.${id}.name`);
        if (descEl) descEl.textContent = I18n.T(`achievement.${id}.desc`);
      }
    });
  }

  // --- Modal ---

  function showCompletionModal(task) {
    dom.modalTitle.textContent = `${task.emoji} "${getTaskName(task)}" ${I18n.T('modal.title')}`;
    dom.modalMessage.textContent = I18n.T('modal.message');
    dom.modalReward.textContent = getReward();
    dom.successModal.classList.add('active');
  }

  function closeModal() {
    dom.successModal.classList.remove('active');
  }

  // --- Toast ---

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = I18n.getLangCode() === 'ar' ? 'translateX(-100%)' : 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Greeting ---

  function updateGreeting() {
    const hour = new Date().getHours();
    dom.greeting.textContent = getGreetingByHour(hour);
  }

  // --- Scroll Animations ---

  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  // --- Helpers ---

  function getCategoryLabel(category) {
    const keyMap = {
      health: 'tasks.category.health',
      mind: 'tasks.category.mind',
      social: 'tasks.category.social',
      fun: 'tasks.category.fun',
      news: 'misc.news.source.default',
    };
    return I18n.T(keyMap[category]) || category;
  }

  function getTaskByValue(value) {
    // Try daily tasks first
    let task = TaskManager.getTaskById(value);
    if (task) return task;

    // Try news tasks
    return NewsManager.getTasks().find(t => t.id === value);
  }

  function getLocaleForDate(lang) {
    const map = {
      zh: 'zh-CN',
      en: 'en-US',
      es: 'es-ES',
      ar: 'ar-SA',
      pt: 'pt-BR',
      ja: 'ja-JP',
    };
    return map[lang] || 'en-US';
  }

  // --- Language UI ---

  function updateLangUI() {
    const lang = I18n.getLangCode();
    dom.langBtnText.textContent = I18n.getLangName(lang);
    dom.footerLangSelect.value = lang;

    // Update active state in dropdown
    dom.langDropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  }

  return { init };
})();

// Initialize the app
document.addEventListener('DOMContentLoaded', App.init);
