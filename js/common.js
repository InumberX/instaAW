// SPウィンドウサイズ
var isSp = 767;

$(function () {
    
    /*------------------------------------------
    user agent
    --------------------------------------------*/
    var ua = navigator.userAgent;
    var bw = window.navigator.userAgent.toLowerCase();
    
    if($('body').hasClass('pcview')){
    } else {
        /* iOSスマホ */
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 ){
            $('body').addClass('sp-vis ios');
        } else if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
            /* Androidスマホ */
            $('body').addClass('sp-vis');
            // Android標準ブラウザかつAndroidバージョンが4以下の場合
            if(isAndDefaultBrowser()==true && androidVersion() <= 4) {
                $('body').addClass('ad-df');
            } else {
                $('body').addClass('ad-ot');
            }
        } else if (ua.indexOf("windows") != -1 && ua.indexOf("phone") != -1){
            /* windows Phone */
            $('body').addClass('sp-vis winp');
        } else if (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || (ua.indexOf("windows") != -1 && ua.indexOf("touch") != -1) || ua.indexOf('A1_07') > 0 || ua.indexOf('SC-01C') > 0){
            /* タブレット */
            $('body').addClass('tab');
            var metalist = document.getElementsByTagName('meta');
            for(var i = 0; i < metalist.length; i++) {
                var name = metalist[i].getAttribute('name');
                if(name && name.toLowerCase() === 'viewport') {
                    metalist[i].setAttribute('content','width=1000');
                    break;
                }
            }
        } else if (bw.indexOf('msie') != -1 || bw.indexOf('trident') >= 0) {
            //IEの処理
            $('body').addClass('ie pc-vis');
            //IE6-7
            if (bw.indexOf("msie 7.") != -1 || bw.indexOf("msie 6.") != -1) {
                $('body').addClass('ie7');
            } else if (bw.indexOf("msie 8.") != -1) {
                //IE8
                $('body').addClass('ie8');
            } else if (bw.indexOf("msie 9.") != -1) {
                //IE9
                $('body').addClass('ie9');
            } else if (bw.indexOf("msie 10.") != -1) {
                //IE10
                $('body').addClass('ie10');
            }
        } else {
            $('body').addClass('pc-vis');
        }
        //webkit系
        if (bw.indexOf('chrome') != -1 || bw.indexOf('safari') != -1) {
            $('body').addClass('webkit');
        }
    }
    
    /* Android 標準ブラウザ */
    function isAndDefaultBrowser(){
        var ua=window.navigator.userAgent.toLowerCase();
        if(ua.indexOf('linux; u;')>0){
            return true;
        }else{
            return false;
        }
    }
    
    /* Android バージョン判定(不要なら削除) */
    function androidVersion() {
        var ua = navigator.userAgent;
        if( ua.indexOf("Android") > 0 ) {
            var version = parseFloat(
                ua.slice(ua.indexOf("Android")+8));
            return version;
        }
    }
    
    /*------------------------------------------
    smoothScroll
    --------------------------------------------*/
    $('a[href^="#"]').click(function() {
        // ウィンドウのサイズを取得
        var winWSize = $(window).width();
        // ウィンドウサイズが767px未満かつメニューが開いていた場合
        if (winWSize <= isSp && $('body').hasClass('m-op')) {
            $('body').removeClass('m-op').css('top','');
            $('.header-menu-box').animate({right:_navW},_speed,'swing');
            $('.overlay').fadeOut(_speed);
            $(window).scrollTop(_st);
        }
        // スクロール速度
        var speed = 300;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });

    
    /*------------------------------------------
    年号
    --------------------------------------------*/
    // 現在年取得
    var nowYear = new Date().getFullYear();
    
    // footerのコピーライトを上書き
    $('footer .c-year').text(nowYear);

});
