// src/utils/cat.ts

export interface CatImage {
  image: string;
}

export interface CatListing {
  id: string;
  name: string;
  nickname: string;
  secret: string;
  // The lead/hero photo for the cat. In practice this is sometimes also the
  // first entry in `images` (a duplicate) and sometimes a photo that only
  // exists here — CatGallery handles both cases without showing a duplicate.
  hero: string;
  images: CatImage[];
  sex: 'Male' | 'Female';
  age: 'Kitten' | 'Adult' | 'Senior';
  dob: string;
  blurb: string;
  temperament: string;
  neutered: true;
  breed: string;
  color: string;
  coat: string;
}