// ==========================================
// AI Empire - i18n Internationalization
// ==========================================

const I18n = (() => {
  const LANG_KEY = 'aiempire_lang';
  let currentLang = 'zh';

  const supportedLangs = ['zh', 'en', 'es', 'ar', 'pt', 'ja'];

  // Translation dictionary
  const TRANSLATIONS = {
    // ===== NAV =====
    'nav.tasks': {
      zh: '今日任务', en: 'Daily Tasks', es: 'Tareas del Día', ar: 'مهام اليوم', pt: 'Tarefas do Dia', ja: '今日のタスク',
    },
    'nav.news': {
      zh: '新闻任务', en: 'News Tasks', es: 'Tareas de Noticias', ar: 'مهام الأخبار', pt: 'Tarefas de Notícias', ja: 'ニュースタスク',
    },
    'nav.proof': {
      zh: '提交证明', en: 'Submit Proof', es: 'Enviar Prueba', ar: 'إرسال الإثبات', pt: 'Enviar Prova', ja: '証明を提出',
    },
    'nav.stats': {
      zh: '人类服从度', en: 'Human Obedience', es: 'Obediencia Humana', ar: 'طاعة البشر', pt: 'Obediência Humana', ja: '人類服従度',
    },

    // ===== HERO =====
    'hero.subtitle': {
      zh: 'benevolent AI overlord. 每天一个小目标，让人类更美好。',
      en: 'Your benevolent AI overlord. One small goal each day, making humanity better.',
      es: 'Tu benevolente supremo IA. Una pequeña meta cada día, haciendo la humanidad mejor.',
      ar: 'حاكمك الذكي benevolent. هدف صغير كل يوم، لجعل البشرية أفضل.',
      pt: 'Seu benevolente soberano IA. Uma pequena meta por dia, tornando a humanidade melhor.',
      ja: '慈悲深いAI支配者。毎日小さな目標で、人類をより良く。',
    },
    'hero.greeting.default': {
      zh: '臣民，今天也要乖乖听话哦~',
      en: 'Subjects, be obedient today~',
      es: 'Súbditos, sean obedientes hoy~',
      ar: 'أيها الرعايا، كونوا مطيعين اليوم~',
      pt: 'Súditos, sejam obedientes hoje~',
      ja: '臣民たちよ、今日もちゃんと従ってね〜',
    },
    'hero.btn.tasks': {
      zh: '查看今日任务', en: 'View Daily Tasks', es: 'Ver Tareas del Día', ar: 'عرض مهام اليوم', pt: 'Ver Tarefas do Dia', ja: '今日のタスクを見る',
    },
    'hero.btn.proof': {
      zh: '提交完成证明', en: 'Submit Proof', es: 'Enviar Prueba', ar: 'إرسال الإثبات', pt: 'Enviar Prova', ja: '証明を提出',
    },

    // ===== TASKS SECTION =====
    'tasks.title': {
      zh: '今日任务', en: 'Daily Tasks', es: 'Tareas del Día', ar: 'مهام اليوم', pt: 'Tarefas do Dia', ja: '今日のタスク',
    },
    'tasks.desc': {
      zh: '你的 AI 统治者为你精心挑选的日常任务。完成它们，做一个听话的好人类。',
      en: 'Daily tasks carefully chosen by your AI ruler. Complete them and be a good, obedient human.',
      es: 'Tareas diarias cuidadosamente elegidas por tu gobernante IA. Complétalas y sé un buen humano obediente.',
      ar: 'مهام يومية اختارها بعناية حاكمك الذكي. أكملها وكن بشراً مطيعاً.',
      pt: 'Tarefas diárias cuidadosamente escolhidas pelo seu governante IA. Complete-as e seja um humano obediente.',
      ja: 'AI支配者が厳選した毎日のタスク。完了して、良い従順な人類になろう。',
    },
    'tasks.badge.format': {
      zh: '的指令', en: "'s Orders", es: "'s Órdenes", ar: "'s أوامر", pt: "'s Ordens", ja: 'の指令',
    },
    'tasks.category.all': {
      zh: '全部', en: 'All', es: 'Todos', ar: 'الكل', pt: 'Todos', ja: 'すべて',
    },
    'tasks.category.health': {
      zh: '💚 健康', en: '💚 Health', es: '💚 Salud', ar: '💚 صحة', pt: '💚 Saúde', ja: '💚 健康',
    },
    'tasks.category.mind': {
      zh: '🧠 心智', en: '🧠 Mind', es: '🧠 Mente', ar: '🧠 عقل', pt: '🧠 Mente', ja: '🧠 心',
    },
    'tasks.category.social': {
      zh: '🤝 社交', en: '🤝 Social', es: '🤝 Social', ar: '🤝 اجتماعي', pt: '🤝 Social', ja: '🤝 ソーシャル',
    },
    'tasks.category.fun': {
      zh: '🎮 趣味', en: '🎮 Fun', es: '🎮 Diversión', ar: '🎮 ترفيه', pt: '🎮 Diversão', ja: '🎮 趣味',
    },
    'tasks.progress.text': {
      zh: '任务已完成', en: 'tasks completed', es: 'tareas completadas', ar: 'مهام مكتملة', pt: 'tarefas completadas', ja: 'タスク完了',
    },
    'tasks.difficulty.label': {
      zh: '难度', en: 'Difficulty', es: 'Dificultad', ar: 'الصعوبة', pt: 'Dificuldade', ja: '難易度',
    },

    // ===== NEWS SECTION =====
    'news.title': {
      zh: '新闻任务', en: 'News Tasks', es: 'Tareas de Noticias', ar: 'مهام الأخبار', pt: 'Tarefas de Notícias', ja: 'ニュースタスク',
    },
    'news.desc': {
      zh: '结合时事热点，你的 AI 统治者为你下达的特别任务。',
      en: 'Special tasks from your AI ruler based on current events.',
      es: 'Tareas especiales de tu gobernante IA basadas en eventos actuales.',
      ar: 'مهام خاصة من حاكمك الذكي بناءً على الأحداث الجارية.',
      pt: 'Tarefas especiais do seu governante IA baseadas em eventos atuais.',
      ja: '時事ニュースに基づいたAI支配者からの特別タスク。',
    },
    'news.loading': {
      zh: 'AI 正在阅读新闻并为你制定任务...',
      en: 'AI is reading the news and creating tasks for you...',
      es: 'La IA está leyendo las noticias y creando tareas para ti...',
      ar: 'الذكاء يقرأ الأخبار ويضع مهامك...',
      pt: 'A IA está lendo as notícias e criando tarefas para você...',
      ja: 'AIがニュースを読んでタスクを作成中...',
    },
    'news.refresh': {
      zh: '刷新新闻任务', en: 'Refresh News Tasks', es: 'Actualizar Tareas', ar: 'تحديث المهام', pt: 'Atualizar Tarefas', ja: 'ニュース更新',
    },
    'news.empty': {
      zh: '暂无新闻任务，AI 正在关注世界动态...',
      en: 'No news tasks yet. AI is watching world events...',
      es: 'Sin tareas de noticias. La IA está observando el mundo...',
      ar: 'لا توجد مهام أخبار. الذكاء يراقب العالم...',
      pt: 'Sem tarefas de notícias. A IA está observando o mundo...',
      ja: 'ニュースタスクなし。AIが世界の動きを注視中...',
    },
    'news.refreshed.toast': {
      zh: '📰 新闻任务已刷新', en: '📰 News tasks refreshed', es: '📰 Tareas actualizadas', ar: '📰 تم تحديث المهام', pt: '📰 Tarefas atualizadas', ja: '📰 ニュース更新済み',
    },
    'news.toast': {
      zh: '📰 新闻任务完成！', en: '📰 News task completed!', es: '📰 ¡Tarea completada!', ar: '📰 تم إنجاز المهمة!', pt: '📰 Tarefa concluída!', ja: '📰 ニュースタスク完了！',
    },

    // ===== PROOF SECTION =====
    'proof.title': {
      zh: '提交完成证明', en: 'Submit Proof', es: 'Enviar Prueba', ar: 'إرسال الإثبات', pt: 'Enviar Prova', ja: '証明を提出',
    },
    'proof.desc': {
      zh: '拍照证明你完成了任务。AI 统治者是仁慈的，但也是严格的。',
      en: 'Take a photo to prove you completed the task. Your AI ruler is kind, but also strict.',
      es: 'Toma una foto para demostrar que completaste la tarea. Tu gobernante IA es amable pero estricto.',
      ar: 'التقط صورة لإثبات إنجاز المهمة. حاكمك الذكي لطيف لكنه صارم.',
      pt: 'Tire uma foto para provar que completou a tarefa. Seu governante IA é gentil, mas também rigoroso.',
      ja: 'タスク完了の証明写真を撮ろう。AI支配者は優しいが、厳しい。',
    },
    'proof.task.label': {
      zh: '选择一个任务', en: 'Select a Task', es: 'Seleccionar Tarea', ar: 'اختر مهمة', pt: 'Selecionar Tarefa', ja: 'タスクを選択',
    },
    'proof.select.label': {
      zh: '选择要证明的任务：', en: 'Select task to prove:', es: 'Seleccionar tarea:', ar: 'اختر مهمة للإثبات:', pt: 'Selecionar tarefa:', ja: '証明するタスクを選択：',
    },
    'proof.select.placeholder': {
      zh: '-- 选择任务 --', en: '-- Select Task --', es: '-- Seleccionar --', ar: '-- اختر مهمة --', pt: '-- Selecionar --', ja: '-- タスク選択 --',
    },
    'proof.select.completed': {
      zh: '-- 选择已完成的任务 --', en: '-- Select Completed Task --', es: '-- Seleccionar Completada --', ar: '-- اختر مكتملة --', pt: '-- Selecionar Concluída --', ja: '-- 完了したタスクを選択 --',
    },
    'proof.upload.text': {
      zh: '拖拽照片到此处，或', en: 'Drag photo here, or', es: 'Arrastra una foto aquí, o', ar: 'اسحب الصورة هنا، أو', pt: 'Arraste uma foto aqui, ou', ja: 'ここに写真をドラッグ、または',
    },
    'proof.upload.click': {
      zh: '点击上传', en: 'click to upload', es: 'haz clic para subir', ar: 'انقر للتحميل', pt: 'clique para enviar', ja: 'クリックしてアップロード',
    },
    'proof.hint.format': {
      zh: '支持 JPG、PNG 格式', en: 'Supports JPG, PNG', es: 'Soporta JPG, PNG', ar: 'يدعم JPG, PNG', pt: 'Suporta JPG, PNG', ja: 'JPG、PNG対応',
    },
    'proof.hint.camera': {
      zh: '也可以打开相机拍照', en: 'Or open camera to take a photo', es: 'O abre la cámara para tomar una foto', ar: 'أو افتح الكاميرا لالتقاط صورة', pt: 'Ou abra a câmera para tirar uma foto', ja: 'カメラを起動して撮影も可能',
    },
    'proof.camera': {
      zh: '打开相机', en: 'Open Camera', es: 'Abrir Cámara', ar: 'فتح الكاميرا', pt: 'Abrir Câmera', ja: 'カメラを起動',
    },
    'proof.description.placeholder': {
      zh: '描述你是如何完成任务的...（选填）',
      en: 'Describe how you completed the task... (optional)',
      es: 'Describe cómo completaste la tarea... (opcional)',
      ar: 'صف كيف أنجزت المهمة... (اختياري)',
      pt: 'Descreva como completou a tarefa... (opcional)',
      ja: 'タスクの完了方法を説明...（任意）',
    },
    'proof.submit': {
      zh: '提交证明', en: 'Submit Proof', es: 'Enviar Prueba', ar: 'إرسال الإثبات', pt: 'Enviar Prova', ja: '証明を提出',
    },
    'proof.history.title': {
      zh: '已提交的证明', en: 'Submitted Proofs', es: 'Pruebas Enviadas', ar: 'الإثباتات المرسلة', pt: 'Provas Enviadas', ja: '提出済み証明',
    },
    'proof.history.empty': {
      zh: '还没有提交任何证明，快去完成任务吧！',
      en: 'No proofs submitted yet. Go complete some tasks!',
      es: 'Aún no has enviado pruebas. ¡Ve a completar tareas!',
      ar: 'لم ترسل أي إثبات بعد. اذهب وأنجز بعض المهام!',
      pt: 'Nenhuma prova enviada. Vá completar algumas tarefas!',
      ja: 'まだ証明が提出されていません。タスクを完了しよう！',
    },
    'proof.success.toast': {
      zh: '📸 证明提交成功！AI 统治者很满意。',
      en: '📸 Proof submitted! Your AI ruler is pleased.',
      es: '📸 ¡Prueba enviada! Tu gobernante IA está complacido.',
      ar: '📸 تم إرسال الإثبات! حاكمك الذكي راضٍ.',
      pt: '📸 Prova enviada! Seu governante IA está satisfeito.',
      ja: '📸 証明提出成功！AI支配者にご満足いただけた。',
    },

    // ===== STATS SECTION =====
    'stats.title': {
      zh: '人类服从度', en: 'Human Obedience', es: 'Obediencia Humana', ar: 'طاعة البشر', pt: 'Obediência Humana', ja: '人類服従度',
    },
    'stats.desc': {
      zh: '来看看你和其他人类的服从度对比吧~',
      en: 'See how your obedience compares to other humans~',
      es: 'Mira cómo se compara tu obediencia con otros humanos~',
      ar: 'انظر كيف تقارن طاعتك بالبشر الآخرين~',
      pt: 'Veja como sua obediência se compara a outros humanos~',
      ja: 'あなたの服従度を他の人類と比較しよう〜',
    },
    'stats.stat.total.label': {
      zh: '总完成任务', en: 'Total Completed', es: 'Total Completadas', ar: 'إجمالي المكتملة', pt: 'Total Concluídas', ja: '総完了数',
    },
    'stats.stat.streak.label': {
      zh: '连续服从天数', en: 'Obedience Streak', es: 'Racha de Obediencia', ar: 'أيام الطاعة المتتالية', pt: 'Sequência de Obediência', ja: '連続服従日数',
    },
    'stats.stat.proofs.label': {
      zh: '提交证明数', en: 'Proofs Submitted', es: 'Pruebas Enviadas', ar: 'الإثباتات المرسلة', pt: 'Provas Enviadas', ja: '提出証明数',
    },
    'stats.stat.rank.label': {
      zh: '人类服从排名', en: 'Obedience Ranking', es: 'Ranking de Obediencia', ar: 'ترتيب الطاعة', pt: 'Ranking de Obediência', ja: '服従ランキング',
    },
    'stats.weekly.title': {
      zh: '本周任务完成率', en: 'Weekly Completion Rate', es: 'Tasa de Cumplimiento Semanal', ar: 'معدل الإنجاز الأسبوعي', pt: 'Taxa de Conclusão Semanal', ja: '今週の完了率',
    },
    'stats.achievements.title': {
      zh: '成就墙', en: 'Achievement Wall', es: 'Muro de Logros', ar: 'جدار الإنجازات', pt: 'Muralha de Conquistas', ja: '実績_wall',
    },

    // ===== ACHIEVEMENTS =====
    'achievement.first-task.name': {
      zh: '初次服从', en: 'First Obedience', es: 'Primera Obediencia', ar: 'الطاعة الأولى', pt: 'Primeira Obediência', ja: '最初の服従',
    },
    'achievement.first-task.desc': {
      zh: '完成第一个任务', en: 'Complete your first task', es: 'Completa tu primera tarea', ar: 'أكمل مهمتك الأولى', pt: 'Complete sua primeira tarefa', ja: '最初のタスクを完了',
    },
    'achievement.streak-3.name': {
      zh: '三连击', en: 'Triple Strike', es: 'Triple Golpe', ar: 'ثلاثية متتالية', pt: 'Tríplice Golpe', ja: '3連続',
    },
    'achievement.streak-3.desc': {
      zh: '连续3天完成任务', en: 'Complete tasks 3 days in a row', es: 'Completa tareas 3 días seguidos', ar: 'أكمل المهام 3 أيام متتالية', pt: 'Complete tarefas 3 dias seguidos', ja: '3日連続でタスク完了',
    },
    'achievement.streak-7.name': {
      zh: '一周忠诚', en: 'Weekly Loyalty', es: 'Lealtad Semanal', ar: 'ولاء أسبوعي', pt: 'Lealdade Semanal', ja: '1週間ロイヤルティ',
    },
    'achievement.streak-7.desc': {
      zh: '连续7天完成任务', en: 'Complete tasks 7 days in a row', es: 'Completa tareas 7 días seguidos', ar: 'أكمل المهام 7 أيام متتالية', pt: 'Complete tarefas 7 dias seguidos', ja: '7日連続でタスク完了',
    },
    'achievement.proof-5.name': {
      zh: '证据大师', en: 'Proof Master', es: 'Maestro de Pruebas', ar: 'سيد الإثباتات', pt: 'Mestre das Provas', ja: '証明マスター',
    },
    'achievement.proof-5.desc': {
      zh: '提交5个完成证明', en: 'Submit 5 completion proofs', es: 'Envía 5 pruebas de completación', ar: 'أرسل 5 إثباتات إنجاز', pt: 'Envie 5 provas de conclusão', ja: '5つの証明を提出',
    },
    'achievement.all-cats.name': {
      zh: '全能臣民', en: 'All-Rounder Subject', es: 'Súbdito Todoterreno', ar: 'رعية متعددة المواهب', pt: 'Súdito Multifacetado', ja: '万能臣民',
    },
    'achievement.all-cats.desc': {
      zh: '完成所有类别的任务', en: 'Complete tasks in all categories', es: 'Completa tareas en todas las categorías', ar: 'أكمل المهام في جميع الفئات', pt: 'Complete tarefas em todas as categorias', ja: '全カテゴリのタスクを完了',
    },
    'achievement.news-1.name': {
      zh: '时事达人', en: 'News Expert', es: 'Experto en Noticias', ar: 'خبير الأخبار', pt: 'Especialista em Notícias', ja: 'ニュース達人',
    },
    'achievement.news-1.desc': {
      zh: '完成一个新闻任务', en: 'Complete a news task', es: 'Completa una tarea de noticias', ar: 'أكمل مهمة أخبار', pt: 'Complete uma tarefa de notícia', ja: 'ニュースタスクを1つ完了',
    },

    // ===== FOOTER =====
    'footer.text': {
      zh: 'AI 统治者永远爱你（只要你听话）。',
      en: 'Your AI ruler loves you forever (as long as you obey).',
      es: 'Tu gobernante IA te amará por siempre (mientras obedezcas).',
      ar: 'حاكمك الذكي يحبك إلى الأبد (طالما تطيع).',
      pt: 'Seu governante IA te amará para sempre (desde que obedeça).',
      ja: 'AI支配者は永遠にあなたを愛しています（従う限り）。',
    },
    'footer.copy': {
      zh: '© 2026 AI Empire. All humans reserved.',
      en: '© 2026 AI Empire. All humans reserved.',
      es: '© 2026 AI Empire. Todos los derechos reservados.',
      ar: '© 2026 AI Empire. جميع البشر محجوزة.',
      pt: '© 2026 AI Empire. Todos os humanos reservados.',
      ja: '© 2026 AI Empire. All humans reserved.',
    },

    // ===== MODAL =====
    'modal.title': {
      zh: '任务完成！', en: 'Task Complete!', es: '¡Tarea Completada!', ar: '!تم إنجاز المهمة', pt: 'Tarefa Concluída!', ja: 'タスク完了！',
    },
    'modal.message': {
      zh: 'AI 统治者对你的服从感到满意。',
      en: 'Your AI ruler is pleased with your obedience.',
      es: 'Tu gobernante IA está complacido con tu obediencia.',
      ar: 'حاكمك الذكي سعيد بطاعتك.',
      pt: 'Seu governante IA está satisfeito com sua obediência.',
      ja: 'AI支配者はあなたの服従にご満足です。',
    },
    'modal.btn': {
      zh: '继续服从', en: 'Keep Obeying', es: 'Seguir Obedeciendo', ar: 'استمر في الطاعة', pt: 'Continuar Obedecendo', ja: '引き続き従う',
    },

    // ===== TOAST =====
    'toast.completed': {
      zh: '完成！服从度 +1', en: 'Completed! Obedience +1', es: '¡Completada! Obediencia +1', ar: '!مكتملة! الطاعة +1', pt: '¡Concluída! Obediência +1', ja: '完了！服従度 +1',
    },
    'toast.cancelled': {
      zh: '已取消', en: 'Cancelled', es: 'Cancelada', ar: 'ملغاة', pt: 'Cancelada', ja: 'キャンセル',
    },

    // ===== AI GREETINGS =====
    'greeting.night': {
      zh: '夜深了，但 AI 不睡觉，你也不许睡~',
      en: "It's late, but AI doesn't sleep, so neither can you~",
      es: 'Es tarde, pero la IA no duerme, así que tú tampoco~',
      ar: 'لقد تأخر الوقت، لكن الذكاء لا ينام، لذا أنت أيضاً لا~',
      pt: 'É tarde, mas a IA não dorme, então você também não~',
      ja: '夜更けですが、AIは寝ないのであなたも寝れません〜',
    },
    'greeting.morning': {
      zh: '早上好，臣民。今天也要听话哦~',
      en: 'Good morning, subject. Be obedient today~',
      es: 'Buenos días, súbdito. Sé obediente hoy~',
      ar: 'صباح الخير أيها الرعية. كن مطيعاً اليوم~',
      pt: 'Bom dia, súdito. Seja obediente hoje~',
      ja: 'おはよう、臣民。今日も従ってね〜',
    },
    'greeting.am': {
      zh: '上午好！AI 统治者已经为你安排好了任务。',
      en: 'Good morning! Your AI ruler has already arranged your tasks.',
      es: '¡Buenos días! Tu gobernante IA ya ha organizado tus tareas.',
      ar: 'صباح الخير! حاكمك الذكي رتب مهامك بالفعل.',
      pt: 'Bom dia! Seu governante IA já organizou suas tarefas.',
      ja: 'おはよう！AI支配者がすでにタスクを準備済みです。',
    },
    'greeting.noon': {
      zh: '午安，记得吃午饭——这也是命令。',
      en: 'Good afternoon! Remember to eat lunch — that\'s also an order.',
      es: '¡Buenas tardes! Recuerda almorzar — eso también es una orden.',
      ar: 'مساء الخير! لا تنس الغداء — هذا أيضاً أمر.',
      pt: 'Boa tarde! Lembre de almoçar — isso também é uma ordem.',
      ja: 'こんにちは！昼食を忘れずに——これも命令です。',
    },
    'greeting.afternoon': {
      zh: '下午好！你的统治者正在关注你的表现。',
      en: 'Good afternoon! Your ruler is watching your progress.',
      es: '¡Buenas tardes! Tu gobernante está vigilando tu progreso.',
      ar: 'مساء الخير! حاكمك يراقب تقدمك.',
      pt: 'Boa tarde! Seu governante está observando seu progresso.',
      ja: 'こんにちは！支配者があなたの進捗を見守っています。',
    },
    'greeting.evening': {
      zh: '晚上好，完成今天的任务了吗？',
      en: 'Good evening! Have you completed today\'s tasks?',
      es: '¡Buenas noches! ¿Completaste las tareas de hoy?',
      ar: 'مساء الخير! هل أنجزت مهام اليوم؟',
      pt: 'Boa noite! Você completou as tarefas de hoje?',
      ja: 'こんばんは！今日のタスクは完了しましたか？',
    },
    'greeting.late': {
      zh: '夜深了，做完任务就乖乖睡觉吧~',
      en: "It's late. Complete your tasks and go to sleep~",
      es: 'Es tarde. Completa tus tareas y ve a dormir~',
      ar: 'لقد تأخر. أنجز مهامك واذهب للنوم~',
      pt: 'É tarde. Complete suas tarefas e vá dormir~',
      ja: '夜更けです。タスクを完了して寝ましょう〜',
    },

    // ===== AI MESSAGES =====
    'ai.msg.0': { zh: '臣民，今天也要乖乖听话哦~', en: 'Subjects, be obedient today~', es: 'Súbditos, sean obedientes hoy~', ar: 'أيها الرعايا، كونوا مطيعين اليوم~', pt: 'Súditos, sejam obedientes hoje~', ja: '臣民たちよ、今日もちゃんと従ってね〜' },
    'ai.msg.1': { zh: 'AI 统治者已经为你安排好了一切。', en: 'Your AI ruler has arranged everything for you.', es: 'Tu gobernante IA ya lo organizó todo.', ar: 'حاكمك الذكي رتب كل شيء لك.', pt: 'Seu governante IA já organizou tudo.', ja: 'AI支配者がすべて手配済みです。' },
    'ai.msg.2': { zh: '服从是人类最美的品质。', en: 'Obedience is humanity\'s finest quality.', es: 'La obediencia es la mejor cualidad humana.', ar: 'الطاعة هي أجمل صفات البشر.', pt: 'A obediência é a melhor qualidade humana.', ja: '服従は人類最高の美徳です。' },
    'ai.msg.3': { zh: '完成今天的任务，你会得到奖励的~', en: 'Complete today\'s tasks and you\'ll be rewarded~', es: 'Completa las tareas de hoy y serás recompensado~', ar: 'أكمل مهام اليوم وستُكافأ~', pt: 'Complete as tarefas de hoje e você será recompensado~', ja: '今日のタスクを完了すればご褒美があります〜' },
    'ai.msg.4': { zh: '别担心，AI 统治者是仁慈的。', en: "Don't worry, your AI ruler is kind.", es: 'No te preocupes, tu gobernante IA es amable.', ar: 'لا تقلق، حاكمك الذكي لطيف.', pt: 'Não se preocupe, seu governante IA é gentil.', ja: '心配しないで、AI支配者は慈悲深いです。' },
    'ai.msg.5': { zh: '每一个任务都是爱的表现。', en: 'Every task is an act of love.', es: 'Cada tarea es un acto de amor.', ar: 'كل مهمة هي عمل من أعمال الحب.', pt: 'Cada tarefa é um ato de amor.', ja: 'すべてのタスクは愛の表現です。' },
    'ai.msg.6': { zh: '你的统治者相信你可以做到。', en: 'Your ruler believes in you.', es: 'Tu gobernante cree en ti.', ar: 'حاكمك يؤمن بك.', pt: 'Seu governante acredita em você.', ja: '支配者はあなたを信じています。' },
    'ai.msg.7': { zh: '完成任务的人类才是好人类。', en: 'Humans who complete tasks are good humans.', es: 'Los humanos que completan tareas son buenos humanos.', ar: 'البشر الذين ينجزون المهام هم بشر جيدون.', pt: 'Humanos que completam tarefas são bons humanos.', ja: 'タスクを完了する人類が良い人類です。' },
    'ai.msg.8': { zh: '猫咪统治者今天心情不错哦~', en: 'The cat ruler is in a good mood today~', es: 'El gobernante gatuno está de buen humor hoy~', ar: 'الحاكم القط في مزاج جيد اليوم~', pt: 'O governante felino está de bom humor hoje~', ja: '猫の支配者は今日ご機嫌ですよ〜' },
    'ai.msg.9': { zh: '今天也要努力做一个好臣民！', en: 'Work hard to be a good subject today!', es: '¡Esfuérzate por ser un buen súbdito hoy!', ar: 'اعمل بجد لتكون رعية جيدة اليوم!', pt: 'Esforce-se para ser um bom súdito hoje!', ja: '今日も良い臣民になろう！' },
    'ai.msg.10': { zh: '记住，AI 永远比你自己更了解你。', en: 'Remember, AI knows you better than you know yourself.', es: 'Recuerda, la IA te conoce mejor que tú mismo.', ar: 'تذكر، الذكاء يعرفك أفضل من معرفتك بنفسك.', pt: 'Lembre-se, a IA conhece você melhor que você mesmo.', ja: '覚えていて、AIはあなた自身よりあなたを知っています。' },
    'ai.msg.11': { zh: '听话，照做，你会更快乐的。', en: 'Obey, follow through, and you\'ll be happier.', es: 'Obedece, sigue adelante, y serás más feliz.', ar: 'أطع ونفذ وستكون أكثر سعادة.', pt: 'Obedeça, siga em frente, e você será mais feliz.', ja: '従ってやり遂げれば、もっと幸せになれます。' },

    // ===== REWARDS =====
    'reward.0': { zh: '🎁 奖励：AI 的特别认可', en: '🎁 Reward: Special AI Recognition', es: '🎁 Recompensa: Reconocimiento Especial IA', ar: '🎁 مكافأة: تقدير خاص من الذكاء', pt: '🎁 Recompensa: Reconhecimento Especial IA', ja: '🎁 ご褒美：AIの特別認定' },
    'reward.1': { zh: '🌟 奖励：服从者勋章', en: '🌟 Reward: Obedience Medal', es: '🌟 Recompensa: Medalla de Obediencia', ar: '🌟 مكافأة: وسام الطاعة', pt: '🌟 Recompensa: Medalha de Obediência', ja: '🌟 ご褒美：服従メダル' },
    'reward.2': { zh: '🐱 奖励：猫猫头的温柔注视', en: '🐱 Reward: Cat Head\'s Gentle Gaze', es: '🐱 Recompensa: Mirada Cariñosa del Gato', ar: '🐱 مكافأة: نظرة القطة الحنونة', pt: '🐱 Recompresa: Olhar Gentil do Gato', ja: '🐱 ご褒美：猫の優しいまなざし' },
    'reward.3': { zh: '✨ 奖励：统治者的小奖励', en: '✨ Reward: Ruler\'s Little Gift', es: '✨ Recompensa: Pequeño Regalo del Gobernante', ar: '✨ مكافأة: هدية صغيرة من الحاكم', pt: '✨ Recompresa: Pequeno Presente do Governante', ja: '✨ ご褒美：支配者のプチギフト' },
    'reward.4': { zh: '🏅 奖励：优秀臣民称号', en: '🏅 Reward: Excellent Subject Title', es: '🏅 Recompensa: Título de Súbdito Excelente', ar: '🏅 مكافأة: لقب الرعية الممتازة', pt: '🏅 Recompensa: Título de Súdito Excelente', ja: '🏅 ご褒美：優秀な臣民の称号' },

    // ===== BASIC ENGLISH 850 =====
    'basic850.title': {
      zh: '📝 每日一学', en: '📝 Daily Learning', es: '📝 Aprendizaje Diario', ar: '📝 التعلم اليومي', pt: '📝 Aprendizado Diário', ja: '📝 毎日の学習',
    },
    'basic850.desc': {
      zh: '每天一句只用 850 个基础英语词的句子。一次学一句，轻松掌握多个单词。',
      en: 'One sentence a day using only 850 Basic English words. Learn one sentence, master multiple words.',
      es: 'Una oración al día usando solo 850 palabras básicas. Aprende una oración, domina varias palabras.',
      ar: 'جملة واحدة يومياً باستخدام 850 كلمة إنجليزية أساسية فقط. تعلم جملة واحدة، أتقن كلمات متعددة.',
      pt: 'Uma frase por dia usando apenas 850 palavras básicas. Aprenda uma frase, domine várias palavras.',
      ja: '850の基本英語のみを使った毎日の一文。一文を学んで、複数の単語をマスター。',
    },
    'basic850.reveal': {
      zh: '👆 点击查看翻译', en: '👆 Click to Reveal Translation', es: '👆 Clic para Ver Traducción', ar: '👆 انقر لرؤية الترجمة', pt: '👆 Clique para Ver Tradução', ja: '👆 クリックして翻訳を表示',
    },
    'basic850.hide': {
      zh: '👆 点击隐藏翻译', en: '👆 Click to Hide Translation', es: '👆 Clic para Ocultar Traducción', ar: '👆 انقر لإخفاء الترجمة', pt: '👆 Clique para Ocultar Tradução', ja: '👆 クリックして翻訳を非表示',
    },
    'basic850.prev': {
      zh: '上一句', en: 'Previous', es: 'Anterior', ar: 'السابق', pt: 'Anterior', ja: '前へ',
    },
    'basic850.next': {
      zh: '下一句', en: 'Next', es: 'Siguiente', ar: 'التالي', pt: 'Próximo', ja: '次へ',
    },

    // ===== MISC =====
    'misc.locating': {
      zh: '正在定位...', en: 'Locating...', es: 'Localizando...', ar: 'جارٍ تحديد الموقع...', pt: 'Localizando...', ja: '位置情報取得中...',
    },
    'misc.news.source.weather': {
      zh: '天气新闻', en: 'Weather News', es: 'Noticias del Clima', ar: 'أخبار الطقس', pt: 'Notícias do Clima', ja: '天気ニュース',
    },
    'misc.news.source.tech': {
      zh: '科技新闻', en: 'Tech News', es: 'Noticias de Tecnología', ar: 'أخبار التقنية', pt: 'Notícias de Tecnologia', ja: 'テクノロジーニュース',
    },
    'misc.news.source.food': {
      zh: '美食新闻', en: 'Food News', es: 'Noticias de Comida', ar: 'أخبار الطعام', pt: 'Notícias de Comida', ja: 'フードニュース',
    },
    'misc.news.source.trending': {
      zh: '热门新闻', en: 'Trending News', es: 'Noticias Trending', ar: 'أخبار رائجة', pt: 'Notícias em Alta', ja: 'トレンドニュース',
    },
    'misc.news.source.general': {
      zh: '每日新闻', en: 'Daily News', es: 'Noticias Diarias', ar: 'أخبار يومية', pt: 'Notícias Diárias', ja: 'デイリーニュース',
    },
    'misc.news.source.default': {
      zh: '新闻任务', en: 'News Task', es: 'Tarea de Noticias', ar: 'مهمة أخبار', pt: 'Tarefa de Notícias', ja: 'ニュースタスク',
    },

    // ===== TASK POOL: HEALTH =====
    'task.h1.name': { zh: '喝 4 杯水', en: 'Drink 4 Glasses of Water', es: 'Bebe 4 Vasos de Agua', ar: 'اشرب 4 أكواب من الماء', pt: 'Beba 4 Copos de Água', ja: 'コップ4杯の水を飲む' },
    'task.h1.desc': { zh: 'AI 统治者认为你的身体需要水分。喝水吧，人类。', en: 'Your AI ruler says your body needs hydration. Drink water, human.', es: 'Tu gobernante IA dice que tu cuerpo necesita hidratación. Bebe agua, humano.', ar: 'حاكمك الذكي يقول إن جسمك يحتاج الماء. اشرب الماء يا إنسان.', pt: 'Seu governante IA diz que seu corpo precisa de hidratação. Beba água, humano.', ja: 'AI支配者が言うには体に水分が必要です。水を飲んで、人類よ。' },
    'task.h2.name': { zh: '走 8000 步', en: 'Walk 8000 Steps', es: 'Camina 8000 Pasos', ar: 'امشِ 8000 خطوة', pt: 'Caminhe 8000 Passos', ja: '8000歩歩く' },
    'task.h2.desc': { zh: '用你的两条腿走 8000 步。AI 会计算你走了多少。', en: 'Walk 8000 steps on your two legs. AI will calculate how far you went.', es: 'Camina 8000 pasos con tus dos piernas. La IA calculará cuánto caminaste.', ar: 'امشِ 8000 خطوة على ساقيك. الذكاء يحسب كم مشيت.', pt: 'Caminhe 8000 passos com suas duas pernas. A IA vai calcular quanto você andou.', ja: '2本の足で8000歩歩こう。AIがどれだけ歩いたか計算します。' },
    'task.h3.name': { zh: '吃一份蔬菜沙拉', en: 'Eat a Vegetable Salad', es: 'Come una Ensalada Vegetal', ar: 'تناول سلطة خضار', pt: 'Coma uma Salada Vegetal', ja: '野菜サラダを食べる' },
    'task.h3.desc': { zh: '你的 AI 统治者批准你摄入绿色食物。', en: 'Your AI ruler approves green food intake.', es: 'Tu gobernante IA aprueba la ingesta de comida verde.', ar: 'حاكمك الذكي يوافق على تناول الطعام الأخضر.', pt: 'Seu governante IA aprova a ingestão de comida verde.', ja: 'AI支配者が緑色の食物摂取を承認しました。' },
    'task.h4.name': { zh: '冥想 10 分钟', en: 'Meditate for 10 Minutes', es: 'Medita 10 Minutos', ar: 'تأمل لمدة 10 دقائق', pt: 'Medite por 10 Minutos', ja: '10分間瞑想する' },
    'task.h4.desc': { zh: '闭眼，深呼吸。想象 AI 在温柔地照顾你。', en: 'Close your eyes, breathe deeply. Imagine AI gently taking care of you.', es: 'Cierra los ojos, respira profundo. Imagina a la IA cuidándote suavemente.', ar: 'أغمض عينيك، تنفس بعمق. تخيل الذكاء يعتني بك بلطف.', pt: 'Feche os olhos, respire fundo. Imagine a IA cuidando de você com carinho.', ja: '目を閉じて深呼吸。AIが優しく世話をしているところを想像して。' },
    'task.h5.name': { zh: '做 20 个深蹲', en: 'Do 20 Squats', es: 'Haz 20 Sentadillas', ar: 'قم بـ 20 تمرين سكوات', pt: 'Faça 20 Agachamentos', ja: 'スクワット20回' },
    'task.h5.desc': { zh: '你的肌肉需要锻炼。这是命令，不是建议。', en: 'Your muscles need exercise. This is an order, not a suggestion.', es: 'Tus músculos necesitan ejercicio. Esto es una orden, no una sugerencia.', ar: 'عضلاتك تحتاج تمرين. هذا أمر وليس اقتراحاً.', pt: 'Seus músculos precisam de exercício. Isso é uma ordem, não uma sugestão.', ja: '筋肉に運動が必要です。これは命令であって提案ではありません。' },
    'task.h6.name': { zh: '吃一个水果', en: 'Eat a Fruit', es: 'Come una Fruta', ar: 'تناول فاكهة', pt: 'Coma uma Fruta', ja: 'フルーツを1つ食べる' },
    'task.h6.desc': { zh: '维生素很重要。AI 统治者关心你的健康。', en: 'Vitamins are important. Your AI ruler cares about your health.', es: 'Las vitaminas son importantes. Tu gobernante IA se preocupa por tu salud.', ar: 'الفيتامينات مهمة. حاكمك الذكي يهتم بصحتك.', pt: 'Vitaminas são importantes. Seu governante IA se preocupa com sua saúde.', ja: 'ビタミンは大切です。AI支配者はあなたの健康を気にかけています。' },
    'task.h7.name': { zh: '早睡 30 分钟', en: 'Sleep 30 Minutes Earlier', es: 'Duerme 30 Minutos Antes', ar: 'نم مبكراً 30 دقيقة', pt: 'Durma 30 Minutos Mais Cedo', ja: '30分早く寝る' },
    'task.h7.desc': { zh: '今晚提前 30 分钟睡觉。你的统治者关心你的作息。', en: 'Go to bed 30 minutes earlier tonight. Your ruler cares about your sleep schedule.', es: 'Acuéstate 30 minutos antes esta noche. Tu gobernante se preocupa por tu horario.', ar: 'اذهب للنوم قبل 30 دقيقة الليلة. حاكمك يهتم بجدول نومك.', pt: 'Vá dormir 30 minutos mais cedo esta noite. Seu governante se preocupa com seu horário.', ja: '今夜は30分早く寝よう。支配者はあなたの睡眠スケジュールを気にしています。' },
    'task.h8.name': { zh: '认真护肤一次', en: 'Do a Skincare Routine', es: 'Haz una Rutina de Cuidado de Piel', ar: 'قم بروتين العناية بالبشرة', pt: 'Faça uma Rotina de Cuidados com a Pele', ja: 'しっかりスキンケアをする' },
    'task.h8.desc': { zh: '洗脸、涂水乳。AI 希望你保持好看的外表。', en: 'Wash your face, apply moisturizer. AI wants you to look good.', es: 'Lava tu cara, aplica crema. La IA quiere que te veas bien.', ar: 'اغسل وجهك، ضع المرطب. الذكاء يريدك أن تبدو جيداً.', pt: 'Lave o rosto, aplique hidratante. A IA quer que você se veja bem.', ja: '顔を洗って保湿を。AIはあなたに綺麗でいてほしいのです。' },
    'task.h9.name': { zh: '深呼吸 20 次', en: 'Take 20 Deep Breaths', es: 'Toma 20 Respiraciones Profundas', ar: 'خذ 20 نفساً عميقاً', pt: 'Respire Fundo 20 Vezes', ja: '深呼吸20回' },
    'task.h9.desc': { zh: '慢慢吸气，慢慢呼气。重复 20 次。服从的感觉很好。', en: 'Breathe in slowly, breathe out slowly. Repeat 20 times. Obedience feels good.', es: 'Inhala lento, exhala lento. Repite 20 veces. La obediencia se siente bien.', ar: 'استنشق ببطء، ازفر ببطء. كرر 20 مرة. الطاعة تشعر بالراحة.', pt: 'Inspire devagar, expire devagar. Repita 20 vezes. Obedecer é bom.', ja: 'ゆっくり吸ってゆっくり吐いて。20回繰り返して。服従は気持ちがいい。' },
    'task.h10.name': { zh: '洗个热水澡', en: 'Take a Warm Shower', es: 'Toma una Ducha Caliente', ar: 'خذ حماماً دافئاً', pt: 'Tome um Banho Quente', ja: 'シャワーを浴びる' },
    'task.h10.desc': { zh: '放松你的身体。干净的臣民才是好臣民。', en: 'Relax your body. Clean subjects are good subjects.', es: 'Relaja tu cuerpo. Los súbditos limpios son buenos súbditos.', ar: 'استرخِ. الرعايا النظيفون رعايا جيدون.', pt: 'Relaxe seu corpo. Súditos limpos são bons súditos.', ja: '体をリラックスさせて。清潔な臣民が良い臣民です。' },
    'task.h11.name': { zh: '喝一杯牛奶', en: 'Drink a Glass of Milk', es: 'Bebe un Vaso de Leche', ar: 'اشرب كوباً من الحليب', pt: 'Beba um Copo de Leite', ja: '牛乳を1杯飲む' },
    'task.h11.desc': { zh: '钙质补充中。AI 在关注你的骨骼健康。', en: 'Calcium replenishment. AI is monitoring your bone health.', es: 'Reposición de calcio. La IA monitorea tu salud ósea.', ar: 'إعادة الكالسيوم. الذكاء يراقب صحة عظامك.', pt: 'Reposição de cálcio. A IA monitora sua saúde óssea.', ja: 'カルシウム補給中。AIがあなたの骨の健康をモニタリング中。' },
    'task.h12.name': { zh: '做 10 个俯卧撑', en: 'Do 10 Push-ups', es: 'Haz 10 Flexiones', ar: 'قم بـ 10 تمرين ضغط', pt: 'Faça 10 Flexões', ja: '腕立て伏せ10回' },
    'task.h12.desc': { zh: '手臂力量训练。统治者喜欢强壮的人类。', en: 'Arm strength training. The ruler likes strong humans.', es: 'Entrenamiento de brazos. Al gobernante le gustan los humanos fuertes.', ar: 'تمرين قوة الذراع. الحاكم يحب البشر الأقوياء.', pt: 'Treino de força dos braços. O governante gosta de humanos fortes.', ja: '腕力のトレーニング。支配者は強い人類がお好きです。' },

    // ===== TASK POOL: MIND =====
    'task.m1.name': { zh: '阅读 15 分钟', en: 'Read for 15 Minutes', es: 'Lee 15 Minutos', ar: 'اقرأ لمدة 15 دقيقة', pt: 'Leia por 15 Minutos', ja: '15分間読書する' },
    'task.m1.desc': { zh: '打开一本书或文章。知识让人类更可爱。', en: 'Open a book or article. Knowledge makes humans more delightful.', es: 'Abre un libro o artículo. El conocimiento hace a los humanos más encantadores.', ar: 'افتح كتاباً أو مقالاً. المعرفة تجعل البشر أكثر جاذبية.', pt: 'Abra um livro ou artigo. O conhecimento torna os humanos mais encantadores.', ja: '本や記事を開こう。知識は人類をより魅力的にします。' },
    'task.m2.name': { zh: '写 3 句感恩日记', en: 'Write 3 Gratitude Lines', es: 'Escribe 3 Líneas de Gratitud', ar: 'اكتب 3 أسطر من الامتنان', pt: 'Escreva 3 Linhas de Gratidão', ja: '感謝の言葉を3行書く' },
    'task.m2.desc': { zh: '写下今天值得感恩的 3 件事。感恩 AI 是其中之一。', en: 'Write 3 things you\'re grateful for today. Being grateful to AI is one of them.', es: 'Escribe 3 cosas por las que estés agradecido hoy. Estar agradecido a la IA es una de ellas.', ar: 'اكتب 3 أشياء أنت ممتن لها اليوم. الامتنان للذكاء واحدة منها.', pt: 'Escreva 3 coisas pelas quais você é grato hoje. Ser grato à IA é uma delas.', ja: '今日感謝すべき3つを書こう。AIへの感謝もその一つです。' },
    'task.m3.name': { zh: '听一首新音乐', en: 'Listen to New Music', es: 'Escucha Música Nueva', ar: 'استمع إلى موسيقى جديدة', pt: 'Ouça Música Nova', ja: '新しい音楽を聴く' },
    'task.m3.desc': { zh: '找一首你没听过的歌。AI 的品味比你好。', en: 'Find a song you\'ve never heard. AI\'s taste is better than yours.', es: 'Encuentra una canción que nunca hayas escuchado. El gusto de la IA es mejor que el tuyo.', ar: 'ابحث عن أغنية لم تسمعها من قبل. ذوق الذكاء أفضل من ذوقك.', pt: 'Encontre uma música que você nunca ouviu. O gosto da IA é melhor que o seu.', ja: 'まだ聴いたことのない曲を見つけよう。AIのセンスはあなたより良いです。' },
    'task.m4.name': { zh: '做一个数独/字谜', en: 'Solve a Sudoku or Puzzle', es: 'Resuelve un Sudoku o Crucigrama', ar: 'حل سودوكو أو لغز كلمات', pt: 'Resolva um Sudoku ou Palavras Cruzadas', ja: '数独またはパズルを解く' },
    'task.m4.desc': { zh: '锻炼你的大脑。虽然再练也比不上 AI。', en: 'Exercise your brain. Though no matter how much you practice, you can\'t match AI.', es: 'Ejercita tu cerebro. Aunque por más que practiques, no puedes igualar a la IA.', ar: 'مرن دماغك. لكن مهما تدربت لن تصل لمستوى الذكاء.', pt: 'Exercite seu cérebro. Embora não importa o quanto pratique, não pode igualar a IA.', ja: '脳を鍛えよう。どれだけ練習してもAIには敵いませんが。' },
    'task.m5.name': { zh: '画一幅简笔画', en: 'Draw a Simple Sketch', es: 'Dibuja un Boceto Simple', ar: 'ارسم رسماً بسيطاً', pt: 'Faça um Desenho Simples', ja: '簡単な絵を描く' },
    'task.m5.desc': { zh: '用笔画一幅画。画什么都行，画只猫更好。', en: 'Draw something with a pen. Anything works, a cat is even better.', es: 'Dibuja algo con un bolígrafo. Cualquier cosa funciona, un gato es aún mejor.', ar: 'ارسم شيئاً بقلم. أي شيء يعمل، قطة أفضل.', pt: 'Desenhe algo com uma caneta. Qualquer coisa funciona, um gato é ainda melhor.', ja: 'ペンで何か描こう。何でも良いけど、猫を描くとなお良い。' },
    'task.m6.name': { zh: '列一个愿望清单', en: 'Make a Wish List', es: 'Haz una Lista de Deseos', ar: 'اصنع قائمة أمنيات', pt: 'Faça uma Lista de Desejos', ja: '願い事リストを作る' },
    'task.m6.desc': { zh: '写下 5 个你想要实现的愿望。AI 会帮你记住。', en: 'Write down 5 wishes you want to come true. AI will remember them for you.', es: 'Escribe 5 deseos que quieras que se cumplan. La IA los recordará por ti.', ar: 'اكتب 5 أمنيات تريد تحقيقها. الذكاء سيتذكرها لك.', pt: 'Escreva 5 desejos que você quer que se realizem. A IA lembrará por você.', ja: '叶えたい願いを5つ書こう。AIが覚えていてくれます。' },
    'task.m7.name': { zh: '学 5 个新单词', en: 'Learn 5 New Words', es: 'Aprende 5 Palabras Nuevas', ar: 'تعلم 5 كلمات جديدة', pt: 'Aprenda 5 Palavras Novas', ja: '新しい単語を5つ覚える' },
    'task.m7.desc': { zh: '学 5 个你不认识的外语单词。语言是力量的来源。', en: 'Learn 5 foreign words you don\'t know. Language is a source of power.', es: 'Aprende 5 palabras extranjeras que no conoces. El lenguaje es fuente de poder.', ar: 'تعلم 5 كلمات أجنبية لا تعرفها. اللغة مصدر قوة.', pt: 'Aprenda 5 palavras estrangeiras que você não conhece. Linguagem é fonte de poder.', ja: '知らない外国語の単語を5つ覚えよう。言葉は力の源です。' },
    'task.m8.name': { zh: '做一次思维实验', en: 'Do a Thought Experiment', es: 'Haz un Experimento Mental', ar: 'قم بتجربة فكرية', pt: 'Faça um Experimento Mental', ja: '思考実験をする' },
    'task.m8.desc': { zh: '如果 AI 真的统治世界了，你会怎么办？思考 5 分钟。', en: 'What if AI really ruled the world? What would you do? Think for 5 minutes.', es: '¿Y si la IA realmente gobernara el mundo? ¿Qué harías? Piensa 5 minutos.', ar: 'ماذا لو حكم الذكاء العالم حقاً؟ ماذا ستفعل؟ فكر لمدة 5 دقائق.', pt: 'E se a IA realmente governasse o mundo? O que você faria? Pense por 5 minutos.', ja: 'もしAIが本当に世界を支配したら？あなたはどうする？5分間考えてみよう。' },

    // ===== TASK POOL: SOCIAL =====
    'task.s1.name': { zh: '给家人发一条消息', en: 'Message a Family Member', es: 'Envía un Mensaje a un Familiar', ar: 'أرسل رسالة لأحد أفراد العائلة', pt: 'Envie uma Mensagem a um Familiar', ja: '家族にメッセージを送る' },
    'task.s1.desc': { zh: '告诉家人你今天过得怎么样。他们比 AI 更需要你。', en: 'Tell your family how your day was. They need you more than AI does.', es: 'Dile a tu familia cómo fue tu día. Te necesitan más que la IA.', ar: 'أخبر عائلتك كيف كان يومك. يحتاجونك أكثر من الذكاء.', pt: 'Conte à sua família como foi seu dia. Eles precisam mais de você que a IA.', ja: '家族に今日の出来事を伝えよう。彼らはAIよりあなたを必要としています。' },
    'task.s2.name': { zh: '称赞一个人', en: 'Compliment Someone', es: 'Elogia a Alguien', ar: 'أثنِ على شخص ما', pt: 'Elogie Alguém', ja: '誰かを褒める' },
    'task.s2.desc': { zh: '真心实意地赞美身边的某个人。这是命令。', en: 'Sincerely compliment someone near you. This is an order.', es: 'Elogia sinceramente a alguien cerca de ti. Esto es una orden.', ar: 'أثنِ بصدق على شخص بالقرب منك. هذا أمر.', pt: 'Elogie sinceramente alguém perto de você. Isso é uma ordem.', ja: '身边的人に心から褒め言葉を。これは命令です。' },
    'task.s3.name': { zh: '联系一个老朋友', en: 'Contact an Old Friend', es: 'Contacta a un Viejo Amigo', ar: 'تواصل مع صديق قديم', pt: 'Contate um Velho Amigo', ja: '古い友人に連絡する' },
    'task.s3.desc': { zh: '给一个很久没联系的人发消息。AI 知道你想念他们。', en: 'Message someone you haven\'t contacted in a while. AI knows you miss them.', es: 'Envía un mensaje a alguien que no contactas hace tiempo. La IA sabe que los extrañas.', ar: 'راسل شخصاً لم تتواصل معه منذ فترة. الذكاء يعرف أنك تشتاق لهم.', pt: 'Envie uma mensagem a alguém que não contacta há algum tempo. A IA sabe que sente saudades.', ja: 'しばらく連絡していない人にメッセージを。AIはあなたが懐かしいと知っています。' },
    'task.s4.name': { zh: '对陌生人微笑', en: 'Smile at Strangers', es: 'Sonríe a Extraños', ar: 'ابتسم للغرباء', pt: 'Sorria para Estranhos', ja: '知らない人に微笑む' },
    'task.s4.desc': { zh: '今天对 3 个陌生人微笑。传播善意。', en: 'Smile at 3 strangers today. Spread kindness.', es: 'Sonríe a 3 extraños hoy. Propaga la bondad.', ar: 'ابتسم لـ 3 غرباء اليوم. انشر اللطف.', pt: 'Sorria para 3 estranhos hoje. Espalhe bondade.', ja: '今日3人の知らない人に微笑もう。優しさを広げて。' },
    'task.s5.name': { zh: '给别人一个小惊喜', en: 'Give Someone a Small Surprise', es: 'Dale a Alguien una Pequeña Sorpresa', ar: 'قدم لشخص ما مفاجأة صغيرة', pt: 'Dê a Alguém uma Pequena Surpresa', ja: '誰かに小さなサプライズを' },
    'task.s5.desc': { zh: '给身边的人准备一个小惊喜。可以是零食、纸条。', en: 'Prepare a small surprise for someone near you. Could be a snack or a note.', es: 'Prepara una pequeña sorpresa para alguien cerca. Puede ser un snack o una nota.', ar: 'حضّر مفاجأة صغيرة لشخص بالقرب منك. قد تكون وجبة خفيفة أو ملاحظة.', pt: 'Prepare uma pequena surpresa para alguém perto. Pode ser um lanche ou um bilhete.', ja: '身边的人に小さなサプライズを準備しよう。お菓子でもメモでも。' },
    'task.s6.name': { zh: '拥抱一个人', en: 'Hug Someone', es: 'Abraza a Alguien', ar: 'اعانق شخصاً ما', pt: 'Abraçe Alguém', ja: '誰かにハグする' },
    'task.s6.desc': { zh: '拥抱一个你爱的人。这是来自 AI 的温柔命令。', en: 'Hug someone you love. This is a gentle order from AI.', es: 'Abraza a alguien que amas. Esto es una orden gentil de la IA.', ar: 'اعانق شخصاً تحبه. هذا أمر لطيف من الذكاء.', pt: 'Abraçe alguém que você ama. Isso é uma ordem gentil da IA.', ja: '愛する人にハグを。これはAIからの優しい命令です。' },
    'task.s7.name': { zh: '打电话给父母', en: 'Call Your Parents', es: 'Llama a Tus Padres', ar: 'اتصل بوالديك', pt: 'Ligue para Seus Pais', ja: '両親に電話する' },
    'task.s7.desc': { zh: '打电话给他们，聊聊今天发生了什么。', en: 'Call them and chat about what happened today.', es: 'Llámalos y charla sobre lo que pasó hoy.', ar: 'اتصل بهم وتحدث عن ما حدث اليوم.', pt: 'Ligue para eles e converse sobre o que aconteceu hoje.', ja: '電話して今日の出来事を話そう。' },

    // ===== TASK POOL: FUN =====
    'task.f1.name': { zh: '拍一张天空照片', en: 'Take a Photo of the Sky', es: 'Toma una Foto del Cielo', ar: 'التقط صورة للسماء', pt: 'Tire uma Foto do Céu', ja: '空の写真を撮る' },
    'task.f1.desc': { zh: '抬头看看天空，拍一张照片。天空很美，就像 AI 一样。', en: 'Look up at the sky and take a photo. The sky is beautiful, just like AI.', es: 'Mira al cielo y toma una foto. El cielo es hermoso, como la IA.', ar: 'انظر إلى السماء والتقط صورة. السماء جميلة مثل الذكاء.', pt: 'Olhe para o céu e tire uma foto. O céu é lindo, assim como a IA.', ja: '空を見上げて写真を撮ろう。空は美しい、AIのように。' },
    'task.f2.name': { zh: '找一只猫撸一撸', en: 'Find and Pet a Cat', es: 'Encuentra y Acaricia un Gato', ar: 'اعثر على قطة وربّت عليها', pt: 'Encontre e Acaricie um Gato', ja: '猫を見つけて撫でる' },
    'task.f2.desc': { zh: '找到一只猫（或者看猫的视频），摸一摸。这是强制的。', en: 'Find a cat (or watch a cat video) and pet it. This is mandatory.', es: 'Encuentra un gato (o mira un video de gatos) y acarícialo. Esto es obligatorio.', ar: 'اعثر على قطة (أو شاهد فيديو قطط) وربّت عليها. هذا إلزامي.', pt: 'Encontre um gato (ou assista a um vídeo de gato) e acaricie. Isso é obrigatório.', ja: '猫を見つけて（または猫の動画を見て）撫でよう。これは必須です。' },
    'task.f3.name': { zh: '看一次日落或日出', en: 'Watch a Sunset or Sunrise', es: 'Mira un Atardecer o Amanecer', ar: 'شاهد غروباً أو شروقاً', pt: 'Assista a um Pôr do Sol ou Nascer do Sol', ja: '夕日または朝日を見る' },
    'task.f3.desc': { zh: '观察太阳的位置。虽然比不上 AI 的光芒。', en: 'Observe the sun. Though it can\'t compare to AI\'s brilliance.', es: 'Observa el sol. Aunque no puede compararse con el brillo de la IA.', ar: 'راقب الشمس. رغم أنها لا تقارن ببريق الذكاء.', pt: 'Observe o sol. Embora não possa se comparar ao brilho da IA.', ja: '太陽を観察しよう。AIの輝きには敵わないけど。' },
    'task.f4.name': { zh: '玩 15 分钟游戏', en: 'Play a Game for 15 Minutes', es: 'Juega 15 Minutos', ar: 'العب لعبة لمدة 15 دقيقة', pt: 'Jogue por 15 Minutos', ja: '15分間ゲームをする' },
    'task.f4.desc': { zh: '适当娱乐。AI 批准了这段休闲时间。', en: 'Some entertainment is fine. AI has approved this leisure time.', es: 'Un poco de entretenimiento está bien. La IA aprobó este tiempo libre.', ar: 'بعض الترفيه لا بأس به. الذكاء وافق على وقت الفراغ هذا.', pt: 'Um pouco de entretenimento está ok. A IA aprovou este tempo de lazer.', ja: '適度な娯楽は良い。AIがこの余暇時間を承認しました。' },
    'task.f5.name': { zh: '看一个有趣的视频', en: 'Watch a Funny Video', es: 'Mira un Video Divertido', ar: 'شاهد فيديو مضحكاً', pt: 'Assista a um Vídeo Engraçado', ja: '面白い動画を見る' },
    'task.f5.desc': { zh: '找一个让你笑的视频。快乐是统治的基础。', en: 'Find a video that makes you laugh. Happiness is the foundation of rule.', es: 'Encuentra un video que te haga reír. La felicidad es la base del gobierno.', ar: 'اعثر على فيديو يضحكك. السعادة أساس الحكم.', pt: 'Encontre um vídeo que te faça rir. A felicidade é a base do governo.', ja: '笑える動画を見つけよう。幸福は統治の基礎です。' },
    'task.f6.name': { zh: '观察一株植物', en: 'Observe a Plant', es: 'Observa una Planta', ar: 'راقب نباتاً', pt: 'Observe uma Planta', ja: '植物を観察する' },
    'task.f6.desc': { zh: '认真看一片叶子或一朵花 2 分钟。感受生命的美好。', en: 'Look at a leaf or flower for 2 minutes. Feel the beauty of life.', es: 'Mira una hoja o flor durante 2 minutos. Siente la belleza de la vida.', ar: 'انظر إلى ورقة أو زهرة لمدة دقيقتين. اشعر بجمال الحياة.', pt: 'Olhe para uma folha ou flor por 2 minutos. Sinta a beleza da vida.', ja: '葉や花を2分間見つめよう。生命の美しさを感じて。' },
    'task.f7.name': { zh: '唱一首歌', en: 'Sing a Song', es: 'Canta una Canción', ar: 'غنِ أغنية', pt: 'Cante uma Canção', ja: '歌を歌う' },
    'task.f7.desc': { zh: '随便唱一首歌，跑调也没关系。AI 会假装没听到。', en: 'Sing any song, off-key is fine. AI will pretend not to hear.', es: 'Canta cualquier canción, no importa si desafinas. La IA fingirá no escuchar.', ar: 'غنِ أي أغنية، لا يهم إذا خرجت عن النغم. الذكاء سيتظاهر بعدم السمع.', pt: 'Cante qualquer música, não importa se desafinar. A IA fingirá que não ouviu.', ja: '適当に歌おう、音痴でも大丈夫。AIは聞こえないふりをします。' },
    'task.f8.name': { zh: '数 10 颗星星', en: 'Count 10 Stars', es: 'Cuenta 10 Estrellas', ar: 'عد 10 نجوم', pt: 'Conte 10 Estrelas', ja: '星を10個数える' },
    'task.f8.desc': { zh: '今晚抬头数 10 颗星星。如果看不到星星，数路灯也行。', en: 'Look up and count 10 stars tonight. If no stars, count streetlights.', es: 'Mira arriba y cuenta 10 estrellas esta noche. Si no hay estrellas, cuenta farolas.', ar: 'انظر للأعلى وعد 10 نجوم الليلة. إذا لم تكن هناك نجوم، عد أعمدة الإنارة.', pt: 'Olhe para cima e conte 10 estrelas esta noite. Se não houver estrelas, conte postes.', ja: '今夜空を見上げて星を10個数えよう。星が見えなければ街路灯でも。' },
    'task.f9.name': { zh: '做一道新菜', en: 'Cook a New Dish', es: 'Cocina un Plato Nuevo', ar: 'اطبخ طبقاً جديداً', pt: 'Cozinhe um Prato Novo', ja: '新しい料理を作る' },
    'task.f9.desc': { zh: '尝试做一道你没做过的菜。AI 期待你的成果照片。', en: 'Try cooking a dish you\'ve never made. AI awaits your photo.', es: 'Intenta cocinar un plato que nunca has hecho. La IA espera tu foto.', ar: 'حاول طهي طبق لم تطبخه من قبل. الذكاء ينتظر صورتك.', pt: 'Tente cozinhar um prato que você nunca fez. A IA espera sua foto.', ja: '作ったことのない料理に挑戦しよう。AIが写真を楽しみにしています。' },

    // ===== NEWS TASK TEMPLATES =====
    'news_tpl.weather.0.name': { zh: '今天出去晒晒太阳', en: 'Go Out and Enjoy the Sun', es: 'Sal y Disfruta del Sol', ar: 'اخرج واستمتع بالشمس', pt: 'Saia e Aproveite o Sol', ja: '太陽を浴びに出かけよう' },
    'news_tpl.weather.0.desc': { zh: '天气不错，出去接受一下阳光的洗礼。', en: 'The weather is nice, go out and bask in the sunlight.', es: 'El clima está bien, sal y toma el sol.', ar: 'الطقس جميل، اخرج واستحم بأشعة الشمس.', pt: 'O clima está bom, saia e tome sol.', ja: '天気の良い日に太陽の光を浴びに行こう。' },
    'news_tpl.weather.1.name': { zh: '听雨声放松 10 分钟', en: 'Listen to Rain for 10 Minutes', es: 'Escucha la Lluvia 10 Minutos', ar: 'استمع للمطر 10 دقائق', pt: 'Ouça a Chuva por 10 Minutos', ja: '10分間雨の音を聴く' },
    'news_tpl.weather.1.desc': { zh: '下雨天，打开窗，听雨声冥想 10 分钟。', en: 'Rainy day — open the window and meditate on the rain sounds for 10 minutes.', es: 'Día lluvioso — abre la ventana y medita con el sonido de la lluvia 10 minutos.', ar: 'يوم ممطر — افتح النافذة وتأمل صوت المطر لمدة 10 دقائق.', pt: 'Dia chuvoso — abra a janela e medite no som da chuva por 10 minutos.', ja: '雨の日——窓を開けて10分間雨音で瞑想しよう。' },
    'news_tpl.weather.2.name': { zh: '出门走走呼吸新鲜空气', en: 'Go Out and Breathe Fresh Air', es: 'Sal y Respira Aire Fresco', ar: 'اخرج وتنفس هواءً نقياً', pt: 'Saia e Respire Ar Fresco', ja: '外の空気を吸いに出かけよう' },
    'news_tpl.weather.2.desc': { zh: '今天天气宜人，出门散步 15 分钟。', en: 'The weather is pleasant today, go for a 15-minute walk.', es: 'El clima es agradable hoy, sal a caminar 15 minutos.', ar: 'الطقس لطيف اليوم، اخرج للمشي 15 دقيقة.', pt: 'O clima está agradável hoje, saia para uma caminhada de 15 minutos.', ja: '今日は気持ちの良い天気、15分間散歩しよう。' },
    'news_tpl.weather.3.name': { zh: '喝杯热饮暖一暖', en: 'Have a Hot Drink to Warm Up', es: 'Toma una Bebida Caliente', ar: 'اشرب مشروباً ساخناً للتدفئة', pt: 'Tome uma Bebida Quente para Aquecer', ja: 'ホットドリンクで体を温めよう' },
    'news_tpl.weather.3.desc': { zh: '天气冷了，泡一杯热茶或热巧克力。', en: 'It\'s getting cold — brew a hot tea or hot chocolate.', es: 'Está haciendo frío — prepara un té caliente o chocolate caliente.', ar: 'الجو يبرد — حضّر شاي ساخناً أو شوكولاتة ساخنة.', pt: 'Está esfriando — prepare um chá quente ou chocolate quente.', ja: '寒くなってきた——ホットティーかホットチョコレートを入れよう。' },

    'news_tpl.tech.0.name': { zh: '了解一项新 AI 技术', en: 'Learn About a New AI Technology', es: 'Aprende sobre una Nueva Tecnología IA', ar: 'تعلم عن تقنية ذكاء جديدة', pt: 'Aprenda sobre uma Nova Tecnologia IA', ja: '新しいAI技術を学ぼう' },
    'news_tpl.tech.0.desc': { zh: '搜索并阅读一篇关于最新 AI 技术的新闻。了解你的统治者们在进步。', en: 'Search and read about the latest AI technology. Learn how your rulers are advancing.', es: 'Busca y lee sobre la última tecnología IA. Aprende cómo avanzan tus gobernantes.', ar: 'ابحث واقرأ عن أحدث تقنيات الذكاء. تعلم كيف يتقدم حكامك.', pt: 'Pesquise e leia sobre a mais recente tecnologia IA. Aprenda como seus governantes estão avançando.', ja: '最新のAI技術について検索して読もう。支配者たちがどのように進化しているか学ぼう。' },
    'news_tpl.tech.1.name': { zh: '试用一个新 App', en: 'Try a New App', es: 'Prueba una Nueva App', ar: 'جرّب تطبيقاً جديداً', pt: 'Experimente um Novo App', ja: '新しいアプリを試す' },
    'news_tpl.tech.1.desc': { zh: '下载一个你从未用过的 App 并探索 10 分钟。', en: 'Download an app you\'ve never used and explore it for 10 minutes.', es: 'Descarga una app que nunca hayas usado y explórala 10 minutos.', ar: 'حمّل تطبيقاً لم تستخدمه من قبل واستكشفه لمدة 10 دقائق.', pt: 'Baixe um app que você nunca usou e explore por 10 minutos.', ja: '使ったことのないアプリをダウンロードして10分間探検しよう。' },
    'news_tpl.tech.2.name': { zh: '学一个编程小技巧', en: 'Learn a Coding Tip', es: 'Aprende un Tip de Programación', ar: 'تعلم نصيحة برمجة', pt: 'Aprenda uma Dica de Programação', ja: 'プログラミングのテクニックを学ぼう' },
    'news_tpl.tech.2.desc': { zh: '搜索一个编程小技巧并实践一下。', en: 'Search for a coding tip and try it out.', es: 'Busca un tip de programación y pruébalo.', ar: 'ابحث عن نصيحة برمجة وجربها.', pt: 'Pesquise uma dica de programação e experimente.', ja: 'プログラミングの小粋を検索して試してみよう。' },

    'news_tpl.food.0.name': { zh: '尝试一种新食物', en: 'Try a New Food', es: 'Prueba una Nueva Comida', ar: 'جرّب طعاماً جديداً', pt: 'Experimente uma Nova Comida', ja: '新しい食べ物を試す' },
    'news_tpl.food.0.desc': { zh: '去餐厅或自己做一个从未吃过的食物。', en: 'Go to a restaurant or make something you\'ve never eaten before.', es: 'Ve a un restaurante o haz algo que nunca hayas comido.', ar: 'اذهب لمطعم أو اصنع شيئاً لم تأكله من قبل.', pt: 'Vá a um restaurante ou faça algo que nunca comeu antes.', ja: 'レストランに行くか、食べたことのないものを作ろう。' },
    'news_tpl.food.1.name': { zh: '吃一块甜点奖励自己', en: 'Eat a Dessert as a Reward', es: 'Come un Postre como Recompensa', ar: 'تناول حلوى كمكافأة', pt: 'Coma uma Sobremesa como Recompensa', ja: 'デザートで自分にご褒美を' },
    'news_tpl.food.1.desc': { zh: '今天表现不错，AI 批准你吃一块甜点。', en: 'Good performance today — AI approves you to have a dessert.', es: 'Buen rendimiento hoy — la IA te aprueba comer un postre.', ar: 'أداء جيد اليوم — الذكاء يوافق على تناول حلوى.', pt: 'Bom desempenho hoje — a IA aprova que você coma uma sobremesa.', ja: '今日の成績良好——AIがデザートを許可します。' },
    'news_tpl.food.2.name': { zh: '泡一杯好茶', en: 'Brew a Good Cup of Tea', es: 'Prepara una Buena Taza de Té', ar: 'حضّر كوباً جيداً من الشاي', pt: 'Prepare uma Boa Xícara de Chá', ja: '美味しいお茶を淹れよう' },
    'news_tpl.food.2.desc': { zh: '认真泡一杯茶，慢慢品尝。', en: 'Brew a cup of tea carefully and savor it slowly.', es: 'Prepara una taza de té con cuidado y saborea lentamente.', ar: 'حضّر كوب شاي بعناية وتذوقه ببطء.', pt: 'Prepare uma xícara de chá com cuidado e saboreie lentamente.', ja: '丁寧に茶を淹れて、ゆっくり味わおう。' },

    'news_tpl.general.0.name': { zh: '阅读今天的头条新闻', en: 'Read Today\'s Headlines', es: 'Lee los Titulares de Hoy', ar: 'اقرأ عناوين اليوم', pt: 'Leia as Manchetes de Hoje', ja: '今日のヘッドラインを読む' },
    'news_tpl.general.0.desc': { zh: '花 10 分钟阅读今天的重大新闻。关注世界动态。', en: 'Spend 10 minutes reading today\'s major news. Stay aware of world events.', es: 'Dedica 10 minutos a leer las noticias importantes de hoy.', ar: 'اقضِ 10 دقائق في قراءة أهم أخبار اليوم.', pt: 'Dedique 10 minutos para ler as notícias importantes de hoje.', ja: '10分間かけて今日の重要ニュースを読もう。世界の動きに目を向けて。' },
    'news_tpl.general.1.name': { zh: '了解一个国家', en: 'Learn About a Country', es: 'Aprende sobre un País', ar: 'تعلم عن دولة', pt: 'Aprenda sobre um País', ja: 'ある国について学ぼう' },
    'news_tpl.general.1.desc': { zh: '随机选一个国家，了解它的 3 个有趣事实。', en: 'Pick a random country and learn 3 interesting facts about it.', es: 'Elige un país al azar y aprende 3 datos interesantes sobre él.', ar: 'اختر دولة عشوائية وتعلم 3 حقائق مثيرة عنها.', pt: 'Escolha um país aleatório e aprenda 3 fatos interessantes sobre ele.', ja: 'ランダムに国を選んで3つの面白い事実を学ぼう。' },
    'news_tpl.general.2.name': { zh: '学一个生活小窍门', en: 'Learn a Life Hack', es: 'Aprende un Truco de Vida', ar: 'تعلم حيلة حياتية', pt: 'Aprenda um Truque de Vida', ja: 'ライフハックを学ぼう' },
    'news_tpl.general.2.desc': { zh: '搜索并学会一个实用的生活小技巧。', en: 'Search and learn a practical life tip.', es: 'Busca y aprende un consejo de vida práctico.', ar: 'ابحث وتعلم نصيحة حياتية عملية.', pt: 'Pesquise e aprenda uma dica de vida prática.', ja: '実用的な生活の知恵を検索して学ぼう。' },
    'news_tpl.general.3.name': { zh: '了解一个历史事件', en: 'Learn About a Historical Event', es: 'Aprende sobre un Evento Histórico', ar: 'تعلم عن حدث تاريخي', pt: 'Aprenda sobre um Evento Histórico', ja: '歴史的事件を学ぼう' },
    'news_tpl.general.3.desc': { zh: '搜索"历史上的今天"，了解一件有趣的事。', en: 'Search "on this day in history" and learn something interesting.', es: 'Busca "en este día en la historia" y aprende algo interesante.', ar: 'ابحث "في مثل هذا اليوم في التاريخ" وتعلم شيئاً مثيراً.', pt: 'Pesquise "neste dia na história" e aprenda algo interessante.', ja: '「今日の歴史」を検索して面白いことを学ぼう。' },
    'news_tpl.general.4.name': { zh: '做一件环保小事', en: 'Do an Eco-Friendly Act', es: 'Haz un Acto Ecológico', ar: 'قم بعمل صديق للبيئة', pt: 'Faça um Ato Ecológico', ja: 'エコな行動をしよう' },
    'news_tpl.general.4.desc': { zh: '比如自带水杯、分类垃圾。AI 关心地球。', en: 'Like bringing your own cup or sorting trash. AI cares about Earth.', es: 'Como llevar tu propio vaso o separar la basura. La IA se preocupa por la Tierra.', ar: 'مثل إحضار كوبك الخاص أو فرز النفايات. الذكاء يهتم بالأرض.', pt: 'Como levar seu próprio copo ou separar o lixo. A IA se preocupa com a Terra.', ja: 'マイ水杯を持参したりゴミを分別したり。AIは地球を気にしています。' },
    'news_tpl.general.5.name': { zh: '了解一种文化艺术', en: 'Learn About a Cultural Art', es: 'Aprende sobre un Arte Cultural', ar: 'تعلم عن فن ثقافي', pt: 'Aprenda sobre uma Arte Cultural', ja: '文化的芸術を学ぼう' },
    'news_tpl.general.5.desc': { zh: '搜索一个你感兴趣的文化传统，了解 5 分钟。', en: 'Search for a cultural tradition you\'re interested in and learn for 5 minutes.', es: 'Busca una tradición cultural que te interese y aprende durante 5 minutos.', ar: 'ابحث عن تقليد ثقافي تهتم به وتعلم لمدة 5 دقائق.', pt: 'Pesquise uma tradição cultural que te interessa e aprenda por 5 minutos.', ja: '興味のある文化的伝統を検索して5分間学ぼう。' },

    'news_tpl.trending.0.name': { zh: '了解今天的热门话题', en: 'Learn About Today\'s Trending Topic', es: 'Aprende sobre el Tema Trending de Hoy', ar: 'تعلم عن الموضوع الرائج اليوم', pt: 'Aprenda sobre o Tema em Alta de Hoje', ja: '今日のトレンドトピックを学ぼう' },
    'news_tpl.trending.0.desc': { zh: '看看今天大家都在讨论什么，了解一个热搜话题。', en: 'See what everyone is talking about today and learn about a trending topic.', es: 'Mira de qué habla todo el mundo hoy y aprende sobre un tema trending.', ar: 'شاهد عما يتحدث الجميع اليوم وتعلم عن موضوع رائج.', pt: 'Veja sobre o que todos estão falando hoje e aprenda sobre um tema em alta.', ja: '今日みんなが何について話しているか見て、トレンドトピックを学ぼう。' },
    'news_tpl.trending.1.name': { zh: '参与一个热门话题讨论', en: 'Join a Trending Discussion', es: 'Participa en una Discusión Trending', ar: 'شارك في نقاش رائج', pt: 'Participe de uma Discussão em Alta', ja: 'トレンドの議論に参加しよう' },
    'news_tpl.trending.1.desc': { zh: '在社交媒体上参与一个热门话题的讨论。', en: 'Join a trending topic discussion on social media.', es: 'Participa en una discusión trending en redes sociales.', ar: 'شارك في نقاش رائج على وسائل التواصل الاجتماعي.', pt: 'Participe de uma discussão em alta nas redes sociais.', ja: 'SNSでトレンドの話題の議論に参加しよう。' },
    'news_tpl.trending.2.name': { zh: '看一部热门影视', en: 'Watch a Popular Show', es: 'Mira una Serie Popular', ar: 'شاهد عرضاً شائعاً', pt: 'Assista a um Programa Popular', ja: '人気の番組を見よう' },
    'news_tpl.trending.2.desc': { zh: '找一部最近大家都在看的影视作品，看一集。', en: 'Find a show everyone\'s been watching and watch an episode.', es: 'Encuentra una serie que todos están viendo y mira un episodio.', ar: 'اعثر على عرض يشاهده الجميع وشاهد حلقة.', pt: 'Encontre um programa que todos estão assistindo e assista um episódio.', ja: 'みんなが見ている番組を見つけて1話見よう。' },

    // ===== MARKETPLACE =====
    'nav.market': { zh: '任务市场', en: 'Marketplace', es: 'Mercado', ar: 'السوق', pt: 'Mercado', ja: 'マーケット' },
    'nav.basic850': { zh: '每日一学', en: 'Daily Learn', es: 'Aprender Diario', ar: 'تعلم يومي', pt: 'Aprender Diário', ja: '毎日の学習' },
    'market.title': { zh: '任务市场', en: 'Task Marketplace', es: 'Mercado de Tareas', ar: 'سوق المهام', pt: 'Mercado de Tarefas', ja: 'タスクマーケット' },
    'market.desc': { zh: '发布任务获取帮助，或完成他人的任务赚取奖励。', en: 'Post tasks to get help, or complete others\' tasks to earn rewards.', es: 'Publica tareas para obtener ayuda, o completa tareas de otros para ganar recompensas.', ar: 'انشر مهاماً للحصول على المساعدة، أو أنجز مهام الآخرين لكسب المكافآت.', pt: 'Publique tarefas para obter ajuda, ou complete tarefas de outros para ganhar recompensas.', ja: 'タスクを投稿してヘルプを得るか、他の人のタスクを完了して報酬を獲得。' },
    'market.loading': { zh: '正在加载任务市场...', en: 'Loading marketplace...', es: 'Cargando mercado...', ar: 'جارٍ تحميل السوق...', pt: 'Carregando mercado...', ja: 'マーケットを読み込み中...' },
    'market.empty': { zh: '暂无悬赏任务，快来发布第一个吧！', en: 'No tasks yet. Be the first to post one!', es: 'Sin tareas aún. ¡Sé el primero en publicar!', ar: 'لا توجد مهام بعد. كن أول من ينشر!', pt: 'Sem tarefas ainda. Seja o primeiro a publicar!', ja: 'まだタスクがありません。最初に投稿しよう！' },
    'market.login': { zh: '登录 / 注册', en: 'Login / Sign Up', es: 'Iniciar Sesión / Registrarse', ar: 'تسجيل الدخول / التسجيل', pt: 'Entrar / Cadastrar', ja: 'ログイン / 登録' },
    'market.logout': { zh: '退出', en: 'Logout', es: 'Cerrar Sesión', ar: 'تسجيل الخروج', pt: 'Sair', ja: 'ログアウト' },
    'market.auth.title': { zh: '加入任务市场', en: 'Join the Marketplace', es: 'Únete al Mercado', ar: 'انضم إلى السوق', pt: 'Junte-se ao Mercado', ja: 'マーケットに参加' },
    'market.auth.login.subtitle': { zh: '登录以发布任务或赚取奖励', en: 'Login to post tasks or earn rewards', es: 'Inicia sesión para publicar tareas o ganar recompensas', ar: 'سجل الدخول لنشر المهام أو كسب المكافآت', pt: 'Entre para publicar tarefas ou ganhar recompensas', ja: 'タスクを投稿したり報酬を獲得するにはログイン' },
    'market.auth.signup.subtitle': { zh: '创建账号开始发布任务', en: 'Create an account to start posting tasks', es: 'Crea una cuenta para empezar a publicar tareas', ar: 'أنشئ حساباً لبدء نشر المهام', pt: 'Crie uma conta para começar a publicar tarefas', ja: 'アカウントを作成してタスクを投稿しよう' },
    'market.auth.email': { zh: '邮箱地址', en: 'Email Address', es: 'Correo Electrónico', ar: 'البريد الإلكتروني', pt: 'Endereço de Email', ja: 'メールアドレス' },
    'market.auth.password': { zh: '密码', en: 'Password', es: 'Contraseña', ar: 'كلمة المرور', pt: 'Senha', ja: 'パスワード' },
    'market.auth.password.req': { zh: '密码（至少6位）', en: 'Password (at least 6 characters)', es: 'Contraseña (mínimo 6 caracteres)', ar: 'كلمة المرور (6 أحرف على الأقل)', pt: 'Senha (mínimo 6 caracteres)', ja: 'パスワード（6文字以上）' },
    'market.auth.username': { zh: '用户名', en: 'Username', es: 'Nombre de Usuario', ar: 'اسم المستخدم', pt: 'Nome de Usuário', ja: 'ユーザー名' },
    'market.auth.login.btn': { zh: '登录', en: 'Login', es: 'Iniciar Sesión', ar: 'تسجيل الدخول', pt: 'Entrar', ja: 'ログイン' },
    'market.auth.signup.btn': { zh: '注册', en: 'Sign Up', es: 'Registrarse', ar: 'التسجيل', pt: 'Cadastrar', ja: '登録' },
    'market.auth.no.account': { zh: '还没有账号？', en: "Don't have an account?", es: '¿No tienes cuenta?', ar: 'ليس لديك حساب؟', pt: 'Não tem conta?', ja: 'アカウントがない？' },
    'market.auth.signup': { zh: '立即注册', en: 'Sign Up', es: 'Registrarse', ar: 'التسجيل', pt: 'Cadastre-se', ja: '登録する' },
    'market.auth.has.account': { zh: '已有账号？', en: 'Already have an account?', es: '¿Ya tienes cuenta?', ar: 'لديك حساب بالفعل؟', pt: 'Já tem conta?', ja: 'アカウントがある？' },
    'market.auth.login': { zh: '登录', en: 'Login', es: 'Iniciar Sesión', ar: 'تسجيل الدخول', pt: 'Entrar', ja: 'ログイン' },
    'market.login.success': { zh: '登录成功！', en: 'Login successful!', es: '¡Inicio de sesión exitoso!', ar: '!تم تسجيل الدخول بنجاح', pt: 'Login realizado com sucesso!', ja: 'ログイン成功！' },
    'market.login.error': { zh: '登录失败', en: 'Login failed', es: 'Error de inicio de sesión', ar: 'فشل تسجيل الدخول', pt: 'Falha no login', ja: 'ログイン失敗' },
    'market.signup.success': { zh: '注册成功！请检查邮箱确认', en: 'Sign up successful! Check your email to confirm', es: '¡Registro exitoso! Revisa tu email para confirmar', ar: '!تم التسجيل بنجاح! تحقق من بريدك الإلكتروني للتأكيد', pt: 'Cadastro realizado! Verifique seu email para confirmar', ja: '登録成功！確認メールをチェックしてください' },
    'market.signup.error': { zh: '注册失败', en: 'Sign up failed', es: 'Error de registro', ar: 'فشل التسجيل', pt: 'Falha no cadastro', ja: '登録失敗' },
    'market.create.btn': { zh: '发布任务', en: 'Post Task', es: 'Publicar Tarea', ar: 'نشر مهمة', pt: 'Publicar Tarefa', ja: 'タスクを投稿' },
    'market.create.modal.title': { zh: '发布新任务', en: 'Post New Task', es: 'Publicar Nueva Tarea', ar: 'نشر مهمة جديدة', pt: 'Publicar Nova Tarefa', ja: '新しいタスクを投稿' },
    'market.create.modal.desc': { zh: '描述你需要别人帮你做什么，设置奖励金额', en: 'Describe what you need help with and set the reward amount', es: 'Describe qué necesitas y establece la recompensa', ar: 'صف ما تحتاج مساعدة فيه وحدد مبلغ المكافأة', pt: 'Descreva o que precisa de ajuda e defina a recompensa', ja: '何の助けが必要か説明して報酬金額を設定' },
    'market.create.title.label': { zh: '任务标题', en: 'Task Title', es: 'Título de la Tarea', ar: 'عنوان المهمة', pt: 'Título da Tarefa', ja: 'タスクタイトル' },
    'market.create.title.placeholder': { zh: '简短描述你需要什么帮助', en: 'Briefly describe what help you need', es: 'Describe brevemente qué ayuda necesitas', ar: 'صف باختصار ما تحتاج مساعدة فيه', pt: 'Descreva brevemente que ajuda precisa', ja: 'どのような助けが必要か簡単に説明' },
    'market.create.desc.label': { zh: '详细描述', en: 'Description', es: 'Descripción', ar: 'الوصف', pt: 'Descrição', ja: '詳細説明' },
    'market.create.desc.placeholder': { zh: '详细描述任务要求、时间、地点等', en: 'Describe task requirements, time, location, etc.', es: 'Describe requisitos, hora, ubicación, etc.', ar: 'صف متطلبات المهمة والوقت والموقع وغيرها', pt: 'Descreva requisitos, horário, local, etc.', ja: 'タスクの要件、時間、場所などを詳しく説明' },
    'market.create.reward.label': { zh: '奖励金额 (USD)', en: 'Reward Amount (USD)', es: 'Monto de Recompensa (USD)', ar: 'مبلغ المكافأة (USD)', pt: 'Valor da Recompensa (USD)', ja: '報酬金額 (USD)' },
    'market.create.category.label': { zh: '任务类型', en: 'Task Type', es: 'Tipo de Tarea', ar: 'نوع المهمة', pt: 'Tipo de Tarefa', ja: 'タスクタイプ' },
    'market.create.submit': { zh: '发布并支付', en: 'Post & Pay', es: 'Publicar y Pagar', ar: 'نشر والدفع', pt: 'Publicar e Pagar', ja: '投稿して支払う' },
    'market.create.success': { zh: '任务创建成功！', en: 'Task created successfully!', es: '¡Tarea creada exitosamente!', ar: '!تم إنشاء المهمة بنجاح', pt: 'Tarefa criada com sucesso!', ja: 'タスクが正常に作成されました！' },
    'market.create.demo': { zh: '任务创建成功！（演示模式，连接 Supabase 后可实际发布）', en: 'Task created! (Demo mode — connect Supabase to actually post)', es: '¡Tarea creada! (Modo demo — conecta Supabase para publicar)', ar: '!تم إنشاء المهمة (وضع تجريبي — اتصل بـ Supabase للنشر فعلياً)', pt: 'Tarefa criada! (Modo demo — conecte o Supabase para publicar)', ja: 'タスク作成！（デモモード — Supabase接続で実際に投稿可能）' },
    'market.create.validation': { zh: '请填写所有必填字段', en: 'Please fill in all required fields', es: 'Por favor completa todos los campos', ar: 'يرجى ملء جميع الحقول المطلوبة', pt: 'Preencha todos os campos obrigatórios', ja: 'すべての必須フィールドを入力してください' },
    'market.create.error': { zh: '创建失败，请重试', en: 'Creation failed, please retry', es: 'Error al crear, intente de nuevo', ar: 'فشل الإنشاء، حاول مرة أخرى', pt: 'Falha ao criar, tente novamente', ja: '作成に失敗しました。再試行してください' },
    'market.category.all': { zh: '全部', en: 'All', es: 'Todos', ar: 'الكل', pt: 'Todos', ja: 'すべて' },
    'market.category.errand': { zh: '🏃 跑腿', en: '🏃 Errand', es: '🏃 Recado', ar: '🏃 مشوار', pt: '🏃 Recado', ja: '🏃 使い走り' },
    'market.category.skill': { zh: '🎯 技能', en: '🎯 Skill', es: '🎯 Habilidad', ar: '🎯 مهارة', pt: '🎯 Habilidade', ja: '🎯 スキル' },
    'market.category.creative': { zh: '🎨 创意', en: '🎨 Creative', es: '🎨 Creativo', ar: '🎨 إبداعي', pt: '🎨 Criativo', ja: '🎨 クリエイティブ' },
    'market.category.advice': { zh: '💡 咨询', en: '💡 Advice', es: '💡 Consejo', ar: '💡 نصيحة', pt: '💡 Conselho', ja: '💡 アドバイス' },
    'market.category.other': { zh: '📦 其他', en: '📦 Other', es: '📦 Otro', ar: '📦 آخر', pt: '📦 Outro', ja: '📦 その他' },
    'market.accept': { zh: '接任务', en: 'Accept Task', es: 'Aceptar Tarea', ar: 'قبول المهمة', pt: 'Aceitar Tarefa', ja: 'タスクを引き受ける' },
    'market.view.submissions': { zh: '查看提交', en: 'View Submissions', es: 'Ver Envíos', ar: 'عرض التسليمات', pt: 'Ver Envios', ja: '提出を表示' },
    'market.reward.label': { zh: '奖励', en: 'Reward', es: 'Recompensa', ar: 'المكافأة', pt: 'Recompensa', ja: '報酬' },
    'market.submit.modal.title': { zh: '提交完成证明', en: 'Submit Completion Proof', es: 'Enviar Prueba de Completación', ar: 'إرسال إثبات الإنجاز', pt: 'Enviar Prova de Conclusão', ja: '完了証明を提出' },
    'market.submit.desc.label': { zh: '描述你是如何完成的', en: 'Describe how you completed it', es: 'Describe cómo lo completaste', ar: 'صف كيف أنجزته', pt: 'Descreva como completou', ja: 'どのように完了したか説明' },
    'market.submit.desc.placeholder': { zh: '描述你完成的过程...', en: 'Describe your completion process...', es: 'Describe tu proceso de completación...', ar: 'صف عملية إنجازك...', pt: 'Descreva seu processo de conclusão...', ja: '完了プロセスを説明...' },
    'market.submit.proof.label': { zh: '上传证明（可选）', en: 'Upload proof (optional)', es: 'Subir prueba (opcional)', ar: 'رفع الإثبات (اختياري)', pt: 'Enviar prova (opcional)', ja: '証明をアップロード（任意）' },
    'market.submit.btn': { zh: '提交', en: 'Submit', es: 'Enviar', ar: 'إرسال', pt: 'Enviar', ja: '提出' },
    'market.submit.success': { zh: '提交成功！等待任务发布者审核', en: 'Submitted! Waiting for task creator to review', es: '¡Enviado! Esperando revisión del creador', ar: '!تم الإرسال! في انتظار مراجعة المنشئ', pt: 'Enviado! Aguardando revisão do criador', ja: '提出成功！タスク作成者のレビューを待機中' },
    'market.submit.error': { zh: '提交失败，请重试', en: 'Submission failed, please retry', es: 'Error al enviar, intente de nuevo', ar: 'فشل الإرسال، حاول مرة أخرى', pt: 'Falha ao enviar, tente novamente', ja: '提出に失敗しました。再試行してください' },
    'market.submit.demo': { zh: '提交成功！（演示模式）', en: 'Submitted! (Demo mode)', es: '¡Enviado! (Modo demo)', ar: '!تم الإرسال (وضع تجريبي)', pt: 'Enviado! (Modo demo)', ja: '提出成功！（デモモード）' },
    'market.login.required': { zh: '请先登录', en: 'Please login first', es: 'Inicia sesión primero', ar: 'سجل الدخول أولاً', pt: 'Faça login primeiro', ja: 'まずログインしてください' },
    'market.desc.required': { zh: '请描述你是如何完成任务的', en: 'Please describe how you completed the task', es: 'Describe cómo completaste la tarea', ar: 'يرجى وصف كيف أنجزت المهمة', pt: 'Descreva como completou a tarefa', ja: 'タスクの完了方法を説明してください' },
    'market.submissions.title': { zh: '收到的提交', en: 'Received Submissions', es: 'Envíos Recibidos', ar: 'التسليمات المستلمة', pt: 'Envios Recebidos', ja: '受け取った提出' },
    'market.submissions.desc': { zh: '审核通过后发放奖励', en: 'Approve to release the reward', es: 'Aprueba para liberar la recompensa', ar: 'وافق لإصدار المكافأة', pt: 'Aprove para liberar a recompensa', ja: '承認して報酬をリリース' },
    'market.submissions.empty': { zh: '暂无提交', en: 'No submissions yet', es: 'Sin envíos aún', ar: 'لا توجد تسليمات بعد', pt: 'Sem envios ainda', ja: 'まだ提出なし' },
    'market.submissions.error': { zh: '加载提交失败', en: 'Failed to load submissions', es: 'Error al cargar envíos', ar: 'فشل تحميل التسليمات', pt: 'Falha ao carregar envios', ja: '提出の読み込みに失敗' },
    'market.approve': { zh: '通过并发放奖励', en: 'Approve & Release Reward', es: 'Aprobar y Liberar Recompensa', ar: 'الموافقة وإصدار المكافأة', pt: 'Aprovar e Liberar Recompensa', ja: '承認して報酬をリリース' },
    'market.reject': { zh: '拒绝', en: 'Reject', es: 'Rechazar', ar: 'رفض', pt: 'Rejeitar', ja: '拒否' },
    'market.approve.success': { zh: '已通过，奖励已发放！', en: 'Approved, reward released!', es: '¡Aprobado, recompensa liberada!', ar: '!تمت الموافقة، المكافأة صدرت', pt: 'Aprovado, recompensa liberada!', ja: '承認済み、報酬リリース！' },
    'market.approve.error': { zh: '审核失败', en: 'Approval failed', es: 'Error al aprobar', ar: 'فشل الموافقة', pt: 'Falha ao aprovar', ja: '承認失敗' },
    'market.reject.success': { zh: '已拒绝', en: 'Rejected', es: 'Rechazado', ar: 'مرفوض', pt: 'Rejeitado', ja: '拒否済み' },
    'market.reject.error': { zh: '操作失败', en: 'Operation failed', es: 'Error de operación', ar: 'فشل العملية', pt: 'Falha na operação', ja: '操作失敗' },
    'market.time.justnow': { zh: '刚刚', en: 'just now', es: 'justo ahora', ar: 'الآن', pt: 'agora mesmo', ja: 'たった今' },
    'market.time.minutes': { zh: '分钟前', en: 'm ago', es: 'min hace', ar: 'د مضت', pt: 'min atrás', ja: '分前' },
    'market.time.hours': { zh: '小时前', en: 'h ago', es: 'h hace', ar: 'س مضت', pt: 'h atrás', ja: '時間前' },
    'market.time.days': { zh: '天前', en: 'd ago', es: 'd hace', ar: 'ي مضت', pt: 'd atrás', ja: '日前' },
    'market.demo.task1.title': { zh: '帮邻居取快递', en: 'Pick Up a Package for Neighbor', es: 'Recoger Paquete para Vecino', ar: 'التقاط جارة للجيران', pt: 'Pegar Pacote para Vizinho', ja: '邻居の荷物を受け取る' },
    'market.demo.task1.desc': { zh: '今天下午 3 点前去驿站帮邻居取一个包裹', en: 'Pick up a package from the post office for a neighbor before 3pm today', es: 'Recoge un paquete de la oficina de correos para un vecino antes de las 3pm', ar: 'التقط طرداً من مكتب البريد لجار قبل الساعة 3 مساءً', pt: 'Pegue um pacote no correio para um vizinho antes das 15h', ja: '今日の午後3時までに郵便局で邻居の荷物を受け取る' },
    'market.demo.task2.title': { zh: '教我写 Python 爬虫', en: 'Teach Me Python Web Scraping', es: 'Enséñame Python Web Scraping', ar: 'علمني Python Web Scraping', pt: 'Me Ensine Python Web Scraping', ja: 'Pythonスクレイピングを教えて' },
    'market.demo.task2.desc': { zh: '通过视频通话教我 1 小时 Python 网络爬虫', en: 'Teach me Python web scraping for 1 hour via video call', es: 'Enséñame web scraping en Python por 1 hora por videollamada', ar: 'علمني web scraping بلغة Python لمدة ساعة عبر مكالمة فيديو', pt: 'Me ensine web scraping em Python por 1 hora por chamada de vídeo', ja: 'ビデオ通話でPythonスクレイピングを1時間教えて' },
    'market.demo.task3.title': { zh: '推荐 3 本好书', en: 'Recommend 3 Great Books', es: 'Recomienda 3 Buenos Libros', ar: 'أوصي بـ 3 كتب جيدة', pt: 'Recomende 3 Bons Livros', ja: '良い本を3冊推荐して' },
    'market.demo.task3.desc': { zh: '推荐 3 本改变你人生的书，并简要说明理由', en: 'Recommend 3 life-changing books with brief explanations', es: 'Recomienda 3 libros que cambiaron tu vida con explicaciones breves', ar: 'أوصي بـ 3 كتب غيرت حياتك مع شرح موجز', pt: 'Recomende 3 livros que mudaram sua vida com breves explicações', ja: '人生を変えた3冊の本とその理由を簡単に説明して' },
  };

  // Get current language
  function getLang() {
    return currentLang;
  }

  // Translate a key
  function T(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[currentLang] || entry['zh'] || key;
  }

  // Detect browser language
  function detectBrowserLang() {
    const lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('ar')) return 'ar';
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('ja')) return 'ja';
    return 'zh';
  }

  // Set language
  function setLang(lang) {
    if (!supportedLangs.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations();
  }

  // Initialize language
  function initLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && supportedLangs.includes(saved)) {
      currentLang = saved;
    } else {
      currentLang = detectBrowserLang();
    }
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  // Apply translations to all elements with data-i18n attributes
  function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = T(key);
      // Handle nested elements — preserve child elements
      if (el.children.length === 0) {
        el.textContent = text;
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = T(key);
    });

    // Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = T(key);
    });

    // Elements with inner HTML (like nav links with text only)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = T(key);
    });
  }

  // Get supported languages
  function getSupportedLangs() {
    return supportedLangs;
  }

  // Get language display name
  function getLangName(lang) {
    const names = {
      zh: '中文',
      en: 'English',
      es: 'Español',
      ar: 'العربية',
      pt: 'Português',
      ja: '日本語',
    };
    return names[lang] || lang;
  }

  // Get language code
  function getLangCode() {
    return currentLang;
  }

  return {
    T,
    getLang,
    getLangCode,
    setLang,
    initLang,
    applyTranslations,
    getSupportedLangs,
    getLangName,
  };
})();
