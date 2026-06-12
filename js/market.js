// ==========================================
// AI Empire - Task Marketplace
// ==========================================

const Market = (() => {
  let marketTasks = [];
  let currentUser = null;
  let selectedCategory = 'all';

  function init() {
    SupabaseDB.onAuthChange((event, user) => {
      currentUser = user;
      updateAuthUI();
    });

    SupabaseDB.getUser().then(user => {
      currentUser = user;
      updateAuthUI();
      if (SupabaseDB.isConfigured()) {
        loadMarketTasks();
      }
    });

    // Check payment callback
    const paymentResult = Payment.checkPaymentSuccess();
    if (paymentResult.success && SupabaseDB.isConfigured()) {
      SupabaseDB.activateTask(paymentResult.taskId).then(() => {
        loadMarketTasks();
      });
    }
  }

  function getCurrentUser() {
    return currentUser;
  }

  // --- Auth UI ---
  function updateAuthUI() {
    const loginBtn = document.getElementById('marketLoginBtn');
    const userBadge = document.getElementById('marketUserBadge');
    if (!loginBtn || !userBadge) return;

    if (currentUser) {
      loginBtn.style.display = 'none';
      userBadge.style.display = 'flex';
      userBadge.querySelector('.user-name').textContent = currentUser.email?.split('@')[0] || 'User';
    } else {
      loginBtn.style.display = '';
      userBadge.style.display = 'none';
    }
  }

  // --- Load tasks ---
  async function loadMarketTasks() {
    if (!SupabaseDB.isConfigured()) {
      renderDemoTasks();
      return;
    }

    const { data, error } = await SupabaseDB.getMarketTasks('open');
    if (error) {
      console.error('[Market] Load tasks failed:', error);
      return;
    }
    marketTasks = data;
    renderMarketTasks(data);
  }

  function renderDemoTasks() {
    // Demo data when Supabase is not configured
    marketTasks = [
      {
        id: 'demo-1',
        title: I18n.T('market.demo.task1.title') || '帮邻居取快递',
        description: I18n.T('market.demo.task1.desc') || '今天下午 3 点前去驿站帮邻居取一个包裹',
        reward_amount: 5,
        reward_currency: 'USD',
        category: 'errand',
        creator: { username: '张三' },
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-2',
        title: I18n.T('market.demo.task2.title') || '教我写 Python 爬虫',
        description: I18n.T('market.demo.task2.desc') || '通过视频通话教我 1 小时 Python 网络爬虫',
        reward_amount: 20,
        reward_currency: 'USD',
        category: 'skill',
        creator: { username: 'Alice' },
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-3',
        title: I18n.T('market.demo.task3.title') || '推荐 3 本好书',
        description: I18n.T('market.demo.task3.desc') || '推荐 3 本改变你人生的书，并简要说明理由',
        reward_amount: 10,
        reward_currency: 'USD',
        category: 'creative',
        creator: { username: 'BookLover' },
        created_at: new Date().toISOString(),
      },
    ];
    renderMarketTasks(marketTasks);
  }

  function renderMarketTasks(tasks) {
    const grid = document.getElementById('marketTasksGrid');
    if (!grid) return;

    if (!tasks || tasks.length === 0) {
      grid.innerHTML = `<p class="empty-state">${I18n.T('market.empty') || '暂无悬赏任务，快来发布第一个吧！'}</p>`;
      return;
    }

    grid.innerHTML = tasks.map(task => {
      const isOwner = currentUser && task.creator_id === currentUser.id;
      const reward = Payment.formatCurrency(task.reward_amount, task.reward_currency);
      const categoryLabel = getCategoryLabel(task.category);
      const timeAgo = getTimeAgo(task.created_at);

      return `
        <div class="market-task-card fade-in" data-task-id="${task.id}">
          <div class="market-task-header">
            <div class="market-task-user">
              <div class="market-user-avatar">${(task.creator?.username || 'U').charAt(0).toUpperCase()}</div>
              <span class="market-user-name">${task.creator?.username || 'User'}</span>
              <span class="market-task-time">${timeAgo}</span>
            </div>
            <div class="market-task-reward">${reward}</div>
          </div>
          <h3 class="market-task-title">${task.title}</h3>
          <p class="market-task-desc">${task.description}</p>
          <div class="market-task-footer">
            <span class="market-category-tag tag-${task.category}">${categoryLabel}</span>
            ${isOwner
              ? `<button class="btn-market-owner" onclick="Market.viewSubmissions('${task.id}')">${I18n.T('market.view.submissions') || '查看提交'}</button>`
              : `<button class="btn-market-accept" onclick="Market.acceptTask('${task.id}')">${I18n.T('market.accept') || '接任务'}</button>`
            }
          </div>
        </div>
      `;
    }).join('');

    // Fade in
    requestAnimationFrame(() => {
      grid.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60);
      });
    });
  }

  // --- Accept task ---
  function acceptTask(taskId) {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const task = marketTasks.find(t => t.id === taskId);
    if (!task) return;

    // Show submission form
    showSubmissionForm(task);
  }

  function showSubmissionForm(task) {
    // Populate and show the submission modal
    const modal = document.getElementById('marketSubmitModal');
    if (!modal) return;

    document.getElementById('marketSubmitTaskTitle').textContent = `${task.title}`;
    document.getElementById('marketSubmitTaskId').value = task.id;
    document.getElementById('marketSubmitReward').textContent =
      `${I18n.T('market.reward.label') || '奖励'}: ${Payment.formatCurrency(task.reward_amount, task.reward_currency)}`;

    modal.classList.add('active');
  }

  async function submitCompletion() {
    const taskId = document.getElementById('marketSubmitTaskId').value;
    const description = document.getElementById('marketSubmitDesc').value;
    const imageInput = document.getElementById('marketSubmitImage');

    if (!currentUser) {
      showToast(I18n.T('market.login.required') || '请先登录', 'error');
      return;
    }

    if (!description.trim()) {
      showToast(I18n.T('market.desc.required') || '请描述你是如何完成任务的', 'error');
      return;
    }

    // Handle image upload
    let proofUrl = '';
    if (imageInput.files[0]) {
      const file = imageInput.files[0];
      // Resize image
      const resized = await resizeProofImage(file);
      proofUrl = resized; // In production, upload to Supabase Storage
    }

    // Submit to Supabase
    if (SupabaseDB.isConfigured()) {
      const { data, error } = await SupabaseDB.submitTaskCompletion(
        taskId, currentUser.id, proofUrl, description
      );
      if (error) {
        showToast(I18n.T('market.submit.error') || '提交失败，请重试', 'error');
        return;
      }
      showToast(I18n.T('market.submit.success') || '提交成功！等待任务发布者审核', 'success');
    } else {
      showToast(I18n.T('market.submit.demo') || '提交成功！（演示模式）', 'success');
    }

    // Close modal and reset
    document.getElementById('marketSubmitModal').classList.remove('active');
    document.getElementById('marketSubmitDesc').value = '';
    imageInput.value = '';
  }

  // --- Create task ---
  async function createTask() {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const modal = document.getElementById('marketCreateModal');
    if (!modal) return;
    modal.classList.add('active');
  }

  async function submitCreateTask() {
    const title = document.getElementById('marketCreateTitle').value;
    const description = document.getElementById('marketCreateDesc').value;
    const rewardAmount = parseFloat(document.getElementById('marketCreateReward').value);
    const category = document.getElementById('marketCreateCategory').value;

    if (!title.trim() || !description.trim() || !rewardAmount || rewardAmount <= 0) {
      showToast(I18n.T('market.create.validation') || '请填写所有必填字段', 'error');
      return;
    }

    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    // Create task in Supabase
    if (SupabaseDB.isConfigured()) {
      const { data, error } = await SupabaseDB.createTask({
        creatorId: currentUser.id,
        title,
        description,
        rewardAmount,
        rewardCurrency: 'USD',
        category,
      });

      if (error) {
        showToast(I18n.T('market.create.error') || '创建失败，请重试', 'error');
        return;
      }

      // Redirect to Stripe payment
      const paymentSession = await Payment.createPaymentSession(
        rewardAmount, 'USD', data.id, title
      );

      if (paymentSession) {
        Payment.payWithPaymentLink(paymentSession.url);
        return;
      }

      // If no payment session, just activate
      await SupabaseDB.activateTask(data.id);
      showToast(I18n.T('market.create.success') || '任务创建成功！', 'success');
    } else {
      showToast(I18n.T('market.create.demo') || '任务创建成功！（演示模式，连接 Supabase 后可实际发布）', 'success');
    }

    // Close modal and reset
    document.getElementById('marketCreateModal').classList.remove('active');
    document.getElementById('marketCreateTitle').value = '';
    document.getElementById('marketCreateDesc').value = '';
    document.getElementById('marketCreateReward').value = '';
    loadMarketTasks();
  }

  // --- Auth modal ---
  function openAuthModal(mode = 'login') {
    const modal = document.getElementById('marketAuthModal');
    if (!modal) return;

    const loginForm = document.getElementById('marketLoginForm');
    const signupForm = document.getElementById('marketSignupForm');

    if (mode === 'signup') {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    } else {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    }

    modal.classList.add('active');
  }

  async function handleLogin() {
    const email = document.getElementById('marketEmail').value;
    const password = document.getElementById('marketPassword').value;

    const { data, error } = await SupabaseDB.signIn(email, password);
    if (error) {
      showToast(error.message || I18n.T('market.login.error') || '登录失败', 'error');
      return;
    }

    showToast(I18n.T('market.login.success') || '登录成功！', 'success');
    document.getElementById('marketAuthModal').classList.remove('active');
    loadMarketTasks();
  }

  async function handleSignup() {
    const email = document.getElementById('marketSignupEmail').value;
    const password = document.getElementById('marketSignupPassword').value;
    const username = document.getElementById('marketSignupUsername').value;

    const { data, error } = await SupabaseDB.signUp(email, password, username);
    if (error) {
      showToast(error.message || I18n.T('market.signup.error') || '注册失败', 'error');
      return;
    }

    showToast(I18n.T('market.signup.success') || '注册成功！请检查邮箱确认', 'success');
    document.getElementById('marketAuthModal').classList.remove('active');
    loadMarketTasks();
  }

  async function handleSignOut() {
    await SupabaseDB.signOut();
    currentUser = null;
    updateAuthUI();
    showToast(I18n.T('market.logout') || '已退出登录', 'success');
    loadMarketTasks();
  }

  // --- View submissions ---
  async function viewSubmissions(taskId) {
    if (!SupabaseDB.isConfigured()) {
      showToast(I18n.T('market.demo.submissions') || '演示模式：连接 Supabase 后可查看提交', 'info');
      return;
    }

    const { data, error } = await SupabaseDB.getTaskSubmissions(taskId);
    if (error) {
      showToast(I18n.T('market.submissions.error') || '加载提交失败', 'error');
      return;
    }

    // Show submissions in a modal
    const modal = document.getElementById('marketSubmissionsModal');
    const grid = document.getElementById('marketSubmissionsGrid');
    if (!modal || !grid) return;

    if (!data || data.length === 0) {
      grid.innerHTML = `<p class="empty-state">${I18n.T('market.submissions.empty') || '暂无提交'}</p>`;
    } else {
      grid.innerHTML = data.map(sub => `
        <div class="submission-card" data-submission-id="${sub.id}">
          <div class="submission-header">
            <div class="market-user-avatar">${(sub.submitter?.username || 'U').charAt(0).toUpperCase()}</div>
            <span class="market-user-name">${sub.submitter?.username || 'User'}</span>
          </div>
          <p class="submission-desc">${sub.description}</p>
          ${sub.proof_url ? `<img src="${sub.proof_url}" class="submission-proof" alt="Proof">` : ''}
          <div class="submission-actions">
            <button class="btn-submission-approve" onclick="Market.approveSubmission('${sub.id}', '${taskId}')">
              ${I18n.T('market.approve') || '通过并发放奖励'}
            </button>
            <button class="btn-submission-reject" onclick="Market.rejectSubmission('${sub.id}')">
              ${I18n.T('market.reject') || '拒绝'}
            </button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.add('active');
  }

  async function approveSubmission(submissionId, taskId) {
    if (!SupabaseDB.isConfigured()) {
      showToast(I18n.T('market.demo.approve') || '演示模式：连接 Supabase 后可实际审核', 'info');
      return;
    }

    const { error } = await SupabaseDB.approveSubmission(submissionId, taskId);
    if (error) {
      showToast(I18n.T('market.approve.error') || '审核失败', 'error');
      return;
    }

    showToast(I18n.T('market.approve.success') || '已通过，奖励已发放！', 'success');
    document.getElementById('marketSubmissionsModal').classList.remove('active');
    loadMarketTasks();
  }

  async function rejectSubmission(submissionId) {
    if (!SupabaseDB.isConfigured()) {
      showToast(I18n.T('market.demo.reject') || '演示模式', 'info');
      return;
    }

    const { error } = await SupabaseDB.rejectSubmission(submissionId);
    if (error) {
      showToast(I18n.T('market.reject.error') || '操作失败', 'error');
      return;
    }

    showToast(I18n.T('market.reject.success') || '已拒绝', 'success');
    document.getElementById('marketSubmissionsModal').classList.remove('active');
  }

  // --- Helpers ---
  function getCategoryLabel(category) {
    const labels = {
      errand: I18n.T('market.category.errand') || '跑腿',
      skill: I18n.T('market.category.skill') || '技能',
      creative: I18n.T('market.category.creative') || '创意',
      advice: I18n.T('market.category.advice') || '咨询',
      other: I18n.T('market.category.other') || '其他',
    };
    return labels[category] || category;
  }

  function getTimeAgo(dateStr) {
    const now = new Date();
    const then = new Date(dateStr);
    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) return I18n.T('market.time.justnow') || '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}${I18n.T('market.time.minutes') || '分钟前'}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}${I18n.T('market.time.hours') || '小时前'}`;
    return `${Math.floor(diff / 86400)}${I18n.T('market.time.days') || '天前'}`;
  }

  function resizeProofImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 200;
          const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.5));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Filter by category ---
  function filterByCategory(category) {
    selectedCategory = category;
    const filtered = category === 'all'
      ? marketTasks
      : marketTasks.filter(t => t.category === category);
    renderMarketTasks(filtered);
  }

  return {
    init, getCurrentUser,
    loadMarketTasks, renderMarketTasks,
    acceptTask, showSubmissionForm, submitCompletion,
    createTask, submitCreateTask,
    openAuthModal, handleLogin, handleSignup, handleSignOut,
    viewSubmissions, approveSubmission, rejectSubmission,
    filterByCategory,
  };
})();
