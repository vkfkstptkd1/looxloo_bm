$(document).ready(function(){
    
    $($('#header .headerMenu li')[0]).addClass('checked');
    setmainBanner();
    setPopupMain();
    /*
    setBrandOn();
    setNewBrandStory();
    setHotKeyword();
    setshopGuide();
    setGifForYou();
    setliveMarket();
    setBrandRankingList();
    setBannerMain();
    */
    
    // 메인 컨텐츠 api 통합관리
    getMainContents();
    
    // brand ranking
    _setBrandRankingList();
    
    // 메인진열 할인가, 판매가 세팅
    setPriceDiscount('mySwiperSpecialPrice', 'sale_price', 'price');
    setPriceDiscount('mySwiperRankingP', 'sale_price', 'price');
    setPriceDiscount('mySwiperMDPick', 'sale_price', 'price');
    
    getSalePer('price','sale_price','sale_per');
    setReviewInfo('reviewGrade','reviewCount');
    
    $('.rankingBox .selectBox li').click(function(){
        $('.rankingBox .selectBox li').removeClass('selected');
        $(this).addClass('selected');
        if($('.rankingBox .selectBox li').index(this) == 0){
            $('.rankingP').show();
            $('.rankingB').hide();
        }else{
            $('.rankingB').show();
            $('.rankingP').hide();
        }
    });
    
    $('.rankingP .rank').each(function(idx,item){
        $(item).text(idx+1);
    });
    var swiperRank = new Swiper(".mySwiperRankingP", {
        slidesPerView: 5,
        spaceBetween: 14,
        centeredSlides: true,
        initialSlide : 2,
        loop : false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
    $('.mySwiperRankingP .swiper-button-prev').click(function(){
        console.log($('.mySwiperRankingP .swiper-slide').index($('.mySwiperRankingP .swiper-slide.swiper-slide-active')));
        if($('.mySwiperRankingP .swiper-slide').index($('.mySwiperRankingP .swiper-slide.swiper-slide-active')) < 3){
            swiperRank.slideTo(2,0);
        }
    });
    $('.mySwiperRankingP .swiper-button-next').click(function(){
        console.log($('.mySwiperRankingP .swiper-slide').index($('.mySwiperRankingP .swiper-slide.swiper-slide-active')));
        if($('.mySwiperRankingP .swiper-slide').index($('.mySwiperRankingP .swiper-slide.swiper-slide-active')) > 17){
            swiperRank.slideTo(2,1000);
        }
    });
    var swiper = new Swiper(".mySwiperMDPick", {
            slidesPerView: 5,
            spaceBetween: 14,
            centeredSlides: true,
            initialSlide : 2,
            loop : true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });
    
    main_newSwiper_2022();
});

  (function(CAFE24API) { 
      
  CAFE24API.get('/api/v2/products/count', function (err, res) {
    console.log("res="+res);
    
  });
})(CAFE24API.init({
  version: '2022-03-01',
  client_id: 'pqrmkefFQUc6qJpfvA6jrB'
})); 

function setmainBanner(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'key_visual',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var html = '';
            for(i=0;i<re.length;i++){
                if(re[i]['pc_link'] == null){re[i]['pc_link'] = '#';}
                if(re[i]['type'] == '이미지'){
                    html = html + '<a href="'+re[i]['pc_link']+'" class="swiper-slide" target="'+re[i]['link_target']+'"><div class="infoBox"><p class="brand">'+re[i]['title2']+'</P><p class="title">'+re[i]['title']+'</p><p class="ment">'+re[i]['title3']+'</p></div><img src="'+re[i]['pc_file']+'"></a>';
                }else if(re[i]['type'] == '동영상'){
                    html = html + '<a href="'+re[i]['pc_link']+'" class="swiper-slide" target="'+re[i]['link_target']+'"><div class="infoBox"><p class="brand">'+re[i]['title2']+'</P><p class="title">'+re[i]['title']+'</p><p class="ment">'+re[i]['title3']+'</p></div><video src="'+re[i]['pc_file']+'" style="width : 100%;" autoplay="autoplay" loop="loop"></a>';
                }
            }
            html = html.replace(/null/gi,'');
            $('.mySwiperMainBanner .swiper-wrapper').html(html);
            
            if(re.length > 1){
                var swiper = new Swiper(".mySwiperMainBanner", {
                    loop : true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction : false
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    }          
                });
            }else{
                $('.mySwiperMainBanner .swiper-button-next').hide();
                $('.mySwiperMainBanner .swiper-button-prev').hide();
            }
            
            $('.mySwiperMainBanner video').click(function(){
                if(this.paused){this.play();}else{this.pause();}
            });
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

/*function setshopGuide(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'shop_guide',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr = [];
            for(i=0;i<re.length;i++){
                if(re[i].pc_link_yn == 'Y'){
                    htmlArr.push('<a href="'+re[i]['pc_link']+'" target="'+re[i]['link_target']+'" class="swiper-slide"><img src="'+re[i]['pc_file']+'"><p>'+re[i]['title']+'</p></a>')
                }else{
                    htmlArr.push('<div class="swiper-slide"><img src="'+re[i]['pc_file']+'"><p>'+re[i]['title']+'</p></div>')
                }

            }            
            $('.mySwiperSG .swiper-wrapper').html(htmlArr.join(''));            
            
            var swiper = new Swiper(".mySwiperSG", {
                slidesPerView: "auto",
                spaceBetween: 10,
                loop: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination"
                }          
            });
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}*/

function setshopGuide(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'shop_guide',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr = [];
            for(i=0;i<re.length;i++){
                if(re[i].pc_link_yn == 'Y'){
                    re[i].pc_link = '#';
                }
                htmlArr.push('<li><a href="'+re[i].pc_link+'"><img src="'+re[i].pc_file+'"><p class="title">'+re[i].title+'</p></a></li>');

            }            
            $('.shoppingGuideBox ul').html(htmlArr.join(''));            
            
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setliveMarket(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'live_market_banner',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr = [];
            for(i=0;i<re.length;i++){
                if(re[i]['title'] == null){re[i]['title'] = '';}
                if(re[i]['title2'] == null){re[i]['title2'] = '';}
                htmlArr.push('<a href="'+re[i]['pc_link']+'" class="swiper-slide"><div class="imgBox"><img src="'+re[i]['pc_file']+'"></div><div class="info"></div></a>');                     
            }            
            $('.mySwiperLiveMarket .swiper-wrapper').html(htmlArr.join('')); 
            
            var swiper = new Swiper(".mySwiperLiveMarket", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                spaceBetween: 22,
                loop : true,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
            });
            
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setBrandOn(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'brand_on',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr0 = [];
            for(i=0;i<re.length;i++){
                if(re[i]['pc_link_yn'] == 'N'){re[i]['pc_link'] = '#';}
                htmlArr0.push('<div class="swiper-slide"><div class="topBox"><img src="'+re[i]['brand_info'][0]['brand_img']+'"><p>'+re[i]['brand_info'][0]['brand_name']+'</p></div><ul class="brandBox">');
                for(j=1;j<re[i]['brand_info'].length;j++){
                    htmlArr0.push('<li><img src="'+re[i]['brand_info'][j]['brand_img']+'"><p>'+re[i]['brand_info'][j]['brand_name']+'</p></li>');
                }
                htmlArr0.push('</ul><a href="'+re[i]['pc_link']+'" target="'+re[i]['link_target']+'"><div class="swiper"><div class="swiper-wrapper">');
                for(j=0;j<re[i]['img_name'].length;j++){
                    htmlArr0.push('<div class="swiper-slide"><img src="'+re[i]['img_name'][j]+'"></div>');
                }
                htmlArr0.push('</div></div><div class="bottomBox"><p class="title">'+re[i]['title']+'</p><p class="contents">'+re[i]['title2']+'</p></div></a></div>');
            }
            $('.brandOn .swiper-wrapper').html(htmlArr0.join(''));             
            var swiper = new Swiper(".mySwiperBrandOn");
            
            var swiper = new Swiper(".mySwiperBrandOn", {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }
            });
            
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setNewBrandStory(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'new_brand_story',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr0 = [];
            
            for(i=0;i<re.length;i++){
                if(re[i]['pc_link_yn'] == 'N'){re[i]['pc_link'] = '#';}                
                htmlArr0.push('<div class="swiper-slide"><img src="'+re[i]['image']+'"><div class="overlay"></div><div class="info"><p class="brand">'+re[i]['brand_name']+'</p><p class="title">'+re[i]['title']+'</p><p class="contents"></p><a href="'+re[i]['pc_link']+'" target="'+re[i]['link_target']+'">VIEW</a></div></div>');
                
            }
            $('.brandStory .swiper-wrapper').html(htmlArr0.join(''));
            
            var swiper = new Swiper(".mySwiperNewBrandStory", {
                slidesPerView: 3,
                spaceBetween: 10,
                centeredSlides: true,
                initialSlide : 1,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }
            });
   
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setHotKeyword(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_product',
        async:true,
        type:'GET',
        data: {
            type:'main_hot_keyword',
            shop_no:1,
            device:'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr0 = [];
            var htmlArr1 = [];
            var html = '';
            var hasArr = [];
            for(i=0;i<re.info.length;i++){
                htmlArr1 = [];
                htmlArr2 = [];
                for(j=0;j<re.info[i].product_info.length;j++){
                    htmlArr1.push(re.info[i].product_info[j].product_no);
                    // 상품 리스트 만들기
                    if( hasArr.indexOf(re.info[i].product_info[j].product_no) > -1 ) {
                        // console.log('상품이 있음');
                    } else {
                        html = '';
                        hasArr.push(re.info[i].product_info[j].product_no);
                        
                        html += '<div class="swiper-slide no_'+re.info[i].product_info[j].product_no+'">';
                        html += '<div onclick="window.location.href=\'/product/detail.html?product_no='+re.info[i].product_info[j].product_no+'\'" name="anchorBoxName_'+re.info[i].product_info[j].product_no+'" class="item productBox" id="anchorBoxId_'+re.info[i].product_info[j].product_no+'">';
                        html += '<img src="'+re.info[i].product_info[j].list_image+'" alt="" class="thumb">';
                        html += '<div class="infoBox"><p class="title">'+re.info[i].product_info[j].brand_name+'</p><p class="ment">'+re.info[i].product_info[j].product_name+'</p>';
                        html += '<div class="priceBox"><span class="sale_price">'+re.info[i].product_info[j].price.toLocaleString()+'</span>';
                        if( re.info[i].product_info[j].retail_price == 0 ) {
                        	html += '<span class="price"></span>';
                        } else {
                        	html += '<span class="price">'+re.info[i].product_info[j].retail_price.toLocaleString()+'</span>';
                        }
                        
                        html += '<span class="sale_per">'+re.info[i].product_info[j].sale_per+'%</span></div></div>';
                        html += '</div></div>';
                        
                        $('.mySwiperHotKeyword .swiper-wrapper').append(html);
                    }
                }
                htmlArr0.push('<li attr_p="'+htmlArr1.join('|')+'">'+re.info[i].keyword+'</li>');
            }
            
             $('.hotKeywordBox .keywordBox').html(htmlArr0.join(''));
            
            var SwiperHotKeyword = new Swiper(".mySwiperHotKeyword", {
                slidesPerView: 5,
                spaceBetween: 14,
                centeredSlides: true,
                initialSlide : 2,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }
            });
            
            $('.hotKeywordBox .keywordBox li').click(function(){
                $('.hotKeywordBox .keywordBox li').removeClass('selected');
                $(this).addClass('selected');
                var arr = $(this).attr('attr_p').split('|');
                $('.hotKeywordBox .swiper-slide').hide();
                for(i=0;i<arr.length;i++){
                    $('.hotKeywordBox .swiper-slide.no_'+arr[i]).show();
                }
                SwiperHotKeyword.slideTo(2,1000,false);
            });
            
            $('.hotKeywordBox .keywordBox li')[0].click();

        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setGifForYou(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'gift_for_you',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr0 = [];
            var html = '';
            for(i=0;i<re.length;i++){
                htmlArr0.push('<div class="swiper-slide"><div class="leftBox"><img src="'+re[i].image+'"></div><div class="rightBox"></div></div>');
            }
            $('.mySwiperGiftForYou .swiper-wrapper').html(htmlArr0.join(''));
            
            for(i=0;i<re.length;i++){
                for(j=0;j<re[i].product_info.length;j++){
                    html = '';
                    html += '<div id="itemGFY_'+re[i].product_info[j].product_no+'" class="productBox" onclick="window.location.href=\'/product/detail.html?product_no='+re[i].product_info[j].product_no+'\'">';
                    html += '<img src="'+re[i].product_info[j].list_image+'" alt="" class="thumb">';
                    html += '<div class="infoBox"><p class="title">'+re[i].product_info[j].brand_name+'</p><p class="ment">'+re[i].product_info[j].product_name+'</p>';
                    html += '<div class="priceBox"><span class="sale_price">'+re[i].product_info[j].price.toLocaleString()+'</span>';
                    if( re[i].product_info[j].retail_price == 0 ) {
                    	html += '<span class="price"></span>';
                    } else {
                   		html += '<span class="price">'+re[i].product_info[j].retail_price.toLocaleString()+'</span>';
                    }
                    html +=  '<span class="sale_per">'+re[i].product_info[j].sale_per+'%</span></div>';
                    html += '</div></div></div>';
                    
                    $($('.mySwiperGiftForYou .swiper-slide .rightBox')[i]).append(html);
                }
            }
            var swiper = new Swiper(".mySwiperGiftForYou", {
                slidesPerView: 1,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }
            });
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setliveMarket(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'live_market_banner',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr = [];
            for(i=0;i<re.length;i++){
                if(re[i]['title'] == null){re[i]['title'] = '';}
                if(re[i]['title2'] == null){re[i]['title2'] = '';}
                htmlArr.push('<div class="swiper-slide"><a href="'+re[i].pc_link+'"><img src="'+re[i].pc_file+'"></a></div>');
            }            
            $('.mySwiperliveMarket .swiper-wrapper').html(htmlArr.join('')); 
            
            var swiper = new Swiper(".mySwiperliveMarket", {
                effect: "coverflow",
                slidesPerView: 1.55,
                spaceBetween: 30,
                centeredSlides: true,
                initialSlide : 1,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: false,
                }
            });
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setBrandRankingList(){
    $.ajax({
        url:'https://app.looxloo.com/api/get_brand_ranking',
        async:true,
        type:'GET',
        data: {
            shop_no : 1
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var htmlArr0 = [];
            for(i=0;i<re.rank.length;i++){
                htmlArr0.push('<li><span>'+re.rank[i]['no']+'</span><span class="m_rank_brand_icon"><img src="'+re.rank[i]['icon']+'"></span><span>'+re.rank[i]['brand_name']+'</span></li>');
            }
            $('.rankingB').html(htmlArr0.join(''));
                        
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function setBannerMain(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_popup',
        async:true,
        type:'GET',
        data: {
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            console.log(re);
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

const popid = 'REAL_POPUP';
function setPopupMain() {
    $.ajax({
        url: 'https://app.looxloo.com/api/main_popup',
        async: true,
        type: 'GET',
        data: {
            device: 'pc'
        },
        dataType: 'json', // xml, json, script, html
        beforeSend: function (r) {}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success: function (re) {

            var checkCookieName = "POPUP_" + popid;
            var result = getCookie(checkCookieName);
		    if(result == "end"){
                // 아직 오늘 하루 보지 않기 쿠키가 남아있어서 출력 안함
            } else {
                if (re.length > 0) {
                    var htmlArr = [];
                    var html = '';
                    html += '<div class="popup-layer-wrap"><div>';
                    html += '<div class="btn-area"><button class="popup-btn popup-today"><span class="icon"></span><span>오늘 하루 보지 않기</span></button><button class="popup-btn popup-close"><span>닫기</span></button></div>';
                    html += '<div><div class="popupItemSwiper"><div class="swiper"><div class="swiper-wrapper">';
                    for (i = 0; i < re.length; i++) {
                        html += '<div class="swiper-slide "><a href="' + re[i]['pc_link'] + '"><img src="' + re[i]['pc_file'] + '" alt=""></a></div>';
                    }
                    html += '</div><div class="swiper-pagination"></div></div></div></div></div>';
                    html += '</div></div>';
                    $("#popup-layer-main-wrap").html(html);

                    if (re.length > 1) {
                        new Swiper(".popupItemSwiper .swiper", {
                            loop: true,
                                pagination: {
                                el: '.swiper-pagination',
                            },
                        });
                    }

                    $('.popup-today').click(function(){
                        $('#popup-layer-main-wrap').hide();
                        var cookieName = "POPUP_" + popid;
                        setCookie(cookieName,"end",1);
                    });
                    $('.popup-close').click(function(){
                        $('#popup-layer-main-wrap').hide();
                    });
                };
            };
        }, // 요청 완료 시
        error: function (jqXHR) {
            console.log('e');
            console.log(jqXHR);
        }, // 요청 실패.
        complete: function (jqXHR) {} // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function getCookie(name) { 
            var cookieName = name + "=";
            var x = 0;
            while ( x <= document.cookie.length ) { 
                var y = (x+cookieName.length); 
                if ( document.cookie.substring( x, y ) == cookieName) { 
                    if ((lastChrCookie=document.cookie.indexOf(";", y)) == -1) 
                        lastChrCookie = document.cookie.length;
                    return decodeURI(document.cookie.substring(y, lastChrCookie));
                }
                x = document.cookie.indexOf(" ", x ) + 1; 
                if ( x == 0 )
                    break; 
                } 
                return "";
        }

        function setCookie(cname, value, expire) {
            var todayValue = new Date();
            // 오늘 날짜를 변수에 저장
            todayValue.setDate(todayValue.getDate() + expire);
            document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
        }

// 메인 컨텐츠 통합 api
function getMainContents(){
    $.ajax({
        url:'https://app.looxloo.com/api/get_mainpage_contents',
        async:true,
        type:'GET',
        data: {
            shop_no : 1,
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            var data = re.res;
            // brand on
            _setBrandOn(data.brand_on);
            // new brand story
            _setNewBrandStory(data.new_brand_story);
            // hot keyword
            _setHotKeyword(data.main_hot_keyword);
            // shopping guide
             _setshopGuide(data.shopping_guide);
            // gift for you
            _setGifForYou(data.gift_for_you);
            // live market
            _setliveMarket(data.live_market_banner);
            // present
            _setPresentCategory(data.present);
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function _setshopGuide(re){
    var data = re.list;
    var htmlArr = [];
    for(i=0;i<data.length;i++){
        if(data[i].pc_link_yn == 'Y'){
            data[i].pc_link = '#';
        }
        htmlArr.push('<li><a href="'+data[i].pc_link+'"><img src="'+data[i].pc_file+'"><p class="title">'+data[i].title+'</p></a></li>');
    }            
    $('.shoppingGuideBox ul').html(htmlArr.join(''));            
}

function _setliveMarket(re){
    var data = re.list;
    var htmlArr = [];
    for(i=0;i<data.length;i++){
        if(data[i]['title'] == null){data[i]['title'] = '';}
        if(data[i]['title2'] == null){data[i]['title2'] = '';}
        htmlArr.push('<a href="'+data[i]['pc_link']+'" class="swiper-slide"><div class="imgBox"><img src="'+data[i]['pc_file']+'"></div><div class="info"></div></a>');                     
    }            
    $('.mySwiperLiveMarket .swiper-wrapper').html(htmlArr.join('')); 

    if(data.length > 1){
        var swiper = new Swiper(".mySwiperLiveMarket", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 22,
            loop : true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }else{
        $('.mySwiperLiveMarket .swiper-button-next').hide();
        $('.mySwiperLiveMarket .swiper-button-prev').hide();
    }
}

function _setBrandOn(re){
    var data = re.list;
    var htmlArr0 = [];
    for(i=0;i<data.length;i++){
        if(data[i]['pc_link_yn'] == 'N'){data[i]['pc_link'] = '#';}
        if(1<data[i]['brand_info'].length ) {
            htmlArr0.push('<div class="swiper-slide"><div class="topBox"><img src="'+data[i]['brand_info'][0]['brand_img']+'"><p>'+data[i]['brand_info'][0]['brand_name'] + ' 외 '+(data[i]['brand_info'].length - 1)+'개</p></div><ul class="brandBox">');
        } else {
            htmlArr0.push('<div class="swiper-slide"><div class="topBox"><img src="'+data[i]['brand_info'][0]['brand_img']+'"><p>'+data[i]['brand_info'][0]['brand_name'] + '</p></div><ul class="brandBox">');
        }
        for(j=0;j<data[i]['brand_info'].length;j++){
            htmlArr0.push('<li><a href="/brand/main.html?brand_name_en='+data[i]['brand_info'][j]['brand_name']+'&brand_code='+data[i]['brand_info'][j]['brand_code']+'&shop_no=1&brand_type='+data[i]['brand_info'][j]['brand_type']+'"><img src="'+data[i]['brand_info'][j]['brand_img']+'"><p>'+data[i]['brand_info'][j]['brand_name']+'</p></a></li>');
        }
        htmlArr0.push('</ul><a href="'+data[i]['pc_link']+'" target="'+data[i]['link_target']+'"><div class="swiper"><div class="swiper-wrapper">');
        for(j=0;j<data[i]['img_name'].length;j++){
            htmlArr0.push('<div class="swiper-slide"><img src="'+data[i]['img_name'][j]+'"></div>');
        }
        htmlArr0.push('</div></div><div class="bottomBox"><p class="title">'+data[i]['title']+'</p><p class="contents">'+data[i]['title2']+'</p></div></a></div>');
    }
    
    $('.brandOn .swiper-wrapper').html(htmlArr0.join(''));             
    //var swiper = new Swiper(".mySwiperBrandOn");

    var swiper = new Swiper(".mySwiperBrandOn", {
        slidesPerView: 4,
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
    
    $('.brandOn .topBox').click(function(e){     
        $(this).toggleClass('selected');
        e.stopPropagation()
    });
    if(data.length == 3){
        $('.mySwiperBrandOn .swiper-button-next').click(function(){
            
        });
        
    }
}

function _setNewBrandStory(re){
    var data = re.list;
    var htmlArr0 = [];

    for(i=0;i<data.length;i++){
        if(data[i]['pc_link_yn'] == 'N'){data[i]['pc_link'] = '#';}                
        htmlArr0.push('<div class="swiper-slide"><img src="'+data[i]['image']+'"><div class="overlay"></div><div class="info"><p class="brand">'+data[i]['brand_name']+'</p><p class="title">'+data[i]['title']+'</p><p class="contents"></p><a href="'+data[i]['pc_link']+'" target="'+data[i]['link_target']+'">VIEW</a></div></div>');
    }
    $('.brandStory .swiper-wrapper').html(htmlArr0.join(''));

    var swiper = new Swiper(".mySwiperNewBrandStory", {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: true,
        initialSlide : 1,
        loop : true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
}

function _setHotKeyword(re){
    var data = re.list;
    var htmlArr0 = [];
    var htmlArr1 = [];
    var html = '';
    var hasArr = [];
    for(i=0;i<data.length;i++){
        htmlArr1 = [];
        htmlArr2 = [];
        for(j=0;j<data[i].product_info.length;j++){
            htmlArr1.push(data[i].product_info[j].product_no);
            // 상품 리스트 만들기
            if( hasArr.indexOf(data[i].product_info[j].product_no) > -1 ) {
                // console.log('상품이 있음');
            } else {
                html = '';
                hasArr.push(data[i].product_info[j].product_no);

                if( data[i].product_info[j].sold_out != "T" ) {
                    html += '<div class="swiper-slide no_'+data[i].product_info[j].product_no+'">';
                    html += '<div onclick="window.location.href=\'/product/detail.html?product_no='+data[i].product_info[j].product_no+'\'" name="anchorBoxName_'+data[i].product_info[j].product_no+'" class="item productBox" id="anchorBoxId_'+data[i].product_info[j].product_no+'">';
                    html += '<div class="pImgBox"><img src="'+data[i].product_info[j].list_image+'" alt="" class="thumb"></div>';
                    html += '<div class="infoBox"><p class="title">'+data[i].product_info[j].brand_name+'</p><p class="ment">'+data[i].product_info[j].product_name+'</p>';
                    html += '<div class="priceBox"><span class="sale_price">'+data[i].product_info[j].price.toLocaleString()+'</span>';
                    if( data[i].product_info[j].retail_price == 0 ) {
                        html += '<span class="price"></span>';
                    } else {
                        html += '<span class="price">'+data[i].product_info[j].retail_price.toLocaleString()+'</span>';
                    };
                    html += '<span class="sale_per">';
                    html += (data[i].product_info[j].sale_per != 0) ? data[i].product_info[j].sale_per +'%' : '';
                    html += '</span></div></div>';
                    html += '</div></div>';
                };

                $('.mySwiperHotKeyword .swiper-wrapper').append(html);
            }
        }
        htmlArr0.push('<li attr_p="'+htmlArr1.join('|')+'">'+data[i].keyword+'</li>');
    }

    $('.hotKeywordBox .keywordBox').html(htmlArr0.join(''));

    var SwiperHotKeyword = new Swiper(".mySwiperHotKeyword", {
        slidesPerView: 5,
        spaceBetween: 14,
        centeredSlides: true,
        initialSlide : 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    $('.hotKeywordBox .keywordBox li').click(function(){
        $('.hotKeywordBox .keywordBox li').removeClass('selected');
        $(this).addClass('selected');
        SwiperHotKeyword.destroy();
        SwiperHotKeyword = new Swiper(".mySwiperHotKeyword", {
            slidesPerView: 5,
            spaceBetween: 14,
            centeredSlides: false,
            initialSlide : 0,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });
        
        var arr = $(this).attr('attr_p').split('|');
        $('.hotKeywordBox .swiper-slide').hide();
        for(i=0;i<arr.length;i++){
            $('.hotKeywordBox .swiper-slide.no_'+arr[i]).show();
        }
        SwiperHotKeyword.slideTo(0,1000,false);        
    });

    setTimeout(function(){$('.hotKeywordBox .keywordBox li')[0].click();},100);
}

function _setGifForYou(re){
    var data = re.list;
    var htmlArr0 = [];
    var html = '';
    for(i=0;i<data.length;i++){
        htmlArr0.push('<div class="swiper-slide"><div class="leftBox"><img src="'+data[i].image+'"></div><div class="rightBox"></div></div>');
    }
    $('.mySwiperGiftForYou .swiper-wrapper').html(htmlArr0.join(''));

    
    for(i=0;i<data.length;i++){
        for(j=0;j<data[i].product_info.length;j++){
            if( data[i].product_info[j].sold_out != "T" ) {
            html = '';
            html += '<div id="itemGFY_'+data[i].product_info[j].product_no+'" class="productBox" onclick="window.location.href=\'/product/detail.html?product_no='+data[i].product_info[j].product_no+'\'">';
            html += '<div class="pImgBox"><img src="'+data[i].product_info[j].list_image+'" alt="" class="thumb"></div>';
            html += '<div class="infoBox"><p class="title">'+data[i].product_info[j].brand_name+'</p><p class="ment">'+data[i].product_info[j].product_name+'</p>';
            html += '<div class="priceBox"><span class="sale_price">'+data[i].product_info[j].price.toLocaleString()+'</span>';
            if( data[i].product_info[j].retail_price == 0 ) {
                html += '<span class="price"></span>';
            } else {
                html += '<span class="price">'+data[i].product_info[j].retail_price.toLocaleString()+'</span>';
            }
            html +=  '<span class="sale_per">';
            html += (data[i].product_info[j].sale_per != 0) ? data[i].product_info[j].sale_per +'%' : '';
            html += '</span></div>';
            html += '</div></div></div>';
        };
            $($('.mySwiperGiftForYou .swiper-slide .rightBox')[i]).append(html);
        }
    }
    var swiper = new Swiper(".mySwiperGiftForYou", {
        slidesPerView: 1,
        loop : true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
}

function _setliveMarket(){
    $.ajax({
        url:'https://app.looxloo.com/api/main_list',
        async:true,
        type:'GET',
        data: {
            key:'live_market_banner',
            shop_lang:'ko',
            device : 'pc'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            console.log(re);
            var htmlArr = [];
            for(i=0;i<re.length;i++){
                if(re[i]['title'] == null){re[i]['title'] = '';}
                if(re[i]['title2'] == null){re[i]['title2'] = '';}
                htmlArr.push('<div class="swiper-slide"><a href="'+re[i].pc_link+'" target="'+re[i]['link_target']+'"><img src="'+re[i].pc_file+'"></a></div>');
            }            
            $('.mySwiperliveMarket .swiper-wrapper').html(htmlArr.join('')); 
            if(re.length > 1){
                var swiper = new Swiper(".mySwiperliveMarket", {
                    effect: "coverflow",
                    slidesPerView: 'auto',
                    spaceBetween: 100,
                    centeredSlides: true,
                    initialSlide : 1,
                    loop : true,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 160,
                        modifier: 1,
                        slideShadows: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    }
                });
                
            }else{
                var swiper = new Swiper(".mySwiperliveMarket", {
                    effect: "coverflow",
                    slidesPerView: 'auto',
                    spaceBetween: 100,
                    centeredSlides: true,
                    initialSlide : 1,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 160,
                        modifier: 1,
                        slideShadows: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    }
                });
                $('.mySwiperliveMarket .swiper-button-next').hide();
                $('.mySwiperliveMarket .swiper-button-prev').hide();
            }

        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

function _setBrandRankingList(){
    $.ajax({
        url:'https://app.looxloo.com/api/get_brand_contents_ranking_modify',
        async:true,
        type:'GET',
        data: {
            shop_no:1,
            brand_type:'main'
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            console.log(re);
            var data = re.rank;
            var htmlArr0 = [];
            for(i=0;i<data.length;i++){
                brandLink = '/brand/main.html?brand_name_en='+data[i].brand_name+'&brand_code='+data[i].brand_code+'&shop_no='+shop_no+'&brand_type='+data[i].brand_type;
                htmlArr0.push('<li><a href="'+brandLink+'"><span class="m_rank_no">'+data[i]['no']+'</span><img src="'+data[i]['icon']+'"><span>'+data[i]['brand_name']+'</span></a></li>');
            }
            $('.rankingB').html(htmlArr0.join(''));
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}

// 선물하기 카테고리
function _setPresentCategory(re){
    var data = re.info;
    var html = '';
    for( var i=0; i<data.length; i++ ) {
        html += '<div class="swiper-slide"><a href="/main/gift.html?cate_id='+data[i].id+'"><img src="'+data[i].image+'"><p>'+data[i].subject+'</p></a></div>';
    }
    $('.mySwiperGiftCateBox .swiper-wrapper').append(html);

    var mySwiperGiftCateBox = new Swiper(".mySwiperGiftCateBox", {
        slidesPerView: 'auto',
        spaceBetween: 76,
        centeredSlides: false,
        initialSlide : 0,
        loop : true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
    // mySwiperGiftCateBox.slideTo(0,1000,false);
}

function main_newSwiper_2022(){
    //if($(".fo_visual_wrap").size() === 0) return;
		//json data 가져오기
		$.ajax({
			type: "GET",
			//url: "/js/data.json",
            url: "https://app.looxloo.com/api/get_look_at_this",
        	async:true,
            data: {
                device : 'pc'
            },
			dataType: "json",
			success : function(data){
				createHTML(data);
			}
		});

		//html 생성
		function createHTML(data){

			createVisual();
			function createVisual(){
				var str = "";
				for(var i in data){
					str += '<div class="swiper-slide"><img src=' + data[i].image_url + ' alt="">';
					for(var j in data[i].marker){
						str += '<div class="bullet_maker" style="top:' + data[i].marker[j][0] + 'px; left:' + data[i].marker[j][1] + 'px;">'
						str += '<a href="' + data[i].cards[j].link + '" class="bullet_info"><span class="cards_thumbs"><img src="' + data[i].cards[j].thumbs + '"></span>';
						str += '<div class="cards_info">';
						str += '<span class="cards_brand_name">' + data[i].cards[j].brand_name + '</span>';
						str += '<span class="cards_product_name">' + data[i].cards[j].product_name + '</span>';
						str += '<span class="cards_sale_price">' + data[i].cards[j].sale_price + '원</span>';
						str += '<span class="cards_old_price">' + data[i].cards[j].old_price + '원</span>';
						str += '</div></a>';
						str += '</div>';
					}
					str += '</div>';
				}
				$(str).appendTo($(".fo_visual_wrap .swiper-wrapper"));
				createThumbnails();
			}
			function createThumbnails(){
				var str = "";
				var cnt = 0;
				for(var i in data){
					cnt++;
					str += '<div class="visual_' + cnt + '">';
					str += '<div class="swiper-wrapper">';
					for(var j in data[i].thumbnails){
						str += '<div class="swiper-slide"><a href="#"><img src="' + data[i].thumbnails[j] + '" alt=""></a></div>';
					}
					str += '</div>';
					str += '<div class="swiper-button-prev"></div>';
					str += '<div class="swiper-button-next"></div>';
					str += '</div>';
				}
				$(str).appendTo($(".fo_visual_thumbs_section"));
				eventBind();
				swipeBind();
			}
			function eventBind(){
				var bullets = $(".bullet_maker");
				var thumbs_wrap;
				var thumbs = $(".fo_visual_thumbs_section .swiper-slide");
				var visual_wrap;
				var bullets_info = $(".bullet_info");

				bullets.unbind("click").click(function(e){
					e.stopPropagation();
					$(this).toggleClass("on").siblings().removeClass("on");
					thumbs_wrap = $(".visual_" + (Number($(this).closest(".swiper-slide").attr("data-swiper-slide-index")) + 1));
					thumbs_wrap.find(".swiper-slide").eq($(this).index() - 1).toggleClass("on").siblings().removeClass("on");
					infoBoxRePosition($(this));
				});
				thumbs.unbind("click").click(function(e){
					e.stopPropagation();
					$(this).toggleClass("on").siblings().removeClass("on");
					visual_wrap = $(".fo_visual_wrap .swiper-slide-active");
					visual_wrap.children().eq($(this).index() + 1).toggleClass("on").siblings().removeClass("on");
					infoBoxRePosition(visual_wrap.children().eq($(this).index() + 1));
					e.preventDefault();
				});
			}
			function infoBoxRePosition(bullet){
				var box = bullet.find(".bullet_info");
				var wrap = box.closest(".swiper-slide");
				var box_x, wrap_x, box_y, wrap_y, box_l, wrap_l;
				box_x = box.offset().left + box.width();
				wrap_x = wrap.width() + wrap.offset().left;
				box_y = box.offset().top + box.height();
				wrap_y = wrap.height() + wrap.offset().top;
				box_l = box.offset().left;
				wrap_l = wrap.offset().left;

				if(box_x > wrap_x){
					box.css("margin-left", wrap_x - box_x - 30 + "px");
				}
				if(box_l < wrap_l){
					box.css("margin-left", 65 + "px");
				}
				if(box_y > wrap_y){
					box.css("margin-top", -166 + "px");
				}
			}

			function swipeBind(){
				//비주얼 영역 스와이프 바인딩
				var swiper_big = new Swiper(".fo_visual_wrap", {
					slidesPerView: 2,
					spaceBetween: 0,
					loop: true,
					shortSwipes : true,
					//longSwipes : true,
					//longSwipesMs : 1,
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
					},
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}
				});

				//비주얼 밑에 썸네일 영역 스와이프 바인딩
				var swiper_small = new Swiper(".fo_visual_thumbs_section > *", {
					slidesPerView: 7,
					spaceBetween: 6,
					loop: false,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}
				});

				//최초 로딩시 첫번째 썸네일 영역 보이게 하기
				$(".visual_1").addClass("on");

				//비주얼 영역 슬라이드시, 썸네일 영역 재호출
				swiper_big.on("slideChange", function(data){
					$(".visual_" + (data.realIndex + 1)).addClass("on").siblings().removeClass("on");
					$(".bullet_maker").removeClass("on");
					$(".fo_visual_thumbs_section .swiper-slide").removeClass("on");
					eventBind();
				});
				$("body").click(function(e){
					$(".visual_" + (Number($(".fo_visual_wrap .swiper-slide-active").attr("data-swiper-slide-index")) + 1)).find(".swiper-slide").removeClass("on");
					$(".fo_visual_wrap .swiper-slide-active .bullet_maker").removeClass("on");
				});
			}
		}
}
/**
 * 움직이는 배너 Jquery Plug-in
 * @author  cafe24
 */

(function($){

    $.fn.floatBanner = function(options) {
        options = $.extend({}, $.fn.floatBanner.defaults , options);

        return this.each(function() {
            var aPosition = $(this).position();
            var jbOffset = $(this).offset();
            var node = this;

            $(window).scroll(function() {
                var _top = $(document).scrollTop();
                _top = (aPosition.top < _top) ? _top : aPosition.top;

                setTimeout(function () {
                    var newinit = $(document).scrollTop();

                    if ( newinit > jbOffset.top ) {
                        _top -= jbOffset.top;
                        var container_height = $("#wrap").height();
                        var quick_height = $(node).height();
                        var cul = container_height - quick_height;
                        if(_top > cul){
                            _top = cul;
                        }
                    }else {
                        _top = 0;
                    }

                    $(node).stop().animate({top: _top}, options.animate);
                }, options.delay);
            });
        });
    };

    $.fn.floatBanner.defaults = {
        'animate'  : 500,
        'delay'    : 500
    };

})(jQuery);

/**
 * 문서 구동후 시작
 */
$(document).ready(function(){
    $('#banner:visible, #quick:visible').floatBanner();

    //placeholder
    $(".ePlaceholder input, .ePlaceholder textarea").each(function(i){
        var placeholderName = $(this).parents().attr('title');
        $(this).attr("placeholder", placeholderName);
    });
    /* placeholder ie8, ie9 */
    $.fn.extend({
        placeholder : function() {
            //IE 8 버전에는 hasPlaceholderSupport() 값이 false를 리턴
           if (hasPlaceholderSupport() === true) {
                return this;
            }
            //hasPlaceholderSupport() 값이 false 일 경우 아래 코드를 실행
            return this.each(function(){
                var findThis = $(this);
                var sPlaceholder = findThis.attr('placeholder');
                if ( ! sPlaceholder) {
                   return;
                }
                findThis.wrap('<label class="ePlaceholder" />');
                var sDisplayPlaceHolder = $(this).val() ? ' style="display:none;"' : '';
                findThis.before('<span' + sDisplayPlaceHolder + '>' + sPlaceholder + '</span>');
                this.onpropertychange = function(e){
                    e = event || e;
                    if (e.propertyName == 'value') {
                        $(this).trigger('focusout');
                    }
                };
                //공통 class
                var agent = navigator.userAgent.toLowerCase();
                if (agent.indexOf("msie") != -1) {
                    $(".ePlaceholder").css({"position":"relative"});
                    $(".ePlaceholder span").css({"position":"absolute", "padding":"0 4px", "color":"#878787"});
                    $(".ePlaceholder label").css({"padding":"0"});
                }
            });
        }
    });

    $(':input[placeholder]').placeholder(); //placeholder() 함수를 호출

    //클릭하면 placeholder 숨김
    $('body').delegate('.ePlaceholder span', 'click', function(){
        $(this).hide();
    });

    //input창 포커스 인 일때 placeholder 숨김
    $('body').delegate('.ePlaceholder :input', 'focusin', function(){
        $(this).prev('span').hide();
    });

    //input창 포커스 아웃 일때 value 가 true 이면 숨김, false 이면 보여짐
    $('body').delegate('.ePlaceholder :input', 'focusout', function(){
        if (this.value) {
            $(this).prev('span').hide();
        } else {
            $(this).prev('span').show();
        }
    });

    //input에 placeholder가 지원이 되면 true를 안되면 false를 리턴값으로 던져줌
    function hasPlaceholderSupport() {
        if ('placeholder' in document.createElement('input')) {
            return true;
        } else {
            return false;
        }
    }
});

/**
 *  썸네일 이미지 엑박일경우 기본값 설정
 */

$(window).on('load', function(){
    $("img.thumb,img.ThumbImage,img.BigImage").each(function($i,$item){
        var $img = new Image();
        $img.onerror = function () {
                $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
})

/*
$(window).load(function() {
    $("img.thumb,img.ThumbImage,img.BigImage").each(function($i,$item){
        var $img = new Image();
        $img.onerror = function () {
                $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
});
*/

/**
 *  tooltip
 */
$('.eTooltip').each(function(i){
    $(this).find('.btnClose').attr('tabIndex','-1');
});
//tooltip input focus
$('.eTooltip').find('input').focus(function() {
    var targetName = returnTagetName(this);
    targetName.siblings('.ec-base-tooltip').show();
});
$('.eTooltip').find('input').focusout(function() {
    var targetName = returnTagetName(this);
    targetName.siblings('.ec-base-tooltip').hide();
});
function returnTagetName(_this){
    var ePlacename = $(_this).parent().attr("class");
    var targetName;
    if(ePlacename == "ePlaceholder"){ //ePlaceholder 대응
        targetName = $(_this).parents();
    }else{
        targetName = $(_this);
    }
    return targetName;
}

/**
 *  eTab
 */
 $("body").delegate(".eTab a", "click", function(e){
    // 클릭한 li 에 selected 클래스 추가, 기존 li에 있는 selected 클래스는 삭제.
    var _li = $(this).parent("li").addClass("selected").siblings().removeClass("selected"),
    _target = $(this).attr("href"),
    _siblings = $(_target).attr("class"),
    _arr = _siblings.split(" "),
    _classSiblings = "."+_arr[0];

    //클릭한 탭에 해당하는 요소는 활성화, 기존 요소는 비활성화 함.
    $(_target).show().siblings(_classSiblings).hide();


    //preventDefault 는 a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됨.
    e.preventDefault();
});



var shop_no = 1;
//window popup script
function winPop(url) {
    window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
}
/**
 * document.location.href split
 * return array Param
 */
function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

$(document).ready(function(){
    // tab
    $.eTab = function(ul){
        $(ul).find('a').click(function(){
            var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                _target = $(this).attr('href'),
                _siblings = '.' + $(_target).attr('class');
            $(_target).show().siblings(_siblings).hide();
            return false
        });
    }
    if ( window.call_eTab ) {
        call_eTab();
    };
    
    //수정
    setbrandList(shop_no,$('.xans-member-var-id').text());
    $('.headerMenu li.category').click(function(){
        if($(this).hasClass('checked')){
            $('.headerMenu li.category').removeClass('checked');
            $('.header_tab').addClass('displaynone');
        }else{
            $('.headerMenu li.category').removeClass('checked');
            $(this).addClass('checked');        
            $('.header_tab').addClass('displaynone');
            if($(this).hasClass('brand')){$('.header_tab.brand').removeClass('displaynone');}
            if($(this).hasClass('cate')){$('.header_tab.cate').removeClass('displaynone');}
            if($(this).hasClass('brandB')){$('.header_tab.brandB').removeClass('displaynone');}
        }
    });
    $('img').each(function(idx,item){
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_prev.gif') > 0){item.src = '/img/button/arrow_prev.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_next.gif') > 0){item.src = '/img/button/arrow_next.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_first.gif') > 0){item.src = '/img/button/arrow_first.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_last.gif') > 0){item.src = '/img/button/arrow_last.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_prev2.gif') > 0){item.src = '/img/button/arrow_prev.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_next2.gif') > 0){item.src = '/img/button/arrow_next.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_first2.gif') > 0){item.src = '/img/button/arrow_first.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/common/btn_page_last2.gif') > 0){item.src = '/img/button/arrow_last.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_coupon_view.gif') > 0){item.src = '/img/member/coupon_show.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point5.gif') > 0){item.src = '/img/board/point5.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point4.gif') > 0){item.src = '/img/board/point4.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point3.gif') > 0){item.src = '/img/board/point3.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point2.gif') > 0){item.src = '/img/board/point2.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point1.gif') > 0){item.src = '/img/board/point1.svg'}
        if(item.src.indexOf('//img.echosting.cafe24.com/skin/base/board/ico_point0.gif') > 0){item.src = '/img/board/point0.svg'}

    });
    
    //로그인 시 작업
    if($('.xans-layout-statelogon').length > 0){
        var memberBoardInterval = setInterval(function(){
            memberId = $($('.xans-member-var-id')[0]).text();
            memberName = $($('.xans-member-var-name')[0]).text();
            if(memberId != '' && memberName != ''){
                $('.boardMine').each(function(idx,item){
                    $(item).attr('href',$(item).attr('href')+'&search_key=member_id&search='+memberId);
                });
                $('.boardMineName').each(function(idx,item){
                    $(item).attr('href',$(item).attr('href')+'?search_key=member_id&search='+memberId);
                }); 
                $('.boardReview').each(function(idx,item){
                    $(item).attr('href',$(item).attr('href')+'?rtt_search_type=writing.id&rtt_keyword='+memberId);
                }); 
                $('.menuBox a').css('pointer-events','');
                clearInterval(memberBoardInterval);                
            }            
        },100);
    }else{
        $('.menuBox .noLogin').attr('href','/member/login.html?noMemberOrder&returnUrl=%2F');
        $('.menuBox a').css('pointer-events','');
    }
    
    
    
    $('input[type=file]').attr('data-after','* 첨부파일 용량은 최대 5Mbyte까지의 이미지 파일만 가능합니다.');
    $('input[type=file]').change(function(){
        if(this.files.length > 0){
            $(this).attr('data-after',this.files[0].name);
        }        
    });
    $('input[type=file]').trigger('change');
});

function setbrandList(num,id){
    if($('.xans-member-var-id').length > 0 && $('.xans-member-var-id').text() == ''){
        setTimeout(function(){setbrandList(shop_no,$('.xans-member-var-id').text());},100);
    }else{
        $.ajax({
            url:'https://app.looxloo.com/api/brand_list',
            async:true,
            type:'GET',
            data: {
                shop_no:num,
                member_id : id
            },
            dataType:'json',// xml, json, script, html
            beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
            success:function(re) {
                var htmlArr0 = [];
                var htmlArr1 = ['<ul>'];
                var htmlArr2 = [];//마이페이지 관심브랜드
                
                //브랜드 서치페이지
                var htmlArrTopList = [];
                

                for(i=0;i<re.length;i++){
                    brandLink = '/brand/main.html?brand_name_en='+encodeURIComponent(re[i].brand_name_en)+'&brand_code='+encodeURIComponent(re[i].brand_code)+'&shop_no='+num+'&brand_type='+re[i].type;
                    if(i > 0 && i%6 == 0){
                        htmlArr1.push('</ul><ul>');
                    }
                    htmlArr0.push('<div class="brandLogo"><a href="'+brandLink+'"><img src="'+re[i].icon+'"><span>'+re[i].brand_name_en+'</span></a></div>');
                    htmlArr1.push('<li><a href="'+brandLink+'">'+re[i].brand_name_en+'</a></li>');
                    if(re[i].pick == 'Y'){
                        htmlArr2.push('<li class="no_'+i+'"><input type="checkbox"><a href="'+brandLink+'"><img src="'+re[i].icon+'"><span>'+re[i].brand_name_en+'</span></a><button onclick="delbrandFavorite('+"'"+num+"'"+','+"'"+id+"'"+','+"'"+re[i].brand_code+"'"+','+i+')"></button></li>');                    
                    }
                    
                    //브랜드 서치페이지
                    if(window.location.pathname == '/brand/search.html'){
                        //top
                        if(htmlArrTopList.length < 15){
                            htmlArrTopList.push('<div class="brand"><a href="'+brandLink+'"><img src="'+re[i].icon+'"><p>'+re[i].brand_name_en+'</p></a></div>');
                        }
                        //하단 검색창
                        if(re[i].pick == 'Y'){
                            brandSearchStr = '<div class="brand code_'+re[i].brand_code+'"><button class="checked" onclick="setbrandFavorite('+"'"+num+"'"+','+"'"+id+"'"+','+"'"+re[i].brand_code+"'"+',this)"></button><a href="'+brandLink+'"><p class="eng">'+re[i].brand_name_en+'</p><p class="kor">'+re[i].brand_name_ko+'</p></a></div>';
                        }else{
                            brandSearchStr = '<div class="brand code_'+re[i].brand_code+'"><button class="" onclick="setbrandFavorite('+"'"+num+"'"+','+"'"+id+"'"+','+"'"+re[i].brand_code+"'"+',this)"></button><a href="'+brandLink+'"><p class="eng">'+re[i].brand_name_en+'</p><p class="kor">'+re[i].brand_name_ko+'</p></a></div>';
                        }
                        //영문과 한글 위치찾기
                        eng = re[i].brand_name_en[0].toUpperCase();
                        kor = change_chosung(re[i].brand_name_ko[0]);
                        if($('.brandSearchBox #engBox .result dd.eng_'+eng).length > 0){
                            $('.brandSearchBox #engBox .result dd.eng_'+eng).append(brandSearchStr);
                        }else{
                            $('.brandSearchBox #engBox .result dd.eng_09').append(brandSearchStr);
                        }
                        if($('.brandSearchBox #korBox .result dd.kor_'+kor).length > 0){
                            $('.brandSearchBox #korBox .result dd.kor_'+kor).append(brandSearchStr);
                        }else{
                            $('.brandSearchBox #korBox .result dd.kor_09').append(brandSearchStr);
                        }
                    }
                }
                htmlArr1.push('</ul>');

                $('.brandLogoBox').html(htmlArr0.join(''));
                $('.brandListBox').html(htmlArr1.join(''));
                $('.wish_tab_brand ul').html(htmlArr2.join(''));
                
                //브랜드 서치페이지
                if(window.location.pathname == '/brand/search.html'){
                    $('#brandSearchTop').append(htmlArrTopList.join(''));
                    $('.brandSearchBox .result dd').each(function(idx,item){
                        if($(item).text() == ''){
                            $($('.brandSearchBox .result dt')[idx]).hide();
                            $($('.brandSearchBox .result dd')[idx]).hide();
                        }
                    });
                }
                

            },// 요청 완료 시
            error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
            complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
        });
    }
    function change_chosung(str) {
        cho = ["r","R","s","e","E","f","a","q","Q","t","T","d","w","W","c","z","x","b","g"];
        result = "";
        for(z=0;z<str.length;z++) {
            code = str.charCodeAt(z)-44032;
            if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
            else result += str.charAt(z);
        }
        return result;
    }
}
function api_get_point(member_id,type){
    console.log('api_get_point : id = '+member_id+';type = '+type);
    $.ajax({
        url:'https://app.looxloo.com/api/get_point',
        async:true,
        type:'GET',
        data: {
            member_id:member_id,
            type:type
        },
        dataType:'json',// xml, json, script, html
        beforeSend:function(r) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(re) {
            console.log('suc');
            console.log(re);
            if (type === 'myshop') {
            	$('.real_point').text(re.toLocaleString());
                $('.real_point').append('<span style="font-size:14px; font-weight:400;">p</span>');
            }
        },// 요청 완료 시
        error:function(jqXHR) {console.log('e');console.log(jqXHR);},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
}
function addZero(d,digit){
    var re = '';
    for(i=d.toString().length;i<digit.toString().length;i++){
        re = re + '0';
    }
    return re+d.toString();
}

function getSalePer(pc,spc,ansc){
    p = document.getElementsByClassName(pc);
    sp = document.getElementsByClassName(spc);
    ans = document.getElementsByClassName(ansc);
    
    for(i=0;i<p.length;i++){
        if(!sp[i]){break;}
        
        sp[i].innerText = sp[i].innerText.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        p[i].innerText = p[i].innerText.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        if(sp[i].innerText == '' || p[i].innerText == ''){
            per = '0';
        }else{
            per = Math.round(100 - (sp[i].innerText.replace(/[^0-9]/g,'') * 100) / p[i].innerText.replace(/[^0-9]/g,''));
            if(isNaN(per)) {per = 0;}
        }
        if(per == 0){
            ans[i].innerText = '';
            $(p[i]).hide();
            $(ans[i]).hide();
        }else{
            ans[i].innerText = per+'%';
        }        
    }
}
function setReviewInfo(rg,rc){
    var itemGrade = document.getElementsByClassName(rg);
    var itemCount = document.getElementsByClassName(rc);
    var grade = $('.productRatingArea .ec-board-average-grade');
    var count = $('.reviewtalk_review_count');
    if(!grade || !count || grade.length < 2 || count.length == 0){
        setTimeout(function(){setReviewInfo(rg,rc);},100);
    }else{
        grade.each(function(idx,item){
            if(!itemGrade[idx]){return false;}
            itemGrade[idx].innerHTML = itemGrade[idx].innerHTML+item.innerText;
        });
        count.each(function(idx,item){
            if(!itemCount[idx]){return false;}
            itemCount[idx].innerText = '('+item.innerText+')';
        });
    }   
}
function get_query(){ if(window.location.search == ''){return false;} var url = document.location.href; var qs = url.substring(url.indexOf('?') + 1).split('&'); for(var i = 0, result = {}; i < qs.length; i++){ qs[i] = qs[i].split('='); result[qs[i][0]] = decodeURIComponent(qs[i][1]); } return result; }

// 판매가, 할인가 세팅
function setPriceDiscount(className, price, originPrice) {
	var price = $('.'+className+' .'+price).get();
    $(price).each(function(idx, item) {
        var origin = $(this).siblings('.'+originPrice);
        if( $(origin).text() === '0' ) {
            console.log(idx+'번째는 0이다.');
        	$(origin).text('');
        }
    	var discount = $(this).siblings('.discount_price').text().replace('원','');
        if( discount !== '' ) {
        	$(this).siblings('.'+originPrice).text($(this).text());
            $(this).text(discount);
        }
    });
} 

(function($){
$.fn.extend({
    center: function() {
        this.each(function() {
            var
                $this = $(this),
                $w = $(window);
            $this.css({
                position: "absolute",
                top: ~~(($w.height() - $this.outerHeight()) / 2) + $w.scrollTop() + "px",
                left: ~~(($w.width() - $this.outerWidth()) / 2) + $w.scrollLeft() + "px"
            });
        });
        return this;
    }
});
$(function() {
    var $container = function(){/*
<div id="modalContainer">
    <iframe id="modalContent" scroll="0" scrolling="no" frameBorder="0"></iframe>
</div>');
*/}.toString().slice(14,-3);
    $('body')
    .append($('<div id="modalBackpanel"></div>'))
    .append($($container));
    function closeModal () {
        $('#modalContainer').hide();
        $('#modalBackpanel').hide();
    }
    $('#modalBackpanel').click(closeModal);
    zoom = function ($piProductNo, $piCategoryNo, $piDisplayGroup) {
        var $url = '/product/image_zoom.html?product_no=' + $piProductNo + '&cate_no=' + $piCategoryNo + '&display_group=' + $piDisplayGroup;
        $('#modalContent').attr('src', $url);
        $('#modalContent').bind("load",function(){
            $(".header .close",this.contentWindow.document.body).bind("click", closeModal);
        });
        $('#modalBackpanel').css({width:$("body").width(),height:$("body").height(),opacity:.4}).show();
        $('#modalContainer').center().show();
    }
});
})(jQuery);
/**
 * 카테고리 마우스 오버 이미지
 * 카테고리 서브 메뉴 출력
 */

$(document).ready(function(){

    var methods = {
        aCategory    : [],
        aSubCategory : {},

        get: function()
        {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {

                    if (aData == null || aData == 'undefined') return;
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;

                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }

                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                    }
                    methods.setMenu();
                }
            });
        },
        setMenu: function()
        {
             $('#category .title').each(function(idx,item){
                 var cate_no = '?'+item.href.split('?')[1];
                 var no = cate_no.split('=')[1];
                 var htmlArr = ['<li><a href="'+$(item).attr('href')+'">ALL</a></li>'];
                 for(i=0;i<methods.aSubCategory[no].length;i++){
                     htmlArr.push('<li><a href="/product/list.html'+methods.aSubCategory[no][i].param+'">'+methods.aSubCategory[no][i].name+'</a></li>');
                 }
                 $('#category ul')[idx].innerHTML = htmlArr.join('');
             });
        },

        getParam: function(sUrl, sKey) {

            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};

            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        getParamSeo: function(sUrl) {
            var aUrl         = sUrl.split('/');
            return aUrl[3] ? aUrl[3] : null;
        },

        show: function(overNode, iCateNo) {

            if (methods.aSubCategory[iCateNo].length == 0) {
                return;
            }

            var aHtml = [];
            aHtml.push('<ul>');
            $(methods.aSubCategory[iCateNo]).each(function() {
                aHtml.push('<li><a href="'+this.link_product_list+'">'+this.name+'</a></li>');
            });
            aHtml.push('</ul>');


            var offset = $(overNode).offset();
            $('<div class="sub-category"></div>')
                .appendTo(overNode)
                .html(aHtml.join(''))
                .find('li').mouseover(function(e) {
                    $(this).addClass('over');
                }).mouseout(function(e) {
                    $(this).removeClass('over');
                });
        },

        close: function() {
            $('.sub-category').remove();
        }
    };

    methods.get();


    $('.xans-layout-category li').mouseenter(function(e) {
        var $this = $(this).addClass('on'),
        iCateNo = Number(methods.getParam($this.find('a').attr('href'), 'cate_no'));

        if (!iCateNo) {
            iCateNo = Number(methods.getParamSeo($this.find('a').attr('href')));
        }

        if (!iCateNo) {
           return;
        }

        methods.show($this, iCateNo);
     }).mouseleave(function(e) {
        $(this).removeClass('on');

          methods.close();
     });
});
$(document).ready(function(){
    if (typeof(EC_SHOP_MULTISHOP_SHIPPING) != "undefined") {
        var sShippingCountryCode4Cookie = 'shippingCountryCode';
        var bShippingCountryProc = false;

        // 배송국가 선택 설정이 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false) {
            $('.xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist').hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptioncountry').hide();
        } else {
            $('.thumb .xans-layout-multishoplistitem').hide();
            var aShippingCountryCode = document.cookie.match('(^|;) ?'+sShippingCountryCode4Cookie+'=([^;]*)(;|$)');
            if (typeof(aShippingCountryCode) != 'undefined' && aShippingCountryCode != null && aShippingCountryCode.length > 2) {
                var sShippingCountryValue = aShippingCountryCode[2];
            }

            // query string으로 넘어 온 배송국가 값이 있다면, 그 값을 적용함
            var aHrefCountryValue = decodeURIComponent(location.href).split("/?country=");

            if (aHrefCountryValue.length == 2) {
                var sShippingCountryValue = aHrefCountryValue[1];
            }

            // 메인 페이지에서 국가선택을 안한 경우, 그 외의 페이지에서 셋팅된 값이 안 나오는 현상 처리
            if (location.href.split("/").length != 4 && $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val()) {
                $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(" : "+$(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected").text().split("SHIPPING TO : ").join(""));

                if ($("#f_country").length > 0 && location.href.indexOf("orderform.html") > -1) {
                    $("#f_country").val($(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val());
                }
            }
            if (typeof(sShippingCountryValue) != "undefined" && sShippingCountryValue != "" && sShippingCountryValue != null) {
                sShippingCountryValue = sShippingCountryValue.split("#")[0];
                var bShippingCountryProc = true;

                $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
                $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(" : "+$(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected").text().split("SHIPPING TO : ").join(""));
                var expires = new Date();
                expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30일간 쿠키 유지
                document.cookie = sShippingCountryCode4Cookie+'=' + $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +';path=/'+ ';expires=' + expires.toUTCString();
                if ($("#f_country").length > 0 && location.href.indexOf("orderform.html") > -1) {
                    $("#f_country").val(sShippingCountryValue).change();;
                }
            }
        }
        // 언어선택 설정이 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingLanguageSelection === false) {
            $('.xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist').hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptionlanguage').hide();
        } else {
            $('.thumb .xans-layout-multishoplistitem').hide();
        }

        // 배송국가 및 언어 설정이 둘 다 사용안함이면 숨김
        if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShipping === false) {
            $(".xans-layout-multishopshipping").hide();
            $('.xans-layout-multishoplist .xans-layout-multishoplistmultioption').hide();
        } else if (bShippingCountryProc === false && location.href.split("/").length == 4) { // 배송국가 값을 처리한 적이 없고, 메인화면일 때만 선택 레이어를 띄움
            var sShippingCountryValue = $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val();
            $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
            $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(" : "+$(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected").text().split("SHIPPING TO : ").join(""));
            // 배송국가 선택을 사용해야 레이어를 보이게 함
            if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === true) {
                $(".xans-layout-multishopshipping").show();
            }
        }

        $(".xans-layout-multishopshipping .close").bind("click", function() {
            $(".xans-layout-multishopshipping").hide();
        });

        $(".xans-layout-multishopshipping .ec-base-button a").bind("click", function() {
            var expires = new Date();
            expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30일간 쿠키 유지
            document.cookie = sShippingCountryCode4Cookie+'=' + $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +';path=/'+ ';expires=' + expires.toUTCString();

            // 도메인 문제로 쿠키로 배송국가 설정이 안 되는 경우를 위해 query string으로 배송국가 값을 넘김
            var sQuerySting = (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false) ? "" : "/?country="+encodeURIComponent($(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val());

            location.href = '//'+$(".xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist").val()+sQuerySting;
        });
        $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a").bind("click", function() {
            $(".xans-layout-multishopshipping").show();
        });
    }
});
