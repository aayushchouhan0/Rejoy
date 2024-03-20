gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

function cursorHover(){
   const page1Content = document.querySelector(".page1-content");
const cursor = document.querySelector(".page1 .cursor");
page1Content.addEventListener("mousemove", (e) => {
   gsap.to(".cursor" , {
    x : e.x,
    y:e.y
   })
})
page1Content.addEventListener("mouseenter", () => {
   gsap.to(".cursor" , {
      scale : 1,
      opacity : 1,
      
   })
})
page1Content.addEventListener("mouseleave", () => {
   gsap.to(".cursor" , {
      scale : 0,
      opacity : 0,
      duration :0.2
   })
})
}
cursorHover();

function page2Content(){
   gsap.from(".elementtop  h2 , .leftsideelement h2 , .line , .elementinfo h1 , .page3 .topinfo h6 h2 , "  , {
      y:120,
      stagger:0.25,
      opacity:0,
      duration:2,
      delay:2,
      ease:"power1.out",
      scrollTrigger:{
        trigger:".elementtop  h2 , .leftsideelement h2 , .line , .elementinfo h1" ,
        scroller:"#main",
          start:"top 40%",
          end:"top 37%",
          scrub:2,
      }
    })
}
page2Content();