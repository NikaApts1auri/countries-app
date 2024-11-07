
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
    countries: ICountry[];
  }
  
  // POST, PATCH, DELETE  ტიპი (თუ წარმატებით შესრულდა)
  export interface IPostPatchDeleteResponse {
    message: string; 
    data?: ICountry; 
  }
  