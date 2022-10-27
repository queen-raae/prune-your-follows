import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ followerId, sort, search }) {
  const meta = await xata.db.meta.read({ id: followerId });
  return "ok";
}
