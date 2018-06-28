import {FlextStageManager} from '../model/flext-stage-manager.model';
import {FlextStage} from '../model/flext-stage.enum';

/*
* Decorator factory for decorate functions in PRE Stage
* @return Function to decorate functions to add in PRE Stage behavior
* */
export function FlextPreStage() {
    return stageDecoratorHandler(FlextStage.PRE);
}

/*
* Decorator factory for decorate functions in POST Stage
* @return Function to decorate functions to add in PRE Stage behavior
* */
export function FlextPostStage() {
    return stageDecoratorHandler(FlextStage.POST);
}

/*
* Decorator factory for decorate functions in ERROR Stage
* @return Function to decorate functions to add in PRE Stage behavior
* */
export function FlextErrorStage() {
    return stageDecoratorHandler(FlextStage.ERROR);
}

/*
* Decorator factory for decorate functions in SUCCESS Stage
* @return Function to decorate functions to add in PRE Stage behavior
* */
export function FlextSuccessStage() {
    return stageDecoratorHandler(FlextStage.SUCCESS);
}

/*
* Function in charge to return a valid function to decorate functions
* @param stage FlextStage value in the enum to define the stage behavior to add the decorated function
* @return Function to use as decorator
* */
function stageDecoratorHandler(stage: FlextStage) {
    const factory = function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        addToManager(key, descriptor, stage);
        return descriptor;
    }
    return factory;
}

/*
* Function in charge to add the value of the functions decorated with a Stage decorator in the FlextStageManager
* @param key Name of the function decorated
* @param descriptor PropertyDescriptor of the function decorated
* @param stage FlextStage defines the stage in what the decorated function will be called
* @return void
* */
function addToManager(key: string, descriptor: PropertyDescriptor, stage: FlextStage) {
    const {value} = descriptor;
    switch (stage) {
        case FlextStage.PRE:
            FlextStageManager.setPreStage(key, value);
        break;
        case FlextStage.POST:
            FlextStageManager.setPostStage(key, value);
        break;
        case FlextStage.ERROR:
            FlextStageManager.setErrorStage(key, value);
        break;
        case FlextStage.SUCCESS:
            FlextStageManager.setSuccessStage(key, value);
        break;
    }
}
