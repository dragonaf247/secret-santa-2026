// ============================================================================
// DỌN PHÒNG HỌP 204 — ĐẠI CHIẾN TỔNG VỆ SINH
// Cập nhật: Giảm bớt rác, tăng thêm gián, thêm chú chó Poodle trắng "Bông", nút Tạm dừng
// ============================================================================

const $ = (s) => document.querySelector(s);
const room = $("#room");
const hotspotsLayer = $("#hotspots-layer");
const stainsLayer = $("#stains-layer");
const itemsLayer = $("#items-layer");
const fxLayer = $("#fx-layer");
const binsEl = $("#bins");
const overlay = $("#overlay");
const card = $("#card");
const sponge = $("#sponge");

// ---------- SVG CHÚ CHÓ POODLE TRẮNG XÙ "BÔNG" ----------
const WHITE_POODLE_SVG = `
<svg viewBox="0 0 110 95" class="poodle-body" xmlns="http://www.w3.org/2000/svg">
  <!-- Đuôi bông tròn -->
  <circle cx="88" cy="42" r="11" fill="#ffffff" stroke="#d9e2ec" stroke-width="2.5"/>
  <!-- Thân bông xù trắng -->
  <ellipse cx="62" cy="58" rx="24" ry="18" fill="#ffffff" stroke="#d9e2ec" stroke-width="2.5"/>
  <circle cx="48" cy="52" r="16" fill="#ffffff"/>
  <circle cx="72" cy="54" r="15" fill="#ffffff"/>
  <!-- 4 Chân trắng có pom-pom -->
  <rect x="42" y="68" width="8" height="17" rx="4" fill="#f5f7fa" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="46" cy="85" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="54" y="70" width="8" height="16" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="58" cy="86" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="68" y="69" width="8" height="17" rx="4" fill="#f5f7fa" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="72" cy="85" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="78" y="67" width="8" height="16" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="82" cy="83" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <!-- Vòng cổ hồng xinh xắn + chuông vàng -->
  <path d="M 33 47 Q 44 55 54 46" fill="none" stroke="#ff4081" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="42" cy="52" r="4" fill="#ffd54f" stroke="#b28900" stroke-width="1.2"/>
  <!-- Tai cụp bông xù -->
  <ellipse cx="52" cy="36" rx="10" ry="16" transform="rotate(-12 52 36)" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.2"/>
  <ellipse cx="22" cy="38" rx="9" ry="15" transform="rotate(14 22 38)" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.2"/>
  <!-- Đầu tròn & chỏm lông xù đặc trưng Poodle -->
  <circle cx="36" cy="33" r="17" fill="#ffffff" stroke="#d9e2ec" stroke-width="2.2"/>
  <circle cx="29" cy="18" r="9.5" fill="#ffffff" stroke="#d9e2ec" stroke-width="2"/>
  <circle cx="38" cy="16" r="10.5" fill="#ffffff" stroke="#d9e2ec" stroke-width="2"/>
  <circle cx="46" cy="19" r="8.5" fill="#ffffff" stroke="#d9e2ec" stroke-width="2"/>
  <circle cx="36" cy="23" r="11" fill="#ffffff"/>
  <!-- Nơ đỏ trên đầu -->
  <polygon points="40,14 48,10 46,18" fill="#ff1744"/>
  <polygon points="40,14 33,10 35,18" fill="#ff1744"/>
  <circle cx="40" cy="14" r="2.5" fill="#ffeb3b"/>
  <!-- Mắt đen long lanh & má hồng -->
  <circle cx="29" cy="31" r="3.2" fill="#1e293b"/>
  <circle cx="28" cy="29.8" r="1.1" fill="#ffffff"/>
  <circle cx="41" cy="31" r="3.2" fill="#1e293b"/>
  <circle cx="40" cy="29.8" r="1.1" fill="#ffffff"/>
  <ellipse cx="24" cy="36" rx="3.5" ry="2" fill="#ff80ab" opacity="0.65"/>
  <ellipse cx="45" cy="36" rx="3.5" ry="2" fill="#ff80ab" opacity="0.65"/>
  <!-- Mũi & Lưỡi hồng -->
  <ellipse cx="34" cy="36" rx="3.2" ry="2.3" fill="#1e293b"/>
  <path d="M 31 40 Q 34 45 37 40" fill="#ff80ab" stroke="#ad1457" stroke-width="1"/>
</svg>
`;

// ---------- 5 KHU VỰC PHÂN LOẠI ĐỒ TRONG PHÒNG HỌP 204 ----------
const CATEGORIES = {
  docs: {
    name: "Tủ Hồ Sơ & Sách",
    icon: "🗂️",
    examples: "📁 📄 📕 📐",
    items: ["📁", "📄", "📕", "📗", "📘", "📓", "📋", "📐"],
  },
  tech: {
    name: "Khay Thiết Bị IT",
    icon: "💻",
    examples: "💻 🖱️ 🎤 🔌",
    items: ["💻", "🖱️", "⌨️", "🎤", "🎧", "🔌", "📷", "🔋"],
  },
  pantry: {
    name: "Khay Trà Nước",
    icon: "☕",
    examples: "☕ 🍵 🫖 🥛",
    items: ["☕", "🍵", "🫖", "🥛", "🧋", "🥄", "🍽️"],
  },
  music: {
    name: "Góc Văn Nghệ & Đào Tạo",
    icon: "🎸",
    examples: "🎼 🏆 🎖️ 🎨",
    items: ["🎼", "🏆", "🎖️", "🎨", "🎺", "🥁", "🎭"],
  },
  trash: {
    name: "Thùng Rác Phân Loại",
    icon: "🗑️",
    examples: "🍌 🥤 🍕 🧻",
    items: ["🍌", "🥤", "🧃", "🍕", "🍬", "🧻", "🥫", "🥡"],
  },
};

