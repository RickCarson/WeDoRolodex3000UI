
const ContactsUrl = "https://localhost:7131/api/Contacts/";

const ApiGet = async (url) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

const ApiDelete = async (url) => {
    const response = await fetch(url, { method: 'DELETE' });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

const ApiPost = async (url, body) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};

const ApiPut = async (url, body) => {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, requestOptions);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
};


export { ApiGet, ApiDelete, ApiPost, ApiPut, ContactsUrl}