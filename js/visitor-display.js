(function () {
  var ownUrl = document.currentScript.src;
  var started = false;
  function start() {
    if (started) return;
    started = true;
    var section = document.querySelector('.visitor-stats');
    if (!section) return;
    var dependency = document.createElement('script');
    dependency.src = new URL('jquery-1.12.4.min.js', ownUrl).href;
    dependency.async = true;
    dependency.onload = function () {
      if (!window.jQuery) return;
      window.vmap_jq = window.jQuery.noConflict(true);
      var map = document.createElement('script');
      map.id = 'mapmyvisitors';
      map.async = true;
      map.src = 'https://mapmyvisitors.com/map.js?d=8j7fZQwXC0ndPPq2jByOfKwqLeBhPEr3ftDs3su2oBc&cl=ffffff&w=a';
      section.appendChild(map);
    };
    section.appendChild(dependency);
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
// Fall back to the provider's image embed if its interactive widget stalls.
document.querySelectorAll('.visitor-stats').forEach(function (section) {
  var fallback = document.createElement('div');
  fallback.className = 'visitor-fallback';
  fallback.hidden = true;
  section.appendChild(fallback);
  function ready() {
    var count = section.querySelector('.mapmyvisitors-visitors');
    return count && /\d/.test(count.textContent) && !section.querySelector('.mapmyvisitors-loading');
  }
  function update() {
    if (ready()) {
      fallback.hidden = true;
      section.classList.remove('visitor-use-fallback');
    }
  }
  new MutationObserver(update).observe(section, {childList: true, subtree: true, characterData: true});
  setTimeout(function () {
    if (ready()) return;
    var img = document.createElement('img');
    img.alt = '访客分布地图';
    var note = document.createElement('p');
    note.textContent = '访客数量暂时无法加载';
    img.onerror = function () {
      img.hidden = true;
      note.textContent = '访客地图与数量暂时无法加载';
    };
    img.src = 'https://mapmyvisitors.com/map.png?d=8j7fZQwXC0ndPPq2jByOfKwqLeBhPEr3ftDs3su2oBc&cl=ffffff';
    fallback.appendChild(img);
    fallback.appendChild(note);
    fallback.hidden = false;
    section.classList.add('visitor-use-fallback');
  }, 12000);
});

  }
  function schedule() {
    var section = document.querySelector('.visitor-stats');
    if (!section) return;
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          observer.disconnect();
          setTimeout(start, 1000);
        }
      });
      observer.observe(section);
    } else {
      setTimeout(start, 1000);
    }
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});
})();