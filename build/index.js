
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
    var $box = $('#box');

function moveBox(e) {
  TweenMax.to($box, 1.8, {
    css: { left: e.pageX, top: e.pageY },
    ease: Elastic.easeOut
  });
}
$('.js-boxleave').on('mouseenter', function () {
  // Hide the circle when a link is hovered over
  $box.css('opacity', '0');
});

$('.js-boxleave').on('mouseleave', function () {
  // Show the circle when the mouse leaves the link
  $box.css('opacity', '1');
}) ;

// Add an event listener to move the circle with the cursor
$(document).on('mousemove', moveBox);
  

  var PARTICLE_NUM = 500;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];

window.addEventListener('load', function() {
    canvas = document.getElementById('c');
    
    var resize = function() {
        canvasWidth  = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        centerX = canvasWidth * 0.5;
        centerY = canvasHeight * 0.5;
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(255, 255, 255)';
    };
    
    document.addEventListener('resize', resize);
    resize();
    
    mouseX = centerX;
    mouseY = centerY;
    
    for (var i = 0, p; i < PARTICLE_NUM; i++) {
        particles[i] = randomizeParticle(new Particle());
        particles[i].z -= 500 * Math.random();
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, false);
    
    document.addEventListener('mousedown', function(e) {
        targetSpeed = BOOST_SPEED;
    }, false);
    
    document.addEventListener('mouseup', function(d) {
        targetSpeed = DEFAULT_SPEED;
    }, false);
    
    setInterval(loop, 1000 / 60);
}, false);

function loop() {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();
    
    speed += (targetSpeed - speed) * 0.01;
    
    var p;
    var cx, cy;
    var rx, ry;
    var f, x, y, r;
    var pf, px, py, pr;
    var a, a1, a2;
    
    var halfPi = Math.PI * 0.5;
    var atan2  = Math.atan2;
    var cos    = Math.cos;
    var sin    = Math.sin;
    
    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
        p = particles[i];
        
        p.pastZ = p.z;
        p.z -= speed;
        
        if (p.z <= 0) {
            randomizeParticle(p);
            continue;
        }
        
        cx = centerX - (mouseX - centerX) * 1.25;
        cy = centerY - (mouseY - centerY) * 1.25;
        
        rx = p.x - cx;
        ry = p.y - cy;
        
        f = FL / p.z;
        x = cx + rx * f;
        y = cy + ry * f;
        r = PARTICLE_BASE_RADIUS * f;
        
        pf = FL / p.pastZ;
        px = cx + rx * pf;
        py = cy + ry * pf;
        pr = PARTICLE_BASE_RADIUS * pf;
        
        a  = atan2(py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;
        
        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a2, a1, true);
        context.closePath();
    }
    context.fill();
}

function randomizeParticle(p) {
    p.x = Math.random() * canvasWidth;
    p.y = Math.random() * canvasHeight;
    p.z = Math.random() * 1500 + 500;
    return p;
}


function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}

  paceOptions ={
    ajax: true,
    document:true
  }
  Pace.on('done', () => {
    gsap.timeline()
    .add('p')
    .to('.pace', {
      transform: 'scale(10,1)',
      duration:4,
    },"+=.2")
    .to('.pace',{
      duration:0.5,
      height:"100%",
    },"-=2.5")
    .to('.loading_text',{
      delay:1.2,
      duration:3,
      opacity:0,
      yPercent:-400,
      ease:'BezierEasing(0.19,1,0.22,1)'
    },'p')
    .to('.pace',{
      duration:1,
      opacity:0,
      ease:'BezierEasing(0.19,1,0.22,1)'
    },"-=1.9")
    .to('.mega_container',{
      delay:.1,
      duration:1,
      opacity:1,
      ease:Expo.easeInOut
    },"-=2.2")
  })

 $(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});
  const MINIMUM_ADDITIONAL_ITERATION_COUNT = 2;

