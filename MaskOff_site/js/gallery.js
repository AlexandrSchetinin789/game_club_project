
document.addEventListener('DOMContentLoaded', function () {
  const galleryContainer = document.getElementById('galleryContainer');
  const dots = document.querySelectorAll('.pagination-dot');
  let currentIndex = 0;
  const slideCount = document.querySelectorAll('.gallery-slide').length;
  let galleryInterval;

  function updateGallery() {
    galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function startGalleryTimer() {
    clearInterval(galleryInterval);
    galleryInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateGallery();
    }, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateGallery();
      startGalleryTimer();
    });
  });

  startGalleryTimer();
});
