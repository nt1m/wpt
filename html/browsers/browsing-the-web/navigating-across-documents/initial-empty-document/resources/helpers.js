window.waitForLoad = (t, iframe, urlRelativeToThisDocument) => {
  return new Promise(resolve => {
    iframe.addEventListener("load", t.step_func(() => {
      assert_equals(iframe.contentWindow.location.href, (new URL(urlRelativeToThisDocument, location.href)).href);

      // Wait a bit longer to ensure all history stuff has settled, e.g. the document is "completely loaded"
      // (which happens from a queued task).
      setTimeout(resolve, 0);
    }), { once: true });
  });
};

window.insertIframe = (t) => {
  const iframe = document.createElement("iframe");
  document.body.append(iframe);
  t.add_cleanup(() => iframe.remove());
  return iframe;
};

window.insertIframeWithAboutBlankSrc = async (t) => {
  const iframe = document.createElement("iframe");
  const aboutBlankLoad = new Promise(resolve => {
    iframe.onload = () => {
      // Wait a bit longer in case the about:blank navigation after the
      // initial empty document is asynchronous.
      setTimeout(() => { setTimeout(resolve, 0) }, 0);
    };
  });
  iframe.src = "about:blank";
  document.body.append(iframe);
  await aboutBlankLoad;
  return iframe;
};
