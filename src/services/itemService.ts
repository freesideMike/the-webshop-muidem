import { IFindItems } from "../ts/models/IFindItems";
import { IFindItemsResponse } from "../ts/models/findItemResponse";
import { get } from "./serviceBase";

export const findItem = async (): Promise<IFindItems[]> => {
    const url = "./src/modules/products.json";
    const data = await get<IFindItemsResponse>(url);
    return data.products;
}