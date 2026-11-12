// ============================================================================
// DỌN PHÒNG HỌP 204 — ĐẠI CHIẾN TỔNG VỆ SINH (BẢN FIX HIỂN THỊ & ĐẾM MỤC TIÊU)
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
// Căn chỉnh lùi vào trong lòng bảng trắng để không bị cắt ở mép phải màn hình
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

// ---------- 4 CA TRỰC VỚI ĐỘ KHÓ TĂNG DẦN ----------
const LEVELS = [
  {
    name: "Ca 1: Sau Giờ Học Kỹ Năng",
    desc: "Lớp học vừa tan, đồ đạc và giấy tờ còn vương trên bàn họp và sàn gạch vàng.",
    items: 12,
    floorStains: 4,
    boardStains: 2,
    fixes: 5,
    time: 75,
    cats: ["docs", "tech", "pantry", "trash"],
    pestInterval: 0,
    events: false,
  },
  {
    name: "Ca 2: Họp Giao Ban Khẩn",
    desc: "Nhiều thiết bị IT, cốc cà phê đổ trên sàn, khẩu hiệu tường bị lệch và gián bắt đầu xuất hiện!",
    items: 18,
    floorStains: 6,
    boardStains: 3,
    fixes: 8,
    time: 85,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    pestInterval: 11000,
    events: true,
  },
  {
    name: "Ca 3: Hội Thảo Toàn Trung Tâm",
    desc: "Phòng 204 quá tải! Điều hòa rỉ nước, máy in kẹt giấy, gián bò ngang dọc tìm rác!",
    items: 24,
    floorStains: 8,
    boardStains: 4,
    fixes: 11,
    time: 95,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    pestInterval: 8500,
    events: true,
  },
  {
    name: "Ca 4 (Ác Mộng): Đón Đoàn Thanh Tra",
    desc: "Ban Giám Đốc sắp bước vào cửa Phòng 204! Mọi thứ phải hoàn hảo 100% trong thời gian cực gắt!",
    items: 30,
    floorStains: 10,
    boardStains: 4,
    fixes: 14,
    time: 105,
    cats: ["docs", "tech", "pantry", "music", "trash"],
    pestInterval: 6500,
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
  muted: false,
  timer: null,
  pestTimer: null,
  eventTimer: null,
};

let drag = null;
let scrubbing = false;
let lastPt = null;
let lastSqueak = 0;

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

// Tránh đặt đồ/vết bẩn đè lên nhau hoặc đè vào các hotspot hiện có
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
  $("#time-box").classList.toggle("warn", state.time <= 12 && state.playing);

  const allItems = [...itemsLayer.querySelectorAll(".item")];
  const allStains = [...stainsLayer.querySelectorAll(".stain")];
  const allFixes = [...hotspotsLayer.querySelectorAll(".hotspot")];
  const allPests = [...itemsLayer.querySelectorAll(".pest")];

  const sortLeft = allItems.length;
  const wipeLeft = allStains.length;
  const fixLeft = allFixes.length;
  const pestLeft = allPests.length;

  const remaining = sortLeft + wipeLeft + fixLeft + pestLeft;
  // Đồng bộ chính xác tổng số việc = số việc đã làm + số việc thực tế đang còn trong phòng
  // (Tránh hoàn toàn lỗi hiển thị thiếu vật phẩm như 31/32 mà không còn gì để dọn)
  state.totalTasks = state.doneTasks + remaining;
  const pct = state.totalTasks ? Math.round((state.doneTasks / state.totalTasks) * 100) : 100;

  $("#progress-bar").style.width = pct + "%";
  $("#progress-text").textContent = `Tiến độ: ${state.doneTasks}/${state.totalTasks} (${pct}%)`;

  $("#cnt-sort").textContent = sortLeft;
  $("#cnt-wipe").textContent = wipeLeft;
  $("#cnt-fix").textContent = fixLeft;
  $("#task-sort").classList.toggle("done", sortLeft === 0);
  $("#task-wipe").classList.toggle("done", wipeLeft === 0);
  $("#task-fix").classList.toggle("done", fixLeft === 0);

  const pestChip = $("#task-pest");
  if (pestLeft > 0) {
    pestChip.style.display = "inline-block";
    $("#cnt-pest").textContent = pestLeft;
  } else {
    pestChip.style.display = "none";
  }

  binsEl.querySelectorAll(".bin").forEach((b) => {
    const c = itemsLayer.querySelectorAll(`.item[data-cat="${b.dataset.cat}"]`).length;
    b.querySelector(".bin-count").textContent = c > 0 ? `Còn ${c} món` : "✅ Sạch sẽ";
  });

  // Tự động bật viền phát sáng Radar khi chỉ còn <= 3 mục tiêu cuối cùng trong phòng
  // để người chơi không bao giờ bị tìm mãi không thấy món cuối!
  const allTargets = [...allItems, ...allStains, ...allFixes, ...allPests];
  allTargets.forEach((el) => {
    el.classList.toggle("last-target-glow", remaining > 0 && remaining <= 3);
  });

  if (state.playing && remaining === 0) {
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
      if (!state.playing || !el.isConnected) return;
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

// ---------- TẠO VẾT BẨN SÀN GẠCH & BẢNG TRẮNG (CÓ THANH MÁU RÕ RÀNG) ----------
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

  // Hỗ trợ cả nhấn trực tiếp vào vết bẩn để bắt đầu chà ngay
  d.addEventListener("pointerdown", (e) => {
    if (!state.playing || drag) return;
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

// ---------- GIÁN BÒ TRONG PHÒNG ----------
function spawnPest() {
  if (!state.playing) return;
  // Không đẻ thêm gián hoặc sự cố mới khi người chơi đã dọn gần xong (còn <= 4 việc)
  const remaining =
    itemsLayer.querySelectorAll(".item").length +
    stainsLayer.querySelectorAll(".stain").length +
    hotspotsLayer.querySelectorAll(".hotspot").length;
  if (remaining <= 4) return;
  if (itemsLayer.querySelectorAll(".pest").length >= 2) return;

  const p = document.createElement("div");
  p.className = "pest";
  p.textContent = "🪳";
  const z = pick(SPAWN_ZONES);
  p.style.left = z.xMin + Math.random() * (z.xMax - z.xMin) + "%";
  p.style.top = z.yMin + Math.random() * (z.yMax - z.yMin) + "%";

  const moveInterval = setInterval(() => {
    if (!p.isConnected || !state.playing) {
      clearInterval(moveInterval);
      return;
    }
    const nz = pick(SPAWN_ZONES);
    p.style.left = nz.xMin + Math.random() * (nz.xMax - nz.xMin) + "%";
    p.style.top = nz.yMin + Math.random() * (nz.yMax - nz.yMin) + "%";
  }, 1150);

  // Nếu sau 7 giây không đập gián, gián sẽ tha thêm vết bẩn ra sàn
  const dirtyTimeout = setTimeout(() => {
    if (!p.isConnected || !state.playing) return;
    const xPct = parseFloat(p.style.left);
    const yPct = parseFloat(p.style.top);
    createStainElement("stain-floor", xPct, yPct, 90, `<span class="stain-icon">💦</span>`);
    const r = p.getBoundingClientRect();
    floatText(r.left, r.top, "🪳 Gián vừa bày thêm bẩn!", "#ff5252");
    sfx.bad();
    updateHUD();
  }, 7000);

  p.addEventListener("pointerdown", (e) => {
    if (!state.playing || !p.isConnected) return;
    e.preventDefault();
    e.stopPropagation();
    clearInterval(moveInterval);
    clearTimeout(dirtyTimeout);
    state.score += 25;
    state.doneTasks++;
    sfx.squish();
    floatText(e.clientX, e.clientY, "👟 +25 Diệt gọn gián!", "#00e676");
    sparkleAtPct(parseFloat(p.style.left), parseFloat(p.style.top), 3);
    p.remove();
    updateHUD();
  });

  itemsLayer.appendChild(p);
  updateHUD();
}

// ---------- SỰ KIỆN BẤT NGỜ TRONG CA TRỰC ----------
function triggerRandomEvent() {
  if (!state.playing) return;
  const remaining =
    itemsLayer.querySelectorAll(".item").length +
    stainsLayer.querySelectorAll(".stain").length +
    hotspotsLayer.querySelectorAll(".hotspot").length;
  // Không tạo sự cố mới khi người chơi đang dọn những món cuối cùng
  if (remaining <= 5 || state.time <= 15) return;

  const roll = Math.random();
  if (roll < 0.5 && hotspotsLayer.querySelectorAll(".hotspot").length < 6) {
    const activeIds = new Set([...hotspotsLayer.querySelectorAll(".hotspot")].map((e) => e.dataset.id));
    const available = ROOM_FIX_SPOTS.filter((s) => !activeIds.has(s.id));
    if (available.length > 0) {
      const spot = pick(available);
      spawnHotspotsFromList([spot]);
      floatText(window.innerWidth / 2, 110, `⚠️ Sự cố mới: ${spot.badge}`, "#ffb300");
      updateHUD();
    }
  } else {
    const L = LEVELS[state.level];
    spawnItems(2, L.cats);
    floatText(window.innerWidth / 2, 110, "⚡ Ai đó vừa để quên thêm 2 món đồ!", "#ffb300");
    updateHUD();
  }
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
  state.levelStartScore = state.score;

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

  hideOverlay();
  state.playing = true;
  updateHUD();

  state.timer = setInterval(() => {
    if (!state.playing) return;
    state.time--;
    if (state.time <= 10 && state.time > 0) playTone(880, 0.05, "square", 0.06);
    updateHUD();
    if (state.time <= 0) {
      loseLevel("Hết thời gian! Đoàn kiểm tra đã bước vào cửa Phòng 204!");
    }
  }, 1000);

  if (L.pestInterval > 0) {
    state.pestTimer = setInterval(spawnPest, L.pestInterval);
  }
  if (L.events) {
    state.eventTimer = setInterval(triggerRandomEvent, 17000);
  }
}

function stopTimers() {
  state.playing = false;
  clearInterval(state.timer);
  clearInterval(state.pestTimer);
  clearInterval(state.eventTimer);
  if (drag) {
    returnDraggedItem();
    drag = null;
  }
  scrubbing = false;
  sponge.style.display = "none";
}

// ---------- KÉO THẢ ĐỒ VẬT ----------
function onItemDown(e) {
  if (!state.playing || drag) return;
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
  const bin = state.playing ? binAtPoint(e.clientX, e.clientY) : null;

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
  if (!state.playing || drag) return;
  if (
    e.target.closest(".item") ||
    e.target.closest(".hotspot") ||
    e.target.closest(".pest")
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
    const pad = 16; // Mở rộng vùng nhận diện khăn lau để chà mượt hơn
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
    if (state.playing) scrubMove(e.clientX, e.clientY, dist);
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

// ---------- NÚT GỢI Ý & CLICK VÀO CHIP NHIỆM VỤ ĐỂ TÌM ĐỒ ----------
function highlightElements(elements, deductScore = false) {
  if (!state.playing || elements.length === 0) return;
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

// Bấm vào từng chip nhiệm vụ trên thanh Task Bar để làm sáng đúng nhóm đó (miễn phí!)
$("#task-sort").addEventListener("click", () => highlightElements([...itemsLayer.querySelectorAll(".item")], false));
$("#task-wipe").addEventListener("click", () => highlightElements([...stainsLayer.querySelectorAll(".stain")], false));
$("#task-fix").addEventListener("click", () => highlightElements([...hotspotsLayer.querySelectorAll(".hotspot")], false));
$("#task-pest").addEventListener("click", () => highlightElements([...itemsLayer.querySelectorAll(".pest")], false));

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
      <p>Phòng 204 đã đạt chuẩn <b>"HỌC thêm LÀM giỏi – KỸ NĂNG TỐT – VỮNG CHUYÊN MÔN"</b>!</p>
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
      <p style="color:#ffd54f">Chuẩn bị sang <b>${LEVELS[state.level + 1].name}</b> — độ khó cao hơn!</p>
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
    <p>Dựa trên sơ đồ thực tế <b>Phòng họp & đào tạo 204</b>. Hãy tổng vệ sinh toàn bộ phòng trước khi Ban Giám Đốc vào kiểm tra!</p>
    <div class="guide-grid">
      <div class="guide-item">
        <b>1. 📦 Phân loại 5 nhóm đồ</b>
        Kéo thả hồ sơ, thiết bị IT, ly tách, nhạc cụ, rác vào đúng khay bên dưới. Sai khay mất 1 ❤️!
      </div>
      <div class="guide-item">
        <b>2. 🧽 Lau sàn gạch & 2 bảng trắng</b>
        Giữ chuột chà qua lại (hoặc nhấp liên tục) trên vết bẩn sàn gạch vàng và nét vẽ bậy trên 2 bảng trắng.
      </div>
      <div class="guide-item">
        <b>3. 🔧 Chỉnh sửa thiết bị Phòng 204</b>
        Nhấp vào 3 bảng khẩu hiệu bị lệch, tắt 2 TV, chỉnh 3 điều hòa, dựng bình hoa, gỡ kẹt máy in, dựng đàn Guitar Yamaha...
      </div>
      <div class="guide-item">
        <b>4. 💡 Mẹo tìm đồ cuối màn</b>
        Khi còn 3 mục tiêu cuối, chúng sẽ <b>tự động phát sáng</b>! Bạn cũng có thể bấm vào các ô nhiệm vụ phía trên để soi vị trí.
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

showIntro();
