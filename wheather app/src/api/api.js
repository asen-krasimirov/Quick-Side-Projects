

export function createAPIDialog() {

    async function makeRequest(url, method='get', body, headers={}) {
        
        try {
            
            const options = {
                'method': method,
                'headers': headers,
                'mode': 'cors'
            }

            if (body) {
                options['body'] = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`${response.status} error has occurred!`);
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
