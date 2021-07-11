chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "copyForFeatureBranch",
        "title": "Copy for feature branch",
        "contexts": ["selection"]
    });
    chrome.contextMenus.create({
        "id": "copyForBugfixBranch",
        "title": "Copy for bugfix branch",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        var branchName = info.selectionText;
        if (info.menuItemId === 'copyForFeatureBranch') {
            branchName = "feature/" + branchName;
        } else {
            branchName = "bugfix/" + branchName;
        }
        copyToClipboard(branchName);
    }
});
  
const copyToClipboard = branchName => {
    const textElement = document.createElement('textarea');
    textElement.value = branchName.replace(/[\.\s+ ,:#]/g, '-').toLowerCase().replace(/[åä]/g, 'a').replace(/[ö]/g, 'o');
    textElement.setAttribute('readonly', '');
    textElement.style.position = 'absolute';
    textElement.style.left = '-9999px';
    document.body.appendChild(textElement);
    textElement.select();
    document.execCommand('copy');
    document.body.removeChild(textElement);
};