// ---------- CÁC ĐIỂM SỰ CỐ ĐẶC TRƯNG ĐÚNG VỊ TRÍ TRÊN ẢNH PHÒNG 204 ----------
const ROOM_FIX_SPOTS = [
  {
    id: "poster-blue",
    cls: "hs-poster",
    x: 24.1, y: 28.0, w: 5.4, h: 16.5,
    bg: "rgba(21, 101, 192, 0.9)",
    rot: -14,
    badge: "Lệch bảng!",
    html: "HỌC thêm<br>LÀM giỏi",
    msg: "Đã ngay ngắn bảng 'HỌC thêm LÀM giỏi'!",
  },
  {
    id: "poster-red",
    cls: "hs-poster",
    x: 29.8, y: 29.5, w: 5.0, h: 15.6,
    bg: "rgba(216, 67, 21, 0.9)",
    rot: 13,
    badge: "Lệch bảng!",
    html: "KỸ NĂNG<br>TỐT",
    msg: "Đã chỉnh thẳng bảng 'KỸ NĂNG TỐT'!",
  },
  {
    id: "poster-green",
    cls: "hs-poster",
    x: 34.8, y: 31.0, w: 4.5, h: 15.0,
    bg: "rgba(46, 125, 50, 0.9)",
    rot: -12,
    badge: "Lệch bảng!",
    html: "VỮNG<br>CHUYÊN MÔN",
    msg: "Đã chỉnh thẳng bảng 'VỮNG CHUYÊN MÔN'!",
  },
  {
    id: "tv-left",
    cls: "hs-tv",
    x: 7.2, y: 24.5, w: 12.2, h: 27.5,
    badge: "TV chưa tắt!",
    html: "📺 ĐANG BẬT<br><small>(Nhấn để tắt)</small>",
    msg: "Đã tắt màn hình TV bên trái tiết kiệm điện!",
  },
  {
    id: "tv-right",
    cls: "hs-tv",
    x: 86.8, y: 27.5, w: 5.0, h: 21.5,
    badge: "TV nhiễu!",
    html: "⚡📺",
    msg: "Đã tắt màn hình TV bên phải!",
  },
  {
    id: "ac-left",
    cls: "hs-ac",
    x: 15.0, y: 3.5, w: 11.5, h: 11.5,
    badge: "Rỉ nước!",
    html: "<span class='drip'>💧❄️</span>",
    msg: "Đã chỉnh lại điều hòa trái hết chảy nước!",
  },
  {
    id: "ac-mid",
    cls: "hs-ac",
    x: 45.8, y: 19.2, w: 9.0, h: 6.5,
    badge: "Quá tải 16°C!",
    html: "<span class='drip'>🥶💧</span>",
    msg: "Đã đưa điều hòa giữa về 26°C chuẩn!",
  },
  {
    id: "ac-right",
    cls: "hs-ac",
    x: 69.8, y: 18.2, w: 9.2, h: 6.5,
    badge: "Kêu to!",
    html: "<span class='drip'>💨❄️</span>",
    msg: "Đã vệ sinh lưới lọc điều hòa phải!",
  },
  {
    id: "vase-center",
    cls: "hs-vase",
    x: 51.2, y: 49.0, w: 6.2, h: 11.5,
    badge: "Đổ bình hoa!",
    html: "💐",
    msg: "Đã dựng lại bình hoa hồng giữa bàn họp!",
  },
  {
    id: "printer-back",
    cls: "hs-printer",
    x: 49.5, y: 43.2, w: 5.6, h: 6.2,
    badge: "Kẹt giấy!",
    html: "🖨️📄",
    msg: "Đã gỡ giấy kẹt ở máy in cuối phòng!",
  },
  {
    id: "guitar-yamaha",
    cls: "hs-guitar",
    x: 81.3, y: 42.5, w: 5.5, h: 20.0,
    badge: "Đàn ngả!",
    html: "🎸",
    msg: "Đã dựng gọn bao đàn Guitar YAMAHA vào góc!",
  },
  {
    id: "plant-corner",
    cls: "hs-plant",
    x: 38.0, y: 39.5, w: 5.5, h: 15.0,
    badge: "Lá rụng!",
    html: "🪴🍂",
    msg: "Đã tỉa lá khô và tưới cây góc phòng!",
  },
  {
    id: "clock-wall",
    cls: "hs-clock",
    x: 26.2, y: 16.5, w: 4.5, h: 10.0,
    badge: "Sai giờ!",
    html: "🕙",
    msg: "Đã chỉnh lại đồng hồ Phòng 204 đúng giờ họp!",
  },
  {
    id: "chair-mess-left",
    cls: "hs-chair",
    x: 10.0, y: 58.0, w: 9.0, h: 18.0,
    badge: "Ghế lệch!",
    html: "🪑",
    msg: "Đã xếp ngay ngắn dãy ghế chờ bên trái!",
  },
  {
    id: "chair-mess-table",
    cls: "hs-chair",
    x: 49.0, y: 67.0, w: 10.0, h: 20.0,
    badge: "Ghế ngổn ngang!",
    html: "🪑",
    msg: "Đã đẩy gọn ghế xoay vào gầm bàn họp!",
  },
];

// ---------- VỊ TRÍ BẢNG TRẮNG (TRÁI & PHẢI) ĐỂ LAU VẾT BÚT LÔNG ----------
const WHITEBOARD_SPOTS = [
  { x: 22.3, y: 34.5, text: "ABC?!" },
  { x: 22.3, y: 43.5, text: "123~" },
  { x: 93.8, y: 33.5, text: "TODO!" },
  { x: 93.8, y: 44.5, text: "⚡#@!" },
];

// ---------- VÙNG HỢP LỆ TRÊN MẶT BÀN HỌP & SÀN GẠCH VÀNG ----------
const SPAWN_ZONES = [
  // Mặt bàn họp gỗ dài ở giữa
  { xMin: 29, xMax: 64, yMin: 54, yMax: 65 },
  // Sàn gạch vàng phía trước & bên phải rộng rãi
  { xMin: 57, xMax: 87, yMin: 65, yMax: 90 },
  // Sàn gạch vàng lối đi bên trái
  { xMin: 14, xMax: 33, yMin: 75, yMax: 90 },
  // Khu vực sàn giữa phía sau
  { xMin: 62, xMax: 78, yMin: 55, yMax: 64 },
];

// Vùng sàn gạch vàng cho Poodle trắng chạy lon ton
const FLOOR_ZONES = [
  { xMin: 58, xMax: 86, yMin: 65, yMax: 90 },
  { xMin: 15, xMax: 34, yMin: 75, yMax: 90 },
  { xMin: 62, xMax: 78, yMin: 56, yMax: 66 },
];

