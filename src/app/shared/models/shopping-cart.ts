import { ItemsEntity } from "./item";

export class ShoppingCart {
    dateCreated: string;
    id?: number;
    items?: (ItemsEntity)[] | null;

    constructor(items: ItemsEntity[]){
      this.items = items;
    }
    
  }