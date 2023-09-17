export const getSearchParams = () => {
    let obj = {};

    if (window.location.search) {
        let search = window.location.search;
        if (search.includes("?")) {
            search = search.replaceAll("?", "");
            search = search.split("&");
            if (search.length > 0) {
                search.forEach((s) => {
                    let keyValue = s.split("=");
                    if (keyValue.length === 2) {
                        obj[keyValue[0]] = keyValue[1];
                    }
                });
            }
        }
    }
    return obj;
}