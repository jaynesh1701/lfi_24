console.log("git live file connected -1");

//Initialize Lenis for smooth scrolling
// const lenis = new Lenis();
// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add(time => lenis.raf(time * 1000));
// gsap.ticker.lagSmoothing(0);


if (Webflow.env("editor") === undefined) {
    window.lenis = new Lenis({ // Declare lenis as a global variable
      lerp: 0.1,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });
  
    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }


//-----------

// --- Lenis Setup (Keep as before) ---
// ... (Lenis init code) ...

// --- Horizontal Scroll Setup ---
const serviceSection = document.querySelector('.service-section');
const serviceContainer = document.querySelector('.service-container'); // Get the container
const cardsWrapper = document.querySelector('.service-cards-wrapper');

// Ensure elements exist before proceeding
if (serviceSection && serviceContainer && cardsWrapper) { // Add serviceContainer check

    const getScrollAmount = () => {

        // get the width of the cardsWrapper and serviceContainer elements
        const cardsWrapperWidth = cardsWrapper.clientWidth;
        const serviceContainerWidth = serviceContainer.clientWidth;
        // get left and right padding of containerwitdh
        const containerPaddingLeft = parseFloat(window.getComputedStyle(serviceContainer).paddingLeft) || 0;
        const containerPaddingRight = parseFloat(window.getComputedStyle(serviceContainer).paddingRight) || 0;

        // calculate the difference between the two widths
        const scrollAmount = cardsWrapperWidth - serviceContainerWidth + containerPaddingLeft + containerPaddingRight + 100;

        return -scrollAmount;
    };



    // Create the GSAP timeline and ScrollTrigger instance
    gsap.to(cardsWrapper, {
        x: getScrollAmount, // Use the updated function
        ease: "none",
        scrollTrigger: {
            trigger: serviceSection, // Pin the whole section
            start: "center center",
            // End calculation uses the final value from getScrollAmount
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Still important
            anticipatePin: 1,
            markers: true, // Uncomment for debugging
        }
    });







    //888888888888



    //8888888888888

    console.log("Horizontal scroll setup complete (using container width + padding adj + 88px offset).");

} else {
    console.error("Error: Could not find .service-section, .service-container, or .service-cards-wrapper elements.");
}

//-----------------

