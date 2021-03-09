class DropDown {

    #rootNode = null;
    #triggerItemNode = null;
    #optionItemsRoot = null;
    
    #options = [];

    constructor(parent, options, props) {
        if (options) {
            this.#options = options;
        }
        this.#rootNode = this.#makeDropDownNode();
        //TODO: what happens when there is no placeholder
        this.#triggerItemNode = this.#makeTriggerItemNode(props['placeholder']);
        this.#rootNode.appendChild(this.#triggerItemNode);
        this.#optionItemsRoot = this.#makeOptionItems(this.#options);
        this.#rootNode.appendChild(this.#optionItemsRoot);
        this.#initOptionItemsClass();
        this.mount(parent);
        
        if (!props['openByDefault']) {
            this.#hideOptionItems();
        }
    }

    #makeOptionItems(options) {
        const optionItemsNode = document.createElement('div');
        for (const option of options) {
            const optionItemNode = this.#makeListItemNode(option);
            optionItemsNode.appendChild(optionItemNode);
        }
        return optionItemsNode;
    }

    #initOptionItemsClass() {
        this.#optionItemsRoot.setAttribute('class', 'option-items')
    }

    #showOptionItems() {
        this.#initOptionItemsClass();
    }

    #hideOptionItems() {
        this.#optionItemsRoot.setAttribute('class', 'option-items hidden-option-items')
    }

    #makeDropDownNode() {
        const listNode = document.createElement('ol');
        listNode.setAttribute('class', 'dropdown');
        return listNode;
    }

    #makeTriggerItemNode(text) {
        const stampNode = this.#makeItemNode(text);
        stampNode.setAttribute('class', 'trigger-item');
        const that = this;
        stampNode.addEventListener('click', function(event) {that.#handleTriggerItemClick(event)});
        return stampNode;
    }

    #handleTriggerItemClick(event) {
        if (this.#isOpen()) {
            this.#hideOptionItems();
        }else{
            this.#showOptionItems();
        }
    }

    #isOpen() {
        return !this.#optionItemsRoot.getAttribute('class').includes('hidden-option-items');
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
        dividerNode.setAttribute('class', 'divider-item');
        return dividerNode;
    }

    #makeOptionItemNode(text) {
        const optionNode = this.#makeItemNode(text);
        optionNode.setAttribute('class', 'option-item');
        const that = this;
        optionNode.addEventListener('click', function(event) {that.#handleOptionItemClick(event, text)});
        return optionNode;
    }

    #handleOptionItemClick(event, option) {
        if (this.#isOpen()) {
            this.#hideOptionItems();
        }
        this.#updateTrigger(option);
    }

    #updateTrigger(text) {
        const triggerNode = this.#getTriggerNode();
        triggerNode.textContent = text;
    }

    #getTriggerNode() {
        return this.#triggerItemNode;
    }

    #makeItemNode(text) {
        const item = document.createElement('li');
        const textNode = document.createTextNode(text);
        item.appendChild(textNode);
        return item;
    }

    mount(parent) {
        parent.appendChild(this.#rootNode);
    }

    unmount() {
        if (this.#rootNode.parentNode) {
            this.#rootNode.parentNode.removeChild(this.#rootNode);
        }
    }
}
