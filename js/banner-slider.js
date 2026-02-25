(function () {
    var slider = document.getElementById('bannerSlider');
    if (!slider) return;

    var slides = Array.from(slider.querySelectorAll('.banner-slide'));
    var slideCount = slides.length;

    // Clone slides for infinite effect
    slides.forEach(function (slide) {
        slider.appendChild(slide.cloneNode(true));
    });
    slides.forEach(function (slide) {
        slider.insertBefore(slide.cloneNode(true), slider.firstChild);
    });

    function getSlideW() {
        return slider.querySelector('.banner-slide').offsetWidth;
    }

    // Position at real first slide
    slider.scrollLeft = getSlideW() * slideCount;

    var scrolling = false;
    function checkBounds() {
        var sw = getSlideW();
        var max = sw * slideCount;
        if (slider.scrollLeft >= max * 2) {
            slider.style.scrollBehavior = 'auto';
            slider.scrollLeft -= max;
            slider.style.scrollBehavior = 'smooth';
        }
        if (slider.scrollLeft <= 0) {
            slider.style.scrollBehavior = 'auto';
            slider.scrollLeft += max;
            slider.style.scrollBehavior = 'smooth';
        }
    }

    slider.addEventListener('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            requestAnimationFrame(function () {
                checkBounds();
                scrolling = false;
            });
        }
    });

    var nextBtn = document.querySelector('.banner-slider-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            slider.scrollBy({ left: getSlideW(), behavior: 'smooth' });
        });
    }

    // Drag to scroll
    var isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', function (e) {
        isDown = true;
        slider.style.scrollBehavior = 'auto';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', function () { isDown = false; });
    slider.addEventListener('mouseup', function () {
        isDown = false;
        slider.style.scrollBehavior = 'smooth';
    });
    slider.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        slider.scrollLeft = scrollLeft - (x - startX);
    });

    // Auto-play every 8 seconds
    setInterval(function () {
        slider.scrollBy({ left: getSlideW(), behavior: 'smooth' });
    }, 8000);

    window.addEventListener('resize', function () {
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = getSlideW() * slideCount;
        slider.style.scrollBehavior = 'smooth';
    });
})();
