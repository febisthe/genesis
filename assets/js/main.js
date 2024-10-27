// 화면 부드럽게
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)


// 스크롤에 따라 상단 메뉴바 
lastScroll = 0;

gsap.set('.gnb li', {
  opacity: 0,
  yPercent: -100,
})

const gnbActive = gsap.to('.gnb li', {
  opacity: 1,
  yPercent: 0,
  stagger: 0.15,
})

$(window).scroll(function(){
  curr = $(this).scrollTop();
  if(curr >= 50) {
    if(curr > lastScroll) {
      $('#header').addClass('hide');
      gnblag = true;
    } else {
      $('#header').removeClass('hide');
      if(!$('#header').hasClass('hide') && gnbFlag) {
        gnbActive.restart();
   
      }
    }
    lastScroll = curr;
  }
})


// 마우스 따라 다니는 화살표
$('[data-mouse]').mousemove(function(e){
  x = e.offsetX;
  y = e.offsetY;
  child = $(this).find('svg');
  gsap.to(child, {
    opacity: 1,
    x:x,
    y:y
  })
})
$('[data-mouse]').mouseout(function(){
  child = $(this).find('svg');
  gsap.to(child, {
    opacity: 0,
  })
})

// top 버튼
$('#footer .btn-top').click(function(){
  $('html, body').animate({scrollTop: 0}, 400);
})


// 썸네일 변수
var bullet = [
  'GV80 BLACK', 
  'GV80 COUPE BLACK', 
  'GV80',
  'GV80 COUPE',
  'ELECTRIFIED G80',
  'MAGMA',
  'X GRAN', 
  'NEOLUN CONCEPT', 
  'GV70',
  'GV90 BLACK',
  'GV90'
];


// 슬라이드
const thumbSwiper = new Swiper('.sc-visual .thumb-slide',{
  loop: true,
  speed: 1000,
  spaceBetween: 10,
  effect: "fade",
  freeMode: true,
  watchSlidesProgress: true,
})

const visualSwiper = new Swiper(".sc-visual .visual-slide", {
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  touchRatio: 0,
  speed: 1500,
  pagination: {
    el: ".pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '"><span>' + (bullet[index]) + '</span></div>';
    }
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  thumbs: {
    swiper: thumbSwiper,
  },
});

const lineupSwiper = new Swiper(".sc-lineup .model-slide", {
  slidesPerView: 'auto',
  spaceBetween : 13,
  pagination: {
    el: ".pagination",
    type: "bullets"
  }
});

const awardsSwiper = new Swiper(".awards-slide", {
  spaceBetween: 70,
  slidesPerView: 'auto',
  speed: 1000,
  pagination: {
    el: ".fraction",
    type: "fraction",
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});

const progressbar = new Swiper(".awards-slide", {
  spaceBetween: 70,
  slidesPerView: 'auto',
  speed: 1000,
  pagination: {
    el: ".prograssbar",
    type: "progressbar",
  },
});
awardsSwiper.controller.control = progressbar;



// gsap
gsap.to('.sc-visual .thumb-slide', {    
  scrollTrigger: {
    trigger: '.sc-visual',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  },
  clipPath: 'inset(0% 0% 0%)'
});

gsap.to('.sc-visual .visual-slide .pagination', {
  scrollTrigger:{
    trigger: '.sc-visual',
    start: "top top",
    end: "80% bottom",
    scrub:1,
    // markers: true,
  },
  opacity: 0,
  yPercent: -100,
})

const aboutTl = gsap.timeline({
  scrollTrigger:{
    trigger: '.sc-about',
    start: '40% 40%',
    end: '100% 100%',
    // markers: true,
  },
})
aboutTl.to('.sc-about .info .tit', {opacity: 1, yPercent:-30, duration: 1})
aboutTl.to('.sc-about .info .desc', {opacity: 1, yPercent:-30, duration: 1})

gsap.from('.sc-lineup .swiper-slide',0.7,{
  scrollTrigger:{
    trigger:'.sc-lineup .swiper',
    start:"0% 100%",
    end:"0% 70%",
    // markers: true,
    toggleActions:"none play none reset"
  },
  opacity:0,
  stagger:0.2,
})

const spaceTl = gsap.timeline({
  scrollTrigger: {
      trigger: '.sc-space',
      start:"0% 0%",
      end:"100% 100%",
      // markers:true,
      scrub: 0,
  },
})
spaceTl.addLabel('a')
spaceTl.to('.sc-space .group-text',{ filter: 'invert(0)'},'a')
spaceTl.to('.sc-space .group-text .desc',{ opacity:0},'a-=0.3')
//그림
for (let i = 1; i < 6; i++) {
  spaceTl.addLabel(`img${i}`)
  spaceTl.to(`.sc-space .group-card .card-item:nth-child(${i}) .thumb`,{yPercent:-250},`img${i}`)
}

gsap.from('.sc-awards .awards-slide', {
  scrollTrigger: {
    trigger: '.sc-awards',
    start: 'top 80%',
    end: 'bottom bottom',
    // markers: true,
  },
  xPercent: 20,
  duration: 0.5,
  ease: "linear", 
})

gsap.to('.sc-relate', {
  scrollTrigger: {
    trigger: '.sc-relate',
    start: "top bottom",
    end: "70% bottom",
    scrub: 1,
    // markers: true,
  },
  clipPath: 'inset(0% 0% 0%)'
})
