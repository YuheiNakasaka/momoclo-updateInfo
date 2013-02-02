function createMomocloData(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://blogara.jp/t/momoclo/feed.xml",true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      //XML文章の分解
      var xmlDoc = xhr.responseXML;
      var updatedLists = xmlDoc.getElementsByTagName("updated");
      //newの比較用
      if(updatedLists[0].toString() !== cmpUpdate){
          newFlag = 'new';
      }else{
          newFlag = 'old';
      }
      cmpUpdate = updatedLists[0].toString();
    }
  }
  //newプッシュ
  if(newFlag === 'new'){
      chrome.browserAction.setBadgeText({text:"new"});
  }
}
//比較用
var cmpUpdate = '';
var newFlag = 'new';

setInterval("createMomocloData()",1000);
