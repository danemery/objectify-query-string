module.exports = (function() {
    function objectify(queryString) {
        let objectifiedQueryString = {};

        if (queryString !== '') {
            const queries = queryString.replace('?', '').split('&');

            for (let i = 0; i < queries.length; i++) {
                const keyValueArray = queries[i].split('=');
                const key = keyValueArray[0];
                const value = keyValueArray[1];

                if ((typeof key === 'string' && key !== '') && typeof value === 'string') {
                    if (objectifiedQueryString.hasOwnProperty(key)) {
                        if (!(objectifiedQueryString[key] instanceof Array)) {
                            objectifiedQueryString[key] = [objectifiedQueryString[key]];
                        }

                        objectifiedQueryString[key].push(value);
                    } else {
                        objectifiedQueryString[key] = value;
                    }
                }
            }
        }
        return objectifiedQueryString;
    }

    return {
        objectify: objectify
    };
})();