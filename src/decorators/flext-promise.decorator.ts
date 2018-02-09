import {FlextType} from '../typing/flext-default.types';
import {execute} from '../util/flext.util';

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
