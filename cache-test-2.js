// cache-test-2.js - Larger script to make cache behavior more visible
// Contains dummy data to increase file size for clearer network panel observation

(function() {
  // Dummy data to make the file larger (easier to spot in Network panel)
  const PADDING = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    Duis aute irure dolor in reprehenderit in voluptate velit esse.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa.
    This padding makes the script ~1KB for easier network observation.
    ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz
    ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz
    ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz
  `;

  const loadTime = new Date().toISOString();

  // Wait for performance entries to be available
  setTimeout(() => {
    const entries = performance.getEntriesByType('resource').filter(
      e => e.name.includes('cache-test')
    );

    const cacheInfo = entries.map(entry => ({
      name: entry.name.split('/').pop(),
      transferSize: entry.transferSize,
      fromCache: entry.transferSize === 0 && entry.encodedBodySize > 0,
      duration: entry.duration.toFixed(2) + 'ms'
    }));

    console.log('%c[Cache Test 2]', 'color: green; font-weight: bold', {
      script: 'cache-test-2.js',
      loadedAt: loadTime,
      allCacheTestScripts: cacheInfo
    });

    window.__cacheTest2 = { loadTime, cacheInfo };
  }, 100);
})();
