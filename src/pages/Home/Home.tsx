const Home = () => {
    // throttle();

    function arrange(name) {
        function A() {
            const promiseList = [];
            this.execute = function () {
                console.log(name + ' is notified');
                Promise.all(promiseList);
                return this;
            };
            this.do = (e) => {
                const p = new Promise((resolve, re) => {
                    console.log('Start to commit');
                    resolve(true);
                });
                promiseList.push(p);

                return this;
            };
            this.wait = (time) => {
                const p = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, time * 1000);
                });
                promiseList.push(p);
                return this;
            };
            this.waitFirst = () => {
                return this;
            };
        }
        return new A();
    }

    // arrange('William').execute();
    // 期望输出
    // > William is notified

    // arrange('William').do('commit').execute();
    // 期望输出
    // > William is notified
    // > Start to commit

    arrange('William').wait(5).do('commit').execute();
    // 期望输出
    // > William is notified
    // 等待 5 秒
    // > Start to commit

    // arrange('William').waitFirst(5).do('push').execute();
    // 期望输出
    // 等待 5 秒
    // > William is notified
    // > Start to push

    function debounce(fn, delay, immediate) {
        let timer;
        let result;
        return function (...args) {
            if (timer) clearTimeout(timer);

            if (immediate) {
                // 如果timer存在，说明第二次调用的时候还没到delay时间，因为如果超过delay时间
                // timer会被赋值为null，所以这个时候我们不应该执行fn，应该重新设置一个定时器
                // 但如果是一次的时候，因为还没有设过定时器，所以这里timer会是undefined
                if (timer) {
                    timer = setTimeout(() => (timer = null), delay);
                } else {
                    result = fn.apply(this, args);
                    return result;
                }
            } else {
                timer = setTimeout(() => fn.apply(this, args), delay);
            }
        };
    }

    // const a = debounce(
    //     () => {
    //         console.log(1);
    //     },
    //     1000,
    //     false,
    // );
    // useEffect(() => {
    //     console.log(cloneDeep({ a: 1 }));
    //     const map = new WeakMap([[Symbol('yinbinyu'), [1, 1]]]);
    //     console.log(map.toString(), map);
    // }, []);
    return (
        <div>
            <h1 className="text-red-50 ">Vite + React</h1>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

            <Button
                onClick={() => {
                    a.a = 1;
                }}
            >
                12312321
            </Button>
        </div>
    );
};

export default Home;