// ---------- 4 CA TRỰC: GIẢM BỚT RÁC, TĂNG THÊM GIÁN NGAY TỪ CA 1 ----------
const LEVELS = [
  {
    name: "Ca 1: Sau Giờ Học Kỹ Năng",
    desc: "Lớp học vừa tan, đồ đạc gọn hơn nhưng gián đã bắt đầu bò ra sàn. Hãy cưng nựng bé Poodle trắng để bé phụ bắt gián nhé!",
    items: 7,          // Giảm từ 12 xuống 7
    initialPests: 2,   // Có sẵn 2 con gián ngay đầu màn
    maxPests: 4,
    pestInterval: 6500,
    floorStains: 3,
    boardStains: 2,
    fixes: 4,
    time: 75,
    cats: ["docs", "tech", "pantry", "trash"],
    events: false,
  },
  {
    name: "Ca 2: Họp Giao Ban Khẩn",
    desc: "Gián xuất hiện đông hơn! Cốc cà phê đổ trên sàn, khẩu hiệu tường bị lệch!",
    items: 10,         // Giảm từ 18 xuống 10
    initialPests: 3,
    maxPests: 5,
    pestInterval: 5000,
    floorStains: 4,
    boardStains: 2,
    fixes: 6,
    time: 85,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    events: true,
  },
  {
    name: "Ca 3: Hội Thảo Toàn Trung Tâm",
    desc: "Đàn gián tấn công Phòng 204! Hãy phối hợp cùng bé Poodle Bông để diệt gián trước khi chúng bày bẩn!",
    items: 13,         // Giảm từ 24 xuống 13
    initialPests: 4,
    maxPests: 6,
    pestInterval: 4000,
    floorStains: 5,
    boardStains: 3,
    fixes: 8,
    time: 95,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    events: true,
  },
  {
    name: "Ca 4 (Ác Mộng): Đón Đoàn Thanh Tra",
    desc: "Ban Giám Đốc sắp bước vào cửa Phòng 204! Gián bò khắp nơi, mọi thứ phải sạch bóng 100%!",
    items: 16,         // Giảm từ 30 xuống 16
    initialPests: 5,
    maxPests: 7,
    pestInterval: 3200,
    floorStains: 6,
    boardStains: 4,
    fixes: 11,
    time: 105,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    events: true,
  },
];

// ---------- TRẠNG THÁI GAME ----------
const state = {
  level: 0,
  score: 0,
  levelStartScore: 0,
  combo: 0,
  maxCombo: 0,
  lives: 3,
  time: 0,
  totalTasks: 0,
  doneTasks: 0,
  playing: false,
  paused: false,
  muted: false,
  timer: null,
  pestTimer: null,
  eventTimer: null,
  poodleTimer: null,
  poodleBoostUntil: 0,
};

let drag = null;
let scrubbing = false;
let lastPt = null;
let lastSqueak = 0;
let poodleEl = null;

// ---------- HỆ THỐNG ÂM THANH (WEB AUDIO API) ----------
let actx = null;
function playTone(freq, dur = 0.1, type = "sine", vol = 0.12) {
  if (state.muted) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, actx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
    osc.connect(gain).connect(actx.destination);
    osc.start();
    osc.stop(actx.currentTime + dur);
  } catch (e) {}
}

const sfx = {
  pickup: () => playTone(520, 0.05, "triangle", 0.07),
  good: () => {
    playTone(660, 0.08, "sine", 0.11);
    setTimeout(() => playTone(990, 0.13, "sine", 0.12), 65);
  },
  fix: () => {
    playTone(587, 0.07, "triangle", 0.11);
    setTimeout(() => playTone(880, 0.14, "triangle", 0.12), 60);
  },
  bad: () => {
    playTone(170, 0.22, "sawtooth", 0.13);
    setTimeout(() => playTone(130, 0.25, "sawtooth", 0.13), 120);
  },
  squeak: () => playTone(1150 + Math.random() * 550, 0.035, "triangle", 0.045),
  clean: () => [784, 1046, 1318].forEach((f, i) => setTimeout(() => playTone(f, 0.1, "sine", 0.1), i * 55)),
  squish: () => {
    playTone(320, 0.06, "square", 0.1);
    setTimeout(() => playTone(640, 0.09, "sine", 0.1), 50);
  },
  bark: () => {
    playTone(720, 0.07, "triangle", 0.12);
    setTimeout(() => playTone(980, 0.09, "triangle", 0.13), 85);
  },
  win: () => [523, 659, 784, 1047, 1318].forEach((f, i) => setTimeout(() => playTone(f, 0.18, "triangle", 0.12), i * 110)),
  lose: () => [392, 349, 311, 261].forEach((f, i) => setTimeout(() => playTone(f, 0.25, "sawtooth", 0.11), i * 180)),
};

// ---------- TIỆN ÍCH HIỂN THỊ ----------
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomRoomPoints(count, existingPts = []) {
  const pts = [...existingPts];
  const result = [];
  let tries = 0;
  while (result.length < count && tries < 4500) {
    tries++;
    const z = pick(SPAWN_ZONES);
    const x = z.xMin + Math.random() * (z.xMax - z.xMin);
    const y = z.yMin + Math.random() * (z.yMax - z.yMin);
    if (pts.every((p) => Math.hypot((p.x - x) * 0.85, p.y - y) > 6.2)) {
      const pt = { x, y };
      pts.push(pt);
      result.push(pt);
    }
  }
  while (result.length < count) {
    const z = pick(SPAWN_ZONES);
    const pt = {
      x: z.xMin + Math.random() * (z.xMax - z.xMin),
      y: z.yMin + Math.random() * (z.yMax - z.yMin),
    };
    result.push(pt);
  }
  return result;
}

function floatText(clientX, clientY, text, color = "#69f0ae") {
  const el = document.createElement("div");
  el.className = "float-txt";
  el.textContent = text;
  el.style.color = color;
  el.style.left = Math.min(window.innerWidth - 90, Math.max(90, clientX)) + "px";
  el.style.top = Math.min(window.innerHeight - 40, Math.max(40, clientY)) + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function sparkleAtPct(xPct, yPct, count = 4) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = i % 2 === 0 ? "✨" : "🌟";
    s.style.left = xPct + (Math.random() * 5 - 2.5) + "%";
    s.style.top = yPct + (Math.random() * 5 - 2.5) + "%";
    fxLayer.appendChild(s);
    setTimeout(() => s.remove(), 880);
  }
}

