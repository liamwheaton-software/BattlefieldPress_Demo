/**
 * gallery.js
 * ----------
 * Runs only on gallery.html
 *
 * Features:
 * - Search (by title)
 * - Filter (by category dropdown)
 * - Sort (date/title)
 * - Renders cards into #galleryGrid
 */

(function () {
  // If this script is loaded on a page without these elements, do nothing safely.
  const grid = document.getElementById("galleryGrid");
  const empty = document.getElementById("emptyState");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const sortSelect = document.getElementById("sortSelect");

  if (!grid || !empty || !searchInput || !categorySelect || !sortSelect) return;

  /**
   * Gallery data
   * ------------
   * Replace titles/categories/dates/images with your real content.
   * Images currently use picsum seeds (stable placeholder images).
   */
  const items = [
    { title: "Mint Foil Business Card", category: "Brand", date: "2025-11-12", image: "https://picsum.photos/seed/foilcard/900/700" },
    { title: "Minimal Stationery Suite", category: "Stationery", date: "2025-10-03", image: "https://picsum.photos/seed/stationery/900/700" },
    { title: "Soft-Touch Packaging Mock", category: "Packaging", date: "2025-12-01", image: "https://picsum.photos/seed/packaging/900/700" },
    { title: "Editorial Cover Study", category: "Editorial", date: "2025-09-18", image: "https://picsum.photos/seed/editorial/900/700" },
    { title: "Warm Accent Hang Tag", category: "Packaging", date: "2025-08-21", image: "https://picsum.photos/seed/hangtag/900/700" },
    { title: "Clean Logo Mark System", category: "Brand", date: "2025-12-20", image: "https://picsum.photos/seed/logomark/900/700" },
    { title: "Foil + Deboss Invitation", category: "Stationery", date: "2025-07-08", image: "https://picsum.photos/seed/invite/900/700" },
    { title: "Matte Editorial Spread", category: "Editorial", date: "2025-10-29", image: "https://picsum.photos/seed/spread/900/700" },
    { title: "Brand Card - Quiet Luxury", category: "Brand", date: "2025-12-28", image: "https://picsum.photos/seed/quietlux/900/700" }
  ];

  /**
   * sortItems(list, mode)
   * --------------------
   * Returns a NEW array sorted by the selected mode.
   */
  function sortItems(list, mode) {
    const arr = [...list];

    if (mode === "title-asc") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (mode === "title-desc") arr.sort((a, b) => b.title.localeCompare(a.title));
    if (mode === "newest") arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (mode === "oldest") arr.sort((a, b) => new Date(a.date) - new Date(b.date));

    return arr;
  }

  /**
   * render()
   * --------
   * Reads the current UI controls (search/filter/sort),
   * filters the dataset, and renders the resulting cards.
   */
  function render() {
    const q = searchInput.value.trim().toLowerCase();
    const cat = categorySelect.value;
    const mode = sortSelect.value;

    // 1) Filter by search + category
    let filtered = items.filter((it) => {
      const matchesText = it.title.toLowerCase().includes(q);
      const matchesCat = (cat === "all") ? true : it.category === cat;
      return matchesText && matchesCat;
    });

    // 2) Sort
    filtered = sortItems(filtered, mode);

    // 3) Render
    grid.innerHTML = "";

    if (filtered.length === 0) {
      empty.style.display = "block";
      return;
    }
    empty.style.display = "none";

    for (const it of filtered) {
      const card = document.createElement("article");
      card.className = "card";

      // NOTE: We keep the external link as placeholder.
      card.innerHTML = `
        <div class="thumb">
          <img src="${it.image}" alt="${it.title}">
          <div class="badge">${it.category}</div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${it.title}</h3>
          <div class="meta">
            <span>${new Date(it.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
            <span>${it.category}</span>
          </div>
          <a class="btn" href="https://en.wikipedia.org/wiki/Web_development" target="_blank" rel="noopener noreferrer">View details (Placeholder) ↗</a>
        </div>
      `;

      grid.appendChild(card);
    }
  }

  // Wire up events
  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  sortSelect.addEventListener("change", render);

  // Initial render
  render();
})();
