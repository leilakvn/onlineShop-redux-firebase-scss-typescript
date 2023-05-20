export interface Product {
    id: string;
    imgUrl:string;
    productName:string;
    price:number;
    avgRating:number;
    category:string;
    description:string;
    shortDesc:string;
    reviews: {
        rating: number;
        text: string;
    }[];
  }
  