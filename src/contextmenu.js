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
        var branchPrefix = '';
        var branchName = info.selectionText;
        if (info.menuItemId === 'copyForFeatureBranch') {
            branchPrefix = "feature/";
        } else {
            branchPrefix = "bugfix/";
        }
        copyToClipboard(branchPrefix, branchName);
    }
});
  
const copyToClipboard = (branchPrefix, branchName) => {
    const textElement = document.createElement('textarea');
    textElement.value = branchPrefix + branchName.toLowerCase()
        .replace(/[åä]/g, 'a').replace(/[ö]/g, 'o').replace(/[^a-z0-9]/g, '-')
        .replace(/\-+/g, '-').replace(/^\-|\-$/g, '');
    textElement.setAttribute('readonly', '');
    textElement.style.position = 'absolute';
    textElement.style.left = '-9999px';
    document.body.appendChild(textElement);
    textElement.select();
    document.execCommand('copy');
    document.body.removeChild(textElement);
};
