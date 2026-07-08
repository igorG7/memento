import axios from "axios";

import { API_BASE_URL } from "@/lib/api";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});
