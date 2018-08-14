// this is the old way of setting this up
// export class Ingredient {
//   public name: string;
//   public amount: number;

//   constructor(name: string, amount: number) {
//     this.name = name;
//     this.amount = amount;
//   }
// }

// this is the new way of setting this up
export class Ingredient {
  constructor (public name: string, public amount: number) {

  }
}
