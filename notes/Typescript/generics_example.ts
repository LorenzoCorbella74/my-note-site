// SOURCE: https://betterprogramming.pub/extending-typescript-generics-for-additional-type-safety-313f35aca5b3

/* ESERCIZIO 1 */
class Menu<T> {
  private items: T[] = [];

  public addItem(item: T) {
    this.items.push(item);
  }

  public getItems(): T[] {
    return this.items;
  }
}

/*
    Abbiamo i seguenti tipi di menu, ma vogliamo che siano di tipo Drink e Food ma non Waiter...
    Per questo si mettono dei constraints al generics:

    class Menu<T extends Food | Drink>
*/

class Drink {
  name: string;
  price: number;
  ounces: number;
}

class Food {
  name: string;
  price: number;
  type: "appetizer" | "entree";
}

class Waiter {
  name: string;
}

/* ESERCIZIO 2 */
type FoodProperties = {
  name: string;
  description: string;
  price: number;
  section: "breakfast" | "lunch" | "dinner" | "dessert";
};

class FoodItem {
  constructor(private opts: FoodProperties) {}

  public get(property: string) {
    return this.opts[property];
  }
}

const EggsBenedict = new FoodItem({
  name: "Eggs Bendict",
  description:
    "A house specialty! English muffin with Canadian bacon, two poached eggs, and Hollandaise Sauce.",
  price: 5.99,
  section: "breakfast",
});

/* 
  
  Altro esercizio: 
  se noi facciamo   EggsBenedict.get('calories') è consentito anche se non esiste la proprietà:
  
  Si risolve con dei getter setter + precisi!!! :

  public get<T extends keyof FoodProperties>(property: T): FoodProperties[T] {
    return this.opts[property];
  }

  public change<T extends keyof FoodProperties>(
    property: T,
    value: FoodProperties[T]
  ) {
    this.opts[property] = value;
  }
  
*/
