import { getSearchParams } from "./getSearchParams.js";

const generateAndDisplayBreadCrumb = () => {
    let top1 = document.getElementById("top1");
    if (top1) {
        let breadCrumbElement = document.createElement("div");
        breadCrumbElement.classList.add("breadcrumb");
        console.log({ breadCrumbElement });

        const pathname = window.location.pathname;
        console.log({ pathname });

        let homeImageContainer = document.createElement("a");
        homeImageContainer.href = "/";
        let homeImage = document.createElement("img");
        homeImage.src = "/images/home.png";
        homeImageContainer.append(homeImage);
        breadCrumbElement.append(homeImageContainer);

        let paths = pathname.split("/");
        console.log({ paths });

        paths.forEach((path) => {
            if (path) {
                let horizontalLine = document.createElement("hr");
                horizontalLine.style.width = "30px";
                horizontalLine.style.height = "2px";
                breadCrumbElement.append(horizontalLine);
                let p = document.createElement("p");
                p.innerText = path;
                if (path.includes("index.htm")) {
                    let sp = getSearchParams();
                    // console.log({sp});
                    if (sp["category"]) {
                        let pt = sp["category"];
                        pt = pt[0].toUpperCase() + pt.slice(1);
                        console.log({ pt });
                        p.innerText = pt;
                    }
                }
                breadCrumbElement.append(p);
            }
        });

        top1.insertAdjacentElement("afterend", breadCrumbElement);
    }
}

generateAndDisplayBreadCrumb();