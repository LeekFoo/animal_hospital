$(function () {
    // トップに戻るボタンの表示・非表示
    const pagetop = $('.top-btn');
    const showPosY = 150;

    $(window).on('load scroll', function () {
        if ($(window).scrollTop() > showPosY) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });

    // グローバルナビ
    const glonav = $('header');
    const main = $('main');
    const hedearHeight = glonav.outerHeight();
    const fixPosY = hedearHeight + 200;

    $(window).on('load scroll resize', function () {
        if ($(window).width() > 767) {
            if ($(window).scrollTop() > fixPosY) {
                main.css('margin-top', hedearHeight + 50);
                glonav.addClass('fix-nav');
            } else {
                main.css('margin-top', 0);
                glonav.removeClass('fix-nav');
            }
        } else {
            main.css('margin-top', 60);
        }
    });


    //スムーススクロール
    $('a[href^="#"]').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });

    // スライダー
    $('.top-slider-wrapper').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        dots: false,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        draggable: false,
        swipe: false,
    });

    $('.hospital-images-inner').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        dots: true,
        arrows: true,
        fade: true,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        customPaging: function (slick, index) {
            // スライダーのインデックス番号に対応した画像のsrcを取得
            var targetImage = slick.$slides.eq(index).find('img').attr('src');
            // slick-dots > li　の中に上記で取得した画像を設定
            return '<img src=" ' + targetImage + ' "/>';
        }
    });

    // ハンバーガーメニュー
    function toggleNav() {
        var body = $('body');
        var hamburger = $('#js-hamburger');
        var blackBg = $('#js-black-bg');

        hamburger.on('click', function () {
            body.toggleClass('nav-open');
            hamburger.toggleClass('bg-white');
        });
        blackBg.on('click', function () {
            body.removeClass('nav-open');
            hamburger.removeClass('bg-white');
        });
    }
    toggleNav();

    // AOS
    AOS.init({
        disable: 'mobile',
        delay: 100,
        once: true,
    });

    // SNS
});
