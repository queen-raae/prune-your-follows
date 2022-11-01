import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ userId }) {
  console.log(`Get meta for ${userId}`);

  const meta = await xata.db.meta.read({ id: userId });

  return meta;
}