import { createNote, deleteNote, getNotesByUser, logOutUser, updateNote } from "../api/data.js";
import { html, page } from "../lib.js";


const loggedPageTemplate = ({ notesData, addNote, onEdit, onDelete }) => html`
<section id="loggedInView">
    <button class="customBtn" id="logoutBtn">
        <i class="fas fa-sign-out-alt"></i> logout
    </button>
    <button class="add customBtn" id="add" @click=${() => addNote()}>
        <i class="fas fa-plus"></i> add note
    </button>

    <div id="noteHolder">
        ${notesData.map((data, index) => noteTemplate({ data, index, addNote, onEdit, onDelete }))}
    </div>

    <button id="undoBtn" class="hidden">click to undo</button>

</section>`;


const noteTemplate = ({ data, index, addNote, onEdit, onDelete }) => html`
<div id=${`note-` + index} class="note">
    <div class="tools">
        <button class="addNote" @click=${() => addNote()}><i class="fas fa-plus"></i></button>

        <button class="edit" @click=${event=> onEdit(data.objectId, event.target.parentNode.parentNode)}><i
                class="fas fa-edit"></i></button>
        <button class="save" style="display: none;"><i class="far fa-save"></i></i></button>

        <button class="delete" @click=${event=> { onDelete(data.objectId, event.target.parentNode.parentNode.parentNode)
            }}><i class="fas fa-trash-alt"></i></button>
    </div>
    <textarea class="main" disabled>${data.text}</textarea>
    <textarea class="text" style="display: none;"></textarea>
</div>`


export async function showLoggedPage(context) {
    let ownerId = sessionStorage.userId;
    const notesData = await getNotesByUser(ownerId);

    renderPage();
    document.getElementById("logoutBtn").addEventListener("click", onLogout);
    const undoBtn = document.getElementById("undoBtn");

    // make notes moveable;
    // attachMovingListeners();

    function renderPage() {
        context.renderContent(loggedPageTemplate({ notesData, addNote, onEdit, onDelete, onSave }));
    }
    
    function onEdit(id, target) {
        target = (target.className == "tools") ? target.parentNode : target;
        const editBtn = target.querySelector("button.edit");
        const saveBtn = target.querySelector("button.save");
        const mainTextArea = target.querySelector("textarea.main");
        const textTextArea = target.querySelector("textarea.text");

        textTextArea.textContent = mainTextArea.textContent;
        saveBtn.addEventListener("click", onClick);
        toggleButtons();

        function onClick() {
            let newText = target.querySelector("textarea.text").value;
            onSave(id, newText);
            mainTextArea.textContent = newText;
            saveBtn.removeEventListener("click", onClick);
            toggleButtons();
        }

        function toggleButtons() {
            editBtn.style.display = (editBtn.style.display == "none") ? "inline" : "none";
            saveBtn.style.display = (saveBtn.style.display == "none") ? "inline" : "none";

            mainTextArea.style.display = (mainTextArea.style.display == "none") ? "inline" : "none";
            textTextArea.style.display = (textTextArea.style.display == "none") ? "inline" : "none";
        }
    }

    async function onSave(id, text) {
        await updateNote(id, { text });
        const note = notesData.find(elem => elem.objectId === id);
        note.text = text;
    }

    async function onDelete(id, target) {
        target = (target.className == "tools") ? target.parentNode : target;
        const note = notesData.find(elem => elem.objectId === id);
        target = (target.className == "") ? target.children[notesData.indexOf(note)] : target;

        // add undo button
        target.remove();
        await deleteNote(id);
        displayUndo(note.text);
    }

    function displayUndo(text) {
        undoBtn.classList.remove("hidden");

        undoBtn.addEventListener("click", onClick);

        setTimeout(hideBtn, 7000);

        function onClick() { 
            addNote(text);
            hideBtn();
        }

        function hideBtn() {
            undoBtn.removeEventListener("click", onClick);
            undoBtn.classList.add("hidden");
        }
    }

    async function addNote(text=" ") {
        const response = await createNote({ text });
        notesData.push({ objectId: response.objectId, text });
        renderPage();
    }

    /*
    function attachMovingListeners() {
        const defaultDragValue = createElement("div");
        let dragValue = defaultDragValue;

        notesData.forEach((_, index) => makeMovable(index));

        function makeMovable(index) {
            const element = document.getElementById(`note-` + index);
            element.style.position = "absolute";
            element.addEventListener("mousedown", () => dragValue = element);
        }

        document.addEventListener("mouseover", event => {
            let x = event.pageX;
            let y = event.pageY;

            dragValue.style.left = x + "px";
            dragValue.style.top = y + "px";
        });

        document.addEventListener("mouseup", () => dragValue = defaultDragValue);
    }
    */

}

async function onLogout() {
    await logOutUser();
    sessionStorage.clear();
    page.redirect("/home");
}