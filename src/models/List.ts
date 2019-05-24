import ILink from "./ILink";

export default class List {
  constructor(
    public vanityUrl: string = "",
    public description: string = "",
    public links: Array<ILink> = new Array()
  ) {}
}
