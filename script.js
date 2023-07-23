"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var products = [
    { id: 1, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 2, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 3, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 4, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
];
function addToCart(productId) {
    console.log("Added product with ID ".concat(productId, " to cart."));
}
// Create the product and add them to the container 
function createProductElement(product) {
    var container = document.createElement('div');
    container.classList.add('product');
    var image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    container.appendChild(image);
    var title = document.createElement('h3');
    title.textContent = product.title;
    container.appendChild(title);
    var price = document.createElement('p');
    price.textContent = "\u20AC ".concat(product.price);
    container.appendChild(price);
    var button = document.createElement('button');
    button.classList.add('add-to-cart');
    button.textContent = 'Add to cart';
    button.addEventListener('click', function () { return addToCart(product.id); });
    container.appendChild(button);
    return container;
}
var productContainer = document.getElementById('product-list');
if (productContainer) {
    products.forEach(function (product) {
        var productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}
var carouselContainer = document.querySelector('.carousel-container');
var scrollbarThumb = document.querySelector('.scrollbar-thumb');
var slider = document.querySelector('.scrollbar');
var isDragging = false;
var dragStart = 0;
var scrollStart = 0;
var dragDistance = 0;
var scrollDistance = 0;
// Event listeners for the scroll thumb
scrollbarThumb.addEventListener('mousedown', startDrag);
scrollbarThumb.addEventListener('touchstart', startDrag, { passive: false });
// Responsible for setting up the initial values and flags when the user starts dragging the scrollbar thumb
function startDrag(e) {
    e.preventDefault(); // Prevent default touch behavior on mobile devices
    isDragging = true;
    dragStart = e.clientX || e.touches[0].clientX; // Use clientX for mouse events, touches[0].clientX for touch events
    scrollStart = carouselContainer.scrollLeft;
    dragDistance = 0;
    scrollDistance = 0;
}
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
// Continuously updates the scroll position of the carousel container as the thumb is being dragged
function drag(e) {
    if (isDragging) {
        var clientX = e.clientX || e.touches[0].clientX; // Use clientX for mouse events, touches[0].clientX for touch events
        dragDistance = clientX - dragStart;
        scrollDistance = dragDistance / (slider.offsetWidth - scrollbarThumb.offsetWidth) * (carouselContainer.scrollWidth - carouselContainer.clientWidth);
        carouselContainer.scrollLeft = scrollStart + scrollDistance;
    }
}
document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);
function stopDrag() {
    isDragging = false;
}
carouselContainer.addEventListener('scroll', updateThumbPosition);
function updateThumbPosition() {
    // Calculates the position of the scrollbar thumb based on the carousel's horizontal scroll progress.
    var scrollPercent = carouselContainer.scrollLeft / (carouselContainer.scrollWidth - carouselContainer.clientWidth);
    var scrollbarThumbLeft = scrollPercent * (slider.offsetWidth - scrollbarThumb.offsetWidth);
    // calculate the width of the scrollbar based on the width of (the container = the number of cards)
    var containerWidth = carouselContainer.clientWidth;
    var scrollWidth = carouselContainer.scrollWidth;
    var thumbWidth = (containerWidth / scrollWidth) * containerWidth;
    scrollbarThumb.style.width = "".concat(thumbWidth, "px");
    scrollbarThumb.style.left = scrollbarThumbLeft + 'px';
    scrollbarThumb.style.transform = "translateX(".concat(scrollbarThumbLeft, "px)");
}
updateThumbPosition();
