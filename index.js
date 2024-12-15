import{a as p,S as u,i as n}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function m(a){const r="https://pixabay.com/api/",s="47394920-a4032b33a38ab12c89a369f6a",o=new URLSearchParams({key:s,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{return(await p(r,{params:o})).data}catch(e){alert(e.statusText)}}function f(a){return a.map(({webformatURL:r,largeImageURL:s,tags:o,likes:e,views:t,comments:i,downloads:l})=>`
        <a class="gallery-item" href="${s}">
        <div class="all-gallery">
        <img src="${r}" alt="${o}">
        <div class="discription">
        <p class="discr-text">Likes <span>${e}</span></p>
        <p class="discr-text">Views <span>${t}</span></p>
        <p class="discr-text">Comments <span>${i}</span></p>
        <p class="discr-text">Downloads <span>${l}</span></p>
        </div>
        </div>
        </a>
    
    `).join("")}const d=document.querySelector(".search-form"),c=document.querySelector(".gallery");let g=new u(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});d.addEventListener("submit",y);async function y(a){a.preventDefault(),c.innerHTML="";const r=a.target.elements.query.value.trim();if(r===""){n.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}try{const s=m(r);if(s.hits.length===0){n.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=f(s.hits);c.innerHTML=o,g.refresh()}catch{n.error({title:"Error",message:"Something went wrong. Please try again later",position:"topRight"})}finally{a.target.reset()}}
//# sourceMappingURL=index.js.map
