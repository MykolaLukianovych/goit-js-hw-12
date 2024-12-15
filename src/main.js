"use strict"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "./js/pixabay-api.js";
import "./js/render-functions.js";
import getPictures from "./js/pixabay-api.js";
import reflectionPictures from "./js/render-functions.js";



const formSearch = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");




let lightbox = new SimpleLightbox(".gallery-item", {
    captions: true,
    captionSelector: "img",
    captionType: "attr",
    captionsData: "alt",
    captionDelay: 250,
});

formSearch.addEventListener("submit", handleSearch);

async function handleSearch(event) {
    event.preventDefault();
    

    gallery.innerHTML = "";

    const inputValue = event.target.elements.query.value.trim();

    if (inputValue === "") {
        iziToast.error({
            title: "No Results",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
        });
        return;
    }


    try {
        const data = getPictures(inputValue);

            if (data.hits.length === 0) {
                iziToast.info({
                    title: "No Results",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
                return;
            }

            const markup = reflectionPictures(data.hits);
            gallery.innerHTML = markup;

            lightbox.refresh();

        } catch (error) {
            iziToast.error({
                title: "Error",
                message: "Something went wrong. Please try again later",
                position: "topRight"
            });
        } finally {
            event.target.reset();
        };
}







