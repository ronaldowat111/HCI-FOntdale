// ============================================================
//  FONTDALE — Home page: "Tenants Here" carousel
//  Prev/Next buttons scroll the track by one card; the buttons
//  disable themselves at each end.
// ============================================================
(function () {
  const track = document.getElementById('tenant-track');
  const prev = document.getElementById('tenant-prev');
  const next = document.getElementById('tenant-next');
  if (!track || !prev || !next) return;

  // Width of one card plus the column gap = one scroll step.
  function step() {
    const card = track.querySelector('.tenant');
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  // Toggle the disabled state of the arrows at the track's ends.
  function update() {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
  }

  prev.addEventListener('click', function () {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
