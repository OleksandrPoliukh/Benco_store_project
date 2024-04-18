//product slider

$(function () {

    $('.product__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
    });

});


//adding products to card

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


// products rating

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        const defaultValue = ratingValue.innerHTML;

        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                if (defaultValue == ratingValue.innerHTML) {
                    ratingValue.innerHTML = (Number(ratingItem.value) + Number(ratingValue.innerHTML)) / 2;
                    setRatingActiveWidth();
                }
                else {
                    alert("You have already voted for this product")
                }
            });
        }
    }
}

// timer

const day = document.getElementById("day");
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

let today = new Date();
let monday = new Date();

if(today.getDay()){
    monday.setDate(today.getDate() + 8 - today.getDay())
} else {
    monday.setDate(today.getDate() + 1)
}

let midnight = today.getHours()*3600000 + today.getMinutes()*60000 + today.getSeconds()*1000 + today.getMilliseconds();

let newWeek = monday - midnight;

function countdownTimer() {
    const rightNow = Date.now();

    const gap = newWeek - rightNow;

    const d = Math.floor(gap / 1000 / 60 / 60 / 24);
    const h = Math.floor((gap / 1000 / 60 / 60) % 24);
    const m = Math.floor((gap / 1000 / 60) % 60);
    const s = Math.floor((gap / 1000) % 60);

    day.innerHTML = d < 10 ? "0" + d : d;
    hrs.innerHTML = h < 10 ? "0" + h : h;
    min.innerHTML = m < 10 ? "0" + m : m;
    sec.innerHTML = s < 10 ? "0" + s : s;

    let seco = ( ( 100 / 60 ) * s)
    let ss = Math.round(seco);

    let mino = ( ( 100 / 60 ) * m)
    let mm = Math.round(mino);

    let hore = ( ( 100 / 60 ) * h)
    let hh = Math.round(hore);

    let deno = ( ( 100 / 60 ) * d)
    let dd = Math.round(deno);

    sec.style.background = `conic-gradient( rgba(255, 255, 255, 0.2) 0 ${ss}% , #ffffff00 ${ss}% 100%)`;
    min.style.background = `conic-gradient( rgba(255, 255, 255, 0.2) 0 ${mm}% , #ffffff00 ${mm}% 100%)`;
    hrs.style.background = `conic-gradient( rgba(255, 255, 255, 0.2) 0 ${hh}% , #ffffff00 ${hh}% 100%)`;
    day.style.background = `conic-gradient( rgba(255, 255, 255, 0.2) 0 ${dd}% , #ffffff00 ${dd}% 100%)`;
}

setInterval(countdownTimer, 1000);
