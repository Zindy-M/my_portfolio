const vehicleTransfers = document.getElementById("vehicles-transfers");
const menu = document.getElementById("menu1");

function showMenu(event) {
    event.preventDefault();
    menu1.classList.toggle("hidden");
    menu2.classList.add("hidden");
    menu3.classList.add("hidden");
    menu4.classList.add("hidden");
}

vehicleTransfers.addEventListener("click", showMenu)

const buyLink = document.getElementById("buy-a-car");
const menu2 = document.getElementById("menu2");

function showBuyMenu(event) {
    event.preventDefault();
    menu1.classList.add("hidden");
    menu2.classList.toggle("hidden");
    menu3.classList.add("hidden");
    menu4.classList.add("hidden");
}

buyLink.addEventListener("click", showBuyMenu)

const offerLink = document.getElementById("offers");
const menu3 = document.getElementById("menu3");

function showOfferMenu(event) {
    event.preventDefault();
    menu1.classList.add("hidden");
    menu2.classList.add("hidden");
    menu3.classList.toggle("hidden");
    menu4.classList.add("hidden");
}

offerLink.addEventListener("click", showOfferMenu)

const businessLink = document.getElementById("business");
const menu4 = document.getElementById("menu4");

function showBusinessMenu(event) {
    event.preventDefault();
    menu1.classList.add("hidden");
    menu2.classList.add("hidden");
    menu3.classList.add("hidden");
    menu4.classList.toggle("hidden");
}

businessLink.addEventListener("click", showBusinessMenu)

document.addEventListener("click", function(event) {
    // Check if the clicked element is not any of the dropdown menus or their respective buttons
    if (!event.target.closest("#menu1") && !event.target.closest("#vehicles-transfers") &&
        !event.target.closest("#menu2") && !event.target.closest("#buy-a-car") &&
        !event.target.closest("#menu3") && !event.target.closest("#offers") &&
        !event.target.closest("#menu4") && !event.target.closest("#business")) {
        // Hide all the menus
        menu1.classList.add("hidden");
        menu2.classList.add("hidden");
        menu3.classList.add("hidden");
        menu4.classList.add("hidden");
    }
});

// const navLinks = document.querySelectorAll(".nav-link");
// const navMenus = document.querySelectorAll(".nav-menu");

// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         const navMenu = link.querySelector('.nav-menu');
//         if (navMenu) {
//             navMenu.classList.toggle('hidden');
//         }
//     })
// })

// function openMenu(event) {
//     event.preventDefault();

//     const clickedElement = event.target;
//     clickedElement.classList.toggle("hidden");

//     navBarMenus. forEach(element => {
//         if (element !== clickedElement) {
//             element.classList.add("hidden");
//         }
//     })
// }

// navBarLinks.forEach(link => {
//     event.preventDefault();
//     link.addEventListener("click", openMenu);
// });

// Select all navigation links
// const navLinks = document.querySelectorAll('.nav-link');

// // Loop through each link
// navLinks.forEach(link => {
//     // Add event listener for mouseenter (you can also use 'click' or 'mouseover')
//     link.addEventListener('mouseenter', () => {
//         // Show the dropdown menu when the link is hovered over
//         const dropdownMenu = link.querySelector('.nav-menu');
//         if (dropdownMenu) {
//             dropdownMenu.classList.add('show');
//         }
//     });

//     // Add event listener for mouseleave to hide the dropdown menu when mouse leaves
//     link.addEventListener('mouseleave', () => {
//         // Hide the dropdown menu when the mouse leaves the link
//         const dropdownMenu = link.querySelector('.nav-menu');
//         if (dropdownMenu) {
//             dropdownMenu.classList.remove('show');
//         }
//     });
// });
