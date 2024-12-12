document.addEventListener('DOMContentLoaded', () => {
  console.log('Página cargada');
});
const images = [
  'assets/gal1.png',
  'assets/gal2.png',
  'assets/gal3.png',
  'assets/gal4.png'
];

let currentIndex = 0;

const galleryImage = document.getElementById('gallery-image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function showImage(index) {
  currentIndex = (index + images.length) % images.length; // Asegura el bucle infinito
  galleryImage.src = images[currentIndex];
}

prevButton.addEventListener('click', () => showImage(currentIndex - 1));
nextButton.addEventListener('click', () => showImage(currentIndex + 1));
