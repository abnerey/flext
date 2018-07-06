/*
* This function transform any promise in [error, value] format
* @param promise Promise that will be transformed
* @defaultValue any Value that will be used in error case
* */
export function execute(promise, defaultValue = null) {
    return promise.then(data => {
        return [null, data];
    }).catch(err => [err, defaultValue]);
}
