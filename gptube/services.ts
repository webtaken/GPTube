import { LemonsqueezyClient } from "lemonsqueezy.ts";

export const apiKey = process.env.LEMON_API_KEY || "";
export const storeId = process.env.LEMON_STORE_ID || "";
export const ls = new LemonsqueezyClient(apiKey);
export const GO_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "";
