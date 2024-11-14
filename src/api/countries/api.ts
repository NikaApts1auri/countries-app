import { Key } from "readline";

// ქვეყნის ტიპი (Country)
export interface ICountry {
  id: string | number;
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  image: string | null;
  vote: number;
  isDeleted: boolean;
}

// GET
export interface IGetCountriesResponse {
  concat(arg0: unknown): any;
  length: number;
  id: Key | null | undefined;
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  vote: number;
  image: string | null;
  isDeleted: boolean;
  filter(
    arg0: (country: {
      vote: number; nameEn: string; nameKa: string 
}) => boolean,
  ): unknown;
  countries: ICountry[];
}

// POST, PATCH, DELETE  ტიპი (თუ წარმატებით შესრულდა)
export interface IPostPatchDeleteResponse {
  message: string;
  data?: ICountry;
}
