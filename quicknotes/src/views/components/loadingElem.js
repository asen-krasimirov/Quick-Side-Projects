import { html } from "../../lib.js";


export const loadingElement = () => html`
<div id="loaderContainer">
    <div id="loader" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>
`;