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

//Slider script

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const sliderItems = Array.from(slider.children);
    const indicator = document.querySelector('.slider-indicator');
    let currentIndex = 0;

    // Create dots for each div element in the slider
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

        //threshold for when to change slides
        const threshold = 0.5 * sliderItems[0].offsetWidth;
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
