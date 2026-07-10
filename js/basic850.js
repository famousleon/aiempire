// ==========================================
// AI Empire - Basic English 850 Daily Sentences
// One sentence per day, each teaching 5-8 new words
// ==========================================

const Basic850 = (() => {
  // Complete 850 word list organized by category
  const words = {
    operators: [
      'a', 'able', 'about', 'above', 'across', 'after', 'against', 'ago', 'all',
      'almost', 'alone', 'along', 'among', 'and', 'angle', 'angry', 'any', 'apart',
      'as', 'at', 'away', 'back', 'because', 'before', 'behind', 'below', 'beside',
      'between', 'bit', 'both', 'but', 'by', 'can', 'come', 'did', 'do', 'done',
      'down', 'during', 'each', 'even', 'ever', 'every', 'for', 'from', 'front',
      'get', 'give', 'go', 'got', 'had', 'have', 'he', 'her', 'here', 'hers',
      'him', 'his', 'how', 'however', 'I', 'if', 'in', 'into', 'it', 'its',
      'keep', 'last', 'left', 'let', 'like', 'make', 'many', 'may', 'me', 'more',
      'most', 'much', 'my', 'near', 'need', 'never', 'next', 'no', 'not', 'now',
      'of', 'off', 'on', 'only', 'or', 'other', 'out', 'over', 'own', 'part',
      'perhaps', 'put', 'quite', 'rather', 'say', 'see', 'seem', 'shall', 'she',
      'should', 'so', 'some', 'soon', 'still', 'such', 'than', 'that', 'the',
      'their', 'then', 'there', 'these', 'they', 'this', 'those', 'though', 'through',
      'till', 'to', 'together', 'too', 'toward', 'under', 'up', 'use', 'very',
      'was', 'we', 'well', 'were', 'what', 'when', 'where', 'while', 'who', 'whom',
      'whose', 'will', 'with', 'without', 'would', 'yes', 'yet', 'you', 'your',
    ],
    generalNouns: [
      'account', 'act', 'addition', 'adjustment', 'advertisement', 'agreement', 'air',
      'amount', 'amusement', 'angle', 'animal', 'answer', 'apparatus', 'approval',
      'arch', 'argument', 'arm', 'army', 'art', 'attack', 'attempt', 'attention',
      'attraction', 'authority', 'back', 'balance', 'base', 'behavior', 'birth',
      'bit', 'bite', 'blow', 'body', 'brain', 'brake', 'branch', 'brass', 'bread',
      'breath', 'brother', 'building', 'burn', 'burst', 'business', 'butter',
      'canvas', 'care', 'cause', 'chalk', 'chance', 'change', 'cleat', 'clothe',
      'cloud', 'coal', 'color', 'comfort', 'committee', 'company', 'comparison',
      'competition', 'condition', 'connection', 'control', 'cook', 'copper', 'copy',
      'cork', 'cotton', 'cough', 'country', 'cover', 'crack', 'credit', 'crime',
      'crush', 'cry', 'current', 'curve', 'damage', 'danger', 'daughter', 'day',
      'death', 'decision', 'degree', 'design', 'desire', 'destruction', 'detail',
      'development', 'digestion', 'direction', 'discovery', 'discussion', 'disease',
      'disgust', 'distance', 'distribution', 'division', 'doubt', 'drink', 'driving',
      'dust', 'earth', 'edge', 'education', 'end', 'error', 'event', 'example',
      'exchange', 'existence', 'expansion', 'experience', 'expert', 'fact', 'fall',
      'family', 'father', 'fear', 'feeling', 'fiction', 'fight', 'fire', 'flame',
      'flight', 'flower', 'fold', 'food', 'force', 'form', 'friend', 'front',
      'fruit', 'glass', 'gold', 'government', 'grain', 'grass', 'grip', 'group',
      'growth', 'guide', 'harbor', 'harmony', 'hate', 'head', 'hearing', 'heart',
      'heat', 'help', 'history', 'hole', 'hope', 'hour', 'humor', 'ice', 'idea',
      'impulse', 'increase', 'industry', 'ink', 'insect', 'instrument', 'insurance',
      'interest', 'invention', 'iron', 'jelly', 'join', 'journey', 'judge', 'jump',
      'kick', 'kiss', 'knowledge', 'land', 'language', 'laugh', 'law', 'lead',
      'learning', 'leather', 'letter', 'level', 'library', 'lift', 'light', 'limit',
      'linen', 'list', 'look', 'loss', 'love', 'machine', 'man', 'manager', 'mark',
      'market', 'mass', 'meal', 'measure', 'meat', 'meeting', 'memory', 'metal',
      'middle', 'milk', 'mind', 'mine', 'minute', 'mist', 'money', 'month', 'morning',
      'mother', 'motion', 'mountain', 'move', 'music', 'name', 'nation', 'need',
      'news', 'night', 'noise', 'note', 'number', 'observation', 'offer', 'oil',
      'operation', 'opinion', 'order', 'organization', 'ornament', 'owner', 'page',
      'pain', 'paint', 'paper', 'part', 'paste', 'payment', 'peace', 'pencil',
      'person', 'place', 'plane', 'plant', 'play', 'point', 'poison', 'polish',
      'porter', 'position', 'powder', 'power', 'price', 'print', 'process', 'produce',
      'profit', 'property', 'prose', 'protest', 'pull', 'punishment', 'purpose',
      'push', 'quality', 'question', 'rain', 'range', 'rate', 'ray', 'reaction',
      'reading', 'reason', 'record', 'regret', 'relation', 'religion', 'representative',
      'request', 'respect', 'rest', 'reward', 'rhythm', 'right', 'ring', 'river',
      'road', 'roll', 'room', 'rule', 'run', 'salt', 'sand', 'scale', 'science',
      'sea', 'seat', 'secretary', 'selection', 'self', 'sense', 'servant', 'sex',
      'shade', 'shake', 'shame', 'shock', 'side', 'sign', 'silk', 'silver', 'sister',
      'size', 'sky', 'sleep', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke',
      'sneeze', 'snow', 'soap', 'society', 'son', 'song', 'sort', 'sound', 'soup',
      'space', 'stage', 'start', 'statement', 'steam', 'steel', 'step', 'stitch',
      'stone', 'stop', 'story', 'stretch', 'structure', 'substance', 'sugar', 'suggestion',
      'summer', 'support', 'surprise', 'swim', 'system', 'talk', 'taste', 'tax',
      'teaching', 'tendency', 'test', 'theory', 'thing', 'thought', 'thunder', 'time',
      'tin', 'top', 'touch', 'trade', 'train', 'transport', 'trick', 'trouble',
      'turn', 'twist', 'unit', 'use', 'value', 'verse', 'vessel', 'view', 'voice',
      'walk', 'war', 'wash', 'waste', 'water', 'wave', 'wax', 'way', 'weather',
      'week', 'weight', 'wind', 'wine', 'winter', 'woman', 'wood', 'wool', 'word',
      'work', 'wound', 'writing', 'year',
    ],
    picturableObjects: [
      'apple', 'bell', 'bird', 'book', 'boot', 'bottle', 'box', 'boy', 'brick',
      'bridge', 'brush', 'bucket', 'button', 'camera', 'card', 'carriage', 'cart',
      'cat', 'chain', 'cheese', 'chest', 'chin', 'church', 'circle', 'clock', 'coat',
      'collar', 'comb', 'cord', 'cow', 'cup', 'curtain', 'cushion', 'dog', 'door',
      'drain', 'drawer', 'dress', 'drop', 'ear', 'egg', 'engine', 'eye', 'face',
      'farm', 'feather', 'finger', 'fish', 'flag', 'floor', 'fly', 'foot', 'fork',
      'fowl', 'frame', 'garden', 'girl', 'glove', 'goat', 'gun', 'hair', 'hammer',
      'hand', 'hat', 'head', 'horn', 'horse', 'hospital', 'house', 'island', 'jewel',
      'kettle', 'key', 'knee', 'knife', 'knot', 'leaf', 'leg', 'library', 'line',
      'lip', 'lock', 'match', 'monkey', 'moon', 'mouth', 'muscle', 'nail', 'neck',
      'needle', 'nerve', 'net', 'nose', 'nut', 'office', 'orange', 'oven', 'parcel',
      'pen', 'pencil', 'picture', 'pig', 'pin', 'pipe', 'plate', 'plough', 'pocket',
      'pot', 'potato', 'prison', 'pump', 'rail', 'rat', 'receipt', 'ring', 'rod',
      'root', 'saucer', 'school', 'scissors', 'screw', 'seed', 'sheep', 'shelf',
      'ship', 'shirt', 'shoe', 'skin', 'skirt', 'snake', 'spade', 'sponge', 'spoon',
      'spring', 'square', 'stamp', 'star', 'station', 'stem', 'stick', 'stocking',
      'stomach', 'store', 'street', 'sun', 'table', 'tail', 'thread', 'throat',
      'thumb', 'ticket', 'toe', 'tongue', 'tooth', 'town', 'train', 'tray', 'tree',
      'trousers', 'umbrella', 'wall', 'watch', 'wheel', 'whip', 'whistle', 'window',
      'wing', 'wire', 'worm',
    ],
    qualities: [
      'acid', 'automatic', 'beautiful', 'bent', 'black', 'blue', 'blunt', 'boiling',
      'bright', 'broken', 'brown', 'cheap', 'chemical', 'chief', 'clean', 'clear',
      'cold', 'common', 'complex', 'conscious', 'crooked', 'dark', 'dead', 'deep',
      'dependent', 'digital', 'dirty', 'dry', 'early', 'elastic', 'electric', 'equal',
      'false', 'fat', 'feeble', 'female', 'first', 'fixed', 'flat', 'free', 'frequent',
      'full', 'general', 'good', 'gray', 'great', 'green', 'half', 'hanging', 'happy',
      'hard', 'high', 'hollow', 'hot', 'important', 'kind', 'late', 'left', 'like',
      'living', 'long', 'loose', 'low', 'male', 'married', 'material', 'medical',
      'military', 'mixed', 'narrow', 'natural', 'necessary', 'new', 'normal', 'old',
      'open', 'opposite', 'orange', 'other', 'parallel', 'past', 'physical', 'political',
      'poor', 'possible', 'private', 'probable', 'quick', 'quiet', 'ready', 'red',
      'regular', 'responsible', 'right', 'round', 'sad', 'safe', 'same', 'second',
      'sharp', 'short', 'shy', 'simple', 'slow', 'small', 'smooth', 'soft', 'solid',
      'special', 'stiff', 'straight', 'strange', 'strong', 'sudden', 'sweet', 'tall',
      'thick', 'thin', 'tight', 'tired', 'true', 'violent', 'waiting', 'warm',
      'wet', 'white', 'wide', 'wise', 'yellow', 'young',
    ],
  };

  // All 850 words as a flat set for validation
  const allWords = new Set([
    ...words.operators,
    ...words.generalNouns,
    ...words.picturableObjects,
    ...words.qualities,
  ].map(w => w.toLowerCase()));

  // ============================================================
  // Daily Sentences — 30 sentences, progressive difficulty
  // Each has: english, chinese, newWords (5-8 highlighted words)
  // ============================================================
  const sentences = [
    {
      id: 1,
      english: "The dog is big and brown, and he runs across the field.",
      chinese: "那只狗很大而且是棕色的，它跑过了田野。",
      newWords: [
        { word: 'dog', cn: '狗', emoji: '🐕' },
        { word: 'big', cn: '大的', emoji: '📏' },
        { word: 'brown', cn: '棕色的', emoji: '🟤' },
        { word: 'runs', cn: '跑', emoji: '🏃' },
        { word: 'across', cn: '穿过', emoji: '↔️' },
        { word: 'field', cn: '田野', emoji: '🌾' },
      ],
    },
    {
      id: 2,
      english: "I have a red apple and a cup of sweet milk.",
      chinese: "我有一个红苹果和一杯甜牛奶。",
      newWords: [
        { word: 'apple', cn: '苹果', emoji: '🍎' },
        { word: 'red', cn: '红色的', emoji: '🔴' },
        { word: 'cup', cn: '杯子', emoji: '☕' },
        { word: 'sweet', cn: '甜的', emoji: '🍬' },
        { word: 'milk', cn: '牛奶', emoji: '🥛' },
      ],
    },
    {
      id: 3,
      english: "The cat is on the table, under the bright light of the sun.",
      chinese: "猫在桌子上，在太阳明亮的光线下。",
      newWords: [
        { word: 'cat', cn: '猫', emoji: '🐱' },
        { word: 'table', cn: '桌子', emoji: '🪑' },
        { word: 'under', cn: '在...下面', emoji: '⬇️' },
        { word: 'bright', cn: '明亮的', emoji: '✨' },
        { word: 'light', cn: '光', emoji: '💡' },
        { word: 'sun', cn: '太阳', emoji: '☀️' },
      ],
    },
    {
      id: 4,
      english: "She gave me a blue book and a small green pencil.",
      chinese: "她给了我一本蓝色的书和一支绿色的小铅笔。",
      newWords: [
        { word: 'blue', cn: '蓝色的', emoji: '🔵' },
        { word: 'book', cn: '书', emoji: '📖' },
        { word: 'small', cn: '小的', emoji: '🔹' },
        { word: 'green', cn: '绿色的', emoji: '🟢' },
        { word: 'pencil', cn: '铅笔', emoji: '✏️' },
      ],
    },
    {
      id: 5,
      english: "The bird is in the tree and sings a beautiful song in the morning.",
      chinese: "鸟在树上，早晨唱着一首美丽的歌。",
      newWords: [
        { word: 'bird', cn: '鸟', emoji: '🐦' },
        { word: 'tree', cn: '树', emoji: '🌳' },
        { word: 'sings', cn: '唱歌', emoji: '🎵' },
        { word: 'beautiful', cn: '美丽的', emoji: '🌸' },
        { word: 'song', cn: '歌曲', emoji: '🎶' },
        { word: 'morning', cn: '早晨', emoji: '🌅' },
      ],
    },
    {
      id: 6,
      english: "The boy took a fish from the river with his hand.",
      chinese: "男孩用手从河里抓了一条鱼。",
      newWords: [
        { word: 'boy', cn: '男孩', emoji: '👦' },
        { word: 'took', cn: '拿/取', emoji: '🤲' },
        { word: 'fish', cn: '鱼', emoji: '🐟' },
        { word: 'river', cn: '河流', emoji: '🏞️' },
        { word: 'hand', cn: '手', emoji: '✋' },
      ],
    },
    {
      id: 7,
      english: "My mother made hot bread in the kitchen and the smell was good.",
      chinese: "我妈妈在厨房里做了热面包，闻起来很好。",
      newWords: [
        { word: 'mother', cn: '妈妈', emoji: '👩' },
        { word: 'made', cn: '制作', emoji: '👩‍🍳' },
        { word: 'hot', cn: '热的', emoji: '🔥' },
        { word: 'bread', cn: '面包', emoji: '🍞' },
        { word: 'kitchen', cn: '厨房', emoji: '🏠' },
        { word: 'smell', cn: '气味', emoji: '👃' },
      ],
    },
    {
      id: 8,
      english: "He put a white flower in a glass of cold water on the window.",
      chinese: "他把一朵白色的花放在一杯冷水里，放在窗户上。",
      newWords: [
        { word: 'white', cn: '白色的', emoji: '⚪' },
        { word: 'flower', cn: '花', emoji: '🌺' },
        { word: 'glass', cn: '玻璃杯', emoji: '🥂' },
        { word: 'cold', cn: '冷的', emoji: '🧊' },
        { word: 'water', cn: '水', emoji: '💧' },
        { word: 'window', cn: '窗户', emoji: '🪟' },
      ],
    },
    {
      id: 9,
      english: "The old man sat by the door and watched the rain come down.",
      chinese: "老人坐在门边，看着雨落下来。",
      newWords: [
        { word: 'old', cn: '老的', emoji: '👴' },
        { word: 'man', cn: '男人', emoji: '🧑' },
        { word: 'sat', cn: '坐', emoji: '🪑' },
        { word: 'door', cn: '门', emoji: '🚪' },
        { word: 'watched', cn: '观看', emoji: '👀' },
        { word: 'rain', cn: '雨', emoji: '🌧️' },
      ],
    },
    {
      id: 10,
      english: "A yellow bird came to the garden and took a small piece of bread.",
      chinese: "一只黄色的鸟来到花园里，拿了一小块面包。",
      newWords: [
        { word: 'yellow', cn: '黄色的', emoji: '🟡' },
        { word: 'came', cn: '来', emoji: '➡️' },
        { word: 'garden', cn: '花园', emoji: '🌻' },
        { word: 'piece', cn: '一块/片', emoji: '🧩' },
      ],
    },
    {
      id: 11,
      english: "The girl went to the market with her father and bought an orange and a sweet cake.",
      chinese: "女孩和她爸爸去了市场，买了一个橘子和一块甜蛋糕。",
      newWords: [
        { word: 'girl', cn: '女孩', emoji: '👧' },
        { word: 'went', cn: '去', emoji: '🚶' },
        { word: 'market', cn: '市场', emoji: '🏪' },
        { word: 'father', cn: '爸爸', emoji: '👨' },
        { word: 'bought', cn: '买', emoji: '🛒' },
        { word: 'orange', cn: '橙子', emoji: '🍊' },
        { word: 'cake', cn: '蛋糕', emoji: '🍰' },
      ],
    },
    {
      id: 12,
      english: "The tall house stood at the end of a long narrow road between two big trees.",
      chinese: "那栋高高的房子站在一条狭窄长路的尽头，在两棵大树之间。",
      newWords: [
        { word: 'tall', cn: '高的', emoji: '📐' },
        { word: 'house', cn: '房子', emoji: '🏠' },
        { word: 'stood', cn: '站立/位于', emoji: '🧍' },
        { word: 'end', cn: '尽头', emoji: '🔚' },
        { word: 'long', cn: '长的', emoji: '📏' },
        { word: 'narrow', cn: '狭窄的', emoji: '↔️' },
        { word: 'road', cn: '路', emoji: '🛤️' },
        { word: 'between', cn: '在...之间', emoji: '↔️' },
      ],
    },
    {
      id: 13,
      english: "She opened the box and found a silver ring and a gold watch inside.",
      chinese: "她打开盒子，在里面发现了一枚银戒指和一块金表。",
      newWords: [
        { word: 'opened', cn: '打开', emoji: '📭' },
        { word: 'box', cn: '盒子', emoji: '📦' },
        { word: 'found', cn: '发现', emoji: '🔍' },
        { word: 'silver', cn: '银色的', emoji: '⚪' },
        { word: 'ring', cn: '戒指', emoji: '💍' },
        { word: 'gold', cn: '金色的', emoji: '🥇' },
        { word: 'watch', cn: '手表', emoji: '⌚' },
      ],
    },
    {
      id: 14,
      english: "The horse ran fast across the field while the dog followed behind.",
      chinese: "马快速地跑过田野，而狗跟在后面。",
      newWords: [
        { word: 'horse', cn: '马', emoji: '🐴' },
        { word: 'fast', cn: '快速地', emoji: '⚡' },
        { word: 'while', cn: '当...的时候', emoji: '⏱️' },
        { word: 'followed', cn: '跟随', emoji: '👣' },
        { word: 'behind', cn: '在后面', emoji: '⬅️' },
      ],
    },
    {
      id: 15,
      english: "He put a coat on the chair because the night air was very cold.",
      chinese: "他把外套放在椅子上，因为夜晚的空气很冷。",
      newWords: [
        { word: 'coat', cn: '外套', emoji: '🧥' },
        { word: 'chair', cn: '椅子', emoji: '🪑' },
        { word: 'because', cn: '因为', emoji: '💡' },
        { word: 'night', cn: '夜晚', emoji: '🌙' },
        { word: 'air', cn: '空气', emoji: '💨' },
        { word: 'very', cn: '非常', emoji: '🔝' },
      ],
    },
    {
      id: 16,
      english: "The ship went across the sea to a far country where the sky was always blue.",
      chinese: "船穿过大海到了一个遥远的国家，那里的天空总是蓝色的。",
      newWords: [
        { word: 'ship', cn: '船', emoji: '🚢' },
        { word: 'sea', cn: '海', emoji: '🌊' },
        { word: 'far', cn: '遥远的', emoji: '🔭' },
        { word: 'country', cn: '国家', emoji: '🗺️' },
        { word: 'where', cn: '在那里', emoji: '📍' },
        { word: 'always', cn: '总是', emoji: '♾️' },
      ],
    },
    {
      id: 17,
      english: "The doctor gave the sick boy some medicine and said he would be well in three days.",
      chinese: "医生给了生病的男孩一些药，说他三天后就会好。",
      newWords: [
        { word: 'doctor', cn: '医生', emoji: '👨‍⚕️' },
        { word: 'gave', cn: '给', emoji: '🤲' },
        { word: 'sick', cn: '生病的', emoji: '🤒' },
        { word: 'medicine', cn: '药', emoji: '💊' },
        { word: 'said', cn: '说', emoji: '💬' },
        { word: 'days', cn: '天', emoji: '📅' },
      ],
    },
    {
      id: 18,
      english: "The teacher put a map on the wall and showed the children where the great mountains were.",
      chinese: "老师在墙上挂了一张地图，给孩子们看大山在哪里。",
      newWords: [
        { word: 'teacher', cn: '老师', emoji: '👩‍🏫' },
        { word: 'map', cn: '地图', emoji: '🗺️' },
        { word: 'wall', cn: '墙', emoji: '🧱' },
        { word: 'showed', cn: '展示', emoji: '👉' },
        { word: 'children', cn: '孩子们', emoji: '👶' },
        { word: 'great', cn: '伟大的/巨大的', emoji: '🏔️' },
        { word: 'mountains', cn: '山脉', emoji: '⛰️' },
      ],
    },
    {
      id: 19,
      english: "She took a picture of the beautiful garden with her camera and sent it to her friend.",
      chinese: "她用相机拍了美丽花园的照片，发给了她的朋友。",
      newWords: [
        { word: 'picture', cn: '照片/画', emoji: '📷' },
        { word: 'camera', cn: '相机', emoji: '📸' },
        { word: 'sent', cn: '发送', emoji: '📨' },
        { word: 'friend', cn: '朋友', emoji: '🤝' },
      ],
    },
    {
      id: 20,
      english: "The little mouse came out of a hole in the wall when the house was quiet and dark.",
      chinese: "当房子又安静又黑的时候，小老鼠从墙上的洞里出来了。",
      newWords: [
        { word: 'little', cn: '小的', emoji: '🔸' },
        { word: 'mouse', cn: '老鼠', emoji: '🐭' },
        { word: 'out', cn: '出来', emoji: '🚪' },
        { word: 'hole', cn: '洞', emoji: '🕳️' },
        { word: 'quiet', cn: '安静的', emoji: '🤫' },
        { word: 'dark', cn: '黑暗的', emoji: '🌑' },
      ],
    },
    {
      id: 21,
      english: "He learned to read by the light of a small lamp and became a wise man.",
      chinese: "他在小灯的灯光下学会了阅读，成为了一个聪明的人。",
      newWords: [
        { word: 'learned', cn: '学会', emoji: '📚' },
        { word: 'read', cn: '阅读', emoji: '📖' },
        { word: 'lamp', cn: '灯', emoji: '💡' },
        { word: 'became', cn: '成为', emoji: '🔄' },
        { word: 'wise', cn: '聪明的', emoji: '🦉' },
      ],
    },
    {
      id: 22,
      english: "The wind blew strong and the rain came down hard, but the old house did not move.",
      chinese: "风刮得很猛，雨下得很大，但老房子没有动。",
      newWords: [
        { word: 'wind', cn: '风', emoji: '💨' },
        { word: 'blew', cn: '吹', emoji: '🌬️' },
        { word: 'strong', cn: '强烈的', emoji: '💪' },
        { word: 'hard', cn: '猛烈地', emoji: '🔨' },
        { word: 'move', cn: '移动', emoji: '↔️' },
      ],
    },
    {
      id: 23,
      english: "The cook put sugar and salt into the soup and gave it to the hungry children.",
      chinese: "厨师把糖和盐放进汤里，给了饥饿的孩子们。",
      newWords: [
        { word: 'cook', cn: '厨师', emoji: '👨‍🍳' },
        { word: 'sugar', cn: '糖', emoji: '🍬' },
        { word: 'salt', cn: '盐', emoji: '🧂' },
        { word: 'soup', cn: '汤', emoji: '🍲' },
        { word: 'hungry', cn: '饥饿的', emoji: '😋' },
      ],
    },
    {
      id: 24,
      english: "A thin black cat walked slowly along the fence and looked at the fat bird with bright eyes.",
      chinese: "一只瘦黑猫沿着篱笆慢慢走着，用明亮的眼睛看着那只胖鸟。",
      newWords: [
        { word: 'thin', cn: '瘦的', emoji: '📐' },
        { word: 'black', cn: '黑色的', emoji: '⚫' },
        { word: 'walked', cn: '走', emoji: '🚶' },
        { word: 'slowly', cn: '慢慢地', emoji: '🐌' },
        { word: 'along', cn: '沿着', emoji: '➡️' },
        { word: 'fat', cn: '胖的', emoji: '🐷' },
        { word: 'eyes', cn: '眼睛', emoji: '👁️' },
      ],
    },
    {
      id: 25,
      english: "She wrote a letter to her brother who lived in a far town near the sea.",
      chinese: "她给住在海边遥远城镇的哥哥写了一封信。",
      newWords: [
        { word: 'wrote', cn: '写', emoji: '✍️' },
        { word: 'letter', cn: '信', emoji: '✉️' },
        { word: 'brother', cn: '兄弟', emoji: '👦' },
        { word: 'lived', cn: '居住', emoji: '🏠' },
        { word: 'town', cn: '城镇', emoji: '🏘️' },
        { word: 'near', cn: '靠近', emoji: '📍' },
      ],
    },
    {
      id: 26,
      english: "The baby laughed when the dog jumped up and caught a ball in the warm garden.",
      chinese: "当狗跳起来接住球时，婴儿在温暖的花园里笑了。",
      newWords: [
        { word: 'baby', cn: '婴儿', emoji: '👶' },
        { word: 'laughed', cn: '笑', emoji: '😄' },
        { word: 'jumped', cn: '跳', emoji: '🦘' },
        { word: 'caught', cn: '接住', emoji: '🤲' },
        { word: 'ball', cn: '球', emoji: '⚽' },
        { word: 'warm', cn: '温暖的', emoji: '🌞' },
      ],
    },
    {
      id: 27,
      english: "He took a deep breath and put his foot into the cold clear water of the lake.",
      chinese: "他深吸一口气，把脚放进了湖中冰冷清澈的水里。",
      newWords: [
        { word: 'deep', cn: '深的', emoji: '🕳️' },
        { word: 'breath', cn: '呼吸', emoji: '🌬️' },
        { word: 'foot', cn: '脚', emoji: '🦶' },
        { word: 'clear', cn: '清澈的', emoji: '💎' },
        { word: 'lake', cn: '湖', emoji: '🏞️' },
      ],
    },
    {
      id: 28,
      english: "The stars came out one by one in the dark sky above the quiet sleeping village.",
      chinese: "星星一颗接一颗地出现在安静沉睡的村庄上方的黑暗天空中。",
      newWords: [
        { word: 'stars', cn: '星星', emoji: '⭐' },
        { word: 'sky', cn: '天空', emoji: '🌌' },
        { word: 'above', cn: '在...上方', emoji: '⬆️' },
        { word: 'sleeping', cn: '沉睡的', emoji: '😴' },
        { word: 'village', cn: '村庄', emoji: '🏡' },
      ],
    },
    {
      id: 29,
      english: "She put fresh flowers in a tall glass bottle and set it on the wooden table beside the open window.",
      chinese: "她把新鲜的花插在一个高高的玻璃瓶里，放在木桌上靠近打开的窗户。",
      newWords: [
        { word: 'fresh', cn: '新鲜的', emoji: '🌿' },
        { word: 'flowers', cn: '花朵', emoji: '💐' },
        { word: 'bottle', cn: '瓶子', emoji: '🍶' },
        { word: 'wooden', cn: '木制的', emoji: '🪵' },
        { word: 'beside', cn: '在旁边', emoji: '➡️' },
        { word: 'open', cn: '打开的', emoji: '🔓' },
      ],
    },
    {
      id: 30,
      english: "The little boy looked up at the great white moon and asked his mother if the stars were small lights in the sky.",
      chinese: "小男孩抬头看着巨大的白色月亮，问妈妈星星是不是天空中的小灯。",
      newWords: [
        { word: 'looked', cn: '看', emoji: '👀' },
        { word: 'moon', cn: '月亮', emoji: '🌙' },
        { word: 'asked', cn: '问', emoji: '❓' },
        { word: 'small', cn: '小的', emoji: '🔹' },
        { word: 'lights', cn: '灯/光', emoji: '💡' },
      ],
    },
    {
      id: 31,
      english: "The rain stopped and the warm sun came out, so the birds began to sing and the flowers opened their bright faces.",
      chinese: "雨停了，温暖的太阳出来了，所以鸟儿开始唱歌，花儿展开了它们明亮的面容。",
      newWords: [
        { word: 'stopped', cn: '停止', emoji: '🛑' },
        { word: 'began', cn: '开始', emoji: '🚀' },
        { word: 'sing', cn: '唱歌', emoji: '🎤' },
        { word: 'faces', cn: '面容/脸', emoji: '😊' },
      ],
    },
    {
      id: 32,
      english: "She walked through the green forest and heard the sound of a river running between the tall dark trees.",
      chinese: "她走过绿色的森林，听到了河流在高大的深色树木之间流淌的声音。",
      newWords: [
        { word: 'through', cn: '穿过', emoji: '🚶' },
        { word: 'forest', cn: '森林', emoji: '🌲' },
        { word: 'heard', cn: '听到', emoji: '👂' },
        { word: 'sound', cn: '声音', emoji: '🔊' },
        { word: 'running', cn: '流淌/奔跑', emoji: '🏃' },
      ],
    },
    {
      id: 33,
      english: "The old fisherman sat at the end of the narrow wooden bridge and waited for a big silver fish to take his line.",
      chinese: "老渔夫坐在狭窄的木桥尽头，等着一条大银鱼来咬他的鱼线。",
      newWords: [
        { word: 'fisherman', cn: '渔夫', emoji: '🎣' },
        { word: 'bridge', cn: '桥', emoji: '🌉' },
        { word: 'waited', cn: '等待', emoji: '⏳' },
        { word: 'take', cn: '拿/咬（钩）', emoji: '🤲' },
        { word: 'line', cn: '线/鱼线', emoji: '🧵' },
      ],
    },
  ];

  // Hash function to pick a sentence by day (deterministic)
  function hashDay(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Get today's sentence based on date
  function getDailySentence() {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    // Cycle through sentences by day of year
    const idx = dayOfYear % sentences.length;
    return sentences[idx];
  }

  // Get a sentence by index (for navigation)
  function getSentenceByIndex(idx) {
    if (idx < 0 || idx >= sentences.length) return null;
    return sentences[idx];
  }

  // Get total sentence count
  function getSentenceCount() {
    return sentences.length;
  }

  // Highlight new words in the English sentence
  function highlightSentence(sentence) {
    let html = sentence.english;
    // Sort by word length (longest first) to avoid partial replacements
    const sortedWords = [...sentence.newWords].sort((a, b) => b.word.length - a.word.length);
    for (const w of sortedWords) {
      const regex = new RegExp(`\\b(${w.word})\\b`, 'gi');
      html = html.replace(regex, `<mark class="basic-word" data-word="${w.word}" data-cn="${w.cn}">$1</mark>`);
    }
    return html;
  }

  // Get all 850 words as a flat list
  function getAllWords() {
    return Array.from(allWords).sort();
  }

  // Get words count by category
  function getCategoryCounts() {
    return {
      operators: words.operators.length,
      generalNouns: words.generalNouns.length,
      picturableObjects: words.picturableObjects.length,
      qualities: words.qualities.length,
      total: allWords.size,
    };
  }

  // Check if a word is in the 850 list
  function isBasicWord(word) {
    return allWords.has(word.toLowerCase());
  }

  return {
    getDailySentence,
    getSentenceByIndex,
    getSentenceCount,
    highlightSentence,
    getAllWords,
    getCategoryCounts,
    isBasicWord,
  };
})();
