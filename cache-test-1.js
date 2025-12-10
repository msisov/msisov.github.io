// cache-test-1.js - Tests HTTP cache partitioning
// This script logs when it's loaded to help identify cache behavior

(function() {
  const loadTime = new Date().toISOString();
  const scriptInfo = {
    script: 'cache-test-1.js',
    loadedAt: loadTime,
    topLevel: window.top !== window ? 'embedded' : 'top-level',
    referrer: document.referrer || 'none',
    performance: {}
  };

  // Get performance timing for this script
  const entries = performance.getEntriesByName(
    'https://msisov.github.io/cache-test-1.js'
  );

  if (entries.length > 0) {
    const entry = entries[0];
    scriptInfo.performance = {
      transferSize: entry.transferSize,  // 0 = from cache
      encodedBodySize: entry.encodedBodySize,
      fromCache: entry.transferSize === 0 && entry.encodedBodySize > 0,
      duration: entry.duration.toFixed(2) + 'ms'
    };
  }

  console.log('%c[Cache Test 1]', 'color: blue; font-weight: bold', scriptInfo);

  // Store in window for inspection
  window.__cacheTest1 = scriptInfo;
})();
