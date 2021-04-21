

export function createAPIDialog() {

    async function makeRequest(url, method='get', body, headers={}) {
        
        try {

            if (sessionStorage.authToken) {
                headers['X-Parse-Session-Token'] = sessionStorage.authToken;
            }
            
            headers['X-Parse-Application-Id'] = 'fQ2yhM2mWorJe0sGo6Rfb4raIwqKaxttVrcdIQq6';
            headers['X-Parse-REST-API-Key'] = 'FxnP6q2WuULKlQ0zPfcajIMbpHHP0wy5PI2oMsCd';
            
            const options = {
                'method': method,
                'headers': headers
            }

            if (body) {
                options['body'] = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            if (!url.includes('logout')) return await response.json();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getData(url, body, headers={}) {
        return await makeRequest(url, 'get', body, headers);
    }

    async function postData(url, body={}, headers={}) {
        headers['Content-Type'] = 'application/json';
        return await makeRequest(url, 'post', body, headers)
    }

    async function deleteRequest(url) {
        return await makeRequest(url, 'delete');
    }

    async function updateRequest(url, body) {
        return await makeRequest(url, 'put', body);
    }

    return {
        getData,
        postData,
        deleteRequest,
        updateRequest
    }
}
