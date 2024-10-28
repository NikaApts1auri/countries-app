export interface ICountryCard {
  isDeleted: boolean;
  image: string | null;
  nameEn: string;
  nameKa: string;
  capitalEn: string;
  capitalKa: string;
  population: string;
  id: string;
  vote: number;
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
    vote: 0,
    isDeleted: false,
    image: null,
  },
  {
    nameEn: "Germany",
    nameKa: "გერმანია",
    capitalEn: "Berlin",
    capitalKa: "ბერლინი",
    population: "83 million",
    id: "2",
    info: undefined,
    vote: 0,
    isDeleted: false,
    image: null,
  },
  {
    nameEn: "France",
    nameKa: "საფრანგეთი",
    capitalEn: "Paris",
    capitalKa: "პარიზი",
    population: "67 million",
    id: "3",
    info: undefined,
    vote: 0,
    isDeleted: false,
    image: null,
  },
];
