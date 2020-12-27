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
    $(".scroll-top").click(() => $("html, body").animate({ scrollTop: 0 }, 600));

    //facebook sdk
    window.fbAsyncInit = () => {
        FB.init({
            appId: '479161903483864',
            cookie: true,
            xfbml: true,
            version: 'v9.0',
        });
    
        FB.AppEvents.logPageView();
    };
    
    ((d, s, id) => {
        var js,fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    
    $('.block-list__button').click(() => {
        FB.getLoginStatus(response => {
            switch (response.status) {
                case 'not_authorized':
                case 'unknown':
                    alert('請先登入Facebook');
                    login();
                    break;
                default:
                    FB.api("/me?fields=name,id", (response) => {
                        console.log(response, '有登入了');
                    });
                    break;
            }
        });
    })
    
    function login() {
        FB.login(function (response) {
            if (response.status === 'connected') {
                FB.api('/me', {fields: 'id,name,email,picture'},
                    (response) => {
                        console.log(response, '剛登入');
                    }
                );
            }
        });
    }
});

