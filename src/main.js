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
const loadMoreBtn = document.querySelector(".load-btn-js");
const loader = document.querySelector(".loader");

loader.style.display = "none";


let lightbox = new SimpleLightbox(".gallery-item", {
    captions: true,
    captionSelector: "img",
    captionType: "attr",
    captionsData: "alt",
    captionDelay: 250,
});

let currentPage = 1;
let currentQuery = "";

loadMoreBtn.style.display = "none";


formSearch.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSearch(event) {
    event.preventDefault();
    

    gallery.innerHTML = "";

    currentQuery = event.target.elements.query.value.trim();
    currentPage = 1;

    if (currentQuery === "") {
        iziToast.error({
            title: "No Results",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
        });
        loadMoreBtn.style.display = "none";
        return;
    }

    loader.style.display = "block";

    try {
        const data = await getPictures(currentQuery, currentPage);

            if (data.hits.length === 0) {
                iziToast.info({
                    title: "No Results",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
                loadMoreBtn.style.display = "none";
                return
            } else if (currentPage * 15 >= data.totalHits) {
                loadMoreBtn.style.display = "none";
                iziToast.info({
                title: "End of Results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                });
                return;
        }
            
            const markup = reflectionPictures(data.hits);
            gallery.innerHTML = markup;

        lightbox.refresh();
        loadMoreBtn.style.display = "block";
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: "Something went wrong. Please try again later",
                position: "topRight"
            });
        } finally {
        loader.style.display = "none";
        event.target.reset();
        };
}

async function handleLoadMore() {
    currentPage += 1;

    loader.style.display = "block";

    try {
        const data = await getPictures(currentQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.info({
                title: "End of Results",
                message: "No more images to load.",
                position: "topRight",
            });
            loadMoreBtn.style.display = "none";
            return;
        } else if (currentPage * 15 >= data.totalHits) {
            loadMoreBtn.style.display = "none";
                iziToast.info({
                title: "End of Results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                });
                return;
        }

        const markup = reflectionPictures(data.hits);
        gallery.insertAdjacentHTML("beforeend", markup);

        let getCard = () => document.querySelector('.gallery-item').getBoundingClientRect();
        
        window.scrollBy({
            top: getCard().height * 2,
            left: 0,
            behavior: 'smooth',
         });

        lightbox.refresh();
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again later.",
            position: "topRight",
        });
    } finally {
        loader.style.display = "none";
    }

}