document.addEventListener("DOMContentLoaded", function () {

    // Delay slightly to ensure the slider has initialized
    setTimeout(function () {
        $('.w-slider').unbind('mouseenter mouseleave');
    }, 100);


    // GSAP background video animation
    gsap.timeline({ delay: 0.5 })
        .to(".lfi_hero-bg-video", { y: "0%", duration: 1.5, ease: "power2.out" })
        .fromTo(".lfi_hero-bg-video",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }, "<0.8")
        .fromTo(".lfi_hero-bg-video",
            { clipPath: "inset(35% 35% 35% 35% round 18px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 2, ease: "power2.out" });


    // service card hover animation
    // gsap.utils.toArray(".service-card-item").forEach(item => {
    //     let paraWrap = item.querySelector(".service-card-para-wrap");
    //     let bgGradient = item.querySelector(".service-card-bg-gradient");
    //     let paraText = item.querySelector(".service-card-para");
    //     let paraBgimage = item.querySelector(".service-card-item-image");
    //     let cardTitle = item.querySelector(".service-card-title");

    //     let ease = "power3.inOut";

    //     if (!paraWrap || !bgGradient) return;

    //     gsap.set(paraWrap, { gridTemplateRows: "0fr" });
    //     gsap.set(cardTitle, { marginBottom: "-20px" });
    //     gsap.set(paraText, { opacity: 0 });
    //     gsap.set(bgGradient, {
    //         backgroundImage: "linear-gradient(0deg, #0B1B21 0%, rgba(28, 80, 99, 0.00) 45.12%)"
    //     });
    //     gsap.set(paraBgimage, { filter: "blur(0px)", scale: 1 });

    //     let tl = gsap.timeline({ paused: true })
    //         .to(paraWrap, {
    //             duration: 1,
    //             gridTemplateRows: "1fr",
    //             ease: ease
    //         }, 0)
    //         .to(paraText, {
    //             duration: 0.8,
    //             opacity: 1,
    //             ease: ease// add delay
    //         }, 0.2)
    //         .to(cardTitle, {
    //             duration: 0.4,
    //             marginBottom: "0px",
    //             ease: ease// add delay
    //         }, 0.2)
    //         .to(paraBgimage, {
    //             duration: 1,
    //             filter: "blur(10px)",
    //             scale: 1.05,
    //             ease: ease
    //         }, 0)
    //         .to(bgGradient, {
    //             duration: 0.8,
    //             backgroundImage: "linear-gradient(0deg, #0B1B21 8%, rgba(28, 80, 99, 0.00) 98.12%)",
    //             ease: ease
    //         }, 0);

    //     item.addEventListener("mouseenter", () => tl.play());
    //     item.addEventListener("mouseleave", () => tl.timeScale(1.5).reverse());
    // });

    // // Duplicate animation for "-2" class variants
    // gsap.utils.toArray(".service-card-item-2").forEach(item => {
    //     let paraWrap = item.querySelector(".service-card-para-wrap-2");
    //     let bgGradient = item.querySelector(".service-card-bg-gradient-2");
    //     let paraText = item.querySelector(".service-card-para-2");
    //     let paraBgimage = item.querySelector(".service-card-item-image-2");
    //     let cardTitle = item.querySelector(".service-card-title-2");

    //     let ease = "power3.inOut";

    //     if (!paraWrap || !bgGradient) return;

    //     gsap.set(paraWrap, { gridTemplateRows: "0fr" });
    //     gsap.set(cardTitle, { marginBottom: "-20px" });
    //     gsap.set(paraText, { opacity: 0 });
    //     gsap.set(bgGradient, {
    //         backgroundImage: "linear-gradient(0deg, #0B1B21 0%, rgba(28, 80, 99, 0.00) 45.12%)"
    //     });
    //     gsap.set(paraBgimage, { filter: "blur(0px)", scale: 1 });

    //     let tl = gsap.timeline({ paused: true })
    //         .to(paraWrap, {
    //             duration: 1,
    //             gridTemplateRows: "1fr",
    //             ease: ease
    //         }, 0)
    //         .to(paraText, {
    //             duration: 0.8,
    //             opacity: 1,
    //             ease: ease
    //         }, 0.2)
    //         .to(cardTitle, {
    //             duration: 0.4,
    //             marginBottom: "0px",
    //             ease: ease
    //         }, 0.2)
    //         .to(paraBgimage, {
    //             duration: 1,
    //             filter: "blur(10px)",
    //             scale: 1.05,
    //             ease: ease
    //         }, 0)
    //         .to(bgGradient, {
    //             duration: 0.8,
    //             backgroundImage: "linear-gradient(0deg, #0B1B21 8%, rgba(28, 80, 99, 0.00) 98.12%)",
    //             ease: ease
    //         }, 0);

    //     item.addEventListener("mouseenter", () => tl.play());
    //     item.addEventListener("mouseleave", () => tl.timeScale(1.5).reverse());
    // });

    function initServiceCardAnimation() {
      if (window.matchMedia("(min-width: 1024px)").matches) { // Adjust breakpoint as needed
          gsap.utils.toArray(".service-card-item").forEach(item => {
              let paraWrap = item.querySelector(".service-card-para-wrap");
              let bgGradient = item.querySelector(".service-card-bg-gradient");
              let paraText = item.querySelector(".service-card-para");
              let paraBgimage = item.querySelector(".service-card-item-image");
              let cardTitle = item.querySelector(".service-card-title");
  
              let ease = "power3.inOut";
  
              if (!paraWrap || !bgGradient) return;
  
              gsap.set(paraWrap, { gridTemplateRows: "0fr" });
              gsap.set(cardTitle, { marginBottom: "-20px" });
              gsap.set(paraText, { opacity: 0 });
              gsap.set(bgGradient, {
                  backgroundImage: "linear-gradient(0deg, #0B1B21 0%, rgba(28, 80, 99, 0.00) 45.12%)"
              });
              gsap.set(paraBgimage, { filter: "blur(0px)", scale: 1 });
  
              let tl = gsap.timeline({ paused: true })
                  .to(paraWrap, {
                      duration: 1,
                      gridTemplateRows: "1fr",
                      ease: ease
                  }, 0)
                  .to(paraText, {
                      duration: 0.8,
                      opacity: 1,
                      ease: ease
                  }, 0.2)
                  .to(cardTitle, {
                      duration: 0.4,
                      marginBottom: "0px",
                      ease: ease
                  }, 0.2)
                  .to(paraBgimage, {
                      duration: 1,
                      filter: "blur(10px)",
                      scale: 1.05,
                      ease: ease
                  }, 0)
                  .to(bgGradient, {
                      duration: 0.8,
                      backgroundImage: "linear-gradient(0deg, #0B1B21 8%, rgba(28, 80, 99, 0.00) 98.12%)",
                      ease: ease
                  }, 0);
  
              item.addEventListener("mouseenter", () => tl.play());
              item.addEventListener("mouseleave", () => tl.timeScale(1.5).reverse());
          });
  
          // Duplicate animation for "-2" class variants
          gsap.utils.toArray(".service-card-item-2").forEach(item => {
              let paraWrap = item.querySelector(".service-card-para-wrap-2");
              let bgGradient = item.querySelector(".service-card-bg-gradient-2");
              let paraText = item.querySelector(".service-card-para-2");
              let paraBgimage = item.querySelector(".service-card-item-image-2");
              let cardTitle = item.querySelector(".service-card-title-2");
  
              let ease = "power3.inOut";
  
              if (!paraWrap || !bgGradient) return;
  
              gsap.set(paraWrap, { gridTemplateRows: "0fr" });
              gsap.set(cardTitle, { marginBottom: "-20px" });
              gsap.set(paraText, { opacity: 0 });
              gsap.set(bgGradient, {
                  backgroundImage: "linear-gradient(0deg, #0B1B21 0%, rgba(28, 80, 99, 0.00) 45.12%)"
              });
              gsap.set(paraBgimage, { filter: "blur(0px)", scale: 1 });
  
              let tl = gsap.timeline({ paused: true })
                  .to(paraWrap, {
                      duration: 1,
                      gridTemplateRows: "1fr",
                      ease: ease
                  }, 0)
                  .to(paraText, {
                      duration: 0.8,
                      opacity: 1,
                      ease: ease
                  }, 0.2)
                  .to(cardTitle, {
                      duration: 0.4,
                      marginBottom: "0px",
                      ease: ease
                  }, 0.2)
                  .to(paraBgimage, {
                      duration: 1,
                      filter: "blur(10px)",
                      scale: 1.05,
                      ease: ease
                  }, 0)
                  .to(bgGradient, {
                      duration: 0.8,
                      backgroundImage: "linear-gradient(0deg, #0B1B21 8%, rgba(28, 80, 99, 0.00) 98.12%)",
                      ease: ease
                  }, 0);
  
              item.addEventListener("mouseenter", () => tl.play());
              item.addEventListener("mouseleave", () => tl.timeScale(1.5).reverse());
          });
      }
  }
  
  // Run on page load
  initServiceCardAnimation();
  
  // Run on window resize
  window.addEventListener("resize", () => {
      gsap.killTweensOf(".service-card-item, .service-card-item-2"); // Remove existing animations on resize
      initServiceCardAnimation();
  });
  


    // floter scroll into view animation

    gsap.utils.toArray(".floating_info").forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            scale: 0.9,
            y: "50%",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%", // Adjust as needed
                //toggleActions: "play none none reverse",
            }
        });
    });

    gsap.utils.toArray(".service-card-item").forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            scale: 0.9,
            y: "50%",
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
                trigger: el,
                start: "top 84%",
                //toggleActions: "play none none reverse",
                //markers: true,    
            }
        });
    });

    //-----------
    // let tabTimeout;

    //   function tabLoop() {
    //       clearTimeout(tabTimeout); // Clear previous timeout before starting a new one
    //       tabTimeout = setTimeout(() => {
    //           const $current = $('.f-tab-menu .w--current:first');
    //           const $next = $current.next().length ? $current.next() : $('.f-tab-link:first');
    //           if (!$(".menu-button").hasClass("w--open")) {
    //               $next.removeAttr("href").trigger("click");
    //           }
    //           tabLoop(); // Restart the loop
    //       }, 5000);
    //   }

    //   // Reset timer on manual click
    //   $('.f-tab-link').on("click", function () {
    //       clearTimeout(tabTimeout); // Clear the existing timer
    //       tabLoop(); // Restart the loop
    //   });

    //   tabLoop();

    //   $(".framework-section").each(function () {
    //     const $section = $(this);
    //     function updateActiveTab() {
    //         $section.find(".f-tab-title-wrapper").removeClass("is--active");
    //         $section.find(".f-tab-link.w--current .f-tab-title-wrapper").addClass("is--active");
    //     }
    //     $section.find(".f-tab-link").each(function () {
    //         new MutationObserver(() => updateActiveTab()).observe(this, { attributes: true, attributeFilter: ["class"] });
    //     });
    //     updateActiveTab();
    // });



    //-----------------------

    let tabTimeout;

    function tabLoop() {
        clearTimeout(tabTimeout); // Clear previous timeout before starting a new one
        tabTimeout = setTimeout(() => {
            const $current = $('.f-tab-menu .w--current:first');
            const $next = $current.next().length ? $current.next() : $('.f-tab-link:first');
            if (!$(".menu-button").hasClass("w--open")) {
                $next.removeAttr("href").trigger("click");
            }
            tabLoop(); // Restart the loop
        }, 5000);
    }

    // Reset timer on manual click, but disable click on active tab
    $('.f-tab-link').on("click", function (event) {
        if ($(this).hasClass("w--current")) {
            event.preventDefault(); // Prevent clicking on active tab
            return;
        }
        clearTimeout(tabTimeout); // Clear the existing timer
        tabLoop(); // Restart the loop
    });

    // Function to animate the tab-timer of the first tab
    function animateFirstTabTimerBar() {
        gsap.timeline()
            .fromTo(".f-tab-link:first-child .tab-timer",
                { height: "0%" },
                { height: "100%", duration: 5, ease: "linear" }
            )
            .to(".f-tab-link:first-child .tab-timer", { height: "0%", duration: 0, ease: "linear" });
    }

    // Function to start tab loop and animate tab-timer when section is in view
    function startTabLoopOnScroll() {
        gsap.to(".framework-section", {
            scrollTrigger: {
                trigger: ".framework-section",
                start: "top 80%", // Adjust trigger position as needed
                once: true, // Ensures it only runs once when entering
                onEnter: () => {
                    tabLoop();
                    animateFirstTabTimerBar();
                }
            }
        });
    }

    startTabLoopOnScroll();

    $(".framework-section").each(function () {
        const $section = $(this);
        function updateActiveTab() {
            $section.find(".f-tab-title-wrapper").removeClass("is--active");
            $section.find(".f-tab-link.w--current .f-tab-title-wrapper").addClass("is--active");
        }
        $section.find(".f-tab-link").each(function () {
            new MutationObserver(() => updateActiveTab()).observe(this, { attributes: true, attributeFilter: ["class"] });
        });
        updateActiveTab();
    });



    //------------------------




});


