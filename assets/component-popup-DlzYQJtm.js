function c(o,t){document.body.insertAdjacentHTML("afterBegin",`<widget-popup id="popup" title="${o||""}">${t}</widget-popup>`);const e=document.getElementById("popup"),d=document.getElementById("close"),s=document.getElementById("overlay");document.documentElement.style.scrollBehavior="auto",document.body.style.overflow="hidden",s.addEventListener("click",function(n){n.target.dataset.id==="overlay"&&e.remove(),document.body.style.overflow="",document.documentElement.style.scrollBehavior=""}),d.addEventListener("click",function(n){e.remove(),document.body.style.overflow="",document.documentElement.style.scrollBehavior=""})}class p extends HTMLElement{constructor(){super();const t=this.getAttribute("title")||"",e=this.innerHTML;this.innerHTML=`
            <div class="popup" id="overlay" data-id="overlay">
                <div class="popup__main">
                    <div class="popup__header">
                        <p class="popup__h2">${t}</p>
                        <p class="popup__close" id="close">&times;</p>
                    </div>
                    <div class="popup__content">
                        ${e}
                    </div>
                </div>
            </div>
        `}}export{p as C,c as i};
