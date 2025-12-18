# PDF Viewer

A lightweight PDF viewer designed to be embedded as an iframe in browser extensions. Built with [PDF.js](https://mozilla.github.io/pdf.js/).

**Live URL:** https://msisov.github.io/pdf_viewer/viewer.html

## Purpose

This viewer is used by the [Sample PDF Extension](https://github.com/msisov/pdf-sample-extension) which demonstrates Chromium's experimental MIME handler API. The extension fetches PDF data from the browser's stream and sends it to this viewer for rendering.

## Files

| File | Description |
|------|-------------|
| `viewer.html` | Main PDF viewer with toolbar and canvas |
| `settings-panel.html` | Settings sidebar with theme preferences |

## Usage

### 1. Embed as iframe

```html
<iframe id="viewer-frame" src="https://msisov.github.io/pdf_viewer/viewer.html"></iframe>
```

### 2. Wait for viewer ready

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'viewerReady') {
    // Viewer is ready to receive PDF data
  }
});
```

### 3. Send PDF data

```javascript
const pdfData = new Uint8Array([...]); // PDF bytes

viewerFrame.contentWindow.postMessage({
  type: 'loadPdf',
  pdfData: Array.from(pdfData)
}, '*');
```

### 4. Handle responses

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'pdfLoaded') {
    console.log('PDF loaded:', event.data.numPages, 'pages');
  }
  if (event.data.type === 'pdfError') {
    console.error('Error:', event.data.message);
  }
});
```

## Message Protocol

### Incoming (to viewer)

| Message | Description |
|---------|-------------|
| `{ type: 'loadPdf', pdfData: number[] }` | Load PDF from byte array |

### Outgoing (from viewer)

| Message | Description |
|---------|-------------|
| `{ type: 'viewerReady' }` | Viewer is initialized and ready |
| `{ type: 'pdfLoaded', numPages: number }` | PDF loaded successfully |
| `{ type: 'pdfError', message: string }` | Error loading PDF |
| `{ type: 'themeChange', theme: string }` | User changed theme preference |

## Features

- PDF rendering with PDF.js (loaded from CDN)
- Page navigation (buttons + keyboard arrows)
- Collapsible settings sidebar
- Theme preference (light/dark/auto)

## Storage Partitioning

The theme preferences feature exists to experiment with `localStorage` behavior in iframes.

Due to [storage partitioning](https://developer.chrome.com/docs/privacy-sandbox/storage-partitioning/), iframes have isolated storage by default. Since the MIME handler architecture loads this viewer as an iframe within the extension, `localStorage` is partitioned and not shared with the top-level origin.

This means theme preferences saved in the viewer iframe won't persist across different extension contexts by default.

### Fix

A Chromium fix will be available behind a feature flag (subject to changes and
has to be yet upstreamed):

```
--enable-features=PdfOopifStoragePartitionFix
```

With this flag enabled, the storage partitioning issue is resolved and `localStorage` works as expected for MIME handler iframes.

## Related

- [Sample PDF Extension](https://github.com/msisov/pdf-sample-extension) - Extension that uses this viewer
