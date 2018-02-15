import {FlextType} from '../typing/flext-default.types';
import {execute} from '../util/flext.util';

/*
* Decorator(Factory) just to decorate functions that returns Promise, transform the Promise returned in array
* for get the response and error through array destructuring: [error, result].
* The functions decorated with this function should be resolved with async/await syntax
* @param type FlextType receives a default value to be returned in case the Promise fails (catch case)
* @param payload any value to be used in case type would it be FlextType.CUSTOM or FlextType.CLASS
* */
export function FlextPromise(type?: FlextType, payload: any = null) {
    return function (target, key, descriptor) {
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        const {value: originalMethod} = descriptor;

        descriptor.value = function(...args: any[]) {
            let defaultValue = type;
            if (type === FlextType.CLASS) {
                defaultValue = new payload();
            } else if (type === FlextType.CUSTOM) {
                defaultValue = payload;
            }
            return execute(originalMethod.apply(this, args), defaultValue);
        };

        return descriptor;
    };
}
