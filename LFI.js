//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
//<script>

console.log("file connected");

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);




// $(".x-framewrok-section").each(function (index) {
//   let childTriggers = $(this).find(".x-content-right");
//   let childTargets = $(this).find(".x-feature-title-wrapper");
//   let childTargetsParent = $(this).find(".x-feature-wrapper");
//   let childTargetsPara = $(this).find(".x-feature-para-wrapper");
//   //let paraHeights = []; // Array to store heights



//   // switch active class
//   function makeItemActive(index) {
//     //childTriggers.removeClass("is-active");
//     childTargets.removeClass("is-active");
//     childTargetsPara.removeClass("is-open");

//     // add event listener to chiletargets and on click scroll to the trigger element like gsap.to(window, { scrollTo: "#target-element" }).

//     //childTriggers.eq(index).addClass("is-active");
//     childTargets.eq(index).addClass("is-active");
//     childTargetsPara.eq(index).addClass("is-open");

//   }
//   makeItemActive(0);
//   // create triggers
//   childTriggers.each(function (index) {
//     ScrollTrigger.create({
//       trigger: $(this),
//       start: "top center",
//       end: "bottom center",
//       onToggle: (isActive) => {
//         if (isActive) {
//           makeItemActive(index);
//         }
//       }
//     });
//   });
// });

//------------

// $(document).ready(function() {
//   $(".x-framewrok-section").each(function(sectionIndex) {
//     const $section = $(this);
//     const $childTriggers = $section.find(".x-content-right");
//     const $childTargets = $section.find(".x-feature-title-wrapper");
//     const $paraWrappers = $section.find('.x-feature-para-wrapper');
//     const paraHeights = [];

//     $paraWrappers.each(function() {
//       paraHeights.push(this.scrollHeight);
//       gsap.set(this, { height: 0 });
//     });

//     function makeItemActive(index) {
//       if (index < 0 || index >= $childTargets.length) { return; }
//       $childTargets.removeClass("is-active");
//       gsap.to($paraWrappers, {
//         height: (i) => (i === index ? paraHeights[i] : 0),
//         duration: 0.3,
//       });
//       $childTargets.eq(index).addClass("is-active");
//     }

//     makeItemActive(0);

//     $childTriggers.each(function(triggerIndex) {
//       ScrollTrigger.create({
//         trigger: this,
//         start: "top center",
//         end: "bottom center",
//         onToggle: (isActive) => {
//           if (isActive) {
//             makeItemActive(triggerIndex);
//           }
//         },
//         markers: true // REMOVE IN PRODUCTION
//       });
//     });
//   });
// });
//</script>

///--------------------
$(".x-framewrok-section").each(function (index) {
  let childTriggers = $(this).find(".x-content-right");
  let childTargets = $(this).find(".x-feature-title-wrapper");
  let childTargetsPara = $(this).find(".x-feature-para-wrapper");



  // Function to switch active class
  // function makeItemActive(index) {
  //   childTargets.removeClass("is-active");
  //   childTargetsPara.removeClass("is-open");

  //   childTargets.eq(index).addClass("is-active");
  //   childTargetsPara.eq(index).addClass("is-open");
  // }

  function makeItemActive(index) {
    childTargets.removeClass("is-active");
    childTargetsPara.removeClass("is-open");



    childTargets.eq(index).addClass("is-active");
    let para = childTargetsPara.eq(index).addClass("is-open");
  }

  makeItemActive(0);

  // Create ScrollTrigger instances
  childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center",
      onToggle: (isActive) => {
        if (isActive) {
          makeItemActive(index);
        }
      }
    });
  });

  // Add click event to childTargets to scroll to corresponding childTrigger
  childTargets.each(function (index) {
    $(this).on("click", function () {
      let targetElement = childTriggers.eq(index); // Get the corresponding .x-content-right

      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: targetElement,
          //offsetY: 50, // Adjust for fixed headers if needed
        },
        ease: "power2.out",
      });
    });
  });
});

// Add snap scrolling functionality
gsap.utils.toArray(".hero-section").forEach((trigger, index) => {
  ScrollTrigger.create({
    trigger: trigger,
    start: "top 50%",
    end: "bottom 50%",
    snap: {
      snapTo: (progress, self) => {
        return 0.5; // Always snap to the center
      },
      duration: 0.5,
      ease: "power2.inOut",
      delay: 0,
      directional: true, // Snaps based on scroll direction
    },
    markers: true,
  });
});


// gsap.utils.toArray(".x-content-right" ).forEach((trigger, index) => {
//   ScrollTrigger.create({
//     trigger: trigger,
//     start: "top 50%",
//     end: "bottom 50%",
//     snap: {
//       snapTo: [0.5],
//       duration: 0.3,
//       ease: "power1.inOut",
//       delay: 0,
//     },//markers: true, 
//     //markers: true,
//   });
// });

//--------

var Webflow = Webflow || [];
Webflow.push(function () {

  var tabTimeout;
  clearTimeout(tabTimeout);
  tabLoop();
  

  function tabLoop() {
    //makeTabActive();
    tabTimeout = setTimeout(function () {
      var $next = $('.tabs-menu').children('.w--current:first').next();
      if ($next.length) {
        if ($(".menu-button").hasClass("w--open")) {
          tabLoop();
        } else {
          $next.removeAttr("href").click();
        }
      } else {
        if ($(".menu-button").hasClass("w--open")) {
          tabLoop();
        } else {
          $('.tabs-link:first').removeAttr("href").click();
        }
      }
    }, 5000); // 5 seconds
  }

  $('.tabs-link').click(function () {
    clearTimeout(tabTimeout);
    tabLoop();
    
  });
});


// function makeTabActive() {

//   $(".tabs-link").each(function (index) {
//     //$(this).find(".x-feature-title-wrapper").removeClass("is-active");
//     if ($(this).hasClass("w--current")) {
//       $(this).find(".x-feature-title-wrapper").addClass("is-active");
//     }else{
//       $(this).find(".x-feature-title-wrapper").removeClass("is-active");
//     }
//   });
// }

//makeTabActive();

$(document).ready(function () {
  $(".x-framewrok-section-02").each(function () {
    var $section = $(this);

    function updateActiveTab() {
      $section.find(".x-feature-title-wrapper").removeClass("is-active"); // Remove from all
      $section.find(".tabs-link.w--current .x-feature-title-wrapper").addClass("is-active"); // Add to active tab
    }

    $section.find(".tabs-link").each(function () {
      var $tab = $(this);

      var observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
          if (mutation.attributeName === "class") {
            updateActiveTab(); // Update classes when tab changes
          }
        });
      });

      observer.observe($tab[0], { attributes: true, attributeFilter: ["class"] });
    });

    // Ensure the correct tab is set on page load
    updateActiveTab();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let tl = gsap.timeline({ delay: 0.5 });

  // Move animation using fromTo
  
  tl.to(".bg-video", {
    y: "0%", 
    duration: 1.5, 
    ease: "power2.out"
  })
  .fromTo(".bg-video", {opacity: 0}, {
    opacity: 1, 
    duration: 0.5, 
    ease: "power2.out"
  }, "<0.8")
  // Clip-path animation using fromTo
  .fromTo(".bg-video",
    { clipPath: "inset(35% 35% 35% 35% round 18px)" }, // Start clip-path
    { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 2.5, ease: "power2.out" } // End clip-path
  );
});


