import gsap from "gsap";
import { DOM } from "./DOM";
import { currentPage, pages } from "./shapes";
import Toastify from 'toastify-js'

let current = currentPage;

DOM.nextBtn.onclick = goNext;
DOM.previousBtn.onclick = goBack;

function goNext() {

    if(current === -1) {
        startOver("You can't go up, flip back!")
        return
    }
    
    toggleAttributes(true);
    flip(2.6, 0, - Math.PI / 2, current)
    setTimeout(() => {
        flip(0, 2.5, - Math.PI, current)
    }, 400);
    setTimeout(() => {
        flip(-2.6, 0, - Math.PI * 1.5, current)
    }, 900);
    setTimeout(() => {
        flip( - 0.5, -2.5, - Math.PI * 2, current)
    }, 1400);
    setTimeout(() => {
        gsap.to(pages[current].position, {
            z: (- 0.09 + Number(`0.00${current}`)),
        })
        current = current - 1;
        toggleAttributes(false);
    }, 2000);
}

function goBack() {

    if(current === pages.length - 1) {
        startOver("You can't flip back, go next!")
        return
    }

    toggleAttributes(true);
    current = current + 1;

    flip(
        -2.6, 
        0, 
        (- Math.PI * 2) - ( 1 * (- Math.PI / 2)), 
        current
    )

    setTimeout(() => {
        flip(
            0, 
            2.5, 
            (- Math.PI * 2) - ( 2 * (- Math.PI / 2)), 
            current
        )
    }, 400);

    setTimeout(() => {
        flip(
            2.6, 
            0, 
            (- Math.PI * 2) - ( 3 * (- Math.PI / 2)), 
            current
        )
    }, 900);

    setTimeout(() => {
        flip( 
            0.5, 
            -2.5, 
            (- Math.PI * 2) - ( 4 * (- Math.PI / 2)), 
            current
        )
    }, 1400);

    setTimeout(() => {
        gsap.to(pages[current].position, {
            z: 0.01,
        })
        toggleAttributes(false);
    }, 2000);
}

function flip(position_z, position_y, rotation_x, page) {
    gsap.to(pages[page].position, {
        z: position_z,
        y: position_y,
    })

    gsap.to(pages[page].rotation, {
        x: rotation_x,
        ease: 'sine.out',
        duration: 0.5
    })
}

function toggleAttributes(trueOrFalse) {
    if (trueOrFalse) {
        DOM.nextBtn.setAttribute('disabled', true)
        DOM.previousBtn.setAttribute('disabled', true)
    }
    else {
        DOM.nextBtn.removeAttribute('disabled')
        DOM.previousBtn.removeAttribute('disabled')
    }
}

function startOver(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #780000, #000)",
        },
      }).showToast();
}