// ---------- CẬP NHẬT GIAO DIỆN HUD & ĐỒNG BỘ MỤC TIÊU ----------
function updateHUD() {
  $("#level-name").textContent = `Ca ${state.level + 1}/${LEVELS.length}`;
  $("#time").textContent = state.time;
  $("#score").textContent = state.score;
  $("#combo").textContent = `x${state.combo}`;
  $("#lives").textContent = "❤️".repeat(state.lives) + "🖤".repeat(Math.max(0, 3 - state.lives));
  $("#time-box").classList.toggle("warn", state.time <= 12 && state.playing && !state.paused);

  const allItems = [...itemsLayer.querySelectorAll(".item")];
  const allStains = [...stainsLayer.querySelectorAll(".stain")];
  const allFixes = [...hotspotsLayer.querySelectorAll(".hotspot")];
  const allPests = [...itemsLayer.querySelectorAll(".pest")];

  const sortLeft = allItems.length;
  const wipeLeft = allStains.length;
  const fixLeft = allFixes.length;
  const pestLeft = allPests.length;

  const remaining = sortLeft + wipeLeft + fixLeft + pestLeft;
  state.totalTasks = state.doneTasks + remaining;
  const pct = state.totalTasks ? Math.round((state.doneTasks / state.totalTasks) * 100) : 100;

  $("#progress-bar").style.width = pct + "%";
  $("#progress-text").textContent = `Tiến độ: ${state.doneTasks}/${state.totalTasks} (${pct}%)`;

  $("#cnt-sort").textContent = sortLeft;
  $("#cnt-wipe").textContent = wipeLeft;
  $("#cnt-fix").textContent = fixLeft;
  $("#cnt-pest").textContent = pestLeft;

  $("#task-sort").classList.toggle("done", sortLeft === 0);
  $("#task-wipe").classList.toggle("done", wipeLeft === 0);
  $("#task-fix").classList.toggle("done", fixLeft === 0);
  $("#task-pest").classList.toggle("done", pestLeft === 0);
  $("#task-pest").classList.toggle("warn-chip", pestLeft > 0);

  binsEl.querySelectorAll(".bin").forEach((b) => {
    const c = itemsLayer.querySelectorAll(`.item[data-cat="${b.dataset.cat}"]`).length;
    b.querySelector(".bin-count").textContent = c > 0 ? `Còn ${c} món` : "✅ Sạch sẽ";
  });

  // Tự động bật viền phát sáng Radar khi chỉ còn <= 3 mục tiêu cuối cùng trong phòng
  const allTargets = [...allItems, ...allStains, ...allFixes, ...allPests];
  allTargets.forEach((el) => {
    el.classList.toggle("last-target-glow", remaining > 0 && remaining <= 3);
  });

  if (state.playing && !state.paused && remaining === 0) {
    winLevel();
  }
}

function bumpCombo() {
  state.maxCombo = Math.max(state.maxCombo, state.combo);
  const box = $("#combo-box");
  box.classList.add("bump");
  setTimeout(() => box.classList.remove("bump"), 160);
}

function loseLife(reason, clientX, clientY) {
  state.lives = Math.max(0, state.lives - 1);
  state.combo = 0;
  state.score = Math.max(0, state.score - 15);
  sfx.bad();
  floatText(
    clientX || window.innerWidth / 2,
    clientY || window.innerHeight / 2,
    `💔 -1 Uy tín (${reason})`,
    "#ff5252"
  );
  updateHUD();
  if (state.lives <= 0) {
    loseLevel("Bạn đã làm mất hết uy tín với Quản lý Phòng 204!");
  }
}

// ---------- XÂY DỰNG KHAY PHÂN LOẠI ----------
function buildBins(catKeys) {
  binsEl.innerHTML = "";
  catKeys.forEach((key) => {
    const c = CATEGORIES[key];
    const div = document.createElement("div");
    div.className = "bin";
    div.dataset.cat = key;
    div.innerHTML = `
      <div class="bin-icon">${c.icon}</div>
      <div class="bin-info">
        <div class="bin-title">${c.name}</div>
        <div class="bin-examples">${c.examples}</div>
        <div class="bin-count"></div>
      </div>
    `;
    binsEl.appendChild(div);
  });
}

// ---------- TẠO SỰ CỐ NỘI THẤT TRÊN SƠ ĐỒ PHÒNG 204 ----------
function spawnHotspotsFromList(list) {
  list.forEach((spot) => {
    const el = document.createElement("div");
    el.className = `hotspot ${spot.cls}`;
    el.dataset.id = spot.id;
    el.style.left = spot.x + "%";
    el.style.top = spot.y + "%";
    el.style.width = spot.w + "%";
    el.style.height = spot.h + "%";
    if (spot.bg) el.style.background = spot.bg;
    if (spot.rot) el.style.transform = `rotate(${spot.rot}deg)`;
    el.dataset.badge = spot.badge;
    el.innerHTML = spot.html;

    el.addEventListener("pointerdown", (e) => {
      if (!state.playing || state.paused || !el.isConnected) return;
      e.preventDefault();
      e.stopPropagation();
      state.combo++;
      const pts = 20 + state.combo * 2;
      state.score += pts;
      state.doneTasks++;
      sfx.fix();
      bumpCombo();
      floatText(e.clientX, e.clientY, `🔧 +${pts} ${spot.msg}`, "#ffd54f");
      sparkleAtPct(spot.x + spot.w / 2, spot.y + spot.h / 2, 4);
      el.remove();
      updateHUD();
    });

    hotspotsLayer.appendChild(el);
  });
}

// ---------- TẠO VẾT BẨN SÀN GẠCH & BẢNG TRẮNG ----------
function createStainElement(typeCls, xPct, yPct, hp, innerHtml) {
  const d = document.createElement("div");
  d.className = `stain ${typeCls}`;
  d.dataset.hp = hp;
  d.dataset.maxHp = hp;
  d.style.left = xPct + "%";
  d.style.top = yPct + "%";
  d.innerHTML = `
    <div class="stain-visual">${innerHtml}</div>
    <div class="stain-hp-wrap"><div class="stain-hp-bar"></div></div>
  `;

  d.addEventListener("pointerdown", (e) => {
    if (!state.playing || state.paused || drag) return;
    e.preventDefault();
    startScrubbing(e);
    damageStain(d, 22, e.clientX, e.clientY);
  });

  stainsLayer.appendChild(d);
}

function spawnStains(floorCount, boardCount, occupiedPts) {
  const floorPts = randomRoomPoints(floorCount, occupiedPts);
  floorPts.forEach((pt, idx) => {
    occupiedPts.push(pt);
    const isCoffee = idx % 2 === 1;
    createStainElement(
      isCoffee ? "stain-coffee" : "stain-floor",
      pt.x,
      pt.y,
      100,
      `<span class="stain-icon">${isCoffee ? "☕" : "💦"}</span>`
    );
  });

  const boards = shuffle(WHITEBOARD_SPOTS).slice(0, boardCount);
  boards.forEach((b) => {
    createStainElement("stain-board", b.x, b.y, 85, `<span>${b.text}</span>`);
  });
}

// ---------- TẠO ĐỒ VẬT BỪA BỘN ----------
function spawnItems(count, cats, occupiedPts = []) {
  const pts = randomRoomPoints(count, occupiedPts);
  for (let i = 0; i < count; i++) {
    occupiedPts.push(pts[i]);
    const cat = cats[i % cats.length];
    const el = document.createElement("div");
    el.className = "item pop-in";
    el.textContent = pick(CATEGORIES[cat].items);
    el.dataset.cat = cat;
    el.style.left = pts[i].x + "%";
    el.style.top = pts[i].y + "%";
    el.style.setProperty("--rot", Math.round(Math.random() * 44 - 22) + "deg");
    el.addEventListener("pointerdown", onItemDown);
    itemsLayer.appendChild(el);
  }
}

