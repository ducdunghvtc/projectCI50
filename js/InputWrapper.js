import {BaseComponent} from './BaseComponent.js';

const style = `
<style>
    * {
        font-family: 'Titillium Web', sans-serif;
        color: black;
    }
    .input-label {
        text-transform: uppercase;
        padding: 5px;
        font-size: 20px;
        color: black;
    }
    .input-main {
        font-size: 20px;
        border: 2px solid black;
        width: 35%;
        height: 30px;
        margin-top: 4px;
        border-radius: 6px;
        background: transparent;
        justify-content: center;
    }
    .input-error {
        font-size: 14px;
        padding: 3px;
        color: 	#4EFF0B;
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