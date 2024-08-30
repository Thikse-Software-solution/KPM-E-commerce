export interface Product {
   id: number;
  shine: boolean;
  sheShine: boolean;
  subCategory: string;
  category: string;
  mainImage: string;
  cardImage: string;
  cardText: string;
  cardTitle: string;
  additionalImages: string[];  // Array
  thumbnailImage: string;
  title: string;
  name: string;
  benefits: string;
  suitableFor: string;
  description: string;
  keyBenefits: string;
  howToUse: string;
  ingredients: string;
  productSize: string;
  mrp: number;                // Number type
  price: number;              // Number type
  stockQuantity: number;      // Number type
  discount: number;           // Number type
  threeDImages: string[];     // Array
  feature: boolean;
  trending: boolean;
  special: boolean;
}