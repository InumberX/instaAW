$(function () {
    // ウィンドウサイズの変更時
    $(window).resize(function(){
        // サムネイルの高さを設定する
        setThumbHeight('.insta');
    });
    
    // アクセストークン
    var accessToken = '3048391718.f6c6aad.7acc3b27078e4db68896bf3a36c647f2';
    // 投稿日時
    var dateFull = '';
    var date = '';
    // 画像URL
    var imgUrl = '';
    // ロケーション
    var locName = '';
    // 緯度
    var locLtt = '';
    // 経度
    var locLgt = '';
    // 地図情報が登録されているか
    var isLoc = false;
    // リンク先
    var link = '';
    // 出力用HTMLソース
    var outputHtmlStr = '';
    // 取得結果を出力するDOM要素
    var target = '#INSTA_AREA';
    var mainTarget = '#MAIN_IMG';
    // InstagramからJSONデータを取得
    var i = 0;
    $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&callback=?',function (insta) {
        // 取得したJSONデータをHTMLソースに整形
        $.each(insta.data, function (photos, src) {
            // 初期化
            locName = '';
            locLtt = '';
            locLgt = '';
            isLoc = false;
            // 投稿日時を取得
            dateFull = new Date(parseInt(src.created_time) * 1000);
            // yyyy/mm/dd形式に整形
            date = dateFull.getFullYear() + '/' + (dateFull.getMonth()+1) + '/' + (dateFull.getDate());
            // 画像URLを取得
            imgUrl = src.images.standard_resolution.url;
            // 地図情報が登録されている場合
            if(src.location != null && src.location != '') {
                locName = src.location.name;
                locLtt = src.location.latitude;
                locLgt = src.location.longitude;
                isLoc = true;
            }
            // リンク先を先
            link = src.link;
            // 出力用HTMLを設定
            outputHtmlStr += '<li><div class="insta-box"><div class="loc-box">';
            if(isLoc) {
                outputHtmlStr += '<span class="loc-name">' + locName + '</span>';
            }
            outputHtmlStr += '<span class="loc-date">' + date + '</span></div><a href="' + link + '" target="_blank"><img src="' + imgUrl + '" alt="' + date + '"></a>';
            if(isLoc) {
                outputHtmlStr += '<a href="https://maps.google.co.jp/maps?ll=' + locLtt + ',' + locLgt + '" target="_blank"><img src="https://maps.googleapis.com/maps/api/staticmap?center=' + locLtt + ',' + locLgt + '&zoom=16&format=png&sensor=false&size=400x400&maptype=roadmap&markers=' + locLtt + ',' + locLgt + '&key=AIzaSyDxmW2WunIebQ0pcGgKzZkPDYwZBlIC2a0" /></a>';

            }
            outputHtmlStr += '</div></li>';
            i++;
            if(i % 5 == 0) {
                $(outputHtmlStr).appendTo(target);
                outputHtmlStr = '';
                i = 0;
            }
        });
        $('body').fadeIn(2000, function(){
            setThumbHeight('.insta')
        });
    });
});

/*------------------------------------------
サムネイルの高さを設定する処理
--------------------------------------------*/
function setThumbHeight(_target) {
    $(_target).each(function(){
        // ulのwidth
        var ulW = $(_target).children('ul').width() + 4;
        // ul liのwidth
        var liW = $(_target).children('ul').children('li:first-child').outerWidth(true);
        var liSum = 0;
        // 1行に表示されているサムネイルの数
        var liNum = 0;
        // 全サムネイルのheight
        var hList = new Array();
        var i = 0;
        var j = 0;
        var targetLi = $(this).children('ul').find('li .insta-box');
        $(targetLi).css('height', '');
        // 1行にいくつのサムネイルが表示されているか計算
        for(var k = liW; k <= ulW; k += liW) {
            liNum++;
        }
        // 全サムネイルのheightを取得
        $(targetLi).each(function(idx){
            hList[idx] = $(this).height();
        });
        // 各行のサムネイルの高さを設定
        // 1番長いサムネイルのheight
        var maxH = 0;
        for (var k = 0; k <= hList.length; k++) {
            // 1行の比較が終了した場合
            if(k % liNum == 0 && k != 0) {
                // サムネイルの高さを設定
                j = k;
                for (i;i < j; i++) {
                    $(targetLi).eq(i).height(maxH);
                }
                i = j;
                maxH = hList[k];
            } else {
                // サムネイルの高さを比較
                if(maxH < hList[k]) {
                    maxH = hList[k];
                }
            }
            // 最後のサムネイルまで比較した場合
            if (k == hList.length) {
                // 最後の行のサムネイルの高さを設定
                j = k;
                for (i;i < j; i++) {
                    $(targetLi).eq(i).height(maxH);
                }
            }
        }
    });
    return false;
}
