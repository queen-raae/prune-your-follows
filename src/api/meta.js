import "../domains/api/fetch-polyfill";
import { getMeta, wrapper } from "../domains/api";

export default async function handler(req, res) {
  await wrapper(req, res, {
    GET: async ({ userId }) => {
      res.send(await getMeta({ userId: userId }));
    },
  });
}
