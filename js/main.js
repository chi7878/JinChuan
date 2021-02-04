$(document).ready(function () {
    const id = "164404645116448";
    const apiTitle = "https://www.2020-21taiwanhotspring.net";
    let hasLogin = false;
    const lastDay = "2021/03/31";
    const data = {};

    getHotspring();

    if ($(".block-carousel").length !== 0) {
        $(".block-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
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

    $(".scroll-top").hide();
    $(window).scroll(function (event) {
        $(document).scrollTop().valueOf() < 150 ? $(".scroll-top").hide() : $(".scroll-top").show();
    });

    $(".scroll-top").click(() => $("html, body").animate({ scrollTop: 0 }, 600));

    $(".main-nav__list").overlayScrollbars({
        overflowBehavior: {
            x: "scroll",
            y: "hidden",
        },
    });

    window.fbAsyncInit = function() {
        FB.init({
            appId: id,
            cookie: true,
            xfbml: true,
            version: 'v9.0'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $(".block-list__button").click((event) => {
        if (new Date(lastDay).getTime() <= new Date().getTime()) {
            $(".login-vote-popup__loading").hide();
            $(".login-vote-popup-success").hide();
            $(".login-vote-popup-error").show();
            $(".login-vote-popup__text").text(`投票活動已結束!!`);
            $(".login-vote-popup").css({ display: "block" });
            setTimeout(() => $(".login-vote-popup").addClass("popup-show"), 0);

            setTimeout(() => {
                $(".login-vote-popup").removeClass("popup-show");
                setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
            }, 3000);

            return;
        } else {
            $.ajax({
                type: "GET",
                url: `${apiTitle}/getLoginStatus`,
                dataType: "json",
                success: function (response) {
                    if (response.isLogin) {
                        checkVote(event.target.value);
                    } else {
                        $(".login-alert-popup").css({ display: "block" });
                        $(".login-alert-popup__text").text(response.status);
                  
                        setTimeout(() => $(".login-alert-popup").addClass("popup-show"), 0);
                    }
                }
            });
        }
    });

    $(".login-alert-popup__button").click(() => {
        FB.login(function (response) {
<<<<<<< HEAD
            FB.api("/me?fields=name,id,email,picture", (res) => {
                console.log(res);

                data.facebook_id = res.id;
                data.facebook_name = res.name;
                data.facebook_avatar = res.picture.data.url;
                data.facebook_token = response.authResponse.accessToken;

                if (res.email) {
                    data.facebook_email = res.email;
                } else {
                    data.facebook_email = `${res.name.replace(/\s+/g, '')}@facebook.com`;
                }

                getLogin();
            });
        }, {
            scope: 'email', 
            return_scopes: true
=======
            $('.login-alert-popup').removeClass("popup-show");
            $(".main-footer__text").text(JSON.stringify(response));
            setTimeout(() => $(".login-alert-popup").css({ display: "none" }), 400);
>>>>>>> 8d67bc9e68fa8988d96692927976c5d42e0ccce4
        });
    });

    $(".login-alert-popup__close").click(() => {
        $(".login-alert-popup").removeClass("popup-show");
        setTimeout(() => $(".login-alert-popup").css({ display: "none" }), 400);
    });

    if (window.location.href.indexOf("#access_token=") !== -1) {
        window.location.href = returnHomeLink;
    }


    function getHotspring() {
        $.ajax({
            type: "GET",
            url: `${apiTitle}/hotspring`,
            dataType: "json",
            success: function (response) {
                $('.block-list__item-content').each((item, value) => {
                    const voteCount = response.data.find(ele => {
                        return ele.HotspringId.toString() === $(value).children('.block-list__button').val();
                    }).VoteCount;
                    $(value).children('.block-list__item-text').text(`${voteCount}票`);
                })
            }
        });
    }

    function getLogin() {
        $.ajax({
            type: "POST",
            url: `${apiTitle}/user_login`,
            dataType: "json",
            data : data,
            success: function (response) {
                $('.login-alert-popup').removeClass("popup-show");
                setTimeout(() => $(".login-alert-popup").css({ display: "none" }), 400);    
            },
            error: function (error) {
                $('.login-alert-popup').removeClass("popup-show");
                setTimeout(() => $(".login-alert-popup").css({ display: "none" }), 400);    
                $(".login-vote-popup__loading").hide();
                $(".login-vote-popup-success").hide();
                $(".login-vote-popup-error").show();
                
                if (error.responseJSON && error.responseJSON.message === "Unknow facebook user") {
                    $(".login-vote-popup__text").text(`Facebook登入錯誤請重整!!`);
                } else {
                    $(".login-vote-popup__text").text(`Facebook系統錯誤!!`);
                }
                
                $(".login-vote-popup").css({ display: "block" });
                setTimeout(() => $(".login-vote-popup").addClass("popup-show"), 0);

                setTimeout(() => {
                    $(".login-vote-popup").removeClass("popup-show");
                    setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
                }, 3000);
            }
        });
    }

    function checkVote(id) {
        $.ajax({
            type: "GET",
            url: `${apiTitle}/check_and_vote/${id}`,
            dataType: "json",
            success: function (response) {
                $(".login-vote-popup__loading").hide();
                $(".login-vote-popup-success").show();
                $(".login-vote-popup__text").text(`投票成功!!`);
                getHotspring();

                setTimeout(() => { 
                    $(".login-vote-popup").removeClass("popup-show");
                    setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
                }, 1800);
            },
            error: function (error) {
                if (error.responseJSON.message === "Please login") {
                    getLogin(id);
                } else {
                    $(".login-vote-popup__loading").hide();
                    $(".login-vote-popup-error").show();
                    $(".login-vote-popup__text").text(`投票次數已滿!!`);
    
                    setTimeout(() => {
                        $(".login-vote-popup").removeClass("popup-show");
                        setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
                    }, 2000);
                }
            }
        });
    }
});

if (navigator.userAgent.indexOf("Line") > -1) {
    window.location.href = `${window.location.href}?openExternalBrowser=1`;
}

