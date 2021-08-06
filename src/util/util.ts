import axios from "axios";

const defaultURL = "https://thebetter.bsgroup.eu";

export const api = axios.create({
  baseURL: defaultURL,
});
