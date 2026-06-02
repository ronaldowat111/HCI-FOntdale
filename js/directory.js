// ============================================================
//  FONTDALE — directory interactivity (3 zones)
//  Zones map to FontDale's architecture: the North Gallery and the
//  South Pavilion, joined by the glass Lumen Skywalk.
//  Edit the `zones` array below to change tenants.
//  Each tenant: n = name, c = category, d = description, s = image seed
// ============================================================
const zones = [
  { // North Gallery — fashion & lifestyle wing
    name: "North Gallery",
    tenants: [
      { n: "Hastala", c: "Fashion & Apparel",  d: "Trend-led pieces refreshed weekly, right by the north entrance.", s: "hastala" },
      { n: "Vayra",   c: "Lifestyle & Home",   d: "Lighting, décor, and curated home goods with a warm feel.",      s: "vayra" },
      { n: "Zahra",   c: "Fast Fashion",       d: "Everyday essentials and seasonal looks for the whole family.",    s: "zahra" },
      { n: "H&N",     c: "Department Store",    d: "A full floor of apparel, accessories, and footwear.",            s: "hn-store" },
      { n: "Basto",   c: "Footwear",            d: "Sneakers and formal shoes from leading brands.",                 s: "basto" },
      { n: "Verde",   c: "Health & Beauty",     d: "Skincare, fragrances, and wellness picks.",                      s: "verde" },
    ],
  },
  { // Lumen Skywalk — the glass bridge: cafés, gifts & specialty
    name: "Lumen Skywalk",
    tenants: [
      { n: "Kopiko",   c: "Coffee & Bakery",    d: "Single-origin coffee and fresh pastries daily, above the atrium.", s: "kopiko" },
      { n: "Petale",   c: "Florist & Gifts",    d: "Bouquets and curated gift sets for any occasion.",                s: "petale" },
      { n: "Terra",    c: "Bookstore & Café",   d: "Books, stationery, and a quiet reading café.",                    s: "terra" },
      { n: "Aurelius", c: "Jewelry",            d: "Fine jewelry and timepieces under the skywalk light.",            s: "aurelius" },
      { n: "Nexus",    c: "Electronics",        d: "Gadgets, audio, and accessories with live demos.",                s: "nexus" },
      { n: "Cloud Nine", c: "Dessert Bar",      d: "Gelato, crêpes, and sweet bites with a skyline view.",            s: "cloudnine" },
    ],
  },
  { // South Pavilion — entertainment & dining wing
    name: "South Pavilion",
    tenants: [
      { n: "Cinéma 7",   c: "Cinema",            d: "Seven screens with premium recliner seating.",        s: "cinema7" },
      { n: "Sky Lounge", c: "Rooftop Dining",    d: "Sunset views with a seasonal tasting menu.",          s: "skylounge" },
      { n: "GymOne",     c: "Fitness Center",    d: "Full gym, classes, and a recovery zone.",             s: "gymone" },
      { n: "Bloom",      c: "Family Restaurant", d: "Comfort food in a bright, kid-friendly space.",       s: "bloom" },
      { n: "Kidzone",    c: "Play Area",         d: "Soft play and activities supervised by staff.",       s: "kidzone" },
      { n: "ZoneTime",   c: "Arcade Games",      d: "Classic and modern arcade machines for all ages.",    s: "zonetime" },
    ],
  },
];

let curZone = 0, curStore = 0;
const grid = document.getElementById('store-grid');
const detail = document.getElementById('dir-detail');
const zoneLabel = document.getElementById('dir-zone-label');

function renderDetail() {
  const st = zones[curZone].tenants[curStore];
  detail.innerHTML = `
    <div class="det-frame">
      <!-- PLACEHOLDER IMAGE: replace with real ${st.n} photo from Figma -->
      <img src="https://picsum.photos/seed/${st.s}/700/460" alt="${st.n}">
    </div>
    <h3>${st.n}</h3>
    <p class="cat">${st.c}</p>
    <p>${st.d}</p>`;
}
function renderGrid() {
  grid.innerHTML = zones[curZone].tenants.map((st, i) =>
    `<button class="store-btn ${i === curStore ? 'active' : ''}" data-i="${i}">${st.n}</button>`
  ).join('');
}
function renderZone() {
  zoneLabel.textContent = zones[curZone].name;
  renderGrid();
  renderDetail();
}

grid.addEventListener('click', (e) => {
  const b = e.target.closest('.store-btn'); if (!b) return;
  curStore = +b.dataset.i; renderGrid(); renderDetail();
});
document.getElementById('zone-row').addEventListener('click', (e) => {
  const b = e.target.closest('.zone-btn'); if (!b) return;
  document.querySelectorAll('.zone-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  curZone = +b.dataset.zone; curStore = 0; renderZone();
});

renderZone();
