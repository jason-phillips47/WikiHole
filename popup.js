chrome.storage.sync.get({articleList: []}, function(result) {
    var historyDiv = document.getElementById("history");
    for(var i=0; i<result.articleList.length; i++) {
        var line = document.createElement("p");
        if(result.articleList[i].fromArticle !== "") {
            // if the user clicked through an article, add the information about it
            line.innerText = result.articleList[i].articleTitle + " (from " + result.articleList[i].fromArticle + ")";
        } else {
            line.innerText = result.articleList[i].articleTitle;
        }
        historyDiv.appendChild(line);
    }
});