import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
@Module
export default class AppModule extends VuexModule {
  _appIsBusy: boolean = false;
  _appErrorMessage: string = "";
  _activeProcesses: number = 0;

  get appIsBusy() {
    return this._appIsBusy;
  }

  get appErrorMessage() {
    return this._appErrorMessage;
  }

  get activeProcesses() {
    return this._activeProcesses;
  }

  @Mutation
  _setActiveProcesses(incrementer: number) {
    this._activeProcesses += incrementer;
  }

  @Mutation
  _setAppBusy(busy: boolean) {
    this._appIsBusy = busy;
  }

  @Action
  setAppBusy(busy: boolean) {
    let incrementer = busy || -1;
    this.context.commit("_setActiveProcesses", incrementer);
    this.context.commit("_setAppBusy", this._activeProcesses > 0);
  }

  @Mutation
  _setAppErrorMessage(message: string) {
    this._appErrorMessage = message;
  }

  @Action
  setAppErrorMessage(message: string) {
    this.context.commit("_setAppErrorMessage", message);
  }
}
