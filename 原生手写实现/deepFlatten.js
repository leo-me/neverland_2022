let res = {};

function deepFlatten(obj, res) {

    if(typeof obj !== 'object') return obj;

    for(let key in obj) {
        if(typeof obj[key] === 'object') {
            return deepFlatten(obj[key], res);
        } else {
            res[key] = obj[key];
        }
    }

    return res;

}