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

    /**
     * in html ra ngoài màn hình
     * gắn sự kiện cho các thẻ bên trong component
     */
    render() {
        this._shadowRoot.innerHTML = `
          
        `
    }
    /**
     * được gọi sau khi component được sinh ra, sau khi render()
     * gọi 1 lần duy nhất
     */
    componentDidMount() {
    }
    /**
     * được gọi sau khi props hoặc state thay đổi, sau khi render()
     */
    componentDidUpdate() {
    }
    /**
     * được gọi trước khi component biến mất
     */
     componentWillUnMout() {
     }
}

export {BaseComponent};