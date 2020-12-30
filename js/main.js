$(document).ready(function () {
    // carousel
    if ($(".block-carousel").length !== 0) {
        $(".block-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnFocus: false,
            dots: true,
            centerMode: true,
            prevArrow: `<button type="button" class="prev-button carousel-button">Previous
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-right" class="svg-inline--fa fa-chevron-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path></svg>
            </button>`,
            nextArrow: `<button type="button" class="next-button carousel-button">Next
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-right" class="svg-inline--fa fa-chevron-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path></svg>
            </button>`,
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

    //scrollbar

    $(".main-nav__list").overlayScrollbars({ 
        overflowBehavior : {
            x : "scroll",
            y : "hidden"
        },
    });

    //facebook sdk
    const id = '479161903483864';
    const homeLink = 'https://localhost:5500/';
    console.log(window.location.href);

    window.fbAsyncInit = () => {
        FB.init({
            appId: id,
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
                    window.location = encodeURI(`https://www.facebook.com/dialog/oauth?client_id=${id}&redirect_uri=${encodeURI(homeLink)}&response_type=token&scope=email`);
                    break;
                default:
                    FB.api("/me?fields=name,id", (response) => {
                        console.log(response, '有登入了');
                    });
                    break;
            }
        });
    })

    if (window.location.href.indexOf('#access_token=') !== -1) {
        window.location.href = homeLink;
    }
});
