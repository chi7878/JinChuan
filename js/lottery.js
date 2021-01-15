$(document).ready(function () {
    const apiTitle = "http://dduskawqadi.2020-21taiwanhotspring.net";
    let selectPrize = '頭獎';
    const prizeData = [
        { name: '頭獎', num: 1, list: [] },
        { name: '二獎', num: 4, list: [] },
        { name: '三獎', num: 1, list: [] },
        { name: '四獎', num: 1, list: [] },
        { name: '五獎', num: 2, list: [] },
        { name: '六獎', num: 2, list: [] },
        { name: '七獎', num: 2, list: [] },
        { name: '八獎', num: 2, list: [] },
        { name: '九獎', num: 10, list: [] },
        { name: '十獎', num: 10, list: [] },
        { name: '十一獎', num: 10, list: [] },
        { name: '十二獎', num: 10, list: [] },
        { name: '十三獎', num: 100, list: [] },
    ]

    $(".dropdown-list").hide();
    $(".dropdown-list-scroll").overlayScrollbars({});    

    $(".dropdown-box").click(() => {
        $(".dropdown-list").toggle();
    });

    $('.dropdown-item').click((event) => {
        $(".dropdown-list").hide();
        console.log($(event));
        selectPrize = $(event.target).text();
        $('.dropdown-box__title').text(selectPrize);
    })

    $('.lottery-btn_vote').click(function (e) { 
        const select = prizeData.find(item => item.name === selectPrize);

        if (select.list.length === 0) {
            $.ajax({
                type: "GET",
                url: `${apiTitle}/vote/${select.name}/${select.num}`,
                dataType: "json",
                success: function (response) {
                    select.list = response;
                    showData();
                }
            });
        }
    });

    $('.lottery-btn_clear').click(function (e) { 
        e.preventDefault();

        $.ajax({
            type: "GET",
            url: `${apiTitle}/vote_clear/All`,
            dataType: "json",
            success: function (response) {
                prizeData.forEach((item) => item.list = []); 
                $('.lottery-prize-box').html('');
            }, 
            error: function() {
                prizeData.forEach((item) => item.list = []); 
                $('.lottery-prize-box').html('');
            }
        });
    });

    function showData() {
        $('.lottery-prize-box').html('');
        
        prizeData.forEach((item) => {
            if (item.list.length !== 0) {
                let domText = '';
                domText += `
                <div class="lottery-title-box">
                    <p class="lottery-title">${item.name}</p>
                    <button class="lottery-clear-btn" value="${item.name}"></button>
                </div>
                <ul class="lottery-list">`;

                
                domText += item.list.map(ele => {
                    const find = ele.email.lastIndexOf('@');
                    let a = ele.email.substring(0, find);
                    let b = ele.email.substring(find);;
                    let replaceStr = "";
                    for(var i in a){
                        replaceStr += (i > 1 && i < a.length - 1) ? "*" : a[i];
                    }

                    if (ele.name) {
                        let c = ele.name[0];
                        let d = ele.name[ele.name.length - 1];
                        let replaceStrName = "";
                        for (let i = 0; i < ele.name.length - 2; i++ ) replaceStrName += '*';
                    }

                    return `
                    <li class="lottery-item">
                        <div class="lottery-img-box">
                        <img class="lottery-img" src="${!ele.avatar ? '' : ele.avatar}" alt="">
                        </div>
                        <div class="lottery-text-box">
                            <p class="lottery-name">${!ele.name ? '' : `${c}${replaceStrName}${d}`}</p>
                            <p class="lottery-email" title="${replaceStr + b}">${replaceStr + b}</p>
                        </div>
                    </li>`;
                }).join(" ");

                domText += `</ul>`;
                $('.lottery-prize-box').append($('<div/>').addClass('lottery-list-box').html(domText));
            }
        });
    }

    $(document).on('click', '.lottery-clear-btn', function (e) { 
        e.preventDefault();
        const select = prizeData.find(item => item.name === e.target.value);
        console.log(select);

        if (select.list.length !== 0) {
            $.ajax({
                type: "GET",
                url: `${apiTitle}/vote_clear/${select.name}`,
                dataType: "json",
                success: function () {
                    select.list = [];
                    showData();
                },
                error: function () {
                    select.list = [];
                    showData();
                }
            });
        }
    });
})

