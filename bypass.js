// ==UserScript==
// @name         Block Twitter API Requests
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Block specific Twitter API requests on page load
// @author       Taylor Christian Newsome
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Block Fetch requests
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const url = args[0];
        if (typeof url === 'string' && (url.includes('twitter.com/i/api/1.1/keyregistry/register') ||
                                        url.includes('x.com/i/api/1.1/keyregistry/register') ||
                                        url.includes('api.twitter.com/i/api/1.1/keyregistry/register') ||
                                        url.includes('api.x.com/i/api/1.1/keyregistry/register'))) {
            console.log('Blocked Fetch request to:', url);
            return Promise.reject(new Error('Blocked request'));
        }
        return originalFetch.apply(this, args);
    };

    // Block XMLHttpRequest
    const originalXhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (url.includes('twitter.com/i/api/1.1/keyregistry/register') ||
            url.includes('x.com/i/api/1.1/keyregistry/register') ||
            url.includes('api.twitter.com/i/api/1.1/keyregistry/register') ||
            url.includes('api.x.com/i/api/1.1/keyregistry/register')) {
            console.log('Blocked XMLHttpRequest to:', url);
            return;
        }
        return originalXhrOpen.apply(this, arguments);
    };
})();
