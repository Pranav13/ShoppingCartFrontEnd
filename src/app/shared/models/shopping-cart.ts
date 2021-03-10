import { ItemsEntity } from "./item";

export class ShoppingCart {
    dateCreated: string;
    id?: number;
    itemRequests?: (ItemsEntity)[] | null;

    constructor(items: ItemsEntity[]){
      this.itemRequests = items;
    }
    
  }