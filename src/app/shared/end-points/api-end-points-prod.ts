import { environment } from "src/environments/environment";

const BASE_URL = environment.apiEndpointUrl;

export const apiEndpoint = {
    products: `${BASE_URL}/products`
};