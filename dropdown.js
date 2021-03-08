function addSelector(root) {
    const dropDown = makeDropDown('Animals', 'animals', ['Monkey', 'Lemur', 'Tuna', 'Chipmunk', 'Gazelle', 'Human']);
    root.appendChild(dropDown);
}

function makeDropDown(name, id, options) {
    const listNode = document.createElement('ol');
    listNode.setAttribute('id', id);
    listNode.setAttribute('class', 'dropdown');
    const stampNode = makeStamp('Favorite animal...');
    listNode.appendChild(stampNode);
    for (const option of options) {
        const optionTag = makeOption(option);
        listNode.appendChild(optionTag);
    }
    return listNode;
}

function makeStamp(text) {
    const stampNode = makeOption(text);
    // stampNode.setAttribute('selected', 'true');
    // stampNode.setAttribute('class', 'stamp');
    return stampNode;
}

function makeOption(text) {
    const optionNode = document.createElement('li');
    const textNode = document.createTextNode(text);
    optionNode.appendChild(textNode);
    return optionNode;
}

