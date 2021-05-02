import { getAllPasswordsByUserId, logNewPassword, logoutUser, deletePass } from "../api/data.js";
import { html, page } from "../lib.js";


const mainPageTemplate = ({ passwordCollection, onGenerate, onSave }) => html`
<section id="mainPage">
    <div id="passHolder" class="main-container pass-container">
        <h1>Saved Passwords</h1>
        ${passwordCollection.map(data => passwordTemplate(data.passName, data.passValue, data.objectId))}
    </div>

    <div class="main-container pass-generate">
        <h1>Generate Password</h1>
        <input class="smallBtn passHolder" type="text" placeholder="click Generate..." readonly />
        <input class="smallBtn customRedBtn" type="button" value="Generate" @click=${event => onGenerate(event.target.parentNode.children[1])} />
    </div>

    
    <div class="main-container pass-saver">
        <h1>Save Password</h1>
        <form @submit=${onSave}>
            <input class="smallBtn passHolder" name="passName" type="text" placeholder="Enter Save Name" />
            <input class="smallBtn passHolder" name="passValue" type="text" placeholder="Enter Password" />
            <input class="smallBtn customRedBtn" type="submit" value="Save" />
        </form>
    </div>

    <input class="smallBtn customRedBtn" type="button" id="logoutBtn" value="Logout" @click=${onLogout}>
</section>`;

const passwordTemplate = (name, password, passId) => html`
<div>
    <input class="smallBtn passHolder" type="text" value=${name} @click=${event => onPassReview(event.target, password)} readonly/>
    <input class="smallBtn customRedBtn deleteBtn" value="Remove" type="button" @click=${event => onPasswordDelete(event.target.parentNode, passId)}>
</div>
`;

function onPassReview(target, password) { 
    target.classList.add("clickedHolder");
    target.value = password;
}


export async function showMainPage(context) {
    const ownerId = sessionStorage.getItem("userId");
    const passwordCollection = await getAllPasswordsByUserId(ownerId);
    
    renderPage();
    
    function renderPage() { context.renderContent(mainPageTemplate({ passwordCollection, onGenerate, onSave })); }

    async function onSave(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        const passName = formData.get("passName");
        const passValue = formData.get("passValue");

        try {
            
            const response = (await logNewPassword({ passName, passValue, ownerId }));
            passwordCollection.push({ passName, passValue, objectId: response.objectId });
            form.reset();
            renderPage();

        } catch (error) { alert(error.message); }
    }

    function onGenerate(target) {
        const randomPass = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
        target.value = randomPass;
    }
}


async function onLogout() {
    await logoutUser();
    sessionStorage.removeItem("authToken");
    page.redirect("/home");
}

async function onPasswordDelete(target, passId) {
    await deletePass(passId);
    target.remove();
}