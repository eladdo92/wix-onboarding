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

    #displayAllItems() {
        this.#displayItems(0, this.#options.length - 1);
    }

    #displayItems(from, to) {
        from = Math.max(0, from);
        to = Math.min(to, this.#options.length - 1);

        for (let i=from; i<=to; i++) {
            const optionTag = this.#makeOptionItemNode(this.#options[i]);
            this.#element.appendChild(optionTag);
        }
    }

    #makeDropDownNode() {
        const listNode = document.createElement('ol');
        listNode.setAttribute('class', 'dropdown');
        return listNode;
    }

    #makeTriggerItemNode(text) {
        const stampNode = this.#makeOptionItemNode(text);
        const that = this;
        stampNode.addEventListener('click', function(event) {that.#displayAllItems()});
        return stampNode;
    }

    #makeOptionItemNode(text) {
        const optionNode = document.createElement('li');
        const textNode = document.createTextNode(text);
        optionNode.appendChild(textNode);
        return optionNode;
    }
}
