import { Client } from "twitter-api-sdk";

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;

export const twitter = new Client(twitterBearerToken);
