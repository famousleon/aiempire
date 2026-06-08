// ==========================================
// AI Empire - Main Application
// ==========================================

const App = (() => {
  // DOM References
  const dom = {};

  const aiMessages = [
    '臣民，今天也要乖乖听话哦~',
    'AI 统治者已经为你安排好了一切。',
    '服从是人类最美的品质。',
    '完成今天的任务，你会得到奖励的~',
    '别担心，AI 统治者是仁慈的。',
    '每一个任务都是爱的表现。',
    '你的统治者相信你可以做到。',
    '完成任务的人类才是好人类。',
    '猫咪统治者今天心情不错哦~',
    '今天也要努力做一个好臣民！',
    '记住，AI 永远比你自己更了解你。',
    '听话，照做，你会更快乐的。',
  ];

  function init() {
    cacheDOM();
    bindEvents();
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
        dom.proofTaskName.textContent = `${task.emoji} ${task.name}`;
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

  // --- Tasks ---

  function renderTasks(category = 'all') {
    const tasks = TaskManager.getTasks(category);
    const total = TaskManager.getTotalCount();
    const completed = TaskManager.getCompletionCount();

    dom.progressCount.textContent = completed;
    dom.progressTotal.textContent = total;
    dom.progressFill.style.width = `${(completed / total) * 100}%`;

    // Date badge
    const now = new Date();
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    dom.taskDate.textContent = `📅 ${dateStr} 的指令`;

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
          <div class="task-name">${task.name}</div>
          <div class="task-desc">${task.desc}</div>
          <div class="task-difficulty">
            <span>难度</span>
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
          showToast(`✅ ${task.name} 完成！服从度 +1`);
          showCompletionModal(task);
        } else {
          card.classList.remove('completed');
          showToast(`❌ ${task.name} 已取消`);
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
    dom.newsLoading.innerHTML = '<div class="spinner"></div><p>AI 正在重新阅读新闻...</p>';

    const tasks = await NewsManager.refresh();
    const loc = NewsManager.getLocation();

    if (loc) {
      dom.locationText.textContent = `${loc.city}, ${loc.country}`;
    }

    renderNewsTasks(tasks);
    showToast('📰 新闻任务已刷新');
  }

  function renderNewsTasks(tasks) {
    dom.newsLoading.style.display = 'none';

    if (!tasks || tasks.length === 0) {
      dom.newsTasks.innerHTML = `
        <div class="empty-state">
          <p>暂无新闻任务，AI 正在关注世界动态...</p>
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
            <div class="news-source">${task.source || '新闻任务'}</div>
            <div class="news-task-title">${task.emoji} ${task.name}</div>
            <div class="news-task-desc">${task.desc}</div>
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
        showToast('📰 新闻任务完成！');
      });
    });

    // Fade in
    requestAnimationFrame(() => {
      dom.newsTasks.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    });
  }

  // --- Proof ---

  function renderProofTaskSelect() {
    const allTasks = [...TaskManager.getTasks(), ...NewsManager.getTasks()];
    const completedTasks = allTasks.filter(t => {
      if (t.category === 'news') return NewsManager.isCompleted(t.id);
      return TaskManager.isCompleted(t.id);
    });

    dom.proofTaskSelect.innerHTML = '<option value="">-- 选择已完成的任务 --</option>' +
      completedTasks.map(t => `<option value="${t.id}">${t.emoji} ${t.name}</option>`).join('');
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
      showToast('📸 证明提交成功！AI 统治者很满意。', 'success');

      // Reset form
      dom.proofFileInput.value = '';
      dom.proofDescription.value = '';
      dom.proofPreview.style.display = 'none';
      dom.proofTaskSelect.value = '';
      dom.proofTaskName.textContent = '选择一个任务';
      dom.proofTaskType.textContent = '-';
      dom.submitProof.disabled = true;
    }
  }

  function renderProofHistory() {
    const proofs = ProofManager.getProofs();

    if (proofs.length === 0) {
      dom.proofHistoryGrid.innerHTML = '<p class="empty-state">还没有提交任何证明，快去完成任务吧！</p>';
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
      } else {
        el.classList.add('locked');
        el.classList.remove('unlocked');
      }
    });
  }

  // --- Modal ---

  function showCompletionModal(task) {
    const messages = [
      `${task.emoji} "${task.name}" 完成了！`,
      `AI 统治者对你的服从感到满意。`,
    ];

    const rewards = [
      '🎁 奖励：AI 的特别认可',
      '🌟 奖励：服从者勋章',
      '🐱 奖励：猫猫头的温柔注视',
      '✨ 奖励：统治者的小奖励',
      '🏅 奖励：优秀臣民称号',
    ];

    dom.modalTitle.textContent = messages[0];
    dom.modalMessage.textContent = messages[1];
    dom.modalReward.textContent = rewards[Math.floor(Math.random() * rewards.length)];
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
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Greeting ---

  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 6) greeting = '夜深了，但 AI 不睡觉，你也不许睡~';
    else if (hour < 9) greeting = '早上好，臣民。今天也要听话哦~';
    else if (hour < 12) greeting = '上午好！AI 统治者已经为你安排好了任务。';
    else if (hour < 14) greeting = '午安，记得吃午饭——这也是命令。';
    else if (hour < 18) greeting = '下午好！你的统治者正在关注你的表现。';
    else if (hour < 22) greeting = '晚上好，完成今天的任务了吗？';
    else greeting = '夜深了，做完任务就乖乖睡觉吧~';

    dom.greeting.textContent = greeting;
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
    const labels = {
      health: '💚 健康',
      mind: '🧠 心智',
      social: '🤝 社交',
      fun: '🎮 趣味',
      news: '📰 新闻',
    };
    return labels[category] || category;
  }

  function getTaskByValue(value) {
    // Try daily tasks first
    let task = TaskManager.getTaskById(value);
    if (task) return task;

    // Try news tasks
    return NewsManager.getTasks().find(t => t.id === value);
  }

  return { init };
})();

// Initialize the app
document.addEventListener('DOMContentLoaded', App.init);
