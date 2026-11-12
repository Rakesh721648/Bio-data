
// Automatically display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}
// Smooth floating profile image animation

const profileImage = document.querySelector(".profile-image");

let imagePlaceholder = null;
let isFloating = false;

function animateImage(fromRect, toRect) {
    const dx = fromRect.left - toRect.left;
    const dy = fromRect.top - toRect.top;

    const sx = fromRect.width / toRect.width;
    const sy = fromRect.height / toRect.height;

    profileImage.animate(
        [
            {
                transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
            },
            {
                transform: "none"
            }
        ],
        {
            duration: 800,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "none"
        }
    );
}

function moveImageToCorner() {
    const originalRect = profileImage.getBoundingClientRect();

    imagePlaceholder = document.createElement("div");
    imagePlaceholder.style.width = originalRect.width + "px";
imagePlaceholder.style.height = originalRect.height + "px";
imagePlaceholder.style.flex = `0 0 ${originalRect.width}px`;
imagePlaceholder.style.transition =
    "width 1.3s cubic-bezier(0.22, 1, 0.36, 1), flex-basis 1.3s cubic-bezier(0.22, 1, 0.36, 1)";
    profileImage.parentElement.insertBefore(
        imagePlaceholder,
        profileImage
    );

    document.body.appendChild(profileImage);
    document.body.classList.add("scrolled");
    requestAnimationFrame(() => {
    imagePlaceholder.style.width = "0px";
    imagePlaceholder.style.flexBasis = "0px";
});

    requestAnimationFrame(() => {
        const cornerRect = profileImage.getBoundingClientRect();
        animateImage(originalRect, cornerRect);
    });

    isFloating = true;
}
function returnImage() {
    const cornerRect = profileImage.getBoundingClientRect();

    imagePlaceholder.parentElement.insertBefore(
        profileImage,
        imagePlaceholder
    );

    imagePlaceholder.remove();
    imagePlaceholder = null;

    document.body.classList.remove("scrolled");

    requestAnimationFrame(() => {
        const originalRect = profileImage.getBoundingClientRect();
        animateImage(cornerRect, originalRect);
    });

    isFloating = false;
}

window.addEventListener("scroll", function () {
    if (window.scrollY > 100 && !isFloating) {
        moveImageToCorner();
    } else if (window.scrollY <= 100 && isFloating) {
        returnImage();
    }
});