/*global chrome*/
function nodeInsertedCallback(event) {
  chrome.storage.local.get(["diabloStatus"], function (items) {
    if (!items["diabloStatus"]) {
      return;
    }

    const videos = document.getElementsByTagName("video");
    Array.from(videos).forEach((v, i) => {
      if (i > 0 && v.duration && !isNaN(v.duration)) {
        v.currentTime = v.duration;
        console.log("ad skipped by diablo :)");
      }
    });
  });
}
document.addEventListener("DOMNodeInserted", nodeInsertedCallback);