//------------
  
console.log("code_02_connected");
  
let open_menu = false;
let open_form = false;

function toggle_lenis() {
  if (!open_menu && !open_form) {
    window.lenis.start();
    console.log("lenis_start");
  } else {
    window.lenis.stop();
    console.log("lenis_stop");
  }
}

$(".navigation").each(function () {
  const nav_form_cta_btn_El = $(this).find(".nav_cta_button");
  const nav_form_wrapper_El = $(this).find(".ex-nav-form-wrapper");
  const nav_form_bg_El = $(this).find(".ex-nav_form-bg");
  const nav_form_Close_btn_El = $(this).find(".ex-modal_close_button");
  const nav_contact_us_btn = $("#contact-us-trigger");
  const nav_Form_Contain = $(this).find('.ex-nav-form-contain');
  
  if ($(window).width() <= 768) { // Example mobile breakpoint
        nav_Form_Contain.attr('data-lenis-prevent', '');
    }

  const formElements = $(this).find([
    '.ex-modal_close_button',
    '.form-title',
    '.form-description',
    '.contact-info-title',
    '.contact-detail',
    '.form-label',
    '.form-input',
    '.checkbox-field',
    '.ex-submit-btn',
    '.form_submit-button'
  ].join(','));

  const tl = gsap.timeline({ paused: true });

  tl.set(nav_form_wrapper_El, { display: "block" })
    .from(nav_form_wrapper_El, {
      opacity: 0,
      duration: 0.4
    })
    .fromTo(nav_form_bg_El, { width: 0, height: 0 }, {
      duration: 0.5,
      ease: "power2.out",
      width: "100%",
      height: "100%"
    }, "<")
    .from(formElements, {
      opacity: 0,
      yPercent: 50,
      duration: 0.2,
      stagger: { amount: 0.2 }
    });

  function toggleForm(open) {
    if (!tl.isActive()) {
      if (open) {
        open_form = true;
        toggle_lenis();
        tl.play();
        nav_form_cta_btn_El.addClass("nav-open");
      } else {
        open_form = false;
        toggle_lenis();
        tl.reverse();
        nav_form_cta_btn_El.removeClass("nav-open");
      }
    }
  }

  nav_form_cta_btn_El.on("click", function () {
    toggleForm(!$(this).hasClass("nav-open"));
  });

  nav_contact_us_btn.on("click", function () {
    toggleForm(!$(this).hasClass("nav-open"));
  });

  nav_form_Close_btn_El.on("click", () => toggleForm(false));
//   nav_form_wrapper_El.on("click", () => {
//     console.log("wrapper_clicked");
//     toggleForm(false);
// });

// document.addEventListener('click', function(event) {
//   // Check if the clicked target is outside the navFormContain
//   if (!nav_Form_Contain.contains(event.target) && open_form === true) {
//       console.log("Clicked outside ex-nav-form-contain");
//       toggleForm(false);
//   }
// });


$(nav_form_wrapper_El).on('click', function(event) {
  // Check if the clicked target is outside navFormContain
  if (!nav_Form_Contain.is(event.target) && !nav_Form_Contain.has(event.target).length && open_form === true) {
    console.log("Clicked outside ex-nav-form-contain");
    toggleForm(false);
  }
});


  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      toggleForm(false);
    }
  });
});

