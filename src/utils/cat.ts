// src/utils/cat.ts
export interface CatListing {
  id: string;
  name: string;
  age: string;
  sex: 'male' | 'female';
  temperament: 'social' | 'independent' | 'bonded pair';
  blurb: string;
  image: string;
}