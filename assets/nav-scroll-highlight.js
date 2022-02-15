if (position >= target) {
    document.querySelector('#jump-links a').classList.remove('active');
    document.querySelector('#jump-links a[href=#' + id + ']').classList.add('active');
}

// jQuery(document).ready(function($) {

    // SMOOTH SCROLLING SECTIONS
    // $('a[href*=#]:not([href=#])').click(function() {
        // if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        //     || location.hostname == this.hostname) {
        //
        //     var target = $(this.hash);
        //     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        //        if (target.length) {
        //          $('html,body').animate({
        //              scrollTop: target.offset().top
        //         }, 1000);
        //         return false;
        //     }
        // }
    // });
// });


// let nav = document.querySelector("a[href*=#]:not([href=#])");
//
// nav.addEventListener('click', function() {
//
//    // submenu.classList.toggle('active');
//    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
//        || location.hostname == this.hostname) {
//
//        let target = document.querySelector(this.hash);
//        target = target.length ? target : document.querySelector('[name=' + this.hash.slice(1) +']');
//           if (target.length) {
//             document.querySelector('html,body').animate({
//                 scrollTop: target.offset().top
//            }, 1000);
//            return false;
//        }
//    }
// });

// const nav = document.querySelector('#jump-links');
// const header = document.querySelector('.site-header');
// const hero = document.querySelector('.hero');
// const intro = document.querySelector('.collection__intro');
// const navTop = nav.offsetTop + header.offsetTop + hero.offsetTop + intro.offsetTop;
//
// function stickyNavigation() {
//   console.log('navTop = ' + navTop);
//   console.log('scrollY = ' + window.scrollY);
//
//   if (window.scrollY >= navTop) {
//     // nav offsetHeight = height of nav
//     // document.body.style.paddingTop = nav.offsetHeight + 'px';
//     document.body.classList.add('fixed-nav');
//   } else {
//     // document.body.style.paddingTop = 0;
//     document.body.classList.remove('fixed-nav');
//   }
// }
//
// window.addEventListener('scroll', stickyNavigation);


// Sticky Nav Component
// var Sticky = (function() {
//   'use strict';
//
//   var CSS_CLASS_ACTIVE = 'is-fixed';
//
//   var Sticky = {
//     element: null,
//     position: 0,
//     addEvents: function() {
//       window.addEventListener('scroll', this.onScroll.bind(this));
//     },
//     init: function(element) {
//       this.element = element;
//       this.addEvents();
//       this.position = element.offsetTop ;
//       this.onScroll();
//     },
//     aboveScroll: function() {
//       return this.position < window.scrollY;
//     },
//     onScroll: function(event) {
//       if (this.aboveScroll()) {
//         this.setFixed();
//       } else {
//         this.setStatic();
//       }
//     },
//     setFixed: function() {
//       this.element.classList.add(CSS_CLASS_ACTIVE);
//       // not needed if added with CSS Class
//       this.element.style.position = 'fixed';
//       this.element.style.top = 0;
//     },
//     setStatic: function() {
//       this.element.classList.remove(CSS_CLASS_ACTIVE);
//       // not needed if added with CSS Class
//       this.element.style.position = 'static';
//       this.element.style.top = 'auto';
//     }
//   };
//
//   return Sticky;
//
// })();
//
//
// //  Init Sticky
// var sticky = document.querySelector('.nav__jump-links');
// if (sticky)
//   Sticky.init(sticky);
