
// Automatically display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}
// Move profile image to corner when scrolling

window.addEventListener("scroll", function () {
    const profileImage = document.querySelector(".profile-image");

    if (window.scrollY > 150) {
        profileImage.classList.add("floating");
    } else {
        profileImage.classList.remove("floating");
    }
});