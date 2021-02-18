!function(n){var e={};function t(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return n[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)t.d(r,a,function(e){return n[e]}.bind(null,a));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/js/main.js")}({"./src/js/dynamicAdapt.js":
/*!********************************!*\
  !*** ./src/js/dynamicAdapt.js ***!
  \********************************/
/*! no static exports found */function(module,exports){eval('// Dynamic Adapt v.1\n// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"\n// e.x. data-da=".item,992,2"\nfunction DynamicAdapt(type) {\n  this.type = type;\n}\n\nDynamicAdapt.prototype.init = function () {\n  var _this2 = this;\n\n  var _this = this; // массив объектов\n\n\n  this.оbjects = [];\n  this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов\n\n  this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами\n\n  for (var i = 0; i < this.nodes.length; i++) {\n    var node = this.nodes[i];\n    var data = node.dataset.da.trim();\n    var dataArray = data.split(",");\n    var оbject = {};\n    оbject.element = node;\n    оbject.parent = node.parentNode;\n    оbject.destination = document.querySelector(dataArray[0].trim());\n    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";\n    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";\n    оbject.index = this.indexInParent(оbject.parent, оbject.element);\n    this.оbjects.push(оbject);\n  }\n\n  this.arraySort(this.оbjects); // массив уникальных медиа-запросов\n\n  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {\n    return \'(\' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;\n  }, this);\n  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {\n    return Array.prototype.indexOf.call(self, item) === index;\n  }); // навешивание слушателя на медиа-запрос\n  // и вызов обработчика при первом запуске\n\n  var _loop = function _loop(_i) {\n    var media = _this2.mediaQueries[_i];\n    var mediaSplit = String.prototype.split.call(media, \',\');\n    var matchMedia = window.matchMedia(mediaSplit[0]);\n    var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом\n\n    var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {\n      return item.breakpoint === mediaBreakpoint;\n    });\n    matchMedia.addListener(function () {\n      _this.mediaHandler(matchMedia, оbjectsFilter);\n    });\n\n    _this2.mediaHandler(matchMedia, оbjectsFilter);\n  };\n\n  for (var _i = 0; _i < this.mediaQueries.length; _i++) {\n    _loop(_i);\n  }\n};\n\nDynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {\n  if (matchMedia.matches) {\n    for (var i = 0; i < оbjects.length; i++) {\n      var оbject = оbjects[i];\n      оbject.index = this.indexInParent(оbject.parent, оbject.element);\n      this.moveTo(оbject.place, оbject.element, оbject.destination);\n    }\n  } else {\n    for (var _i2 = 0; _i2 < оbjects.length; _i2++) {\n      var _оbject = оbjects[_i2];\n\n      if (_оbject.element.classList.contains(this.daClassname)) {\n        this.moveBack(_оbject.parent, _оbject.element, _оbject.index);\n      }\n    }\n  }\n}; // Функция перемещения\n\n\nDynamicAdapt.prototype.moveTo = function (place, element, destination) {\n  element.classList.add(this.daClassname);\n\n  if (place === \'last\' || place >= destination.children.length) {\n    destination.insertAdjacentElement(\'beforeend\', element);\n    return;\n  }\n\n  if (place === \'first\') {\n    destination.insertAdjacentElement(\'afterbegin\', element);\n    return;\n  }\n\n  destination.children[place].insertAdjacentElement(\'beforebegin\', element);\n}; // Функция возврата\n\n\nDynamicAdapt.prototype.moveBack = function (parent, element, index) {\n  element.classList.remove(this.daClassname);\n\n  if (parent.children[index] !== undefined) {\n    parent.children[index].insertAdjacentElement(\'beforebegin\', element);\n  } else {\n    parent.insertAdjacentElement(\'beforeend\', element);\n  }\n}; // Функция получения индекса внутри родителя\n\n\nDynamicAdapt.prototype.indexInParent = function (parent, element) {\n  var array = Array.prototype.slice.call(parent.children);\n  return Array.prototype.indexOf.call(array, element);\n}; // Функция сортировки массива по breakpoint и place \n// по возрастанию для this.type = min\n// по убыванию для this.type = max\n\n\nDynamicAdapt.prototype.arraySort = function (arr) {\n  if (this.type === "min") {\n    Array.prototype.sort.call(arr, function (a, b) {\n      if (a.breakpoint === b.breakpoint) {\n        if (a.place === b.place) {\n          return 0;\n        }\n\n        if (a.place === "first" || b.place === "last") {\n          return -1;\n        }\n\n        if (a.place === "last" || b.place === "first") {\n          return 1;\n        }\n\n        return a.place - b.place;\n      }\n\n      return a.breakpoint - b.breakpoint;\n    });\n  } else {\n    Array.prototype.sort.call(arr, function (a, b) {\n      if (a.breakpoint === b.breakpoint) {\n        if (a.place === b.place) {\n          return 0;\n        }\n\n        if (a.place === "first" || b.place === "last") {\n          return 1;\n        }\n\n        if (a.place === "last" || b.place === "first") {\n          return -1;\n        }\n\n        return b.place - a.place;\n      }\n\n      return b.breakpoint - a.breakpoint;\n    });\n    return;\n  }\n};\n\nvar da = new DynamicAdapt("max");\nda.init();\n\n//# sourceURL=webpack:///./src/js/dynamicAdapt.js?')},"./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./src/js/modal.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dynamicAdapt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dynamicAdapt.js */ \"./src/js/dynamicAdapt.js\");\n/* harmony import */ var _dynamicAdapt_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dynamicAdapt_js__WEBPACK_IMPORTED_MODULE_1__);\n\n // import './cart.js';\n// Burger\n\nvar navBurger = document.querySelector('.nav__burger');\nvar navMenu = document.querySelector('.nav__menu');\nvar body = document.querySelector('body');\nvar navCart = document.querySelector('.nav__cart-btn');\nvar menuClose = document.querySelector('.menu__close-field');\nvar mediaQuery = window.matchMedia('(max-width: 991px)');\n\nfunction burgerToggle() {\n  navBurger.classList.toggle('active');\n  navMenu.classList.toggle('active-flex');\n  setTimeout(function () {\n    navMenu.classList.toggle('active');\n  }, 10);\n  navCart.classList.toggle('active');\n\n  if (!mediaQuery.matches) {\n    body.classList.remove('lock');\n  }\n\n  if (mediaQuery.matches) {\n    body.classList.toggle('lock');\n  }\n}\n\nnavBurger.addEventListener('click', function () {\n  burgerToggle();\n});\nmenuClose.addEventListener('click', function () {\n  burgerToggle();\n}); // Cart \n\nvar cartCloseFieldBtn = document.querySelector('.cart__close-field');\nvar cartContent = document.querySelector('.cart');\n\nfunction cartOpen() {\n  if (navBurger.classList.contains('active')) {\n    cartContent.classList.toggle('active-flex');\n    setTimeout(function () {\n      cartContent.classList.toggle('active');\n    }, 10);\n  } else {\n    if (!mediaQuery.matches) {\n      body.classList.remove('lock');\n      cartContent.classList.toggle('active-flex');\n      setTimeout(function () {\n        cartContent.classList.toggle('active');\n      }, 10);\n    }\n\n    if (mediaQuery.matches) {\n      cartContent.classList.toggle('active-flex');\n      setTimeout(function () {\n        cartContent.classList.toggle('active');\n      }, 10);\n      body.classList.toggle('lock');\n    }\n  }\n}\n\nnavCart.addEventListener('click', function () {\n  cartOpen();\n});\ncartCloseFieldBtn.addEventListener('click', function () {\n  cartOpen();\n}); // -- //\n// Scroll to link \n\nvar isiPhone = navigator.userAgent.match(/iPhone/i) != null;\nvar isiPad = navigator.userAgent.match(/iPad/i) != null;\nvar isiPod = navigator.userAgent.match(/iPod/i) != null;\n\nif (isiPhone || isiPad || isiPod) {\n  (function () {\n    var linkNav = document.querySelectorAll('[href^=\"#\"]'),\n        //выбираем все ссылки к якорю на странице\n    V = 0.2; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)\n\n    for (var i = 0; i < linkNav.length; i++) {\n      linkNav[i].addEventListener('click', function (e) {\n        //по клику на ссылку\n        e.preventDefault(); //отменяем стандартное поведение\n\n        var w = window.pageYOffset,\n            // производим прокрутка прокрутка\n        hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти\n\n        t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id\n        start = null;\n        requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]\n\n        function step(time) {\n          if (start === null) start = time;\n          var progress = time - start,\n              r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);\n          window.scrollTo(0, r);\n\n          if (r != w + t) {\n            requestAnimationFrame(step);\n          } else {\n            location.hash = hash; // URL с хэшем\n          }\n        }\n      }, false);\n    }\n  })();\n} // -- //\n// Active navigation on scroll\n\n\nvar nav = document.querySelector(\".nav\");\nvar menuWrapper = document.querySelector('.menu__wrapper');\nvar cartWrapper = document.querySelector('.cart__wrapper');\nvar prevScrollpos = window.pageYOffset;\n\nfunction navOpen() {\n  if (prevScrollpos != 0) {\n    nav.classList.add('nav--active');\n    menuWrapper.classList.add('menu__wrapper--onscroll');\n    cartWrapper.classList.add('cart__wrapper--onscroll');\n  } else {\n    nav.classList.remove('nav--active');\n    menuWrapper.classList.remove('menu__wrapper--onscroll');\n    cartWrapper.classList.remove('cart__wrapper--onscroll');\n  }\n}\n\nfunction navScroll() {\n  window.onscroll = function () {\n    var currentScrollPos = window.pageYOffset;\n\n    if (prevScrollpos < currentScrollPos) {\n      nav.classList.add('nav--active');\n      menuWrapper.classList.add('menu__wrapper--onscroll');\n      cartWrapper.classList.add('cart__wrapper--onscroll');\n    } else if (prevScrollpos = currentScrollPos) {\n      nav.classList.add('nav--active');\n      menuWrapper.classList.add('menu__wrapper--onscroll');\n      cartWrapper.classList.add('cart__wrapper--onscroll');\n    } else {\n      nav.classList.remove('nav--active');\n      menuWrapper.classList.remove('menu__wrapper--onscroll');\n      cartWrapper.classList.remove('cart__wrapper--onscroll');\n    }\n\n    prevScrollpos = currentScrollPos;\n  };\n}\n\nnavOpen();\nnavScroll(); // -- //\n// Category Swiper\n\nvar categoryMainSwiper = new Swiper('.c-swiper', {\n  loop: true,\n  centeredSlides: true,\n  watchSlidesVisibility: true,\n  navigation: {\n    nextEl: '.c-swiper-button-next',\n    prevEl: '.c-swiper-button-prev'\n  },\n  autoplay: {\n    delay: 10000,\n    disableOnInteraction: false\n  },\n  slidesPerColumn: 1,\n  breakpoints: {\n    // настройки для разных разрешений\n    400: {\n      slidesPerView: 1,\n      spaceBetween: 20\n    },\n    767: {\n      slidesPerView: 1.1,\n      spaceBetween: 30\n    },\n    992: {\n      slidesPerView: 1.5,\n      spaceBetween: 40\n    },\n    1200: {\n      slidesPerView: 1.94,\n      spaceBetween: 70\n    }\n  },\n  on: {\n    init: function init() {\n      Array.from(this.slides).forEach(function (swiperSlide, i) {\n        var slide = swiperSlide.querySelector('.swiper-slide__wrapper');\n\n        if (!swiperSlide.classList.contains('swiper-slide-visible')) {\n          slide.style.display = 'none';\n        }\n      });\n    },\n    setTranslate: function setTranslate() {\n      Array.from(this.slides).forEach(function (slide) {\n        if (slide.classList.contains('swiper-slide-visible')) {\n          slide.querySelector('.swiper-slide__wrapper').style.display = '';\n        }\n      });\n    },\n    transitionEnd: function transitionEnd() {\n      Array.from(this.slides).forEach(function (slide) {\n        if (!slide.classList.contains('swiper-slide-visible')) {\n          slide.querySelector('.swiper-slide__wrapper').style.display = 'none';\n        }\n      });\n    }\n  }\n}); // Slider hover\n\ndocument.querySelector('.c-swiper').addEventListener('mouseenter', function () {\n  categoryMainSwiper.autoplay.stop();\n});\ndocument.querySelector('.c-slide__link').addEventListener('focus', function () {\n  categoryMainSwiper.autoplay.stop();\n});\ndocument.querySelector('.c-swiper').addEventListener('mouseleave', function () {\n  categoryMainSwiper.autoplay.start();\n});\n\n//# sourceURL=webpack:///./src/js/main.js?")},"./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/*! no static exports found */function(module,exports){eval("var popupLinks = document.querySelectorAll('.popup-link');\nvar lockPadding = document.querySelectorAll('.lock-padding');\nvar unlock = true;\nvar timeout = 800;\n\nif (popupLinks.length > 0) {\n  var _loop = function _loop(index) {\n    var popupLink = popupLinks[index];\n    popupLink.addEventListener(\"click\", function (e) {\n      var popupName = popupLink.getAttribute('href').replace('#', '');\n      var curentPopup = document.getElementById(popupName);\n      popupOpen(curentPopup);\n      e.preventDefault();\n    });\n  };\n\n  for (var index = 0; index < popupLinks.length; index++) {\n    _loop(index);\n  }\n}\n\nvar popupCloseIcon = document.querySelectorAll('.close-popup');\n\nif (popupCloseIcon.length > 0) {\n  var _loop2 = function _loop2(_index) {\n    var el = popupCloseIcon[_index];\n    el.addEventListener('click', function (e) {\n      popupClose(el.closest('.popup'));\n      e.preventDefault();\n    });\n  };\n\n  for (var _index = 0; _index < popupCloseIcon.length; _index++) {\n    _loop2(_index);\n  }\n}\n\nfunction popupOpen(curentPopup) {\n  if (curentPopup && unlock) {\n    var popupActive = document.querySelector('.popup.open');\n\n    if (popupActive) {\n      popupClose(popupActive, false);\n    } else {\n      bodyLock();\n    }\n\n    curentPopup.classList.add('open');\n    curentPopup.addEventListener(\"click\", function (e) {\n      if (!e.target.closest('.popup__content')) {\n        popupClose(e.target.closest('.popup'));\n      }\n    });\n  }\n}\n\nfunction popupClose(popupActive) {\n  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n  if (unlock) {\n    popupActive.classList.remove('open');\n\n    if (doUnlock) {\n      bodyUnlock();\n    }\n  }\n}\n\nfunction bodyLock() {\n  var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';\n\n  if (lockPadding.length > 0) {\n    for (var _index2 = 0; _index2 < lockPadding.length; _index2++) {\n      var el = lockPadding[_index2];\n      el.style.paddingRight = lockPaddingValue;\n    }\n  }\n\n  body.style.paddingRight = lockPaddingValue;\n  body.classList.add('lock');\n  unlock = false;\n  setTimeout(function () {\n    unlock = true;\n  }, timeout);\n}\n\nfunction bodyUnlock() {\n  setTimeout(function () {\n    if (lockPadding.length > 0) {\n      for (var _index3 = 0; _index3 < lockPadding.length; _index3++) {\n        var el = lockPadding[_index3];\n        el.style.paddingRight = '0px';\n      }\n    }\n\n    body.style.paddingRight = '0px';\n    body.classList.remove('lock');\n  }, timeout);\n}\n\ndocument.addEventListener('keydown', function (e) {\n  if (e.which === 27) {\n    var popupActive = document.querySelector('.popup.open');\n    popupClose(popupActive);\n  }\n});\n\n(function () {\n  if (!Element.prototype.closest) {\n    Element.prototype.closest = function (css) {\n      var node = this;\n\n      while (node) {\n        if (node.matches(css)) return node;else node = node.parentElement;\n      }\n\n      return null;\n    };\n  }\n})();\n\n(function () {\n  if (!Element.prototype.matches) {\n    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;\n  }\n})();\n\n//# sourceURL=webpack:///./src/js/modal.js?")}});
//# sourceMappingURL=main.js.map
