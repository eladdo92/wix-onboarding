class DropDown {

    #element = null;
    #options = [];

    constructor(parent, options) {
        if (options) {
            this.#options = options;
        }
        this.#element = this.#makeDropDownNode();
        const stampNode = this.#makeTriggerItemNode('Favorite animal...');
        this.#element.appendChild(stampNode);
        parent.appendChild(this.#element);
    }

    #displayAllOptionItems() {
        this.#displayOptionItems(0, this.#options.length - 1);
    }

    #displayOptionItems(from, to) {
        from = Math.max(0, from);
        to = Math.min(to, this.#options.length - 1);

        for (let i=from; i<=to; i++) {
            const optionTag = this.#makeOptionItemNode(this.#options[i]);
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
        const stampNode = this.#makeOptionItemNode(text);
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

    #makeOptionItemNode(text) {
        const optionNode = document.createElement('li');
        optionNode.setAttribute('class', 'optionitem')
        const textNode = document.createTextNode(text);
        optionNode.appendChild(textNode);
        return optionNode;
    }
}
