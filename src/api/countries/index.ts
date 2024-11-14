import { httpClient } from "..";
import { ICountry, IPostPatchDeleteResponse } from "./api";

export const getCountries = async (pageParam: number, sortedAsc: boolean) => {
  const url = `/countries?_page=${pageParam}&_per_page=10&_sort=vote&_order=${sortedAsc ? "asc" : "desc"}`;

  const res = await httpClient.get<{
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    data: {
      id: string;
      name: string;
      capital: string;
      population: number;
      vote: number;
    }[];
  }>(url);
  return {
    rows: res.data.data,
    nextPage: res.data.next,
  };
};

export const postCountries = async (
  countryData: ICountry
): Promise<IPostPatchDeleteResponse> => {
  try {
    const res = await httpClient.post("/countries", countryData);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create country: " + error.message);
  }
};

export const deleteCountry = async (
  id: string | number
): Promise<IPostPatchDeleteResponse> => {
  const res = await httpClient.delete(`/countries/${id}`);
  return res.data;
};

export const patchCountry = async (
  id: string | number,
  updatedData: ICountry
): Promise<IPostPatchDeleteResponse> => {
  const res = await httpClient.patch(`/countries/${id}`, updatedData);
  return res.data;
};