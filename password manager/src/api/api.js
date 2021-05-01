

export function createApiDialog() {

    async function makeRequest(url, method, body={}, headers={}) {

        try {
            
            if (sessionStorage.getItem("authToken")) headers["X-Parse-Session-Token"] = sessionStorage.getItem("authToken");

            headers["X-Parse-Application-Id"] = "n1lGH5ydJ8p7INSnYoH7dWZ0xZUfT8mRL2C9IXhI";
            headers["X-Parse-REST-API-Key"] = "aLeLdPku713bxSfF8f4Dfyxm4f3CF9sY6l8lvoEM";

            const options = { method, headers }
            if (JSON.stringify(body) !== "{}") options["body"] = JSON.stringify(body);
            
            const response = await fetch(url, options);

            if (!response.ok) throw new Error(`An ${response.status} error has occurred!`);

            return await response.json();

        } catch (error) { console.error(error.message) }
    }

    async function getRequest(url, headers={}) {
        return await makeRequest(url, "GET", {}, headers);
    }

    async function postRequest(url, body={}, headers={}) {
        headers = { "Content-Type": "application/json" }
        return await makeRequest(url, "POST", body, headers);
    }
    
    async function updateRequest(url, body={}, headers={}) {
        headers = { "Content-Type": "application/json" }
        return await makeRequest(url, "PUT", body, headers);
    }

    async function deleteRequest(url) {
        return await makeRequest(url, "DELETE");
    }

    return {
        getRequest,
        postRequest,
        updateRequest,
        deleteRequest
    }
}