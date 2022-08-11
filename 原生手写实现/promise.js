// 手写实现promise



//手写实现 promise.all
const myPromiseAll = (promiseArr) => {
    let res = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        for(let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(result => {
                // 保证顺序
                res[i] = result;
                count++;

                if(count === promiseArr.length) {
                    resolve(res);
                }
            }).catch(reject);
        }
    });

};

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve(56), 100);
});
const promise4 = Promise.reject(2);

myPromiseAll([promise1, promise2, promise3]).then(res => {
    console.log('all res: ', res);

}).catch(err => console.log('error', err));

// 手写实现promise.race

const myPromiseRace = (promiseArr) => {
    return new Promise((resolve, reject) => {
        for(let i =0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(resolve, reject)
        }
    });
};

myPromiseRace([promise1, promise2, promise3, promise4]).then(res => {
    console.log('race res: ', res);

}).catch(e => console.log('e', e));


// 手写 promise.any

const myPromiseAny = (promiseArr) => {
    let res = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        for(let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then((result, err) => {
                if(res) resolve(result);

                res[i] = {status: 'failed'};
                count++;
                if(count === promiseArr.length) {
                    reject(res);
                }
            });
        }
    });
};


// promisefy

function promisefy(fn) {
    return function(...args) {

        return new Promise((reslove, reject) => {
            fn.apply(null, [].concat(args).concat([(err, res) => {
                if(err !== null) {
                    return reject(err);
                }
                reslove(res);
            }]));
        })
    }
}