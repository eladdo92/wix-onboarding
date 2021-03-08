function addSelector(root) {
    const dropDown = makeDropDown('Animals', 'animals', ['Monkey', 'Lemur', 'Tuna', 'Chipmunk', 'Gazelle', 'Human']);
    root.appendChild(dropDown);
}

function makeDropDown(name, id, options) {
    const selectNode = document.createElement('select');
    selectNode.setAttribute('name', name);
    selectNode.setAttribute('id', id);
    selectNode.setAttribute('class', 'dropdown');
    const stampNode = makeStamp('Favorite animal...');
    selectNode.appendChild(stampNode);
    for (const option of options) {
        const optionTag = makeOption(option);
        selectNode.appendChild(optionTag);
    }
    return selectNode;
}

function makeStamp(text) {
    const stampNode = makeOption(text);
    stampNode.setAttribute('selected', 'true');
    stampNode.setAttribute('class', 'stamp');
    return stampNode;
}

function makeOption(text) {
    const optionNode = document.createElement('option');
    const textNode = document.createTextNode(text);
    optionNode.appendChild(textNode);
    return optionNode;
}