// ---------- CHÚ CHÓ POODLE TRẮNG "BÔNG" (TRỢ THỦ BẮT GIÁN ĐÁNG YÊU) ----------
function spawnWhitePoodle() {
  poodleEl = document.createElement("div");
  poodleEl.className = "poodle";
  poodleEl.style.left = "70%";
  poodleEl.style.top = "78%";
  poodleEl.innerHTML = `
    <div class="poodle-tag">🐩 Bông (Nhấn để cưng nựng!)</div>
    ${WHITE_POODLE_SVG}
  `;

  // Nhấp vào bé Poodle để cưng nựng -> Bé hăng hái đi săn gián và cộng điểm tinh thần
  poodleEl.addEventListener("pointerdown", (e) => {
    if (!state.playing || state.paused) return;
    e.preventDefault();
    e.stopPropagation();
    sfx.bark();
    state.poodleBoostUntil = performance.now() + 9000;
    state.score += 10;
    floatText(e.clientX, e.clientY, "🐩 Gâu gâu! +10 Bông đi bắt gián ngay!", "#ff80ab");
    sparkleAtPct(parseFloat(poodleEl.style.left), parseFloat(poodleEl.style.top), 5);
    updatePoodleBehavior();
    updateHUD();
  });

  itemsLayer.appendChild(poodleEl);
}

function updatePoodleBehavior() {
  if (!state.playing || state.paused || !poodleEl || !poodleEl.isConnected) return;

  const pests = [...itemsLayer.querySelectorAll(".pest")];
  const boosted = performance.now() < state.poodleBoostUntil;
  const tag = poodleEl.querySelector(".poodle-tag");
  const curX = parseFloat(poodleEl.style.left) || 70;
  const curY = parseFloat(poodleEl.style.top) || 78;

  if (pests.length > 0) {
    // Tìm chú gián gần bé Poodle nhất để đuổi bắt
    let nearest = pests[0];
    let bestDist = Infinity;
    pests.forEach((p) => {
      const px = parseFloat(p.style.left);
      const py = parseFloat(p.style.top);
      const d = Math.hypot(px - curX, py - curY);
      if (d < bestDist) {
        bestDist = d;
        nearest = p;
      }
    });

    const tx = parseFloat(nearest.style.left);
    const ty = parseFloat(nearest.style.top);
    poodleEl.classList.add("hunting");
    poodleEl.classList.toggle("flip", tx > curX);
    if (tag) tag.textContent = boosted ? "🐩⚡ Bông đang săn gián!" : "🐩 Bông đang rượt gián!";
    $("#poodle-state").textContent = "Đang bắt gián 🪳";

    poodleEl.style.left = tx + "%";
    poodleEl.style.top = ty + "%";

    // Sau khi chạy tới vị trí gián (hoặc chạy ngay nếu được cưng nựng) -> Bông vồ gọn con gián!
    setTimeout(() => {
      if (!state.playing || state.paused || !nearest.isConnected) return;
      killPest(nearest, true);
    }, boosted ? 360 : 580);
  } else {
    // Không có gián -> Bông đi dạo thong thả trên sàn gạch vàng
    poodleEl.classList.remove("hunting");
    const z = pick(FLOOR_ZONES);
    const nx = z.xMin + Math.random() * (z.xMax - z.xMin);
    const ny = z.yMin + Math.random() * (z.yMax - z.yMin);
    poodleEl.classList.toggle("flip", nx > curX);
    poodleEl.style.left = nx + "%";
    poodleEl.style.top = ny + "%";
    if (tag) tag.textContent = boosted ? "🐩💕 Bông rất vui!" : "🐩 Bông (Nhấn để cưng nựng!)";
    $("#poodle-state").textContent = boosted ? "Đang trực chiến ⚡" : "Đang dạo 🐾";
  }
}

// ---------- GIÁN BÒ TRONG PHÒNG (ĐÔNG HƠN & NHANH HƠN) ----------
function killPest(p, byPoodle = false, clientX = null, clientY = null) {
  if (!p || !p.isConnected) return;
  if (p._moveTimer) clearInterval(p._moveTimer);
  if (p._dirtyTimer) clearTimeout(p._dirtyTimer);

  const xPct = parseFloat(p.style.left);
  const yPct = parseFloat(p.style.top);
  const r = p.getBoundingClientRect();
  const fxX = clientX || r.left + r.width / 2;
  const fxY = clientY || r.top + r.height / 2;

  p.remove();
  state.combo++;
  const pts = (byPoodle ? 30 : 25) + state.combo * 2;
  state.score += pts;
  state.doneTasks++;

  if (byPoodle) {
    sfx.bark();
    floatText(fxX, fxY, `🐩💨 +${pts} Bông vồ gọn gián!`, "#ff80ab");
  } else {
    sfx.squish();
    floatText(fxX, fxY, `👟 +${pts} Diệt gọn gián!`, "#00e676");
  }
  bumpCombo();
  sparkleAtPct(xPct, yPct, 3);
  updateHUD();
}

function spawnPest(force = false) {
  if (!state.playing || state.paused) return;
  const L = LEVELS[state.level];

  if (!force) {
    // Ngừng đẻ thêm gián mới khi chỉ còn <= 2 công việc khác để tránh kéo dài cuối màn
    const otherRemaining =
      itemsLayer.querySelectorAll(".item").length +
      stainsLayer.querySelectorAll(".stain").length +
      hotspotsLayer.querySelectorAll(".hotspot").length;
    if (otherRemaining <= 2) return;
    if (itemsLayer.querySelectorAll(".pest").length >= L.maxPests) return;
  }

  const p = document.createElement("div");
  p.className = "pest";
  p.textContent = "🪳";
  const z = pick(SPAWN_ZONES);
  p.style.left = z.xMin + Math.random() * (z.xMax - z.xMin) + "%";
  p.style.top = z.yMin + Math.random() * (z.yMax - z.yMin) + "%";

  p._moveTimer = setInterval(() => {
    if (!p.isConnected || !state.playing) {
      clearInterval(p._moveTimer);
      return;
    }
    if (state.paused) return;
    const nz = pick(SPAWN_ZONES);
    p.style.left = nz.xMin + Math.random() * (nz.xMax - nz.xMin) + "%";
    p.style.top = nz.yMin + Math.random() * (nz.yMax - nz.yMin) + "%";
  }, 1050);

  // Đếm thời gian gián bày bẩn (tạm dừng khi game pause)
  p.dataset.dirtyCountdown = 8;
  p._dirtyTimer = setInterval(() => {
    if (!p.isConnected || !state.playing) {
      clearInterval(p._dirtyTimer);
      return;
    }
    if (state.paused) return;
    let c = +p.dataset.dirtyCountdown - 1;
    p.dataset.dirtyCountdown = c;
    if (c <= 0) {
      clearInterval(p._dirtyTimer);
      if (stainsLayer.querySelectorAll(".stain").length < 10) {
        const xPct = parseFloat(p.style.left);
        const yPct = parseFloat(p.style.top);
        createStainElement("stain-floor", xPct, yPct, 90, `<span class="stain-icon">💦</span>`);
        const r = p.getBoundingClientRect();
        floatText(r.left, r.top, "🪳 Gián vừa tha bẩn ra sàn!", "#ff5252");
        sfx.bad();
        updateHUD();
      }
    }
  }, 1000);

  p.addEventListener("pointerdown", (e) => {
    if (!state.playing || state.paused || !p.isConnected) return;
    e.preventDefault();
    e.stopPropagation();
    killPest(p, false, e.clientX, e.clientY);
  });

  itemsLayer.appendChild(p);
  updateHUD();
}

