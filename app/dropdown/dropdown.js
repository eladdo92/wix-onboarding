class DropDown {

    #rootNode = null;
    #triggerItemNode = null;
    #optionItemsRoot = null;
    
    constructor(parent, options, props) {
        //TODO: what happens when parameters are bad
        this.#rootNode = this.#makeDropDown(props.placeholder, options, !props.disabled);
        this.mount(parent);

        if (!props.openByDefault) {
            this.#hideOptionItems();
        }
    }

    #makeDropDown(placeholder, options, enabled) {
        const dropDown = this.#makeDropDownNode();
        this.#triggerItemNode = this.#makeTriggerItemNode(placeholder, enabled);
        dropDown.appendChild(this.#triggerItemNode);
        this.#optionItemsRoot = this.#makeOptionItems(options, enabled);
        dropDown.appendChild(this.#optionItemsRoot);
        this.#initOptionItemsClass();
        return dropDown;
    }

    #makeOptionItems(options, enabled) {
        const optionItemsNode = document.createElement('div');
        for (const option of options) {
            const optionItemNode = this.#makeListItemNode(option, enabled && !option.disabled);
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

    #makeTriggerItemNode(text, enabled) {
        const className = enabled ? 'trigger-item' : 'trigger-item disabled-trigger-item';
        const that = this;
        const eventListener = enabled ? function(event) {that.#handleTriggerItemClick(event)} : null;
        const triggerToggleNode = this.#makeTriggerToggleNode(text, '/Users/vladk/dev/wix-onboarding/app/dropdown/res/arrow.png');
        const triggerNode = this.#makeItemNode(triggerToggleNode, className, eventListener);
        return triggerNode;
    }

    #makeTriggerToggleNode(text, iconPath) {
        const rowNode = document.createElement('tr');
        const textContainerNode = document.createElement('td');
        textContainerNode.setAttribute('id', 'trigger-text-container');
        const textNode = this.#makeTextNode(text);
        textContainerNode.appendChild(textNode);
        rowNode.appendChild(textContainerNode);
        const iconContainerNode = document.createElement('td');
        const iconNode = document.createElement('img');
        iconNode.setAttribute('class', 'trigger-icon');
        iconNode.setAttribute('src', iconPath);
        iconContainerNode.appendChild(iconNode);
        rowNode.appendChild(iconContainerNode);
        return rowNode;
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

    #makeListItemNode(option, enabled) {
        if (option.type === 'text') {
            return this.#makeOptionItemNode(option.value, enabled);
        }else if (option.type === 'divider'){
            return this.#makeDividerItemNode();
        }
    }

    #makeDividerItemNode() {
        const dividerNode = document.createElement('li');
        dividerNode.setAttribute('class', 'divider-item');
        return dividerNode;
    }

    #makeOptionItemNode(text, enabled) {
        const className = enabled ? 'option-item' : 'option-item disabled-option-item';
        const that = this;
        const eventListener = enabled ? function(event) {that.#handleOptionItemClick(event, text)} : null;
        const optionNode = this.#makeItemNodeWithText(text, className, eventListener);
        return optionNode;
    }

    #handleOptionItemClick(event, option) {
        if (this.#isOpen()) {
            this.#hideOptionItems();
        }
        this.#updateTrigger(option);
    }

    #updateTrigger(text) {
        const triggerNode = this.#getTriggerTextContainer();
        triggerNode.textContent = text;
    }

    #getTriggerTextContainer() {
        // const triggerItemNode = this.#getTriggerNode();
        // console.log(triggerItemNode);
        return document.getElementById('trigger-text-container')
    }

    #getTriggerNode() {
        return this.#triggerItemNode;
    }

    #makeItemNodeWithText(text, className, onClickListener) {
        const textNode = this.#makeTextNode(text);
        return this.#makeItemNode(textNode, className, onClickListener);
    }

    #makeTextNode(text){ 
        return document.createTextNode(text)
    }

    #makeItemNode(innerNode, className, onClickListener) {
        const item = document.createElement('li');
        if (className){
            item.setAttribute('class', className);
        }
        if (onClickListener) {
            item.addEventListener('click', onClickListener);
        }
        if (innerNode) {
            item.appendChild(innerNode);
        }
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
