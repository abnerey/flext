export class FlextStageManager {
    private static _preStages = new Map<string, Function>();
    private static _postStages = new Map<string, Function>();
    private static _errorStages = new Map<string, Function>();
    private static _successStages = new Map<string, Function>();

    /*
    * This method return map's entries to avoid map instance rewrite
    * return IterableIterator with a array of entry
    * */
    public static getPreStages(): IterableIterator<[string, Function]> {
        return this._preStages.entries();
    }
    /*
    * Method to add an entry to preStage map
    * @param key String key value for entry
    * @param value Function that holds the stage functionality, entry value
    * */
    public static setPreStage(key: string, value: Function) {
        if (key && key.trim() && value) {
            this._preStages.set(key, value);
        }
    }
    /*
    * Method to obtain the Function value of certain entry in preStage map
    * @param key String key to obtain
    * return Function got with key
    * */
    public static getPreStage(key: string): Function {
        return this._preStages.get(key);
    }

    /*
    * This method return map's entries to avoid map instance rewrite
    * return IterableIterator with a array of entry
    * */
    public static getPostStages(): IterableIterator<[string, Function]> {
        return this._postStages.entries();
    }
    /*
    * Method to add an entry to postStage map
    * @param key String key value for entry
    * @param value Function that holds the stage functionality, entry value
    * */
    public static setPostStage(key: string, value: Function) {
        if (key && key.trim() && value) {
            this._postStages.set(key, value);
        }
    }
    /*
    * Method to obtain the Function value of certain entry in postStage map
    * @param key String key to obtain
    * return Function got with key
    * */
    public static getPostStage(key: string): Function {
        return this._postStages.get(key);
    }

    /*
    * This method return map's entries to avoid map instance rewrite
    * return IterableIterator with a array of entry
    * */
    public static getErrorStages(): IterableIterator<[string, Function]> {
        return this._errorStages.entries();
    }
    /*
    * Method to add an entry to errorStage map
    * @param key String key value for entry
    * @param value Function that holds the stage functionality, entry value
    * */
    public static setErrorStage(key: string, value: Function) {
        if (key && key.trim() && value) {
            this._errorStages.set(key, value);
        }
    }
    /*
    * Method to obtain the Function value of certain entry in errorStage map
    * @param key String key to obtain
    * return Function got with key
    * */
    public static getErrorStage(key: string): Function {
        return this._errorStages.get(key);
    }

    /*
    * This method return map's entries to avoid map instance rewrite
    * return IterableIterator with a array of entry
    * */
    public static getSuccessStages(): IterableIterator<[string, Function]> {
        return this._successStages.entries();
    }
    /*
    * Method to add an entry to successStage map
    * @param key String key value for entry
    * @param value Function that holds the stage functionality, entry value
    * */
    public static setSuccessStage(key: string, value: Function) {
        if (key && key.trim() && value) {
            this._successStages.set(key, value);
        }
    }
    /*
    * Method to obtain the Function value of certain entry in successStage map
    * @param key String key to obtain
    * return Function got with key
    * */
    public static getSuccessStage(key: string): Function {
        return this._successStages.get(key);
    }
}
