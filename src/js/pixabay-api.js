
import axios from "axios";


export default async function getPictures(query, page = 1, perPage = 15) {
    const BASE_URL = "https://pixabay.com/api/";
    const KEY = '47394920-a4032b33a38ab12c89a369f6a';
    
    const params = new URLSearchParams({
        key: KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: perPage,
    });

    try {
        const response = await axios(BASE_URL, { params });
        return response.data;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Failed to fetch images. Please try again later.",
            position: "topRight",
        });
        throw error;
    } 
        
};

