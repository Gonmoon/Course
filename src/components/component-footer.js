export class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
          <footer class="footer">
            <div class="footer__skinn">
              <img src="./src/img/logo.svg" alt="logo" class="footer__logo">
              <p class="footer__wise">The wise man therefore always holds in these matters to this principle</p>
              <p class="footer__web footer__web_first">Designed by <a class="footer__link">Webestica</a></p>
              <p class="footer__web">Powered by <a class="footer__link">Webflow</a></p>
            </div>
            <div class="footer__pages">
              <h2 class="footer__header">Pages</h2>
              <div class="footer__lists">
                  <ul class="footer__ul-1">
                    <li class="footer__li">Home</li>
                    <li class="footer__li">Home 2</li>
                    <li class="footer__li">Shop All</li>
                    <li class="footer__li">Our Story</li>
                    <li class="footer__li">Blog</li>
                    <li class="footer__li">FAQs</li>
                  </ul>
                  <ul class="footer__ul-2">
                    <li class="footer__li">Contact Us</li>
                    <li class="footer__li">Instructions</li>
                    <li class="footer__li">Style Guide</li>
                    <li class="footer__li">Licenses</li>
                    <li class="footer__li">Changelog</li>
                  </ul>
                </div>
              </div>
            <div class="footer__contacts">
              <h2 class="footer__header">Contact us</h2>
              <p class="footer__contact-text">Have questions or suggestions?</p>
              <a href="" class="footer__contact">hello@webestica.com</a>
              <p class="footer__contact-text">Need assistance? Give us a call.</p>
              <a href="" class="footer__contact">+01 598 269 4756</a>
            </div>
            <div class="footer__for-you">
              <h2 class="footer__header">We’re here for you</h2>
              <div class="footer__schedule">
                <p class="footer__schedule-text">Monday - Thursday: 9:30 - 18:00</p>
                <p class="footer__schedule-text">Friday: 9:30 - 15:00</p>
              </div>
              <div class="footer__networks">
                <img src="./src/img/face.svg" alt="network" class="footer__network">
                <img src="./src/img/inst.svg" alt="network" class="footer__network">
                <img src="./src/img/p.svg" alt="network" class="footer__network">
                <img src="./src/img/x.svg" alt="network" class="footer__network">
              </div>
            </div>
          </footer>
        `;
    }
}
