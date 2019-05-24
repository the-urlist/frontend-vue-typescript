import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
@Module
export default class AppModule extends VuexModule {
  _appIsBusy: boolean = false;
  _showAddBar: boolean = false;
  _appErrorMessage: string = "";
  _activeProcesses: number = 0;

  get appIsBusy() {
    return this._appIsBusy;
  }

  get showAddBar() {
    return this._showAddBar;
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

  @Action({ commit: "_setAppBusy" })
  setAppBusy(busy: boolean) {
    let incrementer = busy || -1;

    this.context.commit("_setActiveProcesses", incrementer);

    return this._activeProcesses > 0;
  }

  @Mutation
  _setShowAddBar(show: boolean) {
    this._showAddBar = show;
  }

  @Action({ commit: "_setShowAddBar" })
  setShowAddBar(show: boolean) {
    return show;
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
