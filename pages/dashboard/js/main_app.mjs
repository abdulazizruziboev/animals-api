import { elMoreLoader, elMoreLoaderButton } from "./html_elements.mjs";
import { cardsWrite, moreLoaderUI, skeletonWrite } from "./ui_write.mjs";

let limit = 12,
skip = 0,
total = 0;

function moreLoader(bool) {
    if(bool==true) {
        elMoreLoaderButton.classList.remove("pointer-events-all");
        elMoreLoaderButton.classList.add("pointer-events-none");
        skip+=limit;
        mainRequest();
    } else {
        return skip;
    }
}

mainRequest();
function mainRequest() {

if(skip>total) {
    skeletonWrite(false);
    elMoreLoader.classList.remove("flex");
    elMoreLoader.classList.add("hidden");
} else {
    skeletonWrite(true);
    fetch(`https://json-api.uz/api/project/game-over/animals?limit=${limit}&skip=${skip}`)
    .then(response=>response.json())
    .then(response=>{
        total=response.total;
        if(response['data'].length!=0) {
            cardsWrite(response['data']);
            moreLoaderUI();
            if(limit>total) {
                elMoreLoader.classList.remove("flex");
                elMoreLoader.classList.add("hidden");
            }
        } else {
            document.querySelector("#empty_box").classList.remove("hidden");
            document.querySelector("#empty_box").classList.add("flex");
        }
    });
}
}

export {
    limit,
    total,
    skip,
    moreLoader,
    mainRequest
}