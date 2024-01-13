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


//news portal script
let autoScroll = true;
let userActive = true;
let autoScrollTimeout;


const newsData = [
    { date: "2024-05-23", title: "Rsmt bca student 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscin...", url: "https://example.com/news1" },
    { date: "2024-05-15", title: "News update 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news2" },
    { date: "2024-05-20", title: "News Title 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news3" },
    { date: "2024-05-25", title: "News Title 4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news4" },
    { date: "2024-05-23", title: "News Title 6", content: "Lorem ipsum dolor sit amet, consectetur adipiscin...", url: "https://example.com/news5" },
    { date: "2024-05-15", title: "News update 7", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news6" },
    { date: "2024-05-20", title: "News Title 8", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news7" },
    { date: "2024-05-25", title: "News Title 9", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", url: "https://example.com/news8" }
];


function createNewsItem({ date, title, content, url }) {
    const listItem = document.createElement("li");
    listItem.className = "news-item flex-row";

    const dateElement = document.createElement("time");
    dateElement.datetime = date;
    dateElement.textContent = date;
    listItem.appendChild(dateElement);

    const h3 = document.createElement("h3");
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.textContent = title;
    h3.appendChild(anchor);
    listItem.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = content;
    listItem.appendChild(p);

    return listItem;
}

function initializeNews() {
    const newsList = document.getElementById("newsList");
    const totalNewsItems = 200;

    for (let i = 0; i < totalNewsItems; i++) {
        newsData.forEach(news => {
            const listItem = createNewsItem(news);
            newsList.appendChild(listItem.cloneNode(true));
        });
    }
}

initializeNews();

function scrollNews(direction) {
    const newsList = document.getElementById("newsList");
    const newsItems = document.querySelectorAll(".news-item");
    const itemHeight = newsItems[0].offsetHeight;

    gsap.to(newsList, {
        y: `-=${direction * itemHeight}`,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            if (direction === 1) {
                newsList.appendChild(newsItems[0].cloneNode(true));
                newsList.removeChild(newsItems[0]);
            } else {
                newsList.insertBefore(newsItems[newsItems.length - 1].cloneNode(true), newsList.firstElementChild);
                newsList.removeChild(newsItems[newsItems.length - 1]);
            }

            if (direction === 1 && newsList.scrollTop === 0) {
                newsList.scrollTop = newsList.scrollHeight;
            } else if (direction === -1 && newsList.scrollTop === newsList.scrollHeight - newsList.clientHeight) {
                newsList.scrollTop = 0;
            }
        }
    });

    resetAutoScrollTimeout();
}

function toggleAutoScroll() {
    autoScroll = !autoScroll;
    resetAutoScrollTimeout();
}

function autoScrollNews() {
    if (!autoScroll) {
        return;
    }

    scrollNews(1);
    setTimeout(() => {
        autoScrollNews();
    }, 6000);
}

function resetAutoScrollTimeout() {
    if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
    }

    if (autoScroll && userActive) {
        autoScrollTimeout = setTimeout(() => {
            autoScrollNews();
        }, 6000);
    }
}

autoScrollNews();