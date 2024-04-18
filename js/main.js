//product slider

$(function () {

    $('.product__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
    });

});


//adding products to cart

const productElements = document.querySelectorAll('.product__slider-item_btn, .product__slider-name');
productElements.forEach(productElement => {
    productElement.addEventListener('click', () => {
        productElement.classList.toggle('active');
        productElement.parentElement.children[0].classList.toggle('active');
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

const circleD = document.querySelector('.progress-ring__circle-d');
const radiusD = circleD.r.baseVal.value;
const circumferenceD = 2 * Math.PI * radiusD;
circleD.style.strokeDasharray = `${circumferenceD} ${circumferenceD}`;
circleD.style.strokeDashoffset = circumferenceD;

const circleH = document.querySelector('.progress-ring__circle-h');
const radiusH = circleH.r.baseVal.value;
const circumferenceH = 2 * Math.PI * radiusH;
circleH.style.strokeDasharray = `${circumferenceH} ${circumferenceH}`;
circleH.style.strokeDashoffset = circumferenceH;

const circleM = document.querySelector('.progress-ring__circle-m');
const radiusM = circleM.r.baseVal.value;
const circumferenceM = 2 * Math.PI * radiusM;
circleM.style.strokeDasharray = `${circumferenceM} ${circumferenceM}`;
circleM.style.strokeDashoffset = circumferenceM;

const circleS = document.querySelector('.progress-ring__circle-s');
const radiusS = circleS.r.baseVal.value;
const circumferenceS = 2 * Math.PI * radiusS;
circleS.style.strokeDasharray = `${circumferenceS} ${circumferenceS}`;
circleS.style.strokeDashoffset = circumferenceS;

function setProgressD(percent) {
    const offset = circumferenceD - percent / 100 * circumferenceD;
    circleD.style.strokeDashoffset = offset;
}

function setProgressH(percent) {
    const offset = circumferenceH - percent / 100 * circumferenceH;
    circleH.style.strokeDashoffset = offset;
}

function setProgressM(percent) {
    const offset = circumferenceM - percent / 100 * circumferenceM;
    circleM.style.strokeDashoffset = offset;
}

function setProgressS(percent) {
    const offset = circumferenceS - percent / 100 * circumferenceS;
    circleS.style.strokeDashoffset = offset;
}

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

    const daysPercent = ( ( 100 / 7 ) * d)
    const hoursPercent = ( ( 100 / 24 ) * h)
    const minutesPercent = ( ( 100 / 60 ) * m)
    const secondsPercent = ( ( 100 / 60 ) * s)
    
    setProgressD(daysPercent);
    setProgressH(hoursPercent);
    setProgressM(minutesPercent);
    setProgressS(secondsPercent);
}

setInterval(countdownTimer, 1000);
