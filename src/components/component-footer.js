export class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
          <footer class="footer">
            <div class="footer__skinn">
              <img src="./src/img/logo.svg" alt="logo" class="footer__logo">
              <p class="footer__wise" data-i18n="footer-wise">The wise man therefore always holds in these matters to this principle</p>
              <p class="footer__web footer__web_first" data-i18n="footer-designed">Designed by <a class="footer__link">Webestica</a></p>
              <p class="footer__web" data-i18n="footer-powered">Powered by <a class="footer__link">Webflow</a></p>
            </div>
            <div class="footer__pages">
              <h2 class="footer__header" data-i18n="footer-pages-header">Pages</h2>
              <div class="footer__lists">
                  <ul class="footer__ul-1">
                    <li class="footer__li" data-i18n="footer-page-home">Home</li>
                    <li class="footer__li" data-i18n="footer-page-home2">Home 2</li>
                    <li class="footer__li" data-i18n="footer-page-shop-all">Shop All</li>
                    <li class="footer__li" data-i18n="footer-page-our-story">Our Story</li>
                    <li class="footer__li" data-i18n="footer-page-blog">Blog</li>
                    <li class="footer__li" data-i18n="footer-page-faqs">FAQs</li>
                  </ul>
                  <ul class="footer__ul-2">
                    <li class="footer__li" data-i18n="footer-page-contact-us">Contact Us</li>
                    <li class="footer__li" data-i18n="footer-page-instructions">Instructions</li>
                    <li class="footer__li" data-i18n="footer-page-style-guide">Style Guide</li>
                    <li class="footer__li" data-i18n="footer-page-licenses">Licenses</li>
                    <li class="footer__li" data-i18n="footer-page-changelog">Changelog</li>
                  </ul>
                </div>
              </div>
            <div class="footer__contacts">
              <h2 class="footer__header" data-i18n="footer-contact-header">Contact us</h2>
              <p class="footer__contact-text" data-i18n="footer-contact-question">Have questions or suggestions?</p>
              <a href="" class="footer__contact" data-i18n="footer-contact-email">hello@webestica.com</a>
              <p class="footer__contact-text" data-i18n="footer-contact-assistance">Need assistance? Give us a call.</p>
              <a href="" class="footer__contact" data-i18n="footer-contact-phone">+01 598 269 4756</a>
            </div>
            <div class="footer__for-you">
              <h2 class="footer__header" data-i18n="footer-support-header">We’re here for you</h2>
              <div class="footer__schedule">
                <p class="footer__schedule-text" data-i18n="footer-schedule-mon-thu">Monday - Thursday: 9:30 - 18:00</p>
                <p class="footer__schedule-text" data-i18n="footer-schedule-fri">Friday: 9:30 - 15:00</p>
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
