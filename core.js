/* StarFi Pay — page builder core (loaded by loader.js)
   Each page on the site holds only one custom-code embed:
     <div id="ai-root" data-page="home"></div>
     <script src="https://mylaunchpartner.github.io/starfi-pay/loader.js"></script>
   This script fetches pages/<page>.html from the repo, drops it into the
   mount, then runs that page's scripts (nav, calculator, FAQ, GHL form/calendar).
   Edit the page files in GitHub — the live site picks up changes within ~10 min. */
(function () {
  var mount = document.getElementById('ai-root');
  if (!mount || mount.getAttribute('data-ai-loaded')) return;
  mount.setAttribute('data-ai-loaded', '1');

  var self = document.currentScript;
  var BASE = self.src.replace(/[?#].*$/, '').replace(/[^\/]*$/, '');
  var BUST = "v=" + Math.floor(Date.now() / 60000); // new cache key every minute
  // data-page wins when set; otherwise the page is picked from the URL path,
  // so every GHL page can carry the identical embed (handy when cloning pages).
  var PATHS = {
    '/': 'home', '/contact-us': 'contact', '/message-received': 'message-received',
    '/specialty-peptide-payment-processing': 'peptides', '/privacy-policy': 'privacy',
    '/terms-of-service': 'terms', '/about': 'about', '/ownership': 'ownership',
    '/samantha-martinez': 'samantha-martinez', '/blog': 'blog'
  };
  var urlPath = location.pathname.replace(/\/+$/, '') || '/';
  if (urlPath.indexOf('/blog') === 0) urlPath = '/blog';
  var page = (mount.getAttribute('data-page') || PATHS[urlPath] || 'home').replace(/[^a-z0-9-]/gi, '');

  mount.style.minHeight = '100vh';
  // Hide the mount until the page and shell styles are in place, so nothing flashes unstyled.
  mount.style.visibility = 'hidden';
  function reveal() { mount.style.visibility = ''; }
  var revealTimer = setTimeout(reveal, 4000); // never leave the page hidden

  // Pages with a GHL form or calendar: open connections to GHL's hosts now, while the
  // page files are still loading, so the embedded widget starts faster when it's added.
  if (page === 'contact' || page === 'message-received') {
    ['https://api.leadconnectorhq.com', 'https://stcdn.leadconnectorhq.com', 'https://backend.leadconnectorhq.com',
     'https://link.msgsndr.com', 'https://challenges.cloudflare.com'].forEach(function (h) {
      var l = document.createElement('link'); l.rel = 'preconnect'; l.href = h; l.crossOrigin = '';
      document.head.appendChild(l);
      var d = document.createElement('link'); d.rel = 'dns-prefetch'; d.href = h;
      document.head.appendChild(d);
    });
  }

  // Fonts load from <head>, not via @import inside the shell CSS (Safari holds back every
  // rule in a stylesheet until its @import finishes, which showed the header unstyled).
  if (!document.getElementById('sf-fonts')) {
    var pc = document.createElement('link'); pc.rel = 'preconnect'; pc.href = 'https://fonts.gstatic.com'; pc.crossOrigin = '';
    var fl = document.createElement('link'); fl.id = 'sf-fonts'; fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap';
    document.head.appendChild(pc); document.head.appendChild(fl);
  }

  // GHL / Webflow wrap custom-code blocks in padded, width-capped containers.
  // Flatten every wrapper between the mount and <body> so the site runs edge to edge.
  (function flattenWrappers() {
    var css = document.createElement('style');
    css.textContent =
      '.ai-flat{padding:0!important;margin:0!important;max-width:none!important;width:100%!important;border:0!important;background:transparent!important;box-shadow:none!important}' +
      'body{margin:0}';
    document.head.appendChild(css);
    var el = mount.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      el.classList.add('ai-flat');
      el = el.parentElement;
    }
  })();

  function runScripts(root) {
    var list = Array.prototype.slice.call(root.querySelectorAll('script'));
    // Page scripts were written for a fresh page load. Here the page has
    // already loaded, so run any 'load' / 'DOMContentLoaded' callbacks now.
    var orig = window.addEventListener;
    var origDoc = document.addEventListener;
    window.addEventListener = function (t, f, o) {
      if ((t === 'load' || t === 'DOMContentLoaded') && document.readyState === 'complete') { setTimeout(f, 0); return; }
      return orig.call(this, t, f, o);
    };
    document.addEventListener = function (t, f, o) {
      if (t === 'DOMContentLoaded' && document.readyState !== 'loading') { setTimeout(f, 0); return; }
      return origDoc.call(this, t, f, o);
    };
    function restore() { window.addEventListener = orig; document.addEventListener = origDoc; }

    return list.reduce(function (chain, old) {
      return chain.then(function () {
        return new Promise(function (done) {
          var s = document.createElement('script');
          for (var i = 0; i < old.attributes.length; i++) s.setAttribute(old.attributes[i].name, old.attributes[i].value);
          if (old.src) { s.onload = s.onerror = done; }
          else { s.textContent = old.textContent; }
          old.parentNode.replaceChild(s, old);
          if (!old.src) done();
        });
      });
    }, Promise.resolve()).then(function () { setTimeout(restore, 50); }, restore);
  }

  function get(p) {
    return fetch(BASE + p + '?' + BUST).then(function (r) {
      if (!r.ok) throw new Error(p + ' → ' + r.status);
      return r.text();
    });
  }

  // Shared header/footer behaviour (one copy for every page)
  function bindShell() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var isHome = path === '/' || path === '/home';
    // On the home page, keep section links in-page so they scroll instead of reloading
    if (isHome) {
      mount.querySelectorAll('.ai-shell a[href^="/#"]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('href').slice(1));
      });
    }
    mount.querySelectorAll('.ai-shell [data-path]').forEach(function (a) {
      if (path.indexOf(a.getAttribute('data-path')) === 0) { a.classList.add('is-current'); a.setAttribute('aria-current', 'page'); }
    });
    // Every header dropdown (Specialty Processing, More); opening one closes the others
    var dds = Array.prototype.slice.call(mount.querySelectorAll('.ai-shell .tab-dropdown'));
    function closeAll(except) {
      dds.forEach(function (d) { if (d !== except) { d.classList.remove('open'); var b = d.querySelector('.tab-dropdown-btn'); if (b) b.setAttribute('aria-expanded', 'false'); } });
    }
    dds.forEach(function (dd) {
      var btn = dd.querySelector('.tab-dropdown-btn');
      if (!btn) return;
      if (dd.querySelector('.is-current')) btn.classList.add('is-current');
      btn.addEventListener('click', function (e) { e.stopPropagation(); closeAll(dd); btn.setAttribute('aria-expanded', dd.classList.toggle('open')); });
      dd.addEventListener('click', function (e) { e.stopPropagation(); });
    });
    document.addEventListener('click', function () { closeAll(null); });
    var tog = document.getElementById('aiNavToggle'), menu = document.getElementById('aiMobileMenu'), x = document.getElementById('aiMobileClose');
    if (tog && menu) {
      var close = function () { menu.classList.remove('open'); tog.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
      tog.addEventListener('click', function () { menu.classList.add('open'); tog.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
      if (x) x.addEventListener('click', close);
      menu.addEventListener('click', function (e) { if (e.target === menu) close(); });
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    }
  }

  Promise.all([
    get('pages/' + page + '.html'),
    get('partials/header.html'),
    get('partials/footer.html'),
    get('partials/nap.html'),
    get('partials/shell.css')
  ])
    .then(function (p) {
      var html = p[0]
        .replace('<!--ai:header-->', p[1])
        .replace('<!--ai:footer-->', p[2]);
      html = html.split('<!--ai:nap-->').join(p[3]);
      mount.innerHTML = '<style>' + p[4] + '</style>' + html;
      mount.style.minHeight = '';
      // Show the page on the next frames, once the injected styles have been applied
      requestAnimationFrame(function () { requestAnimationFrame(function () { clearTimeout(revealTimer); reveal(); }); });
      bindShell();
      // Blocks marked data-ai-append-body (e.g. the footer on GHL blog pages,
      // where the post list sits below this embed) move to the end of <body>.
      mount.querySelectorAll('[data-ai-append-body]').forEach(function (el) {
        el.classList.add('ai-appended');
        document.body.appendChild(el);
      });
      return runScripts(mount);
    })
    .then(function () {
      // Honour links like /#payroll arriving from another page
      if (location.hash) {
        var t = document.getElementById(location.hash.slice(1));
        if (t) setTimeout(function () { t.scrollIntoView(); }, 120);
      }
    })
    .catch(function (err) {
      if (window.console) console.error('[AI loader]', err);
      mount.style.minHeight = '';
      clearTimeout(revealTimer); reveal();
      mount.innerHTML = '<p style="padding:80px 24px;text-align:center;font:16px/1.6 -apple-system,sans-serif;color:#0F1222">' +
        'Sorry, this page didn’t load. Please refresh, or <a href="/contact-us">contact us</a>.</p>';
    });
})();
