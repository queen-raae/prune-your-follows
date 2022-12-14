import "../domains/api/fetch-polyfill";
import { getExport, wrapper } from "../domains/api";

export default async function handler(req, res) {
  await wrapper(req, res, {
    GET: async ({ userId }) => {
      res.send(await getExport({ userId: userId }));
    },
  });
}
