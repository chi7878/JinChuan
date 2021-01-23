$(document).ready(function () {
    const apiTitle = "http://dduskawqadi.2020-21taiwanhotspring.net";
    let selectPrize = '頭獎';
    const prizeData = [
        { name: '頭獎',prize: 'IPhone 12 mini' , list: [] },
        { name: '二獎', prize: '北投老爺酒店 (一泊一食住宿券)', num: 4, list: [] },
        { name: '三獎', prize: '國蘭花園Villa會館-水漾Villa (一泊一食住宿券)', list: [] },
        { name: '四獎', prize: '清泉日式溫泉館-沁呂 (一泊一食住宿券)', list: [] },
        { name: '五獎', prize: '清泉日式溫泉館-京都 (一泊一食住宿券)', list: [] },
        { name: '六獎', prize: 'Apple AirPods', list: [] },
        { name: '七獎', prize: 'GARMIN Vivofit 4', list: [] },
        { name: '八獎', prize: 'The North Face超輕耐磨多功能側背包', list: [] },
        { name: '九獎', prize: '龜丹六二溫泉山房-泡湯券(平假日皆可使用)', list: [] },
        { name: '十獎', prize: '關子嶺統茂溫泉會館-泡湯券(平日)', list: [] },
        { name: '十一獎', prize: '美崙山溫泉渡假山莊泡湯券(平假日皆可使用)', list: [] },
        { name: '十二獎', prize: '四重溪清泉日式溫泉館-泡湯券(平假日皆可使用)', list: [] },
        { name: '十三獎', prize: '全家100元禮物卡', list: [] },
    ]

    $(".dropdown-list").hide();
    $(".dropdown-list-scroll").overlayScrollbars({});    

    $(".dropdown-box").click(() => {
        $(".dropdown-list").toggle();
    });

    $('.dropdown-item').click((event) => {
        $(".dropdown-list").hide();
        selectPrize = $(event.target).text();
        $('.dropdown-box__title').text(selectPrize);
    })

    $('.lottery-btn_vote').click(function (e) {
        const select = prizeData.find(item => item.name === selectPrize);
        let num = $('.lottery-num__input').val();
        
        if (num.indexOf('-') !== -1 || num.indexOf('.') !== -1 || num == 0) {
            num = 1;
            $('.lottery-num__input').val('1');
        }


        if (select.list.length === 0) {
            $.ajax({
                type: "GET",
                url: `${apiTitle}/vote/${select.name}/${num}`,
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
                    <p class="lottery-title">${item.prize}</p>
                    <button class="lottery-clear-btn" value="${item.name}">
                        <svg class="lottery-clear-btn__svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo-alt" class="svg-inline--fa fa-redo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                    </button>
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

                    let c = "";
                    let d = "";
                    let replaceStrName = "";

                    if (ele.name !== null) {
                        c = ele.name[0];
                        d = ele.name[ele.name.length - 1];
                        replaceStrName = "";

                        for (let i = 0; i < ele.name.length - 2; i++ ) replaceStrName += '*';
                    }

                    return `
                    <li class="lottery-item">
                        <div class="lottery-img-box">
                        <img class="lottery-img" src="${!ele.avatar ? '' : ele.avatar}" alt="">
                        </div>
                        <div class="lottery-text-box">
                            <p class="lottery-name">${ele.name === null ? '' : `${c}${replaceStrName}${d}`}</p>
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

