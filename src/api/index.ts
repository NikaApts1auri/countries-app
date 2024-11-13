import axios, { CreateAxiosDefaults } from "axios";

// აქ 3000 პორტი განვსაზღვროთ
const axiosConfig: CreateAxiosDefaults = {
  baseURL: "http://localhost:3000", // შეიცვალეთ აქ 3000 პორტზე
};

export const httpClient = axios.create(axiosConfig);
