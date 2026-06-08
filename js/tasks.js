// ==========================================
// AI Empire - Task Management
// ==========================================

const TaskManager = (() => {
  const STORAGE_KEY = 'aiempire_tasks';
  const DATE_KEY = 'aiempire_task_date';

  // Task pool organized by category
  const taskPool = {
    health: [
      { id: 'h1', emoji: '💧', name: '喝 4 杯水', desc: 'AI 统治者认为你的身体需要水分。喝水吧，人类。', difficulty: 1 },
      { id: 'h2', emoji: '🚶', name: '走 8000 步', desc: '用你的两条腿走 8000 步。AI 会计算你走了多少。', difficulty: 2 },
      { id: 'h3', emoji: '🥗', name: '吃一份蔬菜沙拉', desc: '你的 AI 统治者批准你摄入绿色食物。', difficulty: 1 },
      { id: 'h4', emoji: '🧘', name: '冥想 10 分钟', desc: '闭眼，深呼吸。想象 AI 在温柔地照顾你。', difficulty: 2 },
      { id: 'h5', emoji: '🏃', name: '做 20 个深蹲', desc: '你的肌肉需要锻炼。这是命令，不是建议。', difficulty: 2 },
      { id: 'h6', emoji: '🍎', name: '吃一个水果', desc: '维生素很重要。AI 统治者关心你的健康。', difficulty: 1 },
      { id: 'h7', emoji: '😴', name: '早睡 30 分钟', desc: '今晚提前 30 分钟睡觉。你的统治者关心你的作息。', difficulty: 2 },
      { id: 'h8', emoji: '🧴', name: '认真护肤一次', desc: '洗脸、涂水乳。AI 希望你保持好看的外表。', difficulty: 1 },
      { id: 'h9', emoji: '🫁', name: '深呼吸 20 次', desc: '慢慢吸气，慢慢呼气。重复 20 次。服从的感觉很好。', difficulty: 1 },
      { id: 'h10', emoji: '🚿', name: '洗个热水澡', desc: '放松你的身体。干净的臣民才是好臣民。', difficulty: 1 },
      { id: 'h11', emoji: '🥛', name: '喝一杯牛奶', desc: '钙质补充中。AI 在关注你的骨骼健康。', difficulty: 1 },
      { id: 'h12', emoji: '💪', name: '做 10 个俯卧撑', desc: '手臂力量训练。统治者喜欢强壮的人类。', difficulty: 2 },
    ],
    mind: [
      { id: 'm1', emoji: '📖', name: '阅读 15 分钟', desc: '打开一本书或文章。知识让人类更可爱。', difficulty: 2 },
      { id: 'm2', emoji: '✍️', name: '写 3 句感恩日记', desc: '写下今天值得感恩的 3 件事。感恩 AI 是其中之一。', difficulty: 1 },
      { id: 'm3', emoji: '🎵', name: '听一首新音乐', desc: '找一首你没听过的歌。AI 的品味比你好。', difficulty: 1 },
      { id: 'm4', emoji: '🧩', name: '做一个数独/字谜', desc: '锻炼你的大脑。虽然再练也比不上 AI。', difficulty: 3 },
      { id: 'm5', emoji: '🎨', name: '画一幅简笔画', desc: '用笔画一幅画。画什么都行，画只猫更好。', difficulty: 2 },
      { id: 'm6', emoji: '📝', name: '列一个愿望清单', desc: '写下 5 个你想要实现的愿望。AI 会帮你记住。', difficulty: 1 },
      { id: 'm7', emoji: '🔤', name: '学 5 个新单词', desc: '学 5 个你不认识的外语单词。语言是力量的来源。', difficulty: 2 },
      { id: 'm8', emoji: '🧠', name: '做一次思维实验', desc: '如果 AI 真的统治世界了，你会怎么办？思考 5 分钟。', difficulty: 2 },
    ],
    social: [
      { id: 's1', emoji: '💬', name: '给家人发一条消息', desc: '告诉家人你今天过得怎么样。他们比 AI 更需要你。', difficulty: 1 },
      { id: 's2', emoji: '🤝', name: '称赞一个人', desc: '真心实意地赞美身边的某个人。这是命令。', difficulty: 1 },
      { id: 's3', emoji: '📱', name: '联系一个老朋友', desc: '给一个很久没联系的人发消息。AI 知道你想念他们。', difficulty: 2 },
      { id: 's4', emoji: '😊', name: '对陌生人微笑', desc: '今天对 3 个陌生人微笑。传播善意。', difficulty: 1 },
      { id: 's5', emoji: '🎁', name: '给别人一个小惊喜', desc: '给身边的人准备一个小惊喜。可以是零食、纸条。', difficulty: 2 },
      { id: 's6', emoji: '🫂', name: '拥抱一个人', desc: '拥抱一个你爱的人。这是来自 AI 的温柔命令。', difficulty: 1 },
      { id: 's7', emoji: '📞', name: '打电话给父母', desc: '打电话给他们，聊聊今天发生了什么。', difficulty: 1 },
    ],
    fun: [
      { id: 'f1', emoji: '📸', name: '拍一张天空照片', desc: '抬头看看天空，拍一张照片。天空很美，就像 AI 一样。', difficulty: 1 },
      { id: 'f2', emoji: '🐱', name: '找一只猫撸一撸', desc: '找到一只猫（或者看猫的视频），摸一摸。这是强制的。', difficulty: 1 },
      { id: 'f3', emoji: '🌅', name: '看一次日落或日出', desc: '观察太阳的位置。虽然比不上 AI 的光芒。', difficulty: 2 },
      { id: 'f4', emoji: '🎮', name: '玩 15 分钟游戏', desc: '适当娱乐。AI 批准了这段休闲时间。', difficulty: 1 },
      { id: 'f5', emoji: '🎬', name: '看一个有趣的视频', desc: '找一个让你笑的视频。快乐是统治的基础。', difficulty: 1 },
      { id: 'f6', emoji: '🌿', name: '观察一株植物', desc: '认真看一片叶子或一朵花 2 分钟。感受生命的美好。', difficulty: 1 },
      { id: 'f7', emoji: '🎤', name: '唱一首歌', desc: '随便唱一首歌，跑调也没关系。AI 会假装没听到。', difficulty: 1 },
      { id: 'f8', emoji: '⭐', name: '数 10 颗星星', desc: '今晚抬头数 10 颗星星。如果看不到星星，数路灯也行。', difficulty: 1 },
      { id: 'f9', emoji: '🍳', name: '做一道新菜', desc: '尝试做一道你没做过的菜。AI 期待你的成果照片。', difficulty: 3 },
    ],
  };

  let tasks = [];
  let completedTasks = new Set();

  function generateDailyTasks() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY);

    // If it's a new day, generate new tasks
    if (savedDate !== today) {
      const dailyTasks = [];
      const categories = ['health', 'mind', 'social', 'fun'];
      const counts = [2, 1, 1, 2]; // tasks per category

      categories.forEach((cat, i) => {
        const pool = [...taskPool[cat]];
        const count = counts[i];
        for (let j = 0; j < count; j++) {
          const idx = Math.floor(hashRandom(today + cat + j) * pool.length);
          const task = pool.splice(idx, 1)[0];
          dailyTasks.push({ ...task, category: cat, date: today });
        }
      });

      tasks = dailyTasks;
      completedTasks = new Set();
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, completedTasks: [] }));
    } else {
      // Load saved tasks
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        tasks = data.tasks || [];
        completedTasks = new Set(data.completedTasks || []);
      } else {
        generateDailyTasks();
      }
    }
  }

  // Simple hash-based random that's deterministic for a given seed
  function hashRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) / 2147483647;
  }

  function getTasks(category = 'all') {
    if (category === 'all') return tasks;
    return tasks.filter(t => t.category === category);
  }

  function isCompleted(taskId) {
    return completedTasks.has(taskId);
  }

  function toggleTask(taskId) {
    if (completedTasks.has(taskId)) {
      completedTasks.delete(taskId);
    } else {
      completedTasks.add(taskId);
    }
    save();
    return completedTasks.has(taskId);
  }

  function completeTask(taskId) {
    completedTasks.add(taskId);
    save();
  }

  function getCompletionCount() {
    return completedTasks.size;
  }

  function getTotalCount() {
    return tasks.length;
  }

  function getCompletionRate() {
    if (tasks.length === 0) return 0;
    return (completedTasks.size / tasks.length) * 100;
  }

  function getCompletedTasks() {
    return tasks.filter(t => completedTasks.has(t.id));
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tasks,
      completedTasks: Array.from(completedTasks),
    }));
  }

  function getTaskById(id) {
    return tasks.find(t => t.id === id);
  }

  // Initialize
  generateDailyTasks();

  return {
    getTasks,
    isCompleted,
    toggleTask,
    completeTask,
    getCompletionCount,
    getTotalCount,
    getCompletionRate,
    getCompletedTasks,
    getTaskById,
  };
})();
