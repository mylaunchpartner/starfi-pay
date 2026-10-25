/* StarFi Pay — loader stub.
   GHL pages reference this file; it rarely changes. It pulls core.js with a
   cache key that changes every minute, so site fixes go live within ~1 min. */
(function () {
  var s = document.currentScript;
  var base = s.src.replace(/[?#].*$/, '').replace(/[^\/]*$/, '');
  var c = document.createElement('script');
  c.src = base + 'core.js?v=' + Math.floor(Date.now() / 60000);
  c.async = false;
  (document.head || document.documentElement).appendChild(c);
})();
