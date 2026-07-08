// src/utils/cat.ts
export interface CatListing {
  id: string;
  name: string;
  nickname: string;
  secret: string;
  image: string;
  sex: 'male' | 'female';
  age: 'kitten' | 'adult' | 'senior';
  dob: string;
  blurb: string;
  temperament: string;
  neutered: true;
  breed: string;
  color: string;
  coat: string
}