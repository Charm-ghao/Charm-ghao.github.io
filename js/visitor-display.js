// The provider inserts its widget asynchronously; keep the map and count without navigation.
document.querySelectorAll('.visitor-stats').forEach(function (section) {
  function removeLinks() {
    section.querySelectorAll('a[href]').forEach(function (link) {
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.removeAttribute('title');
      link.removeAttribute('onclick');
    });
  }
  section.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  removeLinks();
  new MutationObserver(removeLinks).observe(section, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['href']
  });
});