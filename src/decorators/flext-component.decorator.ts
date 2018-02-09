import {ComponentDefinition, FlextMixin} from '../typing/flext.types';

export function FlextComponent(definition: ComponentDefinition) {
    const {mixin} = definition;
    return Mixes(mixin);
}

export function Mixes(mixins: FlextMixin[]) {
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
