import createError from "http-errors";
import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({}) {
  return "ok";
}
