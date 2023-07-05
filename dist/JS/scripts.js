$(document).ready(function(){

    let menu = $('#menu');
    $('#menu-container').on('click', function(){
        menu.removeClass('closed');
    })
    let menuClose = function(){
        menu.addClass('closed');
    }
    $('#close').on('click', menuClose)
    $('#close-gray').on('click', menuClose)

    let moreProjects = $('#more-projects');
    moreProjects.on('click', function(){
        $('.hidden-project').removeClass('hidden-project');
        moreProjects.css('display', 'none');
    })
    let technologyArrow = $('.technology-arrow');
    technologyArrow.on('mouseenter', function(){
        if(window.innerWidth <= 700)
        {
            let technologiesContainer = $('.technologies .container');
            technologiesContainer.find('> .technology-text').remove();
            let technologyTextPopup = $(this).find('.technology-text');
            technologyTextPopup.clone().appendTo(technologiesContainer).addClass('technology-text-popup');
        }
    })
    let excursionPopup = $('.excursion-popup')
    $('.excursion-action').on('click', function(){
        excursionPopup.removeClass('closed');
    })
    let excursionPopupContainer = $('.excursion-popup-container');
    $('.excursion-close').on('click', function (){
        excursionPopup.addClass('closed');
        excursionPopupContainer.find('form').css('display', 'block')
        excursionPopupContainer.find('popup-text').css('display', 'block')
        $('.excursion-success').css('display', 'none');
    })

    //Нужна консультация
    $('.consultation-action').on('click', function(){
        let consultationName = $('.consultation-name');
        let consultationPhone = $('.consultation-phone');
        let consultationPolitics = $('.consultation-politics');
        let consultationNameError = $('.consultation-name-error');
        let consultationPhoneError = $('.consultation-phone-error');
        let consultationPoliticsError = $('.consultation-politics-error');
        consultationNameError.css('display', 'none');
        consultationPhoneError.css('display', 'none');
        consultationPoliticsError.css('display', 'none');
        consultationName.css('margin-bottom', '0').css('border-color', 'rgb(255, 255, 255)');
        consultationPhone.css('margin-bottom', '0').css('border-color', 'rgb(255, 255, 255)');
        consultationPolitics.css('margin-bottom', '0').css('border', 'none');
        let isValid = true;
        if (!consultationName.val()){
            consultationName.css('margin-bottom', '10px').css('border-color', 'rgb(255, 0, 0)');
            consultationNameError.css('display', 'block');
            isValid = false;
        }
        if (!consultationPhone.val()){
            consultationPhone.css('margin-bottom', '10px').css('border-color', 'rgb(255, 0, 0)');
            consultationPhoneError.css('display', 'block');
            isValid = false;
        }
        if (!consultationPolitics.find('input').is(':checked')){
            consultationPolitics.css('margin-bottom', '10px').css('border', '1px solid rgb(255, 0, 0)');
            consultationPoliticsError.css('display', 'block');
            isValid = false;
        }
        if (isValid){
            $.ajax({
                type: "post",
                url: "https://testologia.site/checkout",
                data: { politics: consultationPolitics.find('input').is(':checked'),
                        name: consultationName.val(),
                        phone: consultationPhone.val(),
                }
            })
                .done(function( msg ) {
                    console.log(msg.success);
                    if (msg.success === 1){
                        $('.consultation-form').css('display', 'none')
                        excursionPopupContainer.find('popup-text').css('display', 'none')
                        $('.consultation-success').css('display', 'block');
                    }else{
                        alert('Возникла ошибка при валидации данных');
                    }
                });
        }
    })

    //Записаться на экскурсию
    $('#excursion-button').on('click', function(){
        let excursionName = $('#excursion-name');
        let excursionPhone = $('#excursion-phone');
        let excursionPolitics = $('#excursion-politics');
        let excursionNameError = $('.excursion-name-error');
        let excursionPhoneError = $('.excursion-phone-error');
        let excursionPoliticsError = $('.excursion-politics-error');
        excursionNameError.css('display', 'none');
        excursionPhoneError.css('display', 'none');
        excursionPoliticsError.css('display', 'none');
        excursionName.css('margin-bottom', '20px').css('border-color', 'rgb(255, 255, 255)');
        excursionPhone.css('margin-bottom', '20px').css('border-color', 'rgb(255, 255, 255)');
        excursionPolitics.css('margin-bottom', '0').css('border', 'none');
        let isValid = true;
        if (!excursionName.val()){
            excursionName.css('margin-bottom', '10px').css('border-color', 'rgb(255, 0, 0)');
            excursionNameError.css('display', 'block');
            isValid = false;
        }
        if (!excursionPhone.val()){
            excursionPhone.css('margin-bottom', '10px').css('border-color', 'rgb(255, 0, 0)');
            excursionPhoneError.css('display', 'block');
            isValid = false;
        }
        if (!excursionPolitics.find('input').is(':checked')){
            excursionPolitics.css('margin-bottom', '10px').css('border', '1px solid rgb(255, 0, 0)');
            excursionPoliticsError.css('display', 'block');
            isValid = false;
        }
        if (isValid){
            $.ajax({
                type: "post",
                url: "https://testologia.site/checkout",
                data: { politics: excursionPolitics.find('input').is(':checked'),
                        name: excursionName.val(),
                        phone: excursionPhone.val(),
                }
            })
                .done(function( msg ) {
                    console.log(msg.success);
                    if (msg.success === 1){
                        excursionPopupContainer.find('form').css('display', 'none')
                        excursionPopupContainer.find('popup-text').css('display', 'none')
                        $('.excursion-success').css('display', 'block');
                    }else{
                        alert('Возникла ошибка при валидации данных');
                    }
                });
        }
    })

    /*technologyArrow.on('mouseleave', function(){
        $('.technologies .container').find('> .technology-text').remove();
    })*/
    $('.owl-carousel').owlCarousel({
        nav: true,
        loop: true,
        mouseDrag: false,
        dotsEach: true,
        center: true,
        responsive:{
            0:{
                items: 1,
                center: false
            },
            848:{
                items: 3
            }
        }
    });
    $('.project-images').magnificPopup({delegate: 'a', type:'image'});
    $('.consultation-phone').mask('+7(999) 999-99-99');
    $('.excursion-phone').mask('+7(999) 999-99-99');

    let wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 200,
        mobile: true,
        live: true
    })
    wow.init();
})