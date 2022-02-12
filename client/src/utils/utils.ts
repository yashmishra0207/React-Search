export const generateDelay = (() => {
  let lastDelay = 0;

  return () => {
    let delay = lastDelay;

    while (Math.abs(delay - lastDelay) < 3000) {
      delay = Math.floor(Math.random() * 5000);
    }

    lastDelay = delay;
    return delay;
  };
})();

export const getDebounceMagic = (
  fun: Function,
  delayInMillis: number
) => {
  let timer: any;
  return function (this: any, ...args: any) {
    // const context = this;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      // fun.apply(context, args);
      fun(...args)
    }, delayInMillis);
  };
};
