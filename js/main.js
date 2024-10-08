//product slider

$('.product__slider').slick({

    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    // mobileFirst: true,
    // respondTo: "container",


    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,

                //   centerPadding: "150px"
                //   centerMode: true
            }
        },
        {
            breakpoint: 1350,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                //   arrows: false
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                //   arrows: false
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
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

if (today.getDay()) {
    monday.setDate(today.getDate() + 8 - today.getDay())
} else {
    monday.setDate(today.getDate() + 1)
}

let midnight = today.getHours() * 3600000 + today.getMinutes() * 60000 + today.getSeconds() * 1000 + today.getMilliseconds();
let newWeek = monday - midnight;

const circleD = document.querySelector('.progress-ring__circle-d');
const circleH = document.querySelector('.progress-ring__circle-h');
const circleM = document.querySelector('.progress-ring__circle-m');
const circleS = document.querySelector('.progress-ring__circle-s');

function getCircumference(circle) {
    const computedRadius = window.getComputedStyle(circle);
    const radius = parseFloat(computedRadius.r);
    const circumference = 2 * Math.PI * radius;
    return circumference;
}

function setProgress(circle, percent, circumference) {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
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

    const daysPercent = ((100 / 7) * d);
    const hoursPercent = ((100 / 24) * h);
    const minutesPercent = ((100 / 60) * m);
    const secondsPercent = ((100 / 60) * s);

    const circumference = getCircumference(circleS);

    setProgress(circleD, daysPercent, circumference);
    setProgress(circleH, hoursPercent, circumference);
    setProgress(circleM, minutesPercent, circumference);
    setProgress(circleS, secondsPercent, circumference);
}

setInterval(countdownTimer, 1000);



// TG email sending

const TOKEN = "6958554100:AAFyt3gPgTrfu5beUay1n4MRBBie8NHnjEY";
const CHAT_ID = "-1002001883773";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('tg').addEventListener('submit', function (e) {
    e.preventDefault();

    let message = `<b>New consumer:</b>\n`;
    message += `${this.email.value}`

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
        .then((res) => {
            this.email.value = "";
            alert("Your email was successfully sent. Wait for callback from manager.")
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => {
            console.log('Finish')
        })
});



// popup

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        clearValidation();
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < array.lockPadding; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// polyphiles for popup
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMathesSelector;
    }
})();



// validation

const patterns = {
    name: /^[A-Za-z]+$/,
    lastname: /^[A-Za-z]+$/,
    password: /[0-9a-zA-Z!@#$%^&*]{6,}/,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
};

const inputs = document.querySelectorAll('.form__input');

function validate(field, regex) {

    if (regex.test(field.value)) {
        field.classList.add('valid');
        if (field.classList.contains('invalid')) {
            field.classList.replace('invalid', 'valid')
        }
    } else {
        field.classList.add('invalid')
        if (field.classList.contains('valid')) {
            field.classList.replace('valid', 'invalid')
        }
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    })
})

function clearValidation() {
    inputs.forEach((input) => {
        input.classList.remove('valid')
        input.value = "";
    })
}



// work with DB (mockAPI)

const baseUrl = 'https://662a665b67df268010a3c347.mockapi.io/api/v1/benco_users';
const registrationForm = document.getElementById("rg-form");
const signInForm = document.getElementById("snin-form");
const simpleSignOut = document.getElementById("signOut-popup__btn");

registrationForm.addEventListener('submit', sendRegistrationForm);
signInForm.addEventListener('submit', authorization);
simpleSignOut.addEventListener('click', signingOut);

function signingOut() {
    alert("You are successfully Signed Out")
    document.getElementById("snOut-btn").style.display = "none";
    document.getElementById("myAcc-btn").style.display = "block";
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
}

async function authorization(event) {
    event.preventDefault();

    const signInFormData = Object.fromEntries(new FormData(signInForm));

    let response = await fetch(baseUrl);
    let allUsers = await response.json();
    let userEmails = [];
    let userPasswords = [];

    for (let index = 0; index < allUsers.length; index++) {
        const element = allUsers[index];
        let userEmail = element.email;
        let userPassword = element.password;
        userEmails[index] = userEmail;
        userPasswords[index] = userPassword;


        if (userEmails[index] == signInFormData.email) {
            if (userPasswords[index] == signInFormData.password) {
                alert("You are successfully signed in. Happy shopping")
                document.getElementById("myAcc-btn").style.display = "none";
                document.getElementById("snOut-btn").style.display = "block";
                const popupActive = document.querySelector('.popup.open');
                popupClose(popupActive);
                break
            } else {
                alert("Incorrect password, please try again")
                document.getElementById("snin-pass").value = "";
                break
            }
        } else if (index == (allUsers.length - 1)) {
            alert("You are not registered. Please, fill out the registration form");
            popupOpen(document.getElementById("signUp-popup"));
        }
    }

}

async function sendRegistrationForm(event) {
    event.preventDefault();

    const registrationFormData = Object.fromEntries(new FormData(registrationForm));

    let response = await fetch(baseUrl);
    let allUsers = await response.json();

    let userEmails = [];


    for (let index = 0; index < allUsers.length; index++) {
        const element = allUsers[index];
        let userEmail = element.email;
        userEmails[index] = userEmail;

        if (userEmails[index] == registrationFormData.email) {
            clearValidation();
            alert("You have already registered")
            for (const iterator of this) {
                iterator.value = "";
            }
            popupOpen(document.getElementById("signIn-popup"));
            break
        } else if (index == (allUsers.length - 1)) {

            await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(registrationFormData)
            })
                .then(res => res.json())
                .then(data =>
                    console.log(JSON.stringify(data))
                ).catch(error => {
                    console.log(error)
                })
            clearValidation();
            alert('You have been successfully signed up!')

            for (const iterator of this) {
                iterator.value = "";
            }

            popupOpen(document.getElementById("signIn-popup"));
            break
        }
    }
}