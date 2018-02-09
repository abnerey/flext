/*
* Type for param typing in functions decorated with any Stage
* */
export type StageDecoratorParams = {
    /* Component 'this' reference where is located the function decorated */
    instanceRef: any,
    /* Payload from the decorator FlextHandler | FlextException (HandlerDefinition) */
    payload: any,
    /* Value obtained from the stage. Example: ErrorStage will provide the caught value */
    stageValue?: any
}
