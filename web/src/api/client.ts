import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./constants";

export const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchApi<T>(
  path: string,
  instance: AxiosInstance = api
): Promise<T> {
  try {
    const res = await instance.get<T>(path);

    if (res.data == null) {
      throw new Error(`No data returned from ${path}`);
    }

    return res.data;
  } catch (err) {
    console.error(`Failed to fetch ${path}:`, err);
    throw err;
  }
}
