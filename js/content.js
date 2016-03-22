/*
 Some documentation links
 https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
*/


var tuidRegex = /\d{17,20}/g;
var NODE_ELEMENT = 1;
var NODE_TEXT = 3;
var ENABLED = false;

function findAndHighlightTuid(replacement, searchNode) {
    //console.log("Initiating search");
    if (typeof replacement === 'undefined') {
        return;
    }
    childNodes = (searchNode || document.body).childNodes,
    cnLength = childNodes.length,
    excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        //console.log("Searching in the child node" + currentNode);
        if(currentNode === undefined){
            return;
        }
        if (currentNode.nodeType === NODE_ELEMENT &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(replacement, currentNode);
        }
        if (currentNode.nodeType !== NODE_TEXT || !tuidRegex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(tuidRegex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}
//console.log("Executing search");
if(ENABLED){
    console.log("TUID Processor content script loaded for the page");
    findAndHighlightTuid(function(tuid){
            console.log("Found: " + tuid);
            return '<i><u>' + tuid + '</u></i>';
    });
}