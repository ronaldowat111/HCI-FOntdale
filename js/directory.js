// Directory tenants grouped by zone (matches the Figma directory).
// img = real photo when available, s = picsum seed fallback.
const zones = [
  {
    name: "North Gallery",
    tenants: [
      { n: "Hastala", c: "Fashion & Apparel", d: "Trend-led pieces refreshed weekly, right by the north entrance.", img: "assets/Hastala.png" },
      { n: "Vista", c: "Lifestyle & Home", d: "Lighting, décor, and curated home goods with a warm feel.", img: "assets/Vista.png" },
    ],
  },
  {
    name: "Lumen Skywalk",
    tenants: [
      { n: "H&N", c: "Fashion", d: "Everyday essentials and seasonal looks for the whole family.", s: "hn-store" },
      { n: "PFC", c: "Fast Food Restaurant", d: "Crispy fried chicken and quick bites in the food court.", img: "assets/PFC.png" },
      { n: "Zahra", c: "Fast Fashion", d: "Trend-led, budget-friendly fashion for every day.", s: "zahra" },
      { n: "ZoneTime", c: "Arcade Games", d: "Classic and modern arcade machines for all ages.", img: "assets/ZoneTime.png" },
      { n: "Uniklo", c: "Fashion Store", d: "Everyday basics and seasonal essentials for the whole family.", img: "assets/uniklo.png" },
      { n: "Ikan Bakar Pak Sugeng", c: "Seafood Restaurant", d: "Charcoal-grilled seafood and Indonesian favorites.", img: "assets/ikanbakarpaksugeng.png" },
    ],
  },
  {
    name: "South Pavilion",
    tenants: [
      { n: "Cinema 67", c: "Cinema & Entertainment", d: "Seven screens with premium recliner seating.", img: "assets/cinema.jpg" },
    ],
  },
];

let curZone = 0, curStore = 0;
const grid = document.getElementById('store-grid');
const detail = document.getElementById('dir-detail');
const zoneLabel = document.getElementById('dir-zone-label');

function tenantImage(st){
  return st.img ? st.img : `https://picsum.photos/seed/${st.s}/700/460`;
}

function renderDetail(){
  const st = zones[curZone].tenants[curStore];
  detail.innerHTML = `
    <div class="det-frame">
      <img src="${tenantImage(st)}" alt="${st.n}">
    </div>
    <h3>${st.n}</h3>
    <p class="cat">${st.c}</p>
    <p>${st.d}</p>`;
}

function renderGrid(){
  grid.innerHTML = zones[curZone].tenants.map((st, i) =>
    `<button class="store-btn ${i === curStore ? 'active' : ''}" data-i="${i}">${st.n}</button>`
  ).join('');
}

function renderZone(){
  zoneLabel.textContent = zones[curZone].name;
  renderGrid();
  renderDetail();
}

grid.addEventListener('click', (e) => {
  const b = e.target.closest('.store-btn');
  if(!b) return;
  curStore = +b.dataset.i;
  renderGrid();
  renderDetail();
});

document.getElementById('zone-row').addEventListener('click', (e) => {
  const b = e.target.closest('.zone-btn');
  if(!b) return;
  document.querySelectorAll('.zone-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  curZone = +b.dataset.zone;
  curStore = 0;
  renderZone();
});

renderZone();
