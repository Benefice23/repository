// Auto-scroll through portfolio sections with manual scroll detection
document.addEventListener('DOMContentLoaded', function () {
  const sections = ['hero', 'about', 'skills', 'projects', 'calculator', 'cv', 'contact'];
  let currentIndex = 0;
  let autoScrollInterval = null;
  let isAutoScrolling = true;
  let lastScrollTime = Date.now();

  function scrollToNextSection() {
    const sectionId = sections[currentIndex];
    const section = document.getElementById(sectionId);
    
    if (section && isAutoScrolling) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      currentIndex = (currentIndex + 1) % sections.length;
    }
  }

  // Start auto-scroll every 2 seconds
  autoScrollInterval = setInterval(scrollToNextSection, 2000);

  // Detect manual scrolling and stop auto-scroll
  window.addEventListener('wheel', function () {
    if (isAutoScrolling) {
      isAutoScrolling = false;
      clearInterval(autoScrollInterval);
      console.log('Auto-scroll stopped - manual scroll detected');
    }
  }, { passive: true });

  // Also detect touch scrolling on mobile
  window.addEventListener('touchmove', function () {
    if (isAutoScrolling) {
      isAutoScrolling = false;
      clearInterval(autoScrollInterval);
      console.log('Auto-scroll stopped - manual scroll detected');
    }
  }, { passive: true });

  // Detect keyboard scrolling (arrow keys, page down, etc.)
  window.addEventListener('keydown', function (event) {
    const scrollKeys = ['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'End', 'Home', ' '];
    if (scrollKeys.includes(event.key) && isAutoScrolling) {
      isAutoScrolling = false;
      clearInterval(autoScrollInterval);
      console.log('Auto-scroll stopped - keyboard scroll detected');
    }
  });
});
