# Controller

#### What everyone needs to know

* Every project has a controller contract that mediates its rules of how funding relates to splits and tokens.
* A project can be configured to use any contract as its controller, commonly ones that adheres to [`IJBController`](/docs/v4/api/core/interfaces/IJBController.md).

#### What you'll want to know if you're building

* A project should be deployed from the controller that will own it.
* A project can set its controller using [`JBDirectory.setControllerOf(...)`](/docs/v4/api/core/JBDirectory.md#setcontrollerof), and can be found using [`JBDirectory.controllerOf(...)`](/docs/v4/api/core/JBDirectory.md#controllerof).


