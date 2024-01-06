feather.replace();
document.addEventListener('DOMContentLoaded', function () {
    const loadingTimeline = gsap.timeline({ repeat: -1, paused: true });

    loadingTimeline.to('#loading-animation', { duration: 1, opacity: 1, ease: 'power2.inOut' });

    function showLoadingAnimation() {
        loadingTimeline.play();
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    setTimeout(function () {
        hideLoadingAnimation();
    }, 2000); 

    function hideLoadingAnimation() {
        loadingTimeline.pause();
        document.getElementById('loading-overlay').style.display = 'none';
    }

    showLoadingAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleElement = document.getElementById('toggle');
    const menuButton = document.querySelector('.menu-btn');
    const closeButton = document.querySelector('.close-btn');
    const navigationMenu = document.querySelector('.navigation-menu');

    toggleElement.addEventListener('click', function () {
        toggleNavigationMenu();
    });

    menuButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleNavigationMenu();
    });

    closeButton.addEventListener('click', function () {
        toggleElement.classList.remove('open');
        if (isNavigationMenuOpen()) {
            closeNavigationMenu();
        } else {
            openNavigationMenu();
        }
    });

    function toggleNavigationMenu() {
        toggleElement.classList.toggle('open');
        if (isNavigationMenuOpen()) {
            closeNavigationMenu();
        } else {
            openNavigationMenu();
        }
    }

    function openNavigationMenu() {
        gsap.to(navigationMenu, { y: 0,opacity: 1, duration: 0.5, ease: 'power2.out' });
        navigationMenu.style.pointerEvents = 'auto';
        closeButton.focus();
    }

    function closeNavigationMenu() {
        gsap.to(navigationMenu, { y: '-100%', opacity: 1,  duration: 0.5, ease: 'power2.in' });
        navigationMenu.style.pointerEvents = 'none';
        toggleElement.focus();
        gsap.to('.bar-mid', { marginLeft: '10px', duration: 0.3 });
    }

    function isNavigationMenuOpen() {
        return navigationMenu.style.pointerEvents === 'auto';
    }
});



const tabs = document.querySelectorAll('.content-btn input');
const tabContents = document.querySelectorAll('.main-menu-content > div');
const tabTitles = document.querySelectorAll('.tab-title');

tabs.forEach((tab, index) => {
  tab.addEventListener('change', () => {
    tabContents.forEach(content => {
      content.style.display = 'none';
      gsap.to(content, { autoAlpha: 0, duration: 0.3 }); 
    });
    tabContents[index].style.display = 'block';
    gsap.to(tabContents[index], { autoAlpha: 1, duration: 0.3 }); 

    tabTitles.forEach((otherTab) => {
      otherTab.classList.remove('current');
      otherTab.style.color = '#8996a0';
    });

    tabTitles[index].classList.add('current');
    tabTitles[index].style.color = '';
  });
});

tabTitles.forEach((tabTitle) => {
  tabTitle.addEventListener('click', () => {
    tabTitles.forEach((otherTab) => {
      if (otherTab !== tabTitle) {
        otherTab.classList.remove('current');
        otherTab.style.color = '#8996a0';
      }
    });

    tabTitle.classList.toggle('current');
    tabTitle.style.color = '';
  });
});

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const imageContainers = document.querySelectorAll('.hero-image');
    const totalImages = imageContainers.length;
    let currentIndex = 0;
    let autoSliderTimeout;

    function showImage(index) {
        gsap.set(imageContainers, { display: 'none', opacity: 0, duration: 0.2, ease: 'power2.inOut' });
        gsap.set(imageContainers[index], { display: 'block', opacity: 1, duration: 0.2, ease: 'power2.inOut' });
    }

    function hideAllImages() {
        gsap.set(imageContainers, { display: 'none'});
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        gsap.set(imageContainers[currentIndex], { display: 'block' });
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        gsap.set(imageContainers[currentIndex], { display: 'block' });
        showImage(currentIndex);
    }

    const autoSliderTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    imageContainers.forEach((imageContainer, index) => {
        autoSliderTimeline.to(imageContainer, { opacity: 1, duration: 1, delay: index * 2 });
        autoSliderTimeline.to(imageContainer, { opacity: 0, duration: 1, onComplete: showNextImage });
    });

    function resumeAutoSlider() {
        autoSliderTimeline.play();
    }

    document.getElementById('prevBtn').addEventListener('click', function () {
        autoSliderTimeline.pause(); 
        showPrevImage();
        clearTimeout(autoSliderTimeout); 
        autoSliderTimeout = setTimeout(resumeAutoSlider, 2000);
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        autoSliderTimeline.pause();
        showNextImage();
        clearTimeout(autoSliderTimeout);
        autoSliderTimeout = setTimeout(resumeAutoSlider, 2000); 
    });
});



const parallaxContainer = document.querySelector('.parallax-container');

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    parallaxContainer.style.backgroundPositionY = `${-scrollPosition / 15}px`;
});



        