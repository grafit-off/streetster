function DynamicAdapt(t){this.type=t}DynamicAdapt.prototype.init=function(){const t=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(let t=0;t<this.nodes.length;t++){const e=this.nodes[t],r=e.dataset.da.trim().split(","),a={};a.element=e,a.parent=e.parentNode,a.destination=document.querySelector(r[0].trim()),a.breakpoint=r[1]?r[1].trim():"767",a.place=r[2]?r[2].trim():"last",a.index=this.indexInParent(a.parent,a.element),this.оbjects.push(a)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,(function(t){return"("+this.type+"-width: "+t.breakpoint+"px),"+t.breakpoint}),this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,(function(t,e,r){return Array.prototype.indexOf.call(r,t)===e}));for(let e=0;e<this.mediaQueries.length;e++){const r=this.mediaQueries[e],a=String.prototype.split.call(r,","),n=window.matchMedia(a[0]),c=a[1],i=Array.prototype.filter.call(this.оbjects,(function(t){return t.breakpoint===c}));n.addListener((function(){t.mediaHandler(n,i)})),this.mediaHandler(n,i)}},DynamicAdapt.prototype.mediaHandler=function(t,e){if(t.matches)for(let t=0;t<e.length;t++){const r=e[t];r.index=this.indexInParent(r.parent,r.element),this.moveTo(r.place,r.element,r.destination)}else for(let t=0;t<e.length;t++){const r=e[t];r.element.classList.contains(this.daClassname)&&this.moveBack(r.parent,r.element,r.index)}},DynamicAdapt.prototype.moveTo=function(t,e,r){e.classList.add(this.daClassname),"last"===t||t>=r.children.length?r.insertAdjacentElement("beforeend",e):"first"!==t?r.children[t].insertAdjacentElement("beforebegin",e):r.insertAdjacentElement("afterbegin",e)},DynamicAdapt.prototype.moveBack=function(t,e,r){e.classList.remove(this.daClassname),void 0!==t.children[r]?t.children[r].insertAdjacentElement("beforebegin",e):t.insertAdjacentElement("beforeend",e)},DynamicAdapt.prototype.indexInParent=function(t,e){const r=Array.prototype.slice.call(t.children);return Array.prototype.indexOf.call(r,e)},DynamicAdapt.prototype.arraySort=function(t){"min"===this.type?Array.prototype.sort.call(t,(function(t,e){return t.breakpoint===e.breakpoint?t.place===e.place?0:"first"===t.place||"last"===e.place?-1:"last"===t.place||"first"===e.place?1:t.place-e.place:t.breakpoint-e.breakpoint})):Array.prototype.sort.call(t,(function(t,e){return t.breakpoint===e.breakpoint?t.place===e.place?0:"first"===t.place||"last"===e.place?1:"last"===t.place||"first"===e.place?-1:e.place-t.place:e.breakpoint-t.breakpoint}))};const da=new DynamicAdapt("max");da.init();const productsBtn=document.querySelectorAll(".product__btn"),cartProductsList=document.querySelector(".cart__list"),cart=document.querySelector(".cart__wrapper"),cartQuantity=cart.querySelector(".cart__quantity-numb"),cartQuantityWord=cart.querySelector(".cart__word"),fullPrice=document.querySelector(".sum");let price=0;const randomId=()=>Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15),priceWithoutSpaces=t=>t.replace(/\s/g,""),normalPrice=t=>String(t).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 "),plusFullPrice=t=>price+=t,minusFullPrice=t=>price-=t,printQuantity=()=>{let t=cartProductsList.children.length;cartQuantity.textContent=t,0==t?(cartQuantityWord.textContent=" товара",cartQuantity.textContent="нет"):1==t?cartQuantityWord.textContent=" товар":t<5&&t>1?cartQuantityWord.textContent=" товара":t>=5&&(cartQuantityWord.textContent=" товаров")},printFullPrice=()=>{fullPrice.textContent=normalPrice(price)+" ₴"},generateCartProduct=(t,e,r,a)=>`\n\t\t<li class="cart__item">\n\t\t\t<article class="c-item" data-id="${a}">\n\t\t\t\t<img src="${t}" alt="${e}" class="c-item__image">\n\t\t\t\t<a href="item1.html" class="c-item__link">\n\t\t\t\t\t<h4 class="c-item__title">${e}</h4>\n\t\t\t\t\t<span class="c-item__price">${normalPrice(r)}</span>\n\t\t\t\t</a>\n\t\t\t\t<button class="c-item__delete" aria-label="Удалить товар">\n\t\t\t\t×\n\t\t\t\t</button>\n\t\t\t</article>\n\t\t</li>\n\t`,deleteProducts=t=>{let e=t.querySelector(".c-item").dataset.id;document.querySelector(`.product__item[data-id="${e}"]`).querySelector(".product__btn").disabled=!1;let r=parseInt(priceWithoutSpaces(t.querySelector(".c-item__price").textContent));minusFullPrice(r),printFullPrice(),t.remove(),printQuantity()};productsBtn.forEach(t=>{t.addEventListener("click",t=>{let e=t.currentTarget,r=e.closest(".product__item"),a=r.dataset.id,n=r.querySelector(".product__image--first").getAttribute("src"),c=r.querySelector(".product__name").textContent,i=priceWithoutSpaces(r.querySelector(".product__price").textContent),o=parseInt(priceWithoutSpaces(r.querySelector(".product__price").textContent));price+=o,printFullPrice(),cartProductsList.insertAdjacentHTML("afterbegin",generateCartProduct(n,c,i,a)),printQuantity(),e.disabled=!0})}),cartProductsList.addEventListener("click",t=>{t.target.classList.contains("c-item__delete")&&deleteProducts(t.target.closest(".cart__item"))});const navBurger=document.querySelector(".nav__burger"),navMenu=document.querySelector(".nav__menu"),body=document.querySelector("body"),navCart=document.querySelector(".nav__cart-btn"),menuClose=document.querySelector(".menu__close-field"),mediaQuery=window.matchMedia("(max-width: 991px)");function burgerToggle(){navBurger.classList.toggle("active"),navMenu.classList.toggle("active-flex"),setTimeout(()=>{navMenu.classList.toggle("active")},10),navCart.classList.toggle("active"),mediaQuery.matches||body.classList.remove("lock"),mediaQuery.matches&&body.classList.toggle("lock")}navBurger.addEventListener("click",()=>{burgerToggle()}),menuClose.addEventListener("click",()=>{burgerToggle()});const cartCloseFieldBtn=document.querySelector(".cart__close-field"),cartContent=document.querySelector(".cart");function cartOpen(){navBurger.classList.contains("active")?(cartContent.classList.toggle("active-flex"),setTimeout(()=>{cartContent.classList.toggle("active")},10)):mediaQuery.matches?mediaQuery.matches&&(cartContent.classList.toggle("active-flex"),setTimeout(()=>{navCart.classList.toggle("active"),cartContent.classList.toggle("active")},10),body.classList.toggle("lock")):(body.classList.remove("lock"),cartContent.classList.toggle("active-flex"),setTimeout(()=>{navCart.classList.toggle("active"),cartContent.classList.toggle("active")},10))}navCart.addEventListener("click",()=>{cartOpen()}),cartCloseFieldBtn.addEventListener("click",()=>{cartOpen()});const isiPhone=null!=navigator.userAgent.match(/iPhone/i),isiPad=null!=navigator.userAgent.match(/iPad/i),isiPod=null!=navigator.userAgent.match(/iPod/i);if(isiPhone||isiPad||isiPod){let e=document.querySelectorAll('[href^="#"]'),r=.2;for(let a=0;a<e.length;a++)e[a].addEventListener("click",(function(e){e.preventDefault();let a=window.pageYOffset,n=this.href.replace(/[^#]*(.*)/,"$1");t=document.querySelector(n).getBoundingClientRect().top,start=null,requestAnimationFrame((function e(c){null===start&&(start=c);let i=c-start,o=t<0?Math.max(a-i/r,a+t):Math.min(a+i/r,a+t);window.scrollTo(0,o),o!=a+t?requestAnimationFrame(e):location.hash=n}))}),!1)}const nav=document.querySelector(".nav"),menuWrapper=document.querySelector(".menu__wrapper"),cartWrapper=document.querySelector(".cart__wrapper");let prevScrollpos=window.pageYOffset;function navOpen(){0!=prevScrollpos?(nav.classList.add("nav--active"),menuWrapper.classList.add("menu__wrapper--onscroll"),cartWrapper.classList.add("cart__wrapper--onscroll")):(nav.classList.remove("nav--active"),menuWrapper.classList.remove("menu__wrapper--onscroll"),cartWrapper.classList.remove("cart__wrapper--onscroll"))}function navScroll(){window.onscroll=function(){let t=window.pageYOffset;prevScrollpos<t||(prevScrollpos=t)?(nav.classList.add("nav--active"),menuWrapper.classList.add("menu__wrapper--onscroll"),cartWrapper.classList.add("cart__wrapper--onscroll")):(nav.classList.remove("nav--active"),menuWrapper.classList.remove("menu__wrapper--onscroll"),cartWrapper.classList.remove("cart__wrapper--onscroll")),prevScrollpos=t}}navOpen(),navScroll(),document.querySelectorAll(".acordion-triger").forEach(t=>t.addEventListener("click",()=>{t.parentNode.classList.toggle("acordion--active")}));
//# sourceMappingURL=main.js.map
