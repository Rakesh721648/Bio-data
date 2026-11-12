
// Automatically display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}
// Shrink navbar and move profile image on scroll

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});