// ---------- SỰ KIỆN BẤT NGỜ TRONG CA TRỰC ----------
function triggerRandomEvent() {
  if (!state.playing || state.paused) return;
  const remaining =
    itemsLayer.querySelectorAll(".item").length +
    stainsLayer.querySelectorAll(".stain").length +
    hotspotsLayer.querySelectorAll(".hotspot").length;
  if (remaining <= 4 || state.time <= 15) return;

  const roll = Math.random();
  if (roll < 0.55 && hotspotsLayer.querySelectorAll(".hotspot").length < 6) {
    const activeIds = new Set([...hotspotsLayer.querySelectorAll(".hotspot")].map((e) => e.dataset.id));
    const available = ROOM_FIX_SPOTS.filter((s) => !activeIds.has(s.id));
    if (available.length > 0) {
      const spot = pick(available);
      spawnHotspotsFromList([spot]);
      floatText(window.innerWidth / 2, 110, `⚠️ Sự cố mới: ${spot.badge}`, "#ffb300");
      updateHUD();
    }
  } else {
    // Sự kiện: 2 con gián mới bò ra từ gầm bàn!
    spawnPest(true);
    spawnPest(true);
    floatText(window.innerWidth / 2, 110, "🪳 Đàn gián vừa bò ra từ gầm bàn họp!", "#ff5252");
    updateHUD();
  }
}

// ---------- TẠM DỪNG / TIẾP TỤC TRÒ CHƠI ----------
function togglePause() {
  if (!state.playing) return;
  if (state.paused) {
    resumeGame();
  } else {
    pauseGame();
  }
}

function pauseGame() {
  if (!state.playing || state.paused) return;
  state.paused = true;
  if (drag) {
    returnDraggedItem();
    drag = null;
  }
  scrubbing = false;
  sponge.style.display = "none";
  $("#btn-pause").innerHTML = `▶️ <small>Tiếp tục</small>`;

  const L = LEVELS[state.level];
  showOverlay(`
    <h1>⏸️ ĐANG TẠM DỪNG</h1>
    <p><b>${L.name}</b></p>
    <p>Thời gian còn lại: <b>${state.time} giây</b> | Điểm hiện tại: <b>${state.score}</b></p>
    <p>Tiến độ hoàn thành: <b>${state.doneTasks}/${state.totalTasks}</b> công việc</p>
    <div class="btn-row">
      <button class="btn" onclick="resumeGame()">▶️ Tiếp tục dọn phòng</button>
      <button class="btn secondary" onclick="retryLevel()">🔄 Chơi lại Ca này</button>
      <button class="btn secondary" onclick="newGame()">🏠 Về Ca 1</button>
    </div>
  `);
}

function resumeGame() {
  if (!state.playing || !state.paused) return;
  state.paused = false;
  $("#btn-pause").innerHTML = `⏸️ <small>Tạm dừng</small>`;
  hideOverlay();
  updateHUD();
}

// ---------- BẮT ĐẦU MÀN CHƠI ----------
function startLevel(idx) {
  stopTimers();
  const L = LEVELS[idx];
  state.level = idx;
  state.combo = 0;
  state.lives = 3;
  state.time = L.time;
  state.doneTasks = 0;
  state.paused = false;
  state.poodleBoostUntil = 0;
  state.levelStartScore = state.score;
  $("#btn-pause").innerHTML = `⏸️ <small>Tạm dừng</small>`;

  hotspotsLayer.innerHTML = "";
  stainsLayer.innerHTML = "";
  itemsLayer.innerHTML = "";
  fxLayer.innerHTML = "";

  const occupiedPts = [];
  buildBins(L.cats);

  const chosenHotspots = shuffle(ROOM_FIX_SPOTS).slice(0, L.fixes);
  chosenHotspots.forEach((h) => occupiedPts.push({ x: h.x + h.w / 2, y: h.y + h.h / 2 }));

  spawnHotspotsFromList(chosenHotspots);
  spawnStains(L.floorStains, L.boardStains, occupiedPts);
  spawnItems(L.items, L.cats, occupiedPts);
  spawnWhitePoodle();

  hideOverlay();
  state.playing = true;

  // Tạo sẵn số gián đầu màn theo cấu hình
  for (let i = 0; i < L.initialPests; i++) {
    spawnPest(true);
  }
  updateHUD();

  state.timer = setInterval(() => {
    if (!state.playing || state.paused) return;
    state.time--;
    if (state.time <= 10 && state.time > 0) playTone(880, 0.05, "square", 0.06);
    updateHUD();
    if (state.time <= 0) {
      loseLevel("Hết thời gian! Đoàn kiểm tra đã bước vào cửa Phòng 204!");
    }
  }, 1000);

  if (L.pestInterval > 0) {
    state.pestTimer = setInterval(() => {
      if (!state.paused) spawnPest(false);
    }, L.pestInterval);
  }
  if (L.events) {
    state.eventTimer = setInterval(() => {
      if (!state.paused) triggerRandomEvent();
    }, 17000);
  }

  // Bé Poodle trắng hoạt động định kỳ mỗi 2.1 giây
  state.poodleTimer = setInterval(updatePoodleBehavior, 2100);
}

function stopTimers() {
  state.playing = false;
  state.paused = false;
  clearInterval(state.timer);
  clearInterval(state.pestTimer);
  clearInterval(state.eventTimer);
  clearInterval(state.poodleTimer);
  itemsLayer.querySelectorAll(".pest").forEach((p) => {
    if (p._moveTimer) clearInterval(p._moveTimer);
    if (p._dirtyTimer) clearInterval(p._dirtyTimer);
  });
  if (drag) {
    returnDraggedItem();
    drag = null;
  }
  scrubbing = false;
  sponge.style.display = "none";
}

// ---------- KÉO THẢ ĐỒ VẬT ----------
function onItemDown(e) {
  if (!state.playing || state.paused || drag) return;
  e.preventDefault();
  e.stopPropagation();
  const el = e.currentTarget;
  drag = {
    el,
    origLeft: el.style.left,
    origTop: el.style.top,
  };
  el.classList.remove("pop-in");
  el.classList.add("dragging");
  el.style.position = "fixed";
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
  try {
    el.setPointerCapture(e.pointerId);
  } catch (err) {}
  sfx.pickup();
}

function binAtPoint(x, y) {
  return [...binsEl.querySelectorAll(".bin")].find((b) => {
    const r = b.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  });
}

function returnDraggedItem() {
  if (!drag) return;
  const { el, origLeft, origTop } = drag;
  el.classList.remove("dragging");
  el.style.position = "absolute";
  el.style.left = origLeft;
  el.style.top = origTop;
}

function finishDrag(e) {
  if (!drag) return;
  const { el } = drag;
  binsEl.querySelectorAll(".bin").forEach((b) => b.classList.remove("hover"));
  const bin = state.playing && !state.paused ? binAtPoint(e.clientX, e.clientY) : null;

  if (bin && bin.dataset.cat === el.dataset.cat) {
    state.combo++;
    const pts = 12 + state.combo * 3;
    state.score += pts;
    state.doneTasks++;
    el.remove();
    bin.classList.remove("pulse");
    void bin.offsetWidth;
    bin.classList.add("pulse");
    sfx.good();
    bumpCombo();
    floatText(
      e.clientX,
      e.clientY,
      state.combo > 1 ? `+${pts} 🔥Combo x${state.combo}` : `+${pts} Chuẩn!`,
      "#00e676"
    );
    drag = null;
    updateHUD();
  } else if (bin) {
    bin.classList.remove("shake");
    void bin.offsetWidth;
    bin.classList.add("shake");
    setTimeout(() => bin.classList.remove("shake"), 420);
    returnDraggedItem();
    drag = null;
    loseLife("Phân loại sai khay!", e.clientX, e.clientY);
  } else {
    returnDraggedItem();
    drag = null;
  }
}

// ---------- CHÀ SÀN GẠCH VÀNG & XÓA BẢNG TRẮNG ----------
function startScrubbing(e) {
  scrubbing = true;
  lastPt = { x: e.clientX, y: e.clientY };
  sponge.style.display = "block";
  sponge.style.left = e.clientX + "px";
  sponge.style.top = e.clientY + "px";
}

room.addEventListener("pointerdown", (e) => {
  if (!state.playing || state.paused || drag) return;
  if (
    e.target.closest(".item") ||
    e.target.closest(".hotspot") ||
    e.target.closest(".pest") ||
    e.target.closest(".poodle")
  ) {
    return;
  }
  e.preventDefault();
  startScrubbing(e);
});

function damageStain(st, amount, clientX, clientY) {
  if (!st.isConnected) return;
  let hp = +st.dataset.hp - amount;
  const maxHp = +st.dataset.maxHp || 100;
  st.dataset.hp = hp;

  const now = performance.now();
  if (now - lastSqueak > 85) {
    sfx.squeak();
    lastSqueak = now;
  }

  if (hp <= 0) {
    const xPct = parseFloat(st.style.left);
    const yPct = parseFloat(st.style.top);
    const isBoard = st.classList.contains("stain-board");
    st.remove();
    state.combo++;
    const pts = (isBoard ? 22 : 18) + state.combo * 2;
    state.score += pts;
    state.doneTasks++;
    sfx.clean();
    bumpCombo();
    floatText(
      clientX,
      clientY,
      isBoard ? `🧽 +${pts} Bảng trắng sạch bóng!` : `✨ +${pts} Sàn sạch bong!`,
      "#40c4ff"
    );
    sparkleAtPct(xPct, yPct, 4);
    updateHUD();
  } else {
    const ratio = Math.max(0, hp / maxHp);
    const vis = st.querySelector(".stain-visual");
    const bar = st.querySelector(".stain-hp-bar");
    if (vis) {
      vis.style.opacity = 0.25 + ratio * 0.75;
      vis.style.transform = `scale(${0.75 + ratio * 0.25})`;
    }
    if (bar) {
      bar.style.width = Math.round(ratio * 100) + "%";
    }
  }
}

function scrubMove(x, y, dist) {
  const stepDamage = Math.max(2, dist * 0.65);
  stainsLayer.querySelectorAll(".stain").forEach((st) => {
    const r = st.getBoundingClientRect();
    const pad = 16;
    if (x < r.left - pad || x > r.right + pad || y < r.top - pad || y > r.bottom + pad) return;
    damageStain(st, stepDamage, x, y);
  });
}

window.addEventListener("pointermove", (e) => {
  if (drag) {
    drag.el.style.left = e.clientX + "px";
    drag.el.style.top = e.clientY + "px";
    const bin = binAtPoint(e.clientX, e.clientY);
    binsEl.querySelectorAll(".bin").forEach((b) => b.classList.toggle("hover", b === bin));
  } else if (scrubbing) {
    sponge.style.left = e.clientX + "px";
    sponge.style.top = e.clientY + "px";
    const dist = Math.hypot(e.clientX - lastPt.x, e.clientY - lastPt.y);
    lastPt = { x: e.clientX, y: e.clientY };
    if (state.playing && !state.paused) scrubMove(e.clientX, e.clientY, dist);
  }
});

function endPointer(e) {
  if (drag) finishDrag(e);
  if (scrubbing) {
    scrubbing = false;
    sponge.style.display = "none";
  }
}
window.addEventListener("pointerup", endPointer);
window.addEventListener("pointercancel", endPointer);

// ---------- NÚT TẠM DỪNG, GỢI Ý & PHÍM TẮT ----------
$("#btn-pause").addEventListener("click", togglePause);

window.addEventListener("keydown", (e) => {
  if (e.key === "p" || e.key === "P" || e.key === "Escape") {
    if (state.playing) togglePause();
  }
});

function highlightElements(elements, deductScore = false) {
  if (!state.playing || state.paused || elements.length === 0) return;
  if (deductScore) {
    state.score = Math.max(0, state.score - 15);
    updateHUD();
  }
  elements.forEach((t) => {
    t.classList.add("hint-glow");
    setTimeout(() => t.classList.remove("hint-glow"), 2400);
  });
}

$("#btn-hint").addEventListener("click", () => {
  const allTargets = [
    ...itemsLayer.querySelectorAll(".item"),
    ...stainsLayer.querySelectorAll(".stain"),
    ...hotspotsLayer.querySelectorAll(".hotspot"),
    ...itemsLayer.querySelectorAll(".pest"),
  ];
  highlightElements(allTargets, true);
});

$("#task-sort").addEventListener("click", () => highlightElements([...itemsLayer.querySelectorAll(".item")], false));
$("#task-wipe").addEventListener("click", () => highlightElements([...stainsLayer.querySelectorAll(".stain")], false));
$("#task-fix").addEventListener("click", () => highlightElements([...hotspotsLayer.querySelectorAll(".hotspot")], false));
$("#task-pest").addEventListener("click", () => highlightElements([...itemsLayer.querySelectorAll(".pest")], false));
$("#task-poodle").addEventListener("click", () => {
  if (poodleEl) highlightElements([poodleEl], false);
});

$("#btn-mute").addEventListener("click", () => {
  state.muted = !state.muted;
  $("#btn-mute").textContent = state.muted ? "🔇" : "🔊";
});

$("#btn-restart").addEventListener("click", () => {
  if (state.playing) retryLevel();
});

// ---------- MÀN HÌNH THẮNG / THUA / BẮT ĐẦU ----------
const getBest = () => +localStorage.getItem("phong204_v2_best") || 0;
function showOverlay(html) {
  card.innerHTML = html;
  overlay.classList.remove("hidden");
}
function hideOverlay() {
  overlay.classList.add("hidden");
}

function winLevel() {
  stopTimers();
  const L = LEVELS[state.level];
  const timeBonus = state.time * 4;
  const lifeBonus = state.lives * 30;
  state.score += timeBonus + lifeBonus;
  const ratio = state.time / L.time;
  const stars = ratio > 0.45 && state.lives === 3 ? 3 : ratio > 0.2 ? 2 : 1;

  updateHUD();
  sparkleAtPct(50, 50, 12);
  sfx.win();

  const best = Math.max(getBest(), state.score);
  localStorage.setItem("phong204_v2_best", best);

  const isLast = state.level === LEVELS.length - 1;
  if (isLast) {
    showOverlay(`
      <h1>🏆 HOÀN TẤT ĐẠI CHIẾN PHÒNG 204!</h1>
      <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <p>Bạn và bé Poodle trắng <b>Bông 🐩</b> đã giúp Phòng 204 đạt chuẩn xuất sắc!</p>
      <p>Thưởng thời gian: <b>+${timeBonus}</b> | Thưởng uy tín: <b>+${lifeBonus}</b></p>
      <p>Chuỗi Combo cao nhất: <b>x${state.maxCombo}</b></p>
      <h2 style="margin-top:10px">Tổng điểm: ${state.score} (Kỷ lục: ${best})</h2>
      <div class="btn-row">
        <button class="btn" onclick="newGame()">🔁 Chơi lại từ Ca 1</button>
      </div>
    `);
  } else {
    showOverlay(`
      <h2>🎉 Hoàn thành ${L.name}!</h2>
      <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <p>Thưởng thời gian: <b>+${timeBonus}</b> | Thưởng uy tín: <b>+${lifeBonus}</b></p>
      <p>Điểm hiện tại: <b>${state.score}</b></p>
      <p style="color:#ffd54f">Chuẩn bị sang <b>${LEVELS[state.level + 1].name}</b> — nhiều gián hơn!</p>
      <div class="btn-row">
        <button class="btn" onclick="startLevel(${state.level + 1})">➡️ Sang Ca Tiếp Theo</button>
      </div>
    `);
  }
}

function loseLevel(reason) {
  stopTimers();
  sfx.lose();
  showOverlay(`
    <h2 style="color:#ff5252">🚨 CHƯA ĐẠT YÊU CẦU PHÒNG 204!</h2>
    <p>${reason}</p>
    <p>Tiến độ đạt được: <b>${state.doneTasks}/${state.totalTasks}</b> công việc</p>
    <div class="btn-row">
      <button class="btn secondary" onclick="retryLevel()">🔄 Làm lại Ca ${state.level + 1}</button>
      <button class="btn" onclick="newGame()">🏠 Về Ca 1</button>
    </div>
  `);
}

function retryLevel() {
  state.score = state.levelStartScore;
  startLevel(state.level);
}

function newGame() {
  state.score = 0;
  state.maxCombo = 0;
  startLevel(0);
}

function showIntro() {
  buildBins(LEVELS[0].cats);
  showOverlay(`
    <h1>🧹 ĐẠI CHIẾN DỌN PHÒNG 204</h1>
    <p>Dựa trên sơ đồ thực tế <b>Phòng họp & đào tạo 204</b>, nay có thêm trợ thủ <b>Chó Poodle trắng Bông 🐩</b>!</p>
    <div class="guide-grid">
      <div class="guide-item">
        <b>1. 🪳 Nhiều gián hơn & Ít rác hơn</b>
        Đồ đạc đã gọn bớt nhưng đàn gián xuất hiện ngay từ Ca 1. Đập gián trước khi chúng bày bẩn ra sàn!
      </div>
      <div class="guide-item">
        <b>2. 🐩 Chó Poodle trắng "Bông"</b>
        Bé Poodle trắng chạy lon ton trong phòng sẽ tự động đuổi bắt gián giúp bạn! Nhấp vào Bông để cưng nựng (+10đ & tăng tốc bắt gián).
      </div>
      <div class="guide-item">
        <b>3. 🧽 Lau bảng & 🔧 Chỉnh nội thất</b>
        Chà sạch vết bẩn sàn/bảng trắng, chỉnh 3 bảng khẩu hiệu, tắt TV, sửa điều hòa, dựng bình hoa...
      </div>
      <div class="guide-item">
        <b>4. ⏸️ Tạm dừng bất cứ lúc nào</b>
        Nhấn nút <b>⏸️ Tạm dừng</b> trên góc phải (hoặc phím <b>P / Esc</b>) để nghỉ giải lao giữa ca trực.
      </div>
    </div>
    <p>🏆 Kỷ lục hiện tại: <b>${getBest()} điểm</b></p>
    <div class="btn-row">
      <button class="btn" onclick="newGame()">🚀 Bắt đầu Ca 1 ngay!</button>
    </div>
  `);
}

window.startLevel = startLevel;
window.retryLevel = retryLevel;
window.newGame = newGame;
window.resumeGame = resumeGame;

showIntro();
