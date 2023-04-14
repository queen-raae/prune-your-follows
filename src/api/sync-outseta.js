import "../domains/api/fetch-polyfill";
import axios from "axios";
import { exists } from "@xata.io/client";
import { getXataClient } from "../domains/xata";

const xata = getXataClient();

const outsetaApi = axios.create({
  baseURL: "https://raae-testing.outseta.com/api/v1/",
  headers: {
    Authorization: `Outseta ${process.env.OUTSETA_KEY}:${process.env.OUTSETA_SECRET}`,
  },
});

export default async function handler(req, res) {
  let page = await xata.db.meta.filter(exists("email")).getPaginated({
    pagination: {
      size: 3,
    },
  });

  let successCounter = 0;

  do {
    try {
      // For each record in Xata
      // update the person in Outseta
      // or create a person in Outseta and save the outseta id to Xata

      for (const record of page.records) {
        if (record.outsetaId) {
          const { data: outsetaData } = await outsetaApi.put(
            `crm/people/${record.outsetaId}`,
            {
              Email: record.email,
            }
          );

          console.log("Updated outseta person", outsetaData);
        } else {
          const { data: outsetaData } = await outsetaApi.post(`crm/people`, {
            Email: record.email,
            TwitterId: record.id,
          });

          console.log("Added outseta person", outsetaData);

          const recordResult = await xata.db.meta.update({
            id: record.id,
            outsetaId: outsetaData.Uid,
          });

          console.log("Updated xata record", recordResult);
        }

        // Success update count
        successCounter += 1;
      }

      if (page.hasNextPage()) {
        page = await page.nextPage();
      } else {
        page = null;
        res.send(`Synced all ${successCounter} users`);
      }
    } catch (error) {
      page = null;
      console.log(error);
      res.send(`Error while syncing, finished ${successCounter} users`);
    }
  } while (page);
}
