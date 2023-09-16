//import { baseUrl } from "../../constants.js";
const baseUrl = "https://bicycle-shop-json-server.cyclic.app";

function getFiltersObj(){
  this.filters = [];
}

getFiltersObj.prototype.add = function(field, value){
  this.filters.push({
    field, value
  });
};

getFiltersObj.prototype.remove = function(field, value){
  this.filters = this.filters.filter(f=>f.field===field&&f.value===value);
}

export let filtersObj = getFiltersObj();

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
  removeFilters();
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

const removeFilters = () => {
  let filtersParent = document.getElementById("category-filters");
  if (filtersParent){
    filtersParent.innerHTML = null;
  }
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
  
  // Accordion Header
  let ah = getAccordionHeader(title, id);

  // Accordion Body
  let ab = getAccordionBody(id, dataType, data);

  a.append(ah, ab);
  return a;
}

const getAccordionHeader = (title, id) => {
  let ah = document.createElement("div");
  ah.classList.add("accordion-header");
  
  let h4 = document.createElement("h4");
  h4.innerText = title;
  h4.classList.add("text-white");
  ah.append(h4);

  let show = document.createElement("div");
  show.innerHTML = "+";
  show.style.fontSize = "42px";
  show.style.fontWeight = "600";
  show.style.color = "white";
  show.style.cursor = "pointer";
  show.id = "accordion-body-show-" + id;
  show.style.lineHeight = "40px";
  show.addEventListener("click", ()=>{
    let thisBody = document.querySelector(".accordion-body[data-id="+id+"]");
    console.log(thisBody);
    thisBody.classList.add("show");
    let s = document.getElementById("accordion-body-show-" + id);
    let h = document.getElementById("accordion-body-hide-" + id);

    if (s && s){
      s.style.display = "none";
      h.style.display = "block";
    }
  });
  ah.append(show);

  let hide = document.createElement("div");
  hide.innerHTML = "x"
  hide.style.fontSize = "22px";
  hide.style.fontWeight = "600";
  hide.style.color = "white";
  hide.style.cursor = "pointer";
  hide.style.display = "none";
  hide.style.lineHeight = "40px";
  hide.id = "accordion-body-hide-" + id;
  hide.addEventListener("click", ()=>{
    let thisBody = document.querySelector(".accordion-body[data-id="+id+"]");
    console.log(thisBody);
    thisBody.classList.remove("show");

    let s = document.getElementById("accordion-body-show-" + id);
    let h = document.getElementById("accordion-body-hide-" + id);

    if (s && s){
      s.style.display = "block";
      h.style.display = "none";
    }
  });
  ah.append(hide);

  return ah;
}

const getAccordionBody = (id, dataType, data) => {
  let ab = document.createElement("div");
  ab.classList.add("accordion-body");
  ab.setAttribute("data-id", id);

  let accordionFilter = null;

  switch(dataType){
    case "list":
      accordionFilter = getListFilters(id, data);
      console.log({accordionFilter});
      break;
    case "colors":
      accordionFilter = getColorFilters(id, data);
      break;
    case "size":
      accordionFilter = getSizeFilters(id, data);
      break;
    default:
      console.log("No dataType Matched for : ", dataType);
      break;
  }

  ab.append(accordionFilter);
  return ab;
}

function getListFilters(id, data){
  console.log({list: data});

  let parentListDiv = document.createElement("div");
  parentListDiv.classList.add("list-filter-option-container")

  if (Array.isArray(data)){
    data.forEach(d => {
      let thisList = document.createElement("div");
      thisList.classList.add("list-filter-option");
      thisList.innerHTML = `
      <input type="checkbox" id="${d}" name="${d}" />
      <label for="${d}">${d}</label>
      `;
      thisList.style.color = "white";
      parentListDiv.append(thisList);
    });
  }
  console.log({parentListDiv});
  return parentListDiv;
}

function getColorFilters(id, data){
  console.log({colors: data});

  let selectedBorder = "";
  let nonSelectedBorder = "1px solid gray";
  let parentColorsDiv = document.createElement("div");
  parentColorsDiv.classList.add("color-filter-option-container")

  if (Array.isArray(data)){
    data.forEach(d => {
      let thisColor = document.createElement("div");
      thisColor.classList.add("color-filter-option");
      thisColor.style.border = nonSelectedBorder;
      thisColor.style.backgroundColor = d;
      thisColor.addEventListener("click", ()=>{
        filtersObj.add("frame_colors", d);
      });
      parentColorsDiv.append(thisColor);
    });
  }

  return parentColorsDiv;
}

function getSizeFilters(id, data){

}

export const addFiltersToUI = () => {
  fetchFullData();
}