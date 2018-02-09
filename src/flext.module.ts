import {Injector, NgModule} from '@angular/core';

@NgModule({})
export class FlextModule {
    private static injector: Injector;

    public static getDependency(dependency: any) {
        if (FlextModule.injector) {
            return FlextModule.injector.get(dependency);
        }
    }

    constructor(injector: Injector) {
        FlextModule.injector = injector;
    }
}
