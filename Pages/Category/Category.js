let pageNumber = 1;

const fetchBicycleData = async (page) => {
    try {
        const url = baseUrl + "/bikes" + "?_page="+page+"&_limit=12";
        const response = await fetch(url);
        const json = await response.json();
        console.log({ json });
        appendDataToUI(json);
    } catch (error) {
        console.error({ "fetchBicycleData Error": error });
    }
}

const appendDataToUI = (data) => {
    let container = document.getElementById("category-products");
    if (container) {
        data.forEach((d) => {
            container.append(categoryPageBicycleCard(d));
        });
    }
}

fetchBicycleData(1);