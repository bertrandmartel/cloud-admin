/**
 * Get an item in local storage
 * 
 * @param  {String} name         item field name
 * @param  {String} defaultValue default value if not found
 * @param  {String} type         type of item to return the right type
 * @return {Object}              value retrieved or default value, type may vary
 */
function getItem(name, defaultValue, type) {

    var value = localStorage.getItem(name);
    if (value === null) {
        localStorage.setItem(name, defaultValue);
        return defaultValue;
    } else {
        if (type) {
            switch (type) {
                case "number":
                    return parseInt(value, 10);
                case "bool":
                    return (value === 'true');
                default:
                    break;
            }
        }
        return value;
    }
}

/**
 * Put key/value in local storage.
 */
function setItem(field, value) {
    localStorage.setItem(field, value);
}

export function getMode() {
    return getItem("mode", "demo");
}

export function setMode(mode) {
    setItem("mode", mode);
}