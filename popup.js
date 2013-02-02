function createMomocloData(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://blogara.jp/t/momoclo/feed.xml",true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      //XML文章の分解
      var xmlDoc = xhr.responseXML;
      var titleLists = xmlDoc.getElementsByTagName("title");
      var linkLists = xmlDoc.getElementsByTagName("link");
      var updatedLists = xmlDoc.getElementsByTagName("updated");
      var summaryLists = xmlDoc.getElementsByTagName("summary");
      var authorLists = xmlDoc.getElementsByTagName("author");

      var htmls = '';

      for (var i = 0;i < titleLists.length; i++) {
          //link要素はインデックス2から
          var link = linkLists[i+1].attributes[2].nodeValue;
          if(i !== 0){
            //Twitterのアカウントの場合はsummaryを表示
            //linkで判別
            if(link === 'http://twitter.com/momorikobuta517'){
              var title = summaryLists[i-1].childNodes[0].nodeValue + ' via ももりこぶたZ';
            }else if(link === 'http://twitter.com/momowgp'){
              var title = summaryLists[i-1].childNodes[0].nodeValue + ' via 川上アキラ';
            }else if(link === 'http://twitter.com/momoclo_king_pr/'){
              var title = summaryLists[i-1].childNodes[0].nodeValue　+ ' via キングレコードももクロ公式';
            }else{
              var title = titleLists[i].childNodes[0].nodeValue;
            }
          //更新日時の整形
          var updated = updatedLists[i].childNodes[0].nodeValue;
          //時刻を日本時刻に変換する
          var spliteds = updated.split('T');
          var splitedTime = spliteds[1].split(':');
          if(parseInt(splitedTime[0]) > 9 && parseInt(splitedTime[0])<15){
            var jaTime = parseInt(splitedTime[0]) + 9;
          }else if(parseInt(splitedTime[0])>=15 && parseInt(splitedTime[0])<25){
            var jaTime = parseInt(splitedTime[0]) - 15;
          }else{
            inum = splitedTime[0].replace(/0/,'');
            var jaTime = parseInt(inum) + 9;
          }
          updated = spliteds[0]+' '+jaTime+':'+splitedTime[1]+':'+splitedTime[2];
          updated = updated.replace(/[TZ]/g,' ');

          htmls += '<div class="feed"><hr><a href="'+link+'" target="_blank">'+title+'</a><p class="update">'+updated+'</p></div>';
          document.getElementById('feed').innerHTML = htmls;
        }else{
          continue;
        }
      }
    }
  }
}
createMomocloData();
//クリックしたら既読にする
chrome.browserAction.setBadgeText({text:""});

