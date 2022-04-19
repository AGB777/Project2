const handleError = (message) => {
    document.querySelector('#errorMessage').textContent = message;
    document.querySelector('#errorMessenger').classList.remove('hidden');
}

const hideError = () => {
    document.querySelector('#errorMessenger').classList.add('hidden');
}

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    hideError();
    
    if(result.redirect) {
        window.location = result.redirect;
    }
    
    if(result.error) {
        handleError(result.error);
    }
    
    if(handler){
        handler(result);
    }
}

module.exports = {
    handleError,
    hideError,
    sendPost,
}