$(function () {

    $('.product__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
    });

});

const productElements = document.querySelectorAll('.product__slider-item_btn, .product__slider-name');
productElements.forEach(productElement => {
    productElement.addEventListener('click', () => {
        productElement.classList.toggle('active');
        productElement.parentElement.children[0].classList.toggle('active');

        //as alternative

        // if(productElement.classList.contains('active')) {
        //     productElement.classList.remove('active')
        //     productElement.parentElement.children[0].classList.remove('active')
        // } else {
        //     productElement.classList.add('active');
        //     productElement.parentElement.children[0].classList.add('active');
        // }
    })
})





