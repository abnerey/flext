import {FlextStageManager} from '../model/flext-stage-manager.model';
import {FlextStage} from '../model/flext-stage.enum';

export function FlextPreStage() {
    return stageDecoratorHandler(FlextStage.PRE);
}

export function FlextPostStage() {
    return stageDecoratorHandler(FlextStage.POST);
}

export function FlextErrorStage() {
    return stageDecoratorHandler(FlextStage.ERROR);
}

export function FlextSuccessStage() {
    return stageDecoratorHandler(FlextStage.SUCCESS);
}

function stageDecoratorHandler(stage: FlextStage) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        addToManager(key, descriptor, stage);
        return descriptor;
    }
}

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
