$(document).ready(function () {
    const id = "479161903483864";
    const returnHomeLink = "https://localhost:5502/";
    const apiTitle = "http://dduskawqadi.2020-21taiwanhotspring.net";
    const hasLogin = false;

    getHotspring();

    // carousel
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

    // scroll button top hidden
    $(".scroll-top").hide();
    $(window).scroll(function (event) {
        $(document).scrollTop().valueOf() < 150 ? $(".scroll-top").hide() : $(".scroll-top").show();
    });

    // scroll top
    $(".scroll-top").click(() => $("html, body").animate({ scrollTop: 0 }, 600));

    //scrollbar
    $(".main-nav__list").overlayScrollbars({
        overflowBehavior: {
            x: "scroll",
            y: "hidden",
        },
    });

    //facebook sdk
    window.fbAsyncInit = () => {
        FB.init({
            appId: id,
            cookie: true,
            xfbml: true,
            version: "v9.0",
        });

        FB.AppEvents.logPageView();
    };

    ((d, s, id) => {
        var js, fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    $(".block-list__button").click((event) => {
        $(".login-vote-popup-success").hide();
        $(".login-vote-popup-error").hide();
        $(".login-vote-popup").css({ display: "block" });
        setTimeout(() => $(".login-vote-popup").addClass("popup-show"), 0);

        if (this.hasLogin) {
            checkVote(event.target.value);
        } else {
            getLogin(event.target.value);
        }

        return;

        FB.getLoginStatus((response) => {
            switch (response.status) {
                case "not_authorized":
                case "unknown":
                    $(".login-alert-popup").css({ display: "block" });
                    setTimeout(() => $(".login-alert-popup").addClass("popup-show"), 0);
                    
                    break;
                default:
                    $(".login-vote-popup-success").hide();
                    $(".login-vote-popup-error").hide();
                    $(".login-vote-popup").css({ display: "block" });
                    setTimeout(() => $(".login-vote-popup").addClass("popup-show"), 0);
            
                    if (this.hasLogin) {
                        checkVote(event.target.value);
                    } else {
                        FB.api("/me?fields=name,id,email,picture", (res) => {
                            console.log(res, response, "有登入了");
                            getLogin(event.target.value);
                        });
                    }

                    break;
            }
        });
    });

    $(".login-alert-popup__button").click(() => {
        window.location = encodeURI(
            `https://www.facebook.com/dialog/oauth?client_id=${id}&redirect_uri=${
            encodeURI(returnHomeLink)}&response_type=token&scope=email`
        );
    });

    $(".login-alert-popup__close").click(() => {
        $(".login-alert-popup").removeClass("popup-show");
        setTimeout(() => $(".login-alert-popup").css({ display: "none" }), 400);
    });

    if (window.location.href.indexOf("#access_token=") !== -1) {
        window.location.href = returnHomeLink;
    }


    //溫泉列表
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

    const data = {
        id: "3506866172766595",
        name: "曾昱麒",
        email: "percy860407@yahoo.com.tw",
        photo: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3506866172766595&height=50&width=50&ext=1612616061&hash=AeTt-n_N5si6P2OQNDc",
        token: "EAAGzy5MMC9gBAKer80q8BeXQWVjAMz5NzZCu685kt2NPBVPtYGkXzZAZBoKZAcXsCjOGc7ZCoFvOAipykxfQAp8quyNLp7PQHHK2JiqtbHMnZAOVS5Q5f0enhtGG9ykaWeHZCunp24pxNI3nguaoLZAS1ZAeB0EurxLDzPeRfByxEh4ZA74me8kqYUk3kNjZByZBZCmMAMWZBAIJ2ZBAAZDZD",
    };

    // login
    function getLogin(id) {
        $.ajax({
            type: "POST",
            url: `${apiTitle}/user_login`,
            dataType: "json",
            data : {
                facebook_id: "123456789123456789",
                facebook_name: "test01",
                facebook_email: "123456@gmail.com",
                facebook_avatar: "123123123",
                facebook_token: "456789456789",
            },
            success: function (response) {
                console.log('success', response);
                this.hasLogin = true;
                checkVote(id);
            },
            error: function (error) {
                console.log('error', error);
            },
        });
    }

    // check 
    function checkVote(id) {
        $.ajax({
            type: "GET",
            url: `${apiTitle}/check_and_vote/${id}`,
            dataType: "json",
            success: function (response) {
                $(".login-vote-popup__loading").hide();
                $(".login-vote-popup-success").show();
                $(".login-vote-popup__text").text(`投票成功!!`);

                setTimeout(() => {
                    $(".login-vote-popup").removeClass("popup-show");
                    setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
                }, 1800);
            },
            error: function () {
                $(".login-vote-popup__loading").hide();
                $(".login-vote-popup-error").show();
                $(".login-vote-popup__text").text(`投票次數已滿!!`);

                setTimeout(() => {
                    $(".login-vote-popup").removeClass("popup-show");
                    setTimeout(() => $(".login-vote-popup").css({ display: "none" }), 400);
                }, 2000);
            }
        });
    }
});
