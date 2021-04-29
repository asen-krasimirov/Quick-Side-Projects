import { html, render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";


export {
    html,
    render,
    page,
    createElement,
    makeElementsDraggable
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


function makeElementsDraggable() {

    /* 
        Open source code from: Web Dev Simplified
        Making HTML elements draggable
    */

    const draggables = document.querySelectorAll('.draggable')
    const containers = document.querySelectorAll('.container')
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        })
    
        draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        })
    })
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')

            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
            
        })
    })
    
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.bottom - box.left / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
}