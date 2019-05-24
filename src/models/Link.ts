import ILink from "./ILink";
import cuid from "cuid";

export default class Link implements ILink {
  constructor(
    public id: string = cuid(),
    public url: string = "",
    public title: string = "",
    public description: string = "",
    public image: string = ""
  ) {}
}
