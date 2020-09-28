import {BaseComponent} from "../BaseComponent.js";

const style = /*html*/ `
<style>
    * {
        font-family: 'Montserrat', sans-serif;
        color: #ccc;
    }

    
   

    .input-label {
        font-size: 14px;
        padding: 5px;
    }

    .input-main {
        margin-top: 4px;
        height: 40px;
        font-size: 15px;
        border: none;
        border-radius: 6px;
        background: #007acc;
        width: 100%;
        
    }
    
    .input-error {
        color: #007acc;
        font-size: 12px;
        padding: 5px;
    }
    
    .input-label:focus, .input-main:focus, .input-error:focus {
        background: #607a94;
        color: #001427;
        outline: none;
    }
</style>
`;

class InputWrapper extends BaseComponent {
    constructor() {
        super();

        this.props = {
            label: '',
            type: 'text',
            error: '',
            value: ''
        };
    }

    static get observedAttributes() {
        return ['label', 'type', 'error', 'value'];
    }

    render(){
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="input-wrapper">
                <label class="input-label" for="input">${this.props.label}</label>
                <input class="input-main" type="${this.props.type}" value="${this.props.value}">
                <div class="input-error">${this.props.error}</div>
            </div>
        `;
    }

    get value() {
        return this._shadowRoot.querySelector('.input-main').value;
    }
}

window.customElements.define('input-wrapper', InputWrapper);