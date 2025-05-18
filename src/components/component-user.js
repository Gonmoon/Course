import { API_URL } from "../api/api.js";
import "../styles/adminProduct.scss";
import { initAlert } from "../utils/initAlert.js";

export class ComponentUser extends HTMLElement {
	constructor() {
    	super();
  	}
}

customElements.define("component-user", ComponentUser);