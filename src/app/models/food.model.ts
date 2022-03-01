export interface Food {
  name: string;
  id: string;
  type: string;
  subType: string;
  mainCategory: string;
  subCategory: string;
  proteinType: string;
  description: string;
  slug: string;
  tages: string[];
  quantity: number;
  maxQuantity: number;
  price: number;
  unitSize: number;
  unitOfMeasure: string;
  caloriesPerServing: string;
  allergens: { name: string; source?: string }[];
  iamgeUrl: string;
  thumbnailUrl: string;
  ingredients: string[];
  instructions: { step: number; title: string; details: string }[];
  cookTimes: { cookingMethods: string; low: number; high: number };
  nutrition: {
    name: string;
    quantity: string;
    unitSize: number;
    unitOfMeasure?: string;
  };
  nutritionDisclaimer: string;
  freezable: boolean;
  isNew: boolean;
}