const config = {  
  additionalIterationCount: Math.max(MINIMUM_ADDITIONAL_ITERATION_COUNT, 3),
  transitionDuration: 3000,
  prize: 100000,
  digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const getPrizeText = () => document.getElementById("prize-text"),
      getTracks = () => document.querySelectorAll(".digit > .digit-track");

const getFormattedPrize = () => USD.format(config.prize),
      getPrizeDigitByIndex = index => parseInt(config.prize.toString()[index]),
      determineIterations = index => index + config.additionalIterationCount;

const createElement = (type, className, text) => {
  const element = document.createElement(type);
  element.className = className;
  if(text !== undefined) element.innerText = text;
  return element;
}

const createCharacter = character => createElement("span", "character", character);

const createDigit = (digit, trackIndex) => {
  const digitElement = createElement("span", "digit"),
        trackElement = createElement("span", "digit-track");
  
  let digits = [],
      iterations = determineIterations(trackIndex);
  
  for(let i = 0; i < iterations; i++) {
    digits = [...digits, ...config.digits];
  }
  
  trackElement.innerText = digits.join(" ");
  
  trackElement.style.transitionDuration = `${config.transitionDuration}ms`;
  
  digitElement.appendChild(trackElement);
  
  return digitElement;
}

const setup = () => {
  let index = 0;
  
  const prizeText = getPrizeText();
  
  for(const character of getFormattedPrize()) {
    const element = isNaN(character) 
      ? createCharacter(character) : createDigit(character, index++);
    
    prizeText.appendChild(element);
  }  
}

const animate = () => {
  getTracks().forEach((track, index) => {
    const digit = getPrizeDigitByIndex(index),
          iterations = determineIterations(index),
          activeDigit = ((iterations - 1) * 10) + digit;
    
    track.style.translate = `0rem ${activeDigit * -10}rem`;
  });
}

const resetTrackPosition = track => {
  track.style.transitionDuration = "0ms";
  track.style.translate = "0rem 0rem";
  track.offsetHeight;
  track.style.transitionDuration = `${config.transitionDuration}ms`;
}

const resetAnimation = () => {
  for(const track of getTracks()) resetTrackPosition(track);
}

window.onload = () => {
  setup();
  
  setTimeout(animate);  
};

const handleRedo = () => {
  resetAnimation();
  config.prize = 0.015;
  $(".reality").addClass("active");
  animate();
}

const updateTheme = theme => {
  document.documentElement.style.setProperty("--theme-rgb", `var(--${theme})`);
  
  for(const button of document.querySelectorAll(".theme-button")) {
    button.dataset.selected = theme === button.dataset.theme;
  }
}

const handleChangeTheme = e => updateTheme(e.currentTarget.dataset.theme);

updateTheme("green");















gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", (event) => {

  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.6, ease: "back.out(2)", stagger: { amount: 0.5 } });
    createScrollTrigger($(this), tl);
  });
  
  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.5, ease: "power1.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });
  
    $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 0.8, ease: "power2.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });
  
   $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, yPercent: 100, duration: 0.8, ease: "power1.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });
  
    $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
    createScrollTrigger($(this), tl);
  });
  
    $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });
/*
  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), { rotationX: -90, duration: 0.6, ease: "power2.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });


  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
    createScrollTrigger($(this), tl);
  });
  

*/
  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});








document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("workflow");
  const progressLine = document.querySelector(".progress-line");

  window.addEventListener("scroll", function () {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate the amount scrolled within the section
      const scrolled = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));

      // Set the height of the progress line with a slower change
      progressLine.style.height = `${scrolled * 100}%`;
  });
});










document.addEventListener("DOMContentLoaded", function () {
  const floatSection = document.getElementById("section-about");
  const images = document.querySelectorAll(".float-image");
  let isScrolling = false;

  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        const sectionTop = floatSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Calculate the rotation degree based on scroll position
        if (sectionTop < windowHeight && sectionTop > -floatSection.offsetHeight) {
          const rotationDegree = (windowHeight - sectionTop) / windowHeight * 15; // Max rotation of 15 degrees
          images.forEach((image, index) => {
            // Alternating rotation direction for images
            const direction = index % 2 === 0 ? 1 : -1;
            image.style.transform = `rotate(${direction * rotationDegree}deg)`;
          });
        } else {
          // Reset the rotation when the section is out of view
          images.forEach(image => {
            image.style.transform = `rotate(0deg)`;
          });
        }

        isScrolling = false; // Reset scrolling state
      });
    }
  });
});







/* 

  document.addEventListener('DOMContentLoaded', function () {
    const sidePics = document.querySelector('.side-pics');
    const testimonialSection = document.querySelector('.testimonial');
    const flexer = document.querySelector('.s-pic');

    window.addEventListener('scroll', function () {
      const sectionRect = testimonialSection.getBoundingClientRect();
      const sidePicsRect = sidePics.getBoundingClientRect();

      if (sectionRect.top <= 0 && sectionRect.bottom > sidePicsRect.height) {
        flexer.style.flexDirection = 'row';
        sidePics.style.position = 'fixed';
        sidePics.style.top = '0';
        sidePics.style.left = '63%';
      } else {
        flexer.style.flexDirection = 'row-reverse';
        sidePics.style.position = 'sticky';
        sidePics.style.top = 'auto';
      }
    });
  }); */





  document.addEventListener('DOMContentLoaded', function () {
    const testimonialInners = document.querySelectorAll('.testimonial-inner');
    
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Midpoint of the viewport
  
      testimonialInners.forEach((testimonial, index) => {
        const rect = testimonial.getBoundingClientRect();
        const elementPosition = rect.top + window.scrollY; // Get position of each testimonial
  
        // If the scroll position is near this testimonial, give it full opacity
        if (scrollPosition >= elementPosition && scrollPosition < elementPosition + rect.height) {
          testimonial.style.opacity = '1';
        } else {
          testimonial.style.opacity = '0.3'; // Reset opacity for other testimonials
        }
      });
    });
  });