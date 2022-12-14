import { getXataClient } from "../xata";

const xata = getXataClient();

export async function postMeta({ userId, email }) {
  console.log(`PYF Get meta for ${userId}`);

  const meta = await xata.db.meta.createOrUpdate({ id: userId, email: email });

  return meta;
}
