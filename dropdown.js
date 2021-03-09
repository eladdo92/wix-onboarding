class DropDown {

    #element = null;
    #options = [];

    constructor(parent, options, props) {
        if (options) {
            this.#options = options;
        }
        this.#element = this.#makeDropDownNode();
        //TODO: what happens when there is no placeholder
        const triggerNode = this.#makeTriggerItemNode(props['placeholder']);
        this.#element.appendChild(triggerNode);
        this.mount(parent);

        if (props['openByDefault']) {
            this.#displayAllOptionItems();
        }
    }

    #displayAllOptionItems() {
        this.#displayOptionItems(0, this.#options.length - 1);
    }

    #displayOptionItems(from, to) {
        from = Math.max(0, from);
        to = Math.min(to, this.#options.length - 1);

        for (let i=from; i<=to; i++) {
            const optionTag = this.#makeListItemNode(this.#options[i]);
            this.#element.appendChild(optionTag);
        }
    }

    #hideAllOptionItems() {
        while (this.#element.children.length > 1) {
            this.#element.removeChild(this.#element.lastChild);
        }
    }

    #makeDropDownNode() {
        const listNode = document.createElement('ol');
        listNode.setAttribute('class', 'dropdown');
        return listNode;
    }

    #makeTriggerItemNode(text) {
        const stampNode = this.#makeItemNode(text);
        stampNode.setAttribute('class', 'triggeritem');
        const that = this;
        stampNode.addEventListener('click', function(event) {that.#handleTriggerItemClick(event)});
        return stampNode;
    }

    #handleTriggerItemClick(event) {
        if (this.#isOpen()) {
            this.#hideAllOptionItems();
        }else{
            this.#displayAllOptionItems();
        }
    }

    #isOpen() {
        return this.#element.children.length > 1;
    }

    #makeListItemNode(option) {
        if (option['type'] === 'text') {
            return this.#makeOptionItemNode(option['value']);
        }else if (option['type'] === 'divider'){
            return this.#makeDividerItemNode();
        }
    }

    #makeDividerItemNode() {
        const dividerNode = document.createElement('li');
        dividerNode.setAttribute('class', 'divideritem');
        return dividerNode;
    }

    #makeOptionItemNode(text) {
        const optionNode = this.#makeItemNode(text);
        optionNode.setAttribute('class', 'optionitem');
        const that = this;
        optionNode.addEventListener('click', function(event) {that.#handleOptionItemClick(event, text)});
        return optionNode;
    }

    #handleOptionItemClick(event, option) {
        if (this.#isOpen()) {
            this.#hideAllOptionItems();
        }
        this.#updateTrigger(option);
    }

    #updateTrigger(text) {
        const triggerNode = this.#getTriggerNode();
        triggerNode.textContent = text;
    }

    #getTriggerNode() {
        return this.#element.children[0];
    }

    #makeItemNode(text) {
        const item = document.createElement('li');
        const textNode = document.createTextNode(text);
        item.appendChild(textNode);
        return item;
    }

    mount(parent) {
        parent.appendChild(this.#element);
    }

    unmount() {
        if (this.#element.parentNode) {
            this.#element.parentNode.removeChild(this.#element);
        }
    }
}
