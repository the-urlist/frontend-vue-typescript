import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import User from "../models/User";
import IUserList from "@/models/IUserList";
import UserService from "@/services/user.service";

@Module
export default class UserModule extends VuexModule {
  _currentUser: User = new User();
  _showProfileMenu: boolean = false;
  _usersLists: Array<IUserList> = [];

  get currentUser() {
    return this._currentUser;
  }

  get showProfileMenu() {
    return this._showProfileMenu;
  }

  /**
   * Mutations
   * All mutations are denoted by a "_" modifier
   */

  @Mutation
  _updateCurrentUser(user: User) {
    this._currentUser = user;
  }

  @Mutation
  _updateUsersLists(usersLists: Array<IUserList>) {
    this._usersLists = usersLists;
  }

  @Mutation
  _toggleProfileMenu() {
    this._showProfileMenu = !this._showProfileMenu;
  }

  /**
   * Actions
   */

  @Action
  async getUser() {
    try {
      const user = await UserService.me();
      this.context.commit("_updateCurrentUser", user);
      this.context.dispatch("getUsersLists");
    } catch (err) {
      console.log("User is not logged in");
    }
  }

  @Action({ rawError: true })
  async getUsersLists() {
    if (this.currentUser.loggedIn) {
      try {
        const userLists = await UserService.lists(this.currentUser.userName);
        this.context.commit("_updateUsersLists", userLists);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  @Action({ commit: "_toggleProfileMenu" })
  toggleProfileMenu() {}
}
