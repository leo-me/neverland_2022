function debounce(fn, time) {
    let timer = null;

    return function() {
        if(timer) return;
        let that = this;
        timer = setTimeout(() => {
            fn.apply(that, Array.from(arguments));
            clearTimeout(timer);
            timer = null;
        }, time);
    }

}