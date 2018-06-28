import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {FlextProviderService} from './service/flext-provider.service';

@NgModule({})
export class FlextModule {
    private static injector: Injector = null;
    private static flextProvider: FlextProviderService = null;
    private static providersDescriptors = new Map<Function, Function>();

    /*
    * Static function to get dependencies from the Angular's DI
    * @param dependency any token to get it's value from the DI
    * */
    public static getDependency(dependency: any) {
        if (FlextModule.injector) {
            return FlextModule.injector.get(dependency);
        }
    }

    /*
    * Function to get a provider using a stageFunction as token
    * @param stageFunction Function used as token
    * @return Return the value from the DI
    * */
    public static getProviderByFunction(stageFunction: Function) {
        return FlextModule.providersDescriptors.get(stageFunction);
    }

    /*
    * This function maps the provider's stage descriptors with to the provider class
    * */
    private static fillDescriptors() {
        for (const provider of FlextModule.flextProvider.providers) {
            const descriptors = (<any>Object).getOwnPropertyDescriptors(provider.prototype);
            for (const keyValue in descriptors) {
                if (keyValue !== 'constructor') {
                    const {value} = descriptors[keyValue];
                    FlextModule.providersDescriptors.set(value, provider);
                }
            }
        }
    }

    /*
    * Function to initialize this module
    * @param providers Array with the providers to use in stage behavior
    * @return ModuleWithProviders
    * */
    static forRoot(providers): ModuleWithProviders {
        return {
            ngModule: FlextModule,
            providers: [...providers, {provide: FlextProviderService, useValue: {providers: providers}}]
        }
    }

    constructor(injector: Injector, flextProvider: FlextProviderService) {
        FlextModule.injector = injector;
        FlextModule.flextProvider = flextProvider;
        FlextModule.fillDescriptors();
    }
}
