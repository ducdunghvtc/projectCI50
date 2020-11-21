class BaseComponent extends HTMLElement {
    props;
    state;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode : "open"});
        this.props = {};
        this.state = {};
    }

    connectedCallback() {
        this.render();
        this.componentDidMount();
    }

    attributeChangedCallback(name,oldValue,newValue) {
        this.props[name] = newValue;
        this.render();
        this.componentDidUpdate();
    }

    disconnectCallback() {
        this.componentWillUnMout();
    }

    setState(newState) {
        this.state = newState;
        this.render();
        this.componentDidUpdate();
    }

    render() {
        this._shadowRoot.innerHTML = `
          
        `
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

     componentWillUnMout() {
     }
}

export {BaseComponent};