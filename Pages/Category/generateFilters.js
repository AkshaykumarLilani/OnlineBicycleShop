//import { baseUrl } from "../../constants.js";
const baseUrl = "https://bicycle-shop-json-server.cyclic.app";

const fetchFullData = async () => {
  try {
    const response = await fetch(baseUrl+"/bikes");
    const json = await response.json();
    generateFilters(json);
  } catch (err){
    console.error({"fetchFullData Error": err});
  }
}

const generateFilters = (data) => {
  let uFCs = findUniqueValues(data, "frame_colors");
  console.log({uFCs});
  let uFCsAccordion = getAccordion("Colors", "color-filters", "colors", uFCs);
  appendToFilters(uFCsAccordion);

  let modelYears = findUniqueValues(data, "year");
  console.log({modelYears});
  let modelYearsAccordion = getAccordion("Model Year", "model-year-filters", "list", modelYears);
  appendToFilters(modelYearsAccordion);
  
  let uniqueSizes = findUniqueValues(data, "size");
  console.log({uniqueSizes});
  let uniqueSizesAccordion = getAccordion("Size", "size-filters", "size", uniqueSizes);
  appendToFilters(uniqueSizesAccordion);

}

const appendToFilters = (ele) => {
  let filtersParent = document.getElementById("category-filters");
  if (filtersParent){
    filtersParent.appendChild(ele);
  }
}

const findUniqueValues = (data, key) => {
  let uvs = [];
  
  data.forEach(d=>{
    let thisKeyValue = d[key];
    //console.log(thisKeyValue);
    if (thisKeyValue){
      if (Array.isArray(thisKeyValue)){
        thisKeyValue.forEach(tkv=>{
          if(!uvs.includes(tkv)){
            uvs.push(tkv);
          }
        })
      } else {
        if (!uvs.includes(thisKeyValue)){
          uvs.push(thisKeyValue);
        }
      }
    }
  });
  return uvs;
}

const getAccordion = (title, id, dataType, data) => {
  let a = document.createElement("div");
  a.classList.add("accordion");
  
  let ah = document.createElement("div");
  a.classList.add("accordion-header");
  let h4 = document.createElement("h4");
  h4.innerText = title;
  h4.classList.add("text-white");
  ah.append(h4);
  
  let ab = document.createElement("div");
  ab.classList.add("accordion-body");
  ab.style.minHeight = "20vh";
  ab.setAttribute("id", id);

  a.append(ah, ab);
  return a;
}

export const addFiltersToUI = () => {
  fetchFullData();
}