# FLEXT &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]

## Flow Extension library for Angular 2+

Flext is a library for extend certain cases of your application's flow in parallel. As we already know,
the flow of any JS application it is determined by functions, so, through the power of experimental 
decorators in TypeScript, Flext let you add logic to your functions, that additional logic be executed
in parallel to your application flow; meaning Flext tries don't override or change the side effects or existing
functionality as possible (but in specific cases that can't be avoided). All this in centralized and sexy way 
that I'll show you using different examples.

Flext it's based in the next principles:

* ** Stages:** This is the first and most important, because all the Flext's capabilities was made around
the concept of runtime Stages of a function. Flext has an enum that define 4 different stages: PRE, POST, ERROR and SUCCESS.