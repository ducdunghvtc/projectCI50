import {BaseComponent} from './BaseComponent.js';

const style = `
<style>
    * {
        font-family: 'Titillium Web', sans-serif;
        color: black;
    }
    .input-label {
        font-size: 20px;
        color: #3d0080;
    }
    .input-main {
        font-size: 20px;
        border: 1px solid #3d0080;
        width: 35%;
        height: 30px;
        margin-top: 4px;
        border-radius: 20px;
        background: #70c5ce;
        justify-content: center;
    }
    .input-error {
        font-size: 14px;
        padding: 3px;
        color: 	red;
    }

    .input-label:focus, .input-main:focus, .input-error:focus {
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

    static get observedAttributes(){
        return ['label','type','error','value']
    }

    render(){
        this._shadowRoot.innerHTML = /* html */ `
        ${style}
        <div class='input-wrapper'>
            <label class='input-label' for="input">${this.props.label}</label>
            <br>
            <input class='input-main' type="${this.props.type}" value='${this.props.value}'>
            <div class='input-error'>${this.props.error}</div>
        </div>
        `;
    }

    get value() {
        return this._shadowRoot.querySelector('.input-main').value;
    }
}

window.customElements.define('input-wrapper', InputWrapper)
