/*
* Definition for FlextHandler and FlextException decorators
* */
export type HandlerDefinition = {
    /*Individual and additional functionality for preStage*/
    preStage?: Function[],
    /*Individual and additional functionality for postStage*/
    postStage?: Function[],
    /*Individual and additional functionality for successStage*/
    successStage?: Function[],
    /*Individual and additional functionality for errorStage*/
    errorStage?: Function[],
    /*Additional values for the whole stages*/
    payload?: any
};

/*
* Definition for FlextComponent decorator
* */
export type ComponentDefinition = {
    /*Array mixin to apply in the decorated component*/
    mixin: FlextMixin[]
};

/*
* Interface to implement for valid Mixin to use en FlextComponent
* */
export interface FlextMixin {
    /* Class with the definition of the Mixin */
    mixin: any;
    /* Additional/initial values for the Mixin*/
    value?: any;
}
