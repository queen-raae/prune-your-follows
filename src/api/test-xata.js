import { getXataClient } from "../domains/xata";

const xata = getXataClient();

export default async function handler(req, res) {
  try {
    const records = await xata.db.meta.getAll();
    res.send(records);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
}
