import { IFindItems } from "./IFindItems";

export interface IFindItemsResponse {
  products:  IFindItems[];
  totalResults: string;
}