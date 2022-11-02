import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ followerId, filter: filterKey, search }) {
  const meta = await xata.db.meta.read({ id: followerId });

  const followingFilter = {
    followed_by: followerId,
    timestamp: { $ge: meta?.last },
    $all: [{ $notExists: "unfollowed" }, { $notExists: "hidden" }],
  };

  const unfollowedFilter = {
    followed_by: followerId,
    $all: [
      { $any: [{ $exists: "unfollowed", timestamp: { $lt: meta?.last } }] },
      { $notExists: "hidden" },
    ],
  };

  const hiddenFilter = {
    followed_by: followerId,
    $all: [
      { $all: [{ $notExists: "unfollowed", timestamp: { $ge: meta?.last } }] },
      { $exists: "hidden" },
    ],
  };

  const params = { pagination: { size: 50 } };

  console.log(filterKey);

  if (filterKey === "inactive") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "asc")
      .sort("calculated_metrics.years_on_twitter", "desc")
      .getPaginated(params);
  } else if (filterKey === "active") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "desc")
      .sort("calculated_metrics.years_on_twitter", "asc")
      .getPaginated(params);
  } else if (filterKey === "unpopular") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "asc")
      .getPaginated(params);
  } else if (filterKey === "popular") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "desc")
      .getPaginated(params);
  } else if (filterKey === "unfollowed") {
    return await xata.db.accounts
      .filter(unfollowedFilter)
      .sort("timestamp", "desc")
      .sort("unfollowed", "desc")
      .getPaginated(params);
  } else if (filterKey === "hidden") {
    return await xata.db.accounts
      .filter(hiddenFilter)
      .sort("hidden", "desc")
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
