
// Automatically display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Print or save biodata as PDF
function printBio() {
    window.print();
}
