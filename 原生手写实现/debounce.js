function debounce(fn, time) {
    let timer = null;

    return function() {
        let that = this;
        if(timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(that, Array.from(arguments));
                clearTimeout(timer);
                timer = null;
            }, time);
        }
    }

}