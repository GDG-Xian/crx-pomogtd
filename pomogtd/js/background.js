/*
This file provides a workaround for the X-Frame-Options HTTP header 
that prevents pages from being displayed in frames.
from: https://code.google.com/p/chrome-page-compare/source/browse/trunk/x-frame-options-workaround.js?spec=svn2&r=2
*/
var webRequest = chrome.webRequest || chrome.experimental.webRequest;
//Older Chrome does not support webRequest API or supports it but response headers cannot be modified
if (webRequest && webRequest.onHeadersReceived) {
    webRequest.onHeadersReceived.addListener((function(details) {
        var headers = details.responseHeaders;
        for(var i = 0; headers && i < headers.length; ++i) {
            if(headers[i].name.toLowerCase() == "x-frame-options") {
                headers.splice(i, 1);
                break;
            }
        }
        return {responseHeaders: headers};
    }), {urls: ["<all_urls>"], types: ["sub_frame"]}, 
    ["blocking", "responseHeaders"]);
} else {
    console.log('Google Tasks for Pomotodo can not work in your browser.');
} 
