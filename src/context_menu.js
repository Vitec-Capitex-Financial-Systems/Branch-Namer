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

chrome.contextMenus.onClicked.addListener(function(info) {
    var branchPrefix = '';
    var branchName = info.selectionText;
    if (info.menuItemId === 'copyForFeatureBranch') {
        branchPrefix = "feature/";
    } else {
        branchPrefix = "bugfix/";
    }
    formatSelectedTextAndCopyToClipboard(branchPrefix, branchName);
});
  
const formatSelectedTextAndCopyToClipboard = (branchPrefix, branchName) => {
    const textArea = document.createElement('TEXTAREA');
    textArea.value = branchPrefix + branchName.toLowerCase()
        .replace(/[åä]/g, 'a').replace(/[ö]/g, 'o').replace(/[^a-z0-9]/g, '-')
        .replace(/\-+/g, '-').replace(/^\-|\-$/g, '');
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};
