$(document).ready(function(){

    $('.slides').slick({
        centerMode: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        prevArrow: $(".arrow.left"),
        nextArrow: $(".arrow.right"),
        appendDots: $(".dots"),
        dotsClass: "dot"
    });

    $(".bets-list .green").click(function(){
        $(".popup .content").css({display: "none"});
        $(".popup .form").css({display: "block"});
        setTimeout(function(){
            $(".wrapper").fadeIn();
            $(".popup").fadeIn();
        }, 100);
        return false;
    });

    $(".bets-list .blue").click(function(){
        $(".popup .content").css({display: "none"});
        $(".popup .promo").css({display: "block"});
        setTimeout(function(){
            $(".wrapper").fadeIn();
            $(".popup").fadeIn();
        }, 100);
        return false;
    });

    $(".popup .close, .popup .bclose, .wrapper").click(function(){
        $(".wrapper").fadeOut();
        $(".popup").fadeOut(function(){
            $(".popup .content").css({display: "none"});
        });
        return false;
    });

    $(".popup .error .button").click(function(){
        $(".popup .error").fadeOut(function(){
            $(".popup .promo").fadeIn();
        });
        return false;
    });

    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
      

    $(".popup .form .button").click(function(){

        if (localStorage.getItem('trys') < 3) {
            $(".popup .form").fadeOut(function(){
                $(".popup .naeb").fadeIn();
            });
            localStorage.setItem('trys', localStorage.getItem('trys')+1);
        } else {
            $(".popup .form").fadeOut(function(){
                $(".popup .win .pdesc").html('Ваш выигрыш составляет <span>'+getRandomInt(10000, 1000000)+'</span> рублей!');
                $(".popup .win").fadeIn();
            });
            $(".popup .win .button").click(function(){
                window.open("/404/");
            });
            localStorage.setItem('trys', 0);
        }
        $("input").val("");
        return false;
    });

    

    $(".popup .promo .button").click(function(){
        $(".popup .promo").fadeOut(function(){
            let code = $(".popup .promo input").val().trim().toLowerCase();
            let video = "";
            
            $.ajax({
                url: '/1xbad/code.php',
                method: 'post',  
                dataType: 'json',
                data: {code: code},
                success: function(data){
                    if (data.video == false) {
                        $(".popup .promo").fadeOut(function(){
                            $(".popup .error").fadeIn();
                        });
                    } else {
                        $(".popup .video iframe").attr("src", "https://www.youtube.com/embed/"+data.video);
                        window.open("https://www.youtube.com/watch?v="+data.video, "_blank");
                        $(".popup .video").fadeIn();
                    }
                }
            });
            
            $("input").val("");
        });
        return false;
    });

});