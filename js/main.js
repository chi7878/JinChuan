$(document).ready(function () {
    // carousel
    if ($(".block-carousel").length !== 0) {
        $(".block-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            pauseOnFocus: false,
            dots: true,
            centerMode: true,
            prevArrow: `<button type="button" class="prev-button carousel-button">Previous</button>`,
            nextArrow: `<button type="button" class="next-button carousel-button">Next</button>`,
            dotsClass: `dots-item`,
            focusOnSelect: true,
        });
    }

    // scroll button top hidden
    $(".scroll-top").hide();
    $(window).scroll(function (event) {
        $(document).scrollTop().valueOf() < 150 ? $(".scroll-top").hide() : $(".scroll-top").show();
    });

    // scroll top
    $(".scroll-top").click(() => {
        console.log(true);
        $("html, body").animate({ scrollTop: 0 }, 600);
    });
});

//facebook sdk
/*window.fbAsyncInit = function () {
    FB.init({
        appId: "479161903483864", //15碼數字字串不含大括號
        cookie: true,
        xfbml: true,
        version: "v9.0", //筆者目前是v3.1
    });

    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            console.log("你已經登入囉");
        } else {
            login();
        }
    });
}

function login() {
    FB.login(function (response) {
        console.log(response);

        if (response.status === "connected") {
          FB.api('/me', {
            'fields': 'id,name,email,picture'
          }, function (response) {
            console.log(response);
          });
        }
    });
}*/
