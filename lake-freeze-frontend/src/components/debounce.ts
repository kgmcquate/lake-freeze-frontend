
type Fnc = (...args: any[]) => void;

// default 300ms delay
export function debounce<F extends Fnc>(func: F, delay = 300) {
    type Args = F extends (...args: infer P) => void ? P : never;
    let timeout: any;
    return function (this: any, ...args: Args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}