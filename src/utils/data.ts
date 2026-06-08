import raw from '../data/data.json' with { type: 'json' };
import { CatListing } from './cat';

export const homeData: { featuredCats: CatListing[] } = raw;
export const adoptData: { cats: CatListing[] } = raw;