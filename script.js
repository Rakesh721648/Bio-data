
// Automatically display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}
// Automatically display current year
document.getElementById("year").textContent = new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}

// ---------- Smooth floating profile image ----------
const profileImage = document.querySelector(".profile-image");
const heroText = document.querySelector(".hero-content");

const ANIM = {
    duration: 900,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
};

let isFloating = false;
let imageHome = null; // remembers where the image lives in the hero

function setFloating(floating) {
    // 1. FIRST: current visual positions (includes any in-flight animation)
    const imgFirst = profileImage.getBoundingClientRect();
    const textFirst = heroText.getBoundingClientRect();

    // Stop running animations so we can start from the current spot
    profileImage.getAnimations().forEach(a => a.cancel());
    heroText.getAnimations().forEach(a => a.cancel());

    // 2. Change the layout instantly
    if (floating) {
        imageHome = {
            parent: profileImage.parentElement,
            next: profileImage.nextSibling
        };
        document.body.appendChild(profileImage);
        document.body.classList.add("scrolled");
    } else {
        imageHome.parent.insertBefore(profileImage, imageHome.next);
        document.body.classList.remove("scrolled");
    }

    // 3. LAST: final positions
    const imgLast = profileImage.getBoundingClientRect();
    const textLast = heroText.getBoundingClientRect();

    // 4. PLAY: animate from first -> last, both with same timing
    profileImage.animate(
        [
            {
                transformOrigin: "top left",
                transform: `translate(${imgFirst.left - imgLast.left}px, ${imgFirst.top - imgLast.top}px)
                            scale(${imgFirst.width / imgLast.width}, ${imgFirst.height / imgLast.height})`
            },
            { transformOrigin: "top left", transform: "none" }
        ],
        ANIM
    );

    heroText.animate(
        [
            {
                transform: `translate(${textFirst.left - textLast.left}px, ${textFirst.top - textLast.top}px)`
            },
            { transform: "none" }
        ],
        ANIM
    );

    isFloating = floating;
}

// Different thresholds (hysteresis) prevent flickering near the trigger point
window.addEventListener("scroll", () => {
    if (window.scrollY > 100 && !isFloating) {
        setFloating(true);
    } else if (window.scrollY < 40 && isFloating) {
        setFloating(false);
    }
}, { passive: true });