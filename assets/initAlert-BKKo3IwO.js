class a extends HTMLElement{constructor(){super(),this._duration=parseInt(this.getAttribute("data-duration"))||3e3,this._hideTimeout=null,this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
      <style>
        .alert-box {
          position: fixed;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: black;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          font-family: sans-serif;
          z-index: 9999;
          min-width: 200px;
          text-align: center;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .alert-box.visible {
          bottom: 20px;
          opacity: 1;
        }
      </style>
      <div class="alert-box" id="alertBox">${this.innerHTML}</div>
    `}show(i,t=this._duration){const e=this.shadowRoot.getElementById("alertBox");i&&(e.textContent=i),e.classList.add("visible"),clearTimeout(this._hideTimeout),this._hideTimeout=setTimeout(()=>{e.classList.remove("visible"),setTimeout(()=>this.remove(),300)},t)}disconnectedCallback(){clearTimeout(this._hideTimeout)}}let s=!1;function r(o,i=3e3){s||(customElements.define("custom-alert",a),s=!0),document.querySelectorAll("custom-alert").forEach(e=>e.remove());const t=document.createElement("custom-alert");t.setAttribute("data-duration",i.toString()),t.innerHTML=o,document.body.appendChild(t),t.show(o)}export{r as i};
