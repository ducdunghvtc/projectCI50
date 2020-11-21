import {BaseComponent} from './BaseComponent.js'

const style = /* html */ `
<style>
    * {
        font-family: 'Titillium Web', sans-serif;
        text-align: center;
    }
    .main-screen {
        border: 0;
        background-size: cover;
        width: 100%;
	    min-height:100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15em 0 1em;
    }


</style>
`;

class MainScreen extends BaseComponent {

    render(){
        this._shadowRoot.innerHTML = `
        ${style}
        <section class='main-screen'></section>
        `;
    }
}

window.customElements.define('main-screen', MainScreen)