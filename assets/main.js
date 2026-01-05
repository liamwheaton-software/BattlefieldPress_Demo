/**
 * main.js
 * -------
 * Shared JavaScript loaded on every page.
 *
 * Responsibilities:
 * 1) Set footer year automatically.
 * 2) Make the "Jump to…" dropdown navigate to selected page.
 *
 */

(function () {
  // ---- 1) Footer year ----
  const yearSpans = document.querySelectorAll("[data-year]");
  const year = String(new Date().getFullYear());
  yearSpans.forEach((el) => (el.textContent = year));

  // ---- 2) "Jump to…" dropdown navigation ----
  // Each page includes a <select id="quickJump">.
  // If it exists, we navigate when selection changes.
  const quickJump = document.getElementById("quickJump");
  if (quickJump) {
    quickJump.addEventListener("change", () => {
      const value = quickJump.value;
      if (!value) return;
      window.location.href = value;
    });
  }
})();
