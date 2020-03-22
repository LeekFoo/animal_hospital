$(function () {
    const apiKey = '364c9cfe9a50bc27';
    const baseUrl = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
    const imgRepl = '__img-repl__';
    const titleRepl = '__title-txt__';
    const textRepl = '__card-txt__';
    const urlRepl = '__url-txt__';

    // キーワードをランダムで設定
    const keyAry = ['滋賀県', '大津市', '京都府'];
    const key = keyAry[Math.floor(Math.random() * keyAry.length)];

    // 挿入する要素
    let listEle = "\
        <div class=\"sns-img col-4 col-md-3\">\
            <div class=\"card bg-dark text-white\">\
                <a href=\"__url-txt__\" target=\"blank\">\
                    <img class=\"card-img\" src=\"__img-repl__\" alt=\"__title-txt__\">\
                    <div class=\"card-img-overlay\">\
                        <h5 class=\"card-title\">__title-txt__</h5>\
                    </div>\
                </a>\
            </div>\
        </div>\
    ";

    // 非同期でデータ取得
    $.when(
        $.ajax({
            type: "GET",
            url: baseUrl,
            dataType: "jsonp",
            data: {
                key: apiKey,
                keyword: key,
                pet: true,
                type: 'lite',
                count: 8,
                format: 'jsonp',
            }
       })
    )
    .done(function(data) {
        const shops = data.results.shop;
        $.each(shops, function(idx, shop) {
            // 画像を変更
            let replHtml = listEle.replace(/__img-repl__/g, this.photo.pc.l);

            // 店名を変更
            replHtml = replHtml.replace(/__title-txt__/g, this.name);

            // リンクを変更
            replHtml = replHtml.replace(/__url-txt__/g, this.urls.pc);

            $('.sns-img-list > div').append(replHtml);
        });

        // 追加したリストに対してイベントを設定
        $('.sns-img-list div.card').each(function() {
            $(this).on({
                'mouseenter': function () {
                    $(".card-img-overlay", this).fadeIn();
                },
                'mouseleave': function () {
                    $(".card-img-overlay", this).fadeOut();
                },
        });
    });
    })
    .fail(function(error) {
        console.log('データ取得失敗');
        console.log(error);
    })
    ;
});
