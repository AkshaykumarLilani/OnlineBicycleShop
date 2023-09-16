export const getSpinnerElement = (spinnerColor, id, loadingText) => {
    let div = document.createElement("div");
    div.classList.add("spinner");
    if (id){
        div.id = id;
    }
    div.style.minHeight = "30vh";
    div.style.width = "100%";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.flexDirection = "column";

    let image = document.createElement("img");
    image.src = "/images/spinner-red.gif";

    if (spinnerColor){
        if (spinnerColor === "yellow"){
            image.src = "/images/spinner-yellow.gif";
        }
    }

    image.style.maxWidth = "80px";
    image.style.width = "30%";

    div.append(image);

    let p = document.createElement("p");
    p.innerText = "Loading...";
    p.style.color = "white";

    if (loadingText){
        p.innerText = loadingText;
    }

    div.append(p);

    return div;
}