(function () {
    var slider = document.getElementById('productSlider');
    if (!slider) return;
    var prevBtn = document.querySelector('.product-slider-prev');
    var nextBtn = document.querySelector('.product-slider-next');
    var slides = Array.from(slider.querySelectorAll('.product-slide'));
    var slideCount = slides.length;

    // Clone all slides and append/prepend for infinite effect
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
        var s = slider.querySelector('.product-slide');
        return s.offsetWidth + 20; // 20 = gap
    }

    // Start scrolled to the "real" first slide (after the prepended clones)
    var sw = getSlideWidth();
    slider.scrollLeft = sw * slideCount;

    var scrolling = false;

    function checkBounds() {
        var currentSW = getSlideWidth();
        var maxScroll = currentSW * slideCount;
        // If scrolled past the end clones, jump back to real slides
        if (slider.scrollLeft >= maxScroll * 2) {
            slider.style.scrollBehavior = 'auto';
            slider.scrollLeft -= maxScroll;
            slider.style.scrollBehavior = 'smooth';
        }
        // If scrolled before the start clones, jump forward to real slides
        if (slider.scrollLeft <= 0) {
            slider.style.scrollBehavior = 'auto';
            slider.scrollLeft += maxScroll;
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

    // Recalculate on resize
    window.addEventListener('resize', function () {
        var currentSW = getSlideWidth();
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = currentSW * slideCount;
        slider.style.scrollBehavior = 'smooth';
    });
})();
