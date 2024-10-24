export interface ICountryCard {
  nameEn: string; 
  nameKa: string; 
  capitalEn: string; 
  capitalKa: string;  
  population: string; 
  id: string; 
  vote: string; 
  info?: string; 
}

export const AboutCard: ICountryCard[] = [
  { 
    nameEn: "Georgia", 
    nameKa: "საქართველო", 
    capitalEn: "Tbilisi", 
    capitalKa: "თბილისი", 
    population: "3.7 million", 
    id: "1", 
    info: undefined, 
    vote: "0" 
  },
  { 
    nameEn: "Germany", 
    nameKa: "გერმანია", 
    capitalEn: "Berlin", 
    capitalKa: "ბერლინი", 
    population: "83 million", 
    id: "2", 
    info: undefined, 
    vote: "0" 
  },
  { 
    nameEn: "France", 
    nameKa: "საფრანგეთი", 
    capitalEn: "Paris", 
    capitalKa: "პარიზი", 
    population: "67 million", 
    id: "3", 
    info: undefined, 
    vote: "0" 
  },
];

export const addCountryCard = (countryCard: ICountryCard) => {
  AboutCard.push(countryCard); 
};
