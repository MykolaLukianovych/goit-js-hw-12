
export default getPictures;

function getPictures(query) {
    const BASE_URL = "https://pixabay.com/api/";
    const KEY = '47394920-a4032b33a38ab12c89a369f6a';
    
    const params = new URLSearchParams({
        key: KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    });

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        
};
