export class CheckoutList {

    quantity: number;

   constructor (    public id: number,
                    public price: number,
                    public title: string) {
        this.quantity = 1; 
    }
    
};
