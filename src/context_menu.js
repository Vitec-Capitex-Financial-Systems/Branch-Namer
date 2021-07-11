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
    var branchType = '';
    var branchName = info.selectionText;
    if (info.menuItemId === 'copyForFeatureBranch') {
        branchType = "feature/";
    } else {
        branchType = "bugfix/";
    }
    formatSelectedTextAndCopyToClipboard(branchType, branchName);
});
  
const formatSelectedTextAndCopyToClipboard = (branchType, branchName) => {
    const textArea = document.createElement('TEXTAREA');
    textArea.value = branchType + branchName.toLowerCase()
        .replace(/[åä]/g, 'a').replace(/[ö]/g, 'o').replace(/[^a-z0-9]/g, '-')
        .replace(/\-+/g, '-').replace(/^\-|\-$/g, '');
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};
