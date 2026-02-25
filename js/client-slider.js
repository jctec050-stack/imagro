(function () {
    var slider = document.getElementById('clientSlider');
    if (!slider) return;
    var prevBtn = document.querySelector('.client-slider-prev');
    var nextBtn = document.querySelector('.client-slider-next');
    var slides = Array.from(slider.querySelectorAll('.client-slide'));
    var slideCount = slides.length;

    // Clone slides for infinite effect
    slides.forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        slider.appendChild(clone);
    });
    slides.forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        slider.insertBefore(clone, slider.firstChild);
    });

    function getSlideWidth() {
        var s = slider.querySelector('.client-slide');
        return s.offsetWidth + 30; // 30 = gap
    }

    slider.scrollLeft = getSlideWidth() * slideCount;

    var scrolling = false;
    function checkBounds() {
        var sw = getSlideWidth();
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

    prevBtn.addEventListener('click', function () {
        slider.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
        slider.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    });

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

    // Auto-play every 3 seconds
    setInterval(function () {
        slider.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    }, 3000);

    window.addEventListener('resize', function () {
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = getSlideWidth() * slideCount;
        slider.style.scrollBehavior = 'smooth';
    });
})();
