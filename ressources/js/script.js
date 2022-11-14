/* 
    Coded by geek néo coolman

    Dans ce code je remercie : CodingNepal / Je pu utilisé une partie de son code pour mettre au point ce game
 */

// ====================================================

// réquipératio de DOM
const typingText = document.querySelector(".quote"),
    inpField = document.querySelector(".input_area"),
    // tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".curr_time"),
    mistakeTag = document.querySelector(".curr_errors"),
    wpmTag = document.querySelector(".curr_wpm"),
    cpmTag = document.querySelector(".curr_cpm"),
    accurecyWord = document.querySelector(".curr_accuracy");

const errorsValue = document.querySelector(".errors-value");
const cmpvalue = document.querySelector(".cpm-value");
const accuracyValue = document.querySelector(".accuracy-value");
const wpmValue = document.querySelector(".wmp-value");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0,
    accurecy,
    correctTyped;

function loadParagraph() {
    // cette fonction permet donc le chargement de paragraph à tapez

    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    // typingText.querySelectorAll("span")[0].classList.add("active");
    // document.addEventListener("keydown", () => inpField.focus());
    // typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        correctTyped = charIndex - mistakes;
        accurecy = Math.round((correctTyped / charIndex) * 100);
        accurecyWord.innerText = accurecy;

        pup_up(wpm, charIndex - mistakes, accurecy, mistakes);
        // gestion scrolling
        console.log(quote.scrollTop)
    } else {
        popUp_result()
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    accurecyWord.innerText = "0"
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

function auto_scroll() {
    let autoScroll = document.querySelector(".quote");
    autoScroll.scrollTop = autoScroll.scrollHeight - autoScroll.clientHeight;
}
function popUp_result() {
    let boxPopUp = document.querySelector(".backBox");
    let closeButton = document.querySelector(".button-close");

    boxPopUp.style.display = "Block";

    closeButton.addEventListener('click', (e) => {
        boxPopUp.style.display = "none";
        resetGame();
    });
}

// the pop-up code

function pup_up(wpm, cpm, accuracy, errors) {
    cmpvalue.innerText = cpm;
    errorsValue.innerText = errors;
    accuracyValue.innerText = accuracy;
    wpmValue = wpm;
}


loadParagraph();
inpField.addEventListener("input", initTyping);