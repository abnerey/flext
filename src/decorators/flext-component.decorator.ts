import {FlextMixin} from '../typing/flext.types';

/*
* Decorator Factory for apply mixins to Angular Component
* @param mixins FlextMixin[] array with the mixins to apply
* @return Valid function to decorate classes
* */
export function FlextComponent(mixins: FlextMixin[] = []) {
    return function (constructor) {
        mixins.forEach(({mixin, value}) => {
            const fieldCollector = {};
            mixin.apply(fieldCollector);
            if (value) {
                for (const val in fieldCollector) {
                    if (fieldCollector.hasOwnProperty(val)) {
                        fieldCollector[val] = value[val];
                    }
                }
            }
            Object.getOwnPropertyNames(fieldCollector).forEach((name) => {
                constructor.prototype[name] = fieldCollector[name];
            });

            Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
                if (name !== 'constructor') {
                    constructor.prototype[name] = mixin.prototype[name];
                }
            });
        });
    };
}

/*
* Function with the logic for apply many mixin to any class, through mixin class and initialize values
* @param mixins FlextMixin[] array with the mixin that will be applied to the class
* @return Valid function to decorate classes
* */
/*export function Mixes(mixins: FlextMixin[]) {
    return function (constructor) {
        mixins.forEach(({mixin, value}) => {
            const fieldCollector = {};
            mixin.apply(fieldCollector);
            if (value) {
                for (const val in fieldCollector) {
                    if (fieldCollector.hasOwnProperty(val)) {
                        fieldCollector[val] = value[val];
                    }
                }
            }
            Object.getOwnPropertyNames(fieldCollector).forEach((name) => {
                constructor.prototype[name] = fieldCollector[name];
            });

            Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
                if (name !== 'constructor') {
                    constructor.prototype[name] = mixin.prototype[name];
                }
            });
        });
    };
}*/
