$(document).ready(function () {
    // carousel
    $('.block-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnFocus: false,
        dots: true,
        centerMode: true,
        prevArrow: `<button type="button" class="prev-button carousel-button">Previous</button>`,
        nextArrow: `<button type="button" class="next-button carousel-button">Next</button>`,
        dotsClass: `dots-item`,
        focusOnSelect: true
    });

    // scroll button top hidden
    $('.scroll-top').hide();
    $(window).scroll(function (event) {
        $(document).scrollTop().valueOf() < 150 ? $('.scroll-top').hide() :  $('.scroll-top').show();
    });

    // scroll top
    $('.scroll-top').click(() => $('html, body').animate({ scrollTop: 0 }, 600));
});
