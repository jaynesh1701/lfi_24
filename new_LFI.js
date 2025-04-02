console.log("file connected");

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", function () {
    // Activate item on scroll
    $(".x-framewrok-section").each(function () {
        const $section = $(this);
        const $triggers = $section.find(".x-content-right");
        const $targets = $section.find(".x-feature-title-wrapper");
        const $paraWrappers = $section.find(".x-feature-para-wrapper");

        function makeItemActive(index) {
            $targets.removeClass("is-active");
            $paraWrappers.removeClass("is-open");
            $targets.eq(index).addClass("is-active");
            $paraWrappers.eq(index).addClass("is-open");
        }
        makeItemActive(0);

        $triggers.each((index, el) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top center",
                end: "bottom center",
                onToggle: ({ isActive }) => isActive && makeItemActive(index)
            });
        });

        $targets.on("click", function () {
            const index = $targets.index(this);
            gsap.to(window, { duration: 0.5, scrollTo: { y: $triggers.eq(index) }, ease: "power2.out" });
        });
    });

    // Snap scrolling for hero section
    ScrollTrigger.batch(".hero-section", {
        start: "top 50%",
        end: "bottom 50%",
        snap: { snapTo: 0.5, duration: 0.5, ease: "power2.inOut" }
    });

    //Auto tab switching
    let tabTimeout;

    function tabLoop() {
        clearTimeout(tabTimeout); // Clear previous timeout before starting a new one
        tabTimeout = setTimeout(() => {
            const $current = $('.tabs-menu .w--current:first');
            const $next = $current.next().length ? $current.next() : $('.tabs-link:first');
            if (!$(".menu-button").hasClass("w--open")) {
                $next.removeAttr("href").trigger("click");
            }
            tabLoop(); // Restart the loop
        }, 5000);
    }

    // Reset timer on manual click
    $('.tabs-link').on("click", function () {
        clearTimeout(tabTimeout); // Clear the existing timer
        tabLoop(); // Restart the loop
    });

    tabLoop(); // Start the loop initially





    // Tab active state observer
    $(".x-framewrok-section-02").each(function () {
        const $section = $(this);
        function updateActiveTab() {
            $section.find(".x-feature-title-wrapper").removeClass("is-active");
            $section.find(".tabs-link.w--current .x-feature-title-wrapper").addClass("is-active");
        }
        $section.find(".tabs-link").each(function () {
            new MutationObserver(() => updateActiveTab()).observe(this, { attributes: true, attributeFilter: ["class"] });
        });
        updateActiveTab();
    });

    // GSAP background video animation
    gsap.timeline({ delay: 0.5 })
        .to(".bg-video", { y: "0%", duration: 1.5, ease: "power2.out" })
        .fromTo(".bg-video",
             { opacity: 0 }, 
             { opacity: 1, duration: 0.5, ease: "power2.out" }, "<0.8")
        .fromTo(".bg-video",
            { clipPath: "inset(35% 35% 35% 35% round 18px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 2.5, ease: "power2.out" });
});
