import { html, render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";


export {
    html,
    render,
    page,
    createElement
};


function createElement(type, attributes={}, children=[]) {

    /* Factory for custom elements */

    const newElem  = document.createElement(type);

    Object.keys(attributes).forEach(attr => {
        newElem[attr] = attributes[attr];
    });

    children.forEach(child => {
        newElem.appendChild(child);
    });

    return newElem;
}