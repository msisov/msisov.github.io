# This is a sample app that renders pdf files for extensions

Load this as iframe in your extension and pass pdf bytes to this like

function sendPdfToViewer() {
  if (pdfData && viewerReady) {
    viewerFrame.contentWindow.postMessage({
      type: 'loadPdf',
      pdfData: Array.from(pdfData)
    }, '*');
  }
}
