const productSwiper=new Swiper(".product__swiper",{loop:!0,centeredSlides:!0,watchSlidesVisibility:!0,navigation:{nextEl:".product-swiper-btn-next",prevEl:".product-swiper-btn-prev"},pagination:{el:".product-swiper-pagination",clickable:!0},spaceBetween:40,slidesPerColumn:1,slidesPerView:1,on:{init(){Array.from(this.slides).forEach((e,t)=>{const i=e.querySelector(".swiper-slide__wrapper");e.classList.contains("swiper-slide-visible")||(i.style.display="none")})},setTranslate(){Array.from(this.slides).forEach(e=>{e.classList.contains("swiper-slide-visible")&&(e.querySelector(".swiper-slide__wrapper").style.display="")})},transitionEnd(){Array.from(this.slides).forEach(e=>{e.classList.contains("swiper-slide-visible")||(e.querySelector(".swiper-slide__wrapper").style.display="none")})}}}),productSwiperWrapper=productSwiper.wrapperEl;[].forEach.call(productSwiper.slides,(function(e){e.style.height=""})),setTimeout(()=>{[].forEach.call(productSwiper.slides,(function(e){e.style.height=productSwiperWrapper.clientHeight+"px"}))},300);const radioInputColor=document.querySelectorAll(".product__radio-input"),colorText=document.querySelector(".color");radioInputColor.forEach(e=>{e.addEventListener("click",e=>{colorText.textContent=e.target.value}),e.addEventListener("keydown",(function(e){13===e.keyCode&&(colorText.textContent=e.target.value)}))});const radioInputFrame=document.querySelectorAll(".product__radio-frame-input"),frameText=document.querySelector(".frame");radioInputFrame.forEach(e=>{e.addEventListener("click",e=>{frameText.textContent=e.target.value}),e.addEventListener("keydown",(function(t){13===t.keyCode&&e.click()}))});const ratings=document.querySelectorAll(".rating");function initRatings(){let e,t;function i(i){e=i.querySelector(".rating__active"),t=i.querySelector(".rating__value")}function r(i=t.innerHTML){const r=i/.05;e.style.width=r+"%"}ratings.forEach(e=>{!function(e){i(e),r(),e.classList.contains("rating-set")&&function(e){e.querySelectorAll(".rating__item").forEach((n,s)=>{n.addEventListener("mouseenter",()=>{i(e),r(n.value)}),n.addEventListener("mouseleave",()=>{i(e),r()}),n.addEventListener("click",()=>{i(e),e.dataset.ajax?async function(e,i){if(!i.classList.contains("rating-sending")){i.classList.add("rating-sending");let e=await fetch("/resources/rating.json",{method:"GET"});if(e.ok){const n=await e.json();setTimeout(()=>{const e=n.newRating;t.innerHTML=e,r();let s=document.getElementById("snackbar-rating");s.className="show",setTimeout((function(){s.className=s.className.replace("show","")}),3e3),i.classList.remove("rating-sending")},500)}else alert("Ошибка"),i.classList.remove("rating-sending")}}(n.value,e):(t.innerHTML=s+1,r())})})}(e)}(e)})}ratings.length>0&&initRatings();
//# sourceMappingURL=item-page.js.map
