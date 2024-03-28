// ==UserScript==
// @name         Better YouTube
// @namespace    https://github.com/euzzeud
// @version      1
// @description  Improve YouTube Desktop by removing Shorts or unnecessary features.
// @author       Enzo Gioielli
// @match        http://*.youtube.com/*
// @match        https://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(() => {
    const betterYouTube = () => {

        // === SHORTS ===

        // Remove YouTube Shorts Videos
        Array.from(document.querySelectorAll('a[href^="/shorts"]')).forEach(a => {
            let parent = a.parentElement;
            while (parent && (!parent.tagName.startsWith('YTD-') || parent.tagName === 'YTD-THUMBNAIL')) {
                parent = parent.parentElement;
            }
            if (parent) {
                parent.remove();
            }
        });

        // Remove "Shorts" section and others...
        Array.from(document.querySelectorAll('ytd-reel-shelf-renderer')).forEach(shelf => {
            const titleElement = shelf.querySelector('#title');
            if (titleElement && titleElement.innerText === 'Shorts remixing this video' || titleElement.innerText == 'Shorts') {
                shelf.remove();
            }
        });
    }

    const observer = new MutationObserver(betterYouTube);
    observer.observe(document, {
        childList: true,
        subtree: true,
    });

    betterYouTube();
})();

