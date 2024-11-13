import { httpClient } from "..";
import { ICountry, IGetCountriesResponse, IPostPatchDeleteResponse } from "./api";


export const getCountries = async (): Promise<IGetCountriesResponse> => {
  const res = await httpClient.get("/countries");
  return res.data;
};


export const postCountries = async (countryData: ICountry): Promise<IPostPatchDeleteResponse> => {
  try {
    const res = await httpClient.post("/countries", countryData);
    return res.data;
  } catch (error) {
    // Handle error (optional)
    throw new Error("Failed to create country: " + error.message);
  }
};


export const deleteCountry = async (id: string | number): Promise<IPostPatchDeleteResponse> => {
  const res = await httpClient.delete(`/countries/${id}`);
  return res.data;
};


export const patchCountry = async (id: string | number, updatedData: ICountry): Promise<IPostPatchDeleteResponse> => {
  const res = await httpClient.patch(`/countries/${id}`, updatedData);
  return res.data;
};
