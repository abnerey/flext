import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {FlextProviderService} from './service/flext-provider.service';

@NgModule({})
export class FlextModule {
    private static injector: Injector;
    private static flextProvider: FlextProviderService;
    private static providersDescriptors = new Map<Function, Function>();

    public static getDependency(dependency: any) {
        if (FlextModule.injector) {
            return FlextModule.injector.get(dependency);
        }
    }

    public static getProviderByFunction(stageFunction: Function) {
        return FlextModule.providersDescriptors.get(stageFunction);
    }

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
