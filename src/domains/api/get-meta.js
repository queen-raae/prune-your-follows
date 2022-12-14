import { getXataClient } from "../xata";

const xata = getXataClient();

export async function getMeta({ userId }) {
  console.log(`PYF Get meta for ${userId}`);

  const meta = await xata.db.meta.read({ id: userId });

  return meta;
}
