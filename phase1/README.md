# Phase 1

Your task: build a simple dropdown using only HTML, CSS, and Javascript. It only needs to run in Chrome, so don't worry about browser compatiblity.

Your dropdown (sometimes called ComboBox or Select component) should look similar to this:

![dropdown](../assets/dropdown/basic-dropdown.png)

When toggled, by either clicking on the input or clicking on the icon, it will display a set of options, like so:

![dropdown-open](../assets/dropdown/basic-dropdown-open.png)

Click on an option:

![dropdown-select](../assets/dropdown/basic-dropdown-selected.png)

Will close select the clicked option and close the dropdown, displaying the selected option in the input.

![dropdown-select-closed](../assets/dropdown/basic-dropdown-closed-selected.png)

## API

The usage of the dropdown component is as follows.

`const dropdown = new Dropdown(rootElement, options, props)`

Where, `rootElement` is an HTMLElement to render the dropdown into, `options` is an array of options to display in the dropdown menu, and `props` is an object used to configure the dropdown (defined in more detail below).

This means that your Javascript file will look something like:

```js
/** Dropdown implementation

* ...

*/

const rootElement = document.getElementById("root");

const options = ["monkey", "lemur", "hippo"];

const props = {
  placeholder: "Favorite animals...",
};

const dropdown = new Dropdown(rootElement, options, props);
```

The set of supported props is as follows:

```ts
placeholder: string; // Placeholder text to display in the input when a selection hasn't been made

openByDefault: boolean; // Should the dropdown start open? i.e. should the dropdown be open before a user clicks on it

disabled: boolean; // Should the dropdown appear in a disabled state
```

For the last option, if set the true, the dropdown should ignore any clicks and be displayed with a grey overlay, like so:

![dropdown-disabled](../assets/dropdown/disabled-dropdown.png)

## Styling

The majority of the styling is left up to you. Look to the web for inspiration. There are many examples of good-looking dropdowns, but don't get too carried away - the focus should be on the Javascript implementation. The only _required_ styling is this: when hovering over the dropdown icon, the cursor should turn into a pointer. Same as when hovering over items in the dropdown menu. In addition, hovering over items in the dropdown menu should change the background colour to something else, so that it's clear to a user which item they're hovering over.

Also, when the dropdown is disabled the cursor should not become a pointer.

## Additional Tasks

If you've finished up the dropdown, good job! Here are some additional things you can implement - yay!

- Change the type of `options` to an array of objects, in order to support a `divider` type of option which adds a horizontal line between options.
- Adding to this, let users disable specific options from the list.
- Add a cleanup method to the instance returned by calling `new Dropdown(...)`, so that users can unmount the component later without removing the root node. (e.g. they should be able to call `dropdown.unmount()`.
- Add support for scrolling in the menu when the list of options gets too long.
- Is your component performant? Pass in a set of 1000 options. 10,000 options. Does it lag? What happens when you scroll?

## Next Steps

Now that you've finished (and hopefully had a chance to try some of the additional tasks), it's time for [Phase 2](./PHASE_2.md), where you'll rewrite the dropdown in Typescript. 
