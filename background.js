chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeInfo.status == "complete") {
        if (url.includes('.wikipedia.org/wiki')) {
            var articleTitle = tab.title.split(' - ')[0]; 
            // if the user clicked through an article and opened in a new tab
            if (tab.openerTabId !== undefined) {
                chrome.tabs.get(tab.openerTabId, function(parentTab) {
                    var fromArticle = "";
                    if(parentTab && parentTab.title && parentTab.url.includes('.wikipedia.org/wiki')) {
                        fromArticle = parentTab.title.split(' - ')[0];
                    }
                    // get the current articleList and uniqueArticles
                    chrome.storage.sync.get({articleList: [], uniqueArticles: []}, function(result) {
                        if(!result.uniqueArticles.includes(articleTitle)) {
                            // only add to the lists if the article is new
                            var updatedArticleList = [...result.articleList, {articleTitle, fromArticle}];
                            var updatedUniqueArticles = [...result.uniqueArticles, articleTitle]; 
                            chrome.storage.sync.set({articleList: updatedArticleList});
                            chrome.storage.sync.set({uniqueArticles: updatedUniqueArticles});
                        }
                     });
                });
            }
        }
    }
});