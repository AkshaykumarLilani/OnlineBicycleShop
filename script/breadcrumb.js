import { getSearchParams } from "/Pages/Category/index.js";

export const generateAndDisplayBreadCrumb = () => {
    let breadCrumbElement = document.querySelector(".breadcrumb");
    console.log({breadCrumbElement});

    const pathname = window.location.pathname;
    console.log({pathname});

    let homeImageContainer = document.createElement("a");
    homeImageContainer.href = "/";
    let homeImage = document.createElement("img");
    homeImage.src = "/images/home.png";
    homeImageContainer.append(homeImage);
    breadCrumbElement.append(homeImageContainer);

    let paths = pathname.split("/");
    console.log({paths});

    paths.forEach((path)=> {
        if (path){
            let horizontalLine = document.createElement("hr");
            horizontalLine.style.width = "30px";
            horizontalLine.style.height = "2px";
            breadCrumbElement.append(horizontalLine);
            let p = document.createElement("p");
            p.innerText = path;
            if(path.includes("index.htm")){
                let sp = getSearchParams();
                // console.log({sp});
                if (sp["category"]){
                    let pt = sp["category"];
                    pt = pt[0].toUpperCase() + pt.slice(1);
                    console.log({pt});
                    p.innerText = pt;
                }
            }
            breadCrumbElement.append(p);
        }
    })


    // 1. git checkout -b shivam-dev
    // 2. git merge origin/akshay-dev
}