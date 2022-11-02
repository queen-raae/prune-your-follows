import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ followerId, filter: filterKey, search }) {
  const meta = await xata.db.meta.read({ id: followerId });

  const filter = {
    followed_by: followerId,
    timestamp: { $ge: meta?.last },
    $notExists: "unfollowed",
    $notExists: "hidden",
  };
  const params = { pagination: { size: 50 } };

  console.log(filterKey);

  if (filterKey === "INACTIVE") {
    return await xata.db.accounts
      .filter(filter)
      .sort("calculated_metrics.average_tweets_per_year", "asc")
      .sort("calculated_metrics.years_on_twitter", "desc")
      .getPaginated(params);
  } else if (filterKey === "OVERACTIVE") {
    return await xata.db.accounts
      .filter(filter)
      .sort("calculated_metrics.average_tweets_per_year", "desc")
      .sort("calculated_metrics.years_on_twitter", "asc")
      .getPaginated(params);
  } else if (filterKey === "UNPOPULAR") {
    return await xata.db.accounts
      .filter(filter)
      .sort("public_metrics.followers_count", "asc")
      .getPaginated(params);
  } else if (filterKey === "OVERPOPULAR") {
    return await xata.db.accounts
      .filter(filter)
      .sort("public_metrics.followers_count", "desc")
      .getPaginated(params);
  } else if (search) {
    console.log("SEARCH", search, followerId);
    const results = await xata.search.all(search, {
      tables: [
        {
          table: "accounts",
          target: [
            { column: "name", weight: 7 },
            { column: "username", weight: 7 },
            { column: "meta.location" },
            { column: "meta.description" },
          ],
          filter: filterKey,
        },
      ],
      highlight: { enabled: true },
      fuzziness: 1,
      prefix: "phrase",
    });

    return results.map((result) => {
      return {
        ...result,
        searchInfo: result.record.getMetadata(),
      };
    });
  } else {
    return { records: [] };
  }
}