// --------------------

$(".navigation").each(function () {
  const nav_menu_btn_El = $(this).find(".nav_menu_button");
  const nav_menu_wrapper_El = $(this).find(".ex-nav_menu-wrapper");
  const nav_menu_bg_El = $(this).find(".ex-nav_menu-bg");
  const nav_menu_Close_btn_El = $(this).find(".nav_menu-link-close_btn");
  const nav_menu_links_El = $(this).find(".nav_menu-link");
  const nav_dropdown_El = $(this).find(".nav_menu-dropdown");
  const nav_Menu_Contain = $(this).find('.ex-nav_menu-contain');

  const tl = gsap.timeline({ paused: true });

  tl.set(nav_menu_wrapper_El, { display: "block" })
    .from(nav_menu_wrapper_El, {
      opacity: 0,
      duration: 0.4
    })
    .fromTo(nav_menu_bg_El, { width: 0, height: 0 }, {
      duration: 0.5,
      ease: "power2.out",
      width: "100%",
      height: "100%"
    }, "<")
    .from([nav_menu_Close_btn_El, nav_dropdown_El, nav_menu_links_El], {
      opacity: 0,
      yPercent: 50,
      duration: 0.2,
      stagger: { amount: 0.2 }
    });

  function toggleMenu(open) {
    if (!tl.isActive()) {
      if (open) {
        open_menu = true;
        toggle_lenis();
        tl.play();
        nav_menu_btn_El.addClass("nav-open");
      } else {
        open_menu = false;
        toggle_lenis();
        tl.reverse();
        nav_menu_btn_El.removeClass("nav-open");
      }
    }
  }

  nav_menu_btn_El.on("click", function () {
    toggleMenu(!$(this).hasClass("nav-open"));
  });

  nav_menu_Close_btn_El.on("click", () => toggleMenu(false));
//   nav_menu_wrapper_El.on("click", () => {
//     console.log("wrapper_clicked");
//     toggleMenu(false);
// });
// document.addEventListener('click', function(event) {
//   // Check if the clicked target is outside the navMenuContain
//   if (!nav_Menu_Contain.contains(event.target) && open_menu === true) {
//       console.log("Clicked outside ex-nav-menu-contain");
//       toggleMenu(false);
//   }
// });


$(nav_menu_wrapper_El).on('click', function(event) {
  // Check if the clicked target is outside navFormContain
  console.log("Clicked Menu_wrapper");
  if (!nav_Menu_Contain.is(event.target) && !nav_Menu_Contain.has(event.target).length && open_menu === true) {
    console.log("Clicked outside ex-nav-Menu-contain");
    toggleMenu(false);
  }
});



  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      toggleMenu(false);
    }
  });
});