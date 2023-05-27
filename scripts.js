//change the appearance of menu button
function toggleMenu() {
    const menuContainer = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');
    menuContainer.classList.toggle('open');
    hamburger.classList.toggle('open');
}


//function & event listener to close menu if user taps outside
function closeMenuOnClickOutside(event) {
    const menuContainer = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');

    if (!menuContainer.classList.contains('open')) {
        return;
    }

    const isClickInsideMenu = menuContainer.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
        menuContainer.classList.remove('open');
        hamburger.classList.remove('open');
    }
}

document.addEventListener('click', closeMenuOnClickOutside);



//Function to load the menu on each page
function loadMenu() {
    var navbar = document.getElementById("navbar");
    navbar.innerHTML = `
        <div class="menu-container">
            <ul class="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Skills</a></li>
                <li><a href="#">Hobbies</a></li>
                <li><a href="#">Contact Me</a></li>
            </ul>
        </div>
        <div class="hamburger" onclick="toggleMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    `;
}

//---------------------------Image Slider ---------------------------
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.image-slider');
    const sliderItems = Array.from(slider.children);
    let currentIndex = 0;

    // Fullscreen view
    const fullscreenView = document.getElementById('image-fullscreen-view');
    const fullscreenImage = document.getElementById('image-fullscreen-image');
    const fullscreenCaption = document.getElementById('image-fullscreen-caption');
    const imageCount = document.getElementById('image-image-count');
    const closeBtn = document.getElementById('image-close-btn');
    const prevBtn = document.getElementById('image-prev-btn');
    const nextBtn = document.getElementById('image-next-btn');

    sliderItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            openFullscreenView(i);
        });
    });

    closeBtn.addEventListener('click', closeFullscreenView);
    prevBtn.addEventListener('click', () => navigateFullscreenView(-1));
    nextBtn.addEventListener('click', () => navigateFullscreenView(1));

    function openFullscreenView(index) {
        fullscreenImage.src = sliderItems[index].querySelector('img').src;
        fullscreenCaption.textContent = sliderItems[index].querySelector('.image-slider-caption').textContent;
        imageCount.textContent = `${index + 1}/${sliderItems.length}`;
        fullscreenView.classList.remove('hidden');
        currentIndex = index;
    }

    function closeFullscreenView() {
        fullscreenView.classList.add('hidden');
    }

    function navigateFullscreenView(direction) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = sliderItems.length - 1;
        if (newIndex >= sliderItems.length) newIndex = 0;
        openFullscreenView(newIndex);
    }

    // Scroll event
    slider.addEventListener('scroll', function () {
        const scrollLeft = slider.scrollLeft;
        const newIndex = sliderItems.findIndex(
            (sliderItem, i) => scrollLeft < sliderItem.offsetWidth * (i + 0.5)
        );
        if (newIndex !== currentIndex) {
            sliderItems[currentIndex].classList.remove('active');
            sliderItems[newIndex].classList.add('active');
            currentIndex = newIndex;
        }
        updateCountDisplay();
    });

    // Controls
    const prevButton = document.querySelector('.image-slider-prev');
    const nextButton = document.querySelector('.image-slider-next');
    const fullscreenButton = document.querySelector('.image-slider-fullscreen');
    const countDisplay = document.querySelector('.image-slider-count');

    prevButton.addEventListener('click', () => navigateSlider(-1));
    nextButton.addEventListener('click', () => navigateSlider(1));
    fullscreenButton.addEventListener('click', () => openFullscreenView(currentIndex));

    function navigateSlider(direction) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = sliderItems.length - 1;
        if (newIndex >= sliderItems.length) newIndex = 0;
        goToSlide(newIndex);
    }

    function updateCountDisplay() {
        countDisplay.textContent = `${currentIndex + 1}/${sliderItems.length}`;
    }

    function goToSlide(index) {
        sliderItems[index].scrollIntoView({ behavior: 'smooth' });
    }

    // Set initial slide to active and update count display
    sliderItems[currentIndex].classList.add('active');
    updateCountDisplay();
});



//---------------------- SKILLS- SLIDER----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const sliderItems = Array.from(slider.children);
    const indicator = document.querySelector('.slider-indicator');
    let currentIndex = 0;

    // Create dots
    sliderItems.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.addEventListener('click', () => goToSlide(i));
        indicator.appendChild(dot);
    });
    const dots = Array.from(indicator.children);

    // Scroll event
    slider.addEventListener('scroll', function () {
        const scrollLeft = slider.scrollLeft;
        const newIndex = sliderItems.findIndex(
            (sliderItem, i) => scrollLeft < sliderItem.offsetWidth * (i + 0.5)
        );

        // Add a threshold for when to change slides
        const threshold = 0.7 * sliderItems[0].offsetWidth;
        if (newIndex !== currentIndex && Math.abs(scrollLeft - sliderItems[currentIndex].offsetLeft) > threshold) {
            sliderItems[currentIndex].classList.remove('active');
            sliderItems[newIndex].classList.add('active');
            currentIndex = newIndex;
        }
        highlightDot();
    });

    function goToSlide(index) {
        sliderItems[index].scrollIntoView({ behavior: 'smooth' });
    }

    function highlightDot() {
        dots.forEach((dot, i) =>
            dot.style.backgroundColor = i === currentIndex ? '#00aeff' : '#ccc'
        );
    }

    // Set initial slide to active
    sliderItems[currentIndex].classList.add('active');
    highlightDot();
});



