import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ userId }) {
  const meta = await xata.db.meta.read({ id: userId });

  console.log(`Got meta for ${userId}`);

  return meta;
}
