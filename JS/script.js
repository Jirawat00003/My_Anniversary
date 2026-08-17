/* ========================================
   GET ELEMENTS
======================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");


const bgMusic =
    document.getElementById("bgMusic");


const openBtn =
    document.getElementById("openBtn");


const backToEnvelope =
    document.getElementById("backToEnvelope");


const continueBtn =
    document.getElementById("continueBtn");


const backToLetter =
    document.getElementById("backToLetter");


const yesBtn =
    document.getElementById("yesBtn");


const noBtn =
    document.getElementById("noBtn");


const envelope =
    document.querySelector(".envelope");


const cardContainer =
    document.querySelector(".card-container");



/* ========================================
   WELCOME SCREEN
======================================== */

welcomeScreen.addEventListener(
    "click",
    startWebsite
);


welcomeScreen.addEventListener(
    "touchstart",
    startWebsite
);



/* ========================================
   START WEBSITE
======================================== */

function startWebsite(event) {

    /*
        ป้องกันการทำงานซ้ำ
    */

    if (
        welcomeScreen.classList.contains(
            "hide"
        )
    ) {

        return;

    }


    /*
        ป้องกัน touch + click
        ทำงานซ้ำกัน
    */

    if (
        event.type === "touchstart"
    ) {

        event.preventDefault();

    }


    /*
        เริ่มเพลง
    */

    bgMusic.volume = 1.0;


    const playPromise =
        bgMusic.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            }
        );

    }


    /*
        ซ่อนหน้า Welcome
    */

    welcomeScreen.classList.add(
        "hide"
    );

}



/* ========================================
   OPEN LETTER
======================================== */

openBtn.addEventListener(
    "click",
    function () {


        /*
            เปิดฝาซอง
        */

        envelope.classList.add(
            "open"
        );


        /*
            รอ Animation
        */

        setTimeout(function () {

            cardContainer.classList.add(
                "show-letter"
            );

        }, 700);

    }
);



/* ========================================
   BACK TO ENVELOPE
======================================== */

backToEnvelope.addEventListener(
    "click",
    function () {


        /*
            ซ่อนจดหมาย
        */

        cardContainer.classList.remove(
            "show-letter"
        );


        /*
            รอ Animation
        */

        setTimeout(function () {

            envelope.classList.remove(
                "open"
            );

        }, 600);

    }
);



/* ========================================
   GO TO QUESTION
======================================== */

continueBtn.addEventListener(
    "click",
    function () {


        /*
            ซ่อนจดหมาย
        */

        cardContainer.classList.remove(
            "show-letter"
        );


        /*
            แสดงหน้าคำถาม
        */

        setTimeout(function () {

            cardContainer.classList.add(
                "show-question"
            );


            /*
                รีเซ็ต NO
            */

            resetNoButton();

        }, 300);

    }
);



/* ========================================
   BACK TO LETTER
======================================== */

backToLetter.addEventListener(
    "click",
    function () {


        /*
            ซ่อนหน้าคำถาม
        */

        cardContainer.classList.remove(
            "show-question"
        );


        /*
            กลับไปจดหมาย
        */

        setTimeout(function () {

            cardContainer.classList.add(
                "show-letter"
            );

        }, 300);

    }
);



/* ========================================
   NO BUTTON
   MOVE WHEN CLICK
======================================== */

noBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);



/* ========================================
   MOVE NO BUTTON
======================================== */

function moveNoButton() {


    const container =
        document.querySelector(
            ".question-buttons"
        );


    /*
        เปลี่ยน NO เป็น absolute
    */

    noBtn.style.position =
        "absolute";


    /*
        ขนาดพื้นที่
    */

    const containerWidth =
        container.clientWidth;


    const containerHeight =
        container.clientHeight;


    const buttonWidth =
        noBtn.offsetWidth;


    const buttonHeight =
        noBtn.offsetHeight;



    /*
        ตำแหน่ง YES
    */

    const yesRect =
        yesBtn.getBoundingClientRect();


    const containerRect =
        container.getBoundingClientRect();


    const yesLeft =
        yesRect.left -
        containerRect.left;


    const yesTop =
        yesRect.top -
        containerRect.top;


    const yesRight =
        yesLeft +
        yesRect.width;


    const yesBottom =
        yesTop +
        yesRect.height;



    /*
        ระยะปลอดภัย
    */

    const safeDistance =
        20;


    let randomX;

    let randomY;

    let safe =
        false;

    let attempts =
        0;



    /*
        สุ่มตำแหน่ง
    */

    while (
        !safe &&
        attempts < 100
    ) {


        attempts++;


        randomX =
            Math.random() *
            Math.max(
                0,
                containerWidth -
                buttonWidth
            );


        randomY =
            Math.random() *
            Math.max(
                0,
                containerHeight -
                buttonHeight
            );



        /*
            ขอบเขต NO
        */

        const noLeft =
            randomX;


        const noRight =
            randomX +
            buttonWidth;


        const noTop =
            randomY;


        const noBottom =
            randomY +
            buttonHeight;



        /*
            ตรวจสอบการทับ YES
        */

        const overlap = !(
            noRight <
            yesLeft -
            safeDistance

            ||

            noLeft >
            yesRight +
            safeDistance

            ||

            noBottom <
            yesTop -
            safeDistance

            ||

            noTop >
            yesBottom +
            safeDistance
        );


        if (!overlap) {

            safe =
                true;

        }

    }



    /*
        ใช้ตำแหน่งใหม่
    */

    noBtn.style.left =
        `${randomX}px`;


    noBtn.style.top =
        `${randomY}px`;


    noBtn.style.transform =
        "none";

}



/* ========================================
   RESET NO BUTTON
======================================== */

function resetNoButton() {


    noBtn.style.position =
        "relative";


    noBtn.style.left =
        "";


    noBtn.style.top =
        "";


    noBtn.style.transform =
        "";

}



/* ========================================
   YES BUTTON
======================================== */

yesBtn.addEventListener(
    "click",
    function () {


        /*
            ซ่อนคำถาม
        */

        cardContainer.classList.remove(
            "show-question"
        );


        /*
            ซ่อนจดหมาย
        */

        cardContainer.classList.remove(
            "show-letter"
        );


        /*
            แสดง Final
        */

        setTimeout(function () {

            cardContainer.classList.add(
                "show-final"
            );

        }, 300);

    }
);