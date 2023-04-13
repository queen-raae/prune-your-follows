import "../domains/api/fetch-polyfill";

import { getXataClient } from "../domains/xata";
const xata = getXataClient();

export default async function handler(req, res) {
  const page = await xata.db.meta.getPaginated({
    pagination: {
      size: 15,
    },
  });

  do {
    try {
      // Success update count
      count += records.length;

      if (page.hasNextPage()) {
        page = await page.nextPage();
      } else {
        page = null;
        res.send(`Updated all ${count} accounts`);
      }
    } catch (error) {
      console.log(error.message);
      page = null;
      res.send(`Updated: ${count} accounts`);
    }
  } while (page);

  res.send("ok");
}
