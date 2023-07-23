import Product from "./product.interface";

const products: Product[] = [
    { id: 1, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 2, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 3, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
    { id: 4, image: 'https://tractive.com/assets/image/shop-frontend/product/trnjaca/tractive-gps-dog-4-spare-charger.png', title: 'Clip x3', price: 9.99 },
];

function addToCart(productId: number) : void {
    console.log(`Added product with ID ${productId} to cart.`);
}
// Create the product and add them to the container 
function createProductElement(product: Product): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('product');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    container.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = product.title;
    container.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `\u20AC ${product.price}`;
    container.appendChild(price);

    const button = document.createElement('button');
    button.classList.add('add-to-cart');
    button.textContent = 'Add to cart';
    button.addEventListener('click', () => addToCart(product.id));
    container.appendChild(button);

    return container;
}

const productContainer = document.getElementById('product-list');
if (productContainer) {
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}

const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;
const scrollbarThumb = document.querySelector('.scrollbar-thumb') as HTMLElement;
const slider = document.querySelector('.scrollbar') as HTMLElement;

let isDragging = false;
let dragStart = 0;
let scrollStart = 0;
let dragDistance = 0;
let scrollDistance = 0;

// Event listeners for the scroll thumb
scrollbarThumb.addEventListener('mousedown', startDrag);
scrollbarThumb.addEventListener('touchstart', startDrag, { passive: false });

// Responsible for setting up the initial values and flags when the user starts dragging the scrollbar thumb
function startDrag(e: MouseEvent | TouchEvent) {
  e.preventDefault(); // Prevent default touch behavior on mobile devices
  isDragging = true;
  dragStart = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX; // Use clientX for mouse events, touches[0].clientX for touch events
  scrollStart = carouselContainer.scrollLeft;
  dragDistance = 0;
  scrollDistance = 0;
}

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
// Continuously updates the scroll position of the carousel container as the thumb is being dragged
function drag(e: MouseEvent | TouchEvent) {
  if (isDragging) {
    const clientX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX; // Use clientX for mouse events, touches[0].clientX for touch events
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
  const scrollPercent = carouselContainer.scrollLeft / (carouselContainer.scrollWidth - carouselContainer.clientWidth);
  const scrollbarThumbLeft = scrollPercent * (slider.offsetWidth - scrollbarThumb.offsetWidth);
  
  // calculate the width of the scrollbar based on the width of (the container = the number of cards)
  const containerWidth = carouselContainer.clientWidth;
  const scrollWidth = carouselContainer.scrollWidth;
  const thumbWidth = (containerWidth / scrollWidth) * containerWidth;
  
  scrollbarThumb.style.width = `${thumbWidth}px`;
  scrollbarThumb.style.left = scrollbarThumbLeft + 'px';
  scrollbarThumb.style.transform = `translateX(${scrollbarThumbLeft}px)`;
}

updateThumbPosition();

