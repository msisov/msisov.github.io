// cache-test-image.js - Tests image/resource cache partitioning
// Loads an image and reports cache status

(function() {
  const testImageUrl = 'https://msisov.github.io/test-image.png';

  // Create a test image element
  const img = new Image();
  img.style.display = 'none';

  img.onload = function() {
    setTimeout(() => {
      const entries = performance.getEntriesByName(testImageUrl);

      if (entries.length > 0) {
        const entry = entries[0];
        const info = {
          resource: 'test-image.png',
          transferSize: entry.transferSize,
          encodedBodySize: entry.encodedBodySize,
          fromCache: entry.transferSize === 0 && entry.encodedBodySize > 0,
          duration: entry.duration.toFixed(2) + 'ms'
        };

        console.log('%c[Image Cache Test]', 'color: orange; font-weight: bold', info);
        window.__imageCacheTest = info;
      }
    }, 50);
  };

  img.onerror = function() {
    console.log('%c[Image Cache Test]', 'color: red', 'Image failed to load (expected if test-image.png does not exist)');
  };

  img.src = testImageUrl;
  document.body.appendChild(img);
})();
