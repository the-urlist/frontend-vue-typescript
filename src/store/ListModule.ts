import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import List from "@/models/List";
import ListService from "@/services/list.service";
import Link from "@/models/Link";
import ILink from "@/models/ILink";
import IUserList from "@/models/IUserList";

@Module
export default class ListModule extends VuexModule {
  _currentList: List = new List();
  _usersLists: Array<IUserList> = [];
  _listIsPublished: boolean = false;

  get currentList() {
    return this._currentList;
  }

  get usersLists() {
    return this._usersLists;
  }

  get userOwnsList() {
    return (
      this._usersLists.get("vanityUrl", this._currentList.vanityUrl).index > -1
    );
  }

  get listIsPublished() {
    return this._listIsPublished;
  }

  /**
   * Mutations
   * All mutations are denoted by a "_" modifier
]  */

  @Mutation
  _updateCurrentList(list: List) {
    this._currentList = list;
  }

  @Mutation
  _resetCurrentList() {
    this._currentList = new List();
    this._listIsPublished = false;
  }

  @Mutation
  _updateUsersLists(lists: Array<IUserList>) {
    this._usersLists = lists;
  }

  @Mutation
  _clearUsersLists() {
    this._usersLists = [];
  }

  @Mutation
  _updatevanityUrl(vanityUrl: string) {
    this._currentList.vanityUrl = vanityUrl;
  }

  @Mutation
  _addLink(link: ILink) {
    this._currentList.links.push(link);
  }

  @Mutation
  _updateLink(link: ILink) {
    const { index } = this._currentList.links.get("id", link.id);
    this._currentList.links.splice(index, 1, link);
  }

  @Mutation
  _deleteLink(id: string) {
    let { index } = this._currentList.links.get("id", id);
    this._currentList.links.splice(index, 1);
  }

  @Mutation
  _setListPublished() {
    this._listIsPublished = true;
  }

  /**
   * Actions
   */

  @Action
  updatevanityUrl(vanityUrl: string) {
    this.context.commit("_updatevanityUrl", vanityUrl);
  }

  @Action
  addLink(link: ILink = new Link()) {
    this.context.commit("_addLink", link);
    this.context.dispatch("updateLink", link);
  }

  @Action
  newLink(url: string) {
    const link = new Link(url, url);
    this.context.dispatch("addLink", link);
  }

  @Action
  async resetCurrentList() {
    this.context.commit("_resetCurrentList");
  }

  @Action
  async updateLink(link: ILink) {
    try {
      const updatedLink = await ListService.validate(link.url, link.id);
      this.context.commit("_updateLink", updatedLink);
    } catch (err) {
      throw new Error(err);
    }
  }

  /* GET LIST */
  @Action
  async getList(vanityUrl: string) {
    try {
      const list = await ListService.get(vanityUrl);
      this.context.commit("_updateCurrentList", list);

      this.context.commit("_setListPublished");
    } catch (err) {
      throw new Error(err);
    }
  }

  // @Action
  // async getLinkDetails(list) {
  //   try {
  //     // we go through each link and update it with the most
  //     // current information by calling the API method which
  //     // pulls out the open graph information
  //     for (let link of list.links) {
  //       this.context.dispatch("updateLink", link);
  //     }
  //   }
  // }

  /* SAVE LIST */
  @Action
  async publishList() {
    const options = {
      links: this._currentList.links,
      vanityUrl: this._currentList.vanityUrl,
      description: this._currentList.description,
      userId: this.context.getters.currentUser.userName
    };

    try {
      const vanityUrl = await ListService.create(options);
      this.context.commit("_updatevanityUrl", vanityUrl);
      this.context.commit("_setListPublished");
    } catch (err) {
      throw new Error(err);
    }
  }

  /* UPDATE LIST */
  @Action
  async updateList(vanityUrl: string) {
    const options = [
      {
        op: "replace",
        path: "/links",
        value: this._currentList.links
      },
      {
        op: "replace",
        path: "/description",
        value: this._currentList.description
      }
    ];

    try {
      await ListService.update(vanityUrl, options);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Action
  async deleteList(vanityUrl: string) {
    try {
      await ListService.destroy(vanityUrl);
      this.context.commit("_deleteFromUsersLists", vanityUrl);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Action
  deleteLink(id: string) {
    this.context.commit("_deleteLink", id);
  }

  /**
   * This method checks for the availability of the vanityUrl in the database. It does this by
   * just requesting a list by vanityUrl. If a list is returned, the vanityUrl is not available.
   * @param vanityUrl The vanityUrl to check for availablility
   */
  @Action
  async checkvanityUrlAvailable(vanityUrl: string) {
    try {
      let list = await ListService.get(vanityUrl);
      return false;
    } catch (err) {
      return true;
    }
  }
}
