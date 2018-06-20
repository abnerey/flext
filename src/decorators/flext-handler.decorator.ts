import {HandlerDefinition} from '../typing/flext.types';
import {FlextStageManager} from '../model/flext-stage-manager.model';
import {StageDecoratorParams} from '../typing/flext-stage.types';
import {FlextModule} from '../flext.module';

/*
* Decorator factory for normal functions
* @param definition HandlerDefinition with values for describe behavior in stages and get a payload for invoke stage functions
* @return Function valid for decorate use
* */
export function FlextException(definition: HandlerDefinition = {}): Function {
    const {preStage, postStage, successStage, errorStage, payload} = definition;
    const factory = function (target, key, descriptor) {
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        const {value: originalMethod} = descriptor;

        descriptor.value = function (...args: any[]) {
            const instanceRef = this;
            let result = null;
            applyStage({instanceRef, payload}, FlextStageManager.getPreStages(), preStage);
            try {
                result = originalMethod.apply(this, args);
                applyStage({stageValue: result, instanceRef, payload}, FlextStageManager.getSuccessStages(), successStage);
                return result
            } catch (error) {
                applyStage({stageValue: error, instanceRef, payload}, FlextStageManager.getErrorStages(), errorStage);
            }
            applyStage({stageValue: result, instanceRef, payload}, FlextStageManager.getPostStages(), postStage);
        };

        return descriptor;
    };
    return factory;
}

/*
* Decorator factory for async functions
* @param definition HandlerDefinition with values for describe behavior in stages and get a payload for invoke stage functions
* @return Function valid for decorate use
* */
export function FlextHandler(definition: HandlerDefinition = {}): Function {
    const {preStage, postStage, successStage, errorStage, payload} = definition;
    const factory = function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        const {value: originalMethod} = descriptor;

        descriptor.value = function (...args: any[]) {
            const instanceRef = this;
            applyStage({instanceRef, payload}, FlextStageManager.getPreStages(), preStage);
            const promiseResult = originalMethod.apply(this, args)
                .then((result) => {
                    applyStage({stageValue: result, instanceRef, payload}, FlextStageManager.getSuccessStages(), successStage);
                })
                .catch((error) => {
                    applyStage({stageValue: error, instanceRef, payload}, FlextStageManager.getErrorStages(), errorStage);
                });
            applyStage({stageValue: promiseResult, instanceRef, payload}, FlextStageManager.getPostStages(), postStage);
            return promiseResult;
        };

        return descriptor;
    };
    return factory;
}

/*
* Function in charge to apply the stage Functions decorated and provided
* @param params StageDecoratorParam value to provide in functions decorated with any stage decorator
* @param stageEntries IterableIterator<[string, Function]> with the whole functions decorated with certain stage decorator
* @param extraEntries Function[] with the functions provided in FlextHandler | FlexException for certain stage
* */
function applyStage(params: StageDecoratorParams, stageEntries: IterableIterator<[string, Function]>, extraEntries: Function[] = []) {
    params = Object.assign({}, params) as StageDecoratorParams;
    const stageValues = getValues(stageEntries);
    for (const stageFunction of stageValues) {
        try {
            const provider = FlextModule.getProviderByFunction(stageFunction);
            if (provider) {
                stageFunction.apply(FlextModule.getDependency(provider), [params]);
            }
        } catch (err) {
            console.log(err);
        }
    }
    extraEntries.forEach(entry => entry(params));
}

/*
* Function for obtain the values from an IterableIterator
* @param entries IterableIterator<[string, Function]> of certain stage from FlextStateManager
* @return Function[] obtained from the IterableIterator
* */
function getValues(entries: IterableIterator<[string, Function]>): Function[] {
    return Array.from(entries).map(([key, value]) => value);
}
