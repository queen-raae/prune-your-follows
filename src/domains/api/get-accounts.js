import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ followerId, filter, search }) {
  const meta = await xata.db.meta.read({ id: followerId });

  console.log(`PYF GET Accounts For ${followerId}:`, search, filter);

  const followingFilter = {
    followed_by: followerId,
    last: { $ge: meta?.last },
    $all: [
      { $exists: "last" },
      { $notExists: "unfollowed" },
      { $notExists: "hidden" },
    ],
  };

  const unfollowedFilter = {
    followed_by: followerId,
    $all: [
      { $exists: "last" },
      { $any: [{ $exists: "unfollowed", last: { $lt: meta?.last } }] },
      { $notExists: "hidden" },
    ],
  };

  const hiddenFilter = {
    followed_by: followerId,
    $all: [
      { $exists: "last" },
      { $all: [{ $notExists: "unfollowed", last: { $ge: meta?.last } }] },
      { $exists: "hidden" },
    ],
  };

  const params = { pagination: { size: 50 } };

  if (filter === "inactive") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "asc")
      .sort("calculated_metrics.years_on_twitter", "desc")
      .getPaginated(params);
  } else if (filter === "active") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "desc")
      .sort("calculated_metrics.years_on_twitter", "asc")
      .getPaginated(params);
  } else if (filter === "unpopular") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "asc")
      .getPaginated(params);
  } else if (filter === "popular") {
    return await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "desc")
      .getPaginated(params);
  } else if (filter === "unfollowed") {
    return await xata.db.accounts
      .filter(unfollowedFilter)
      .sort("timestamp", "desc")
      .sort("unfollowed", "desc")
      .getPaginated(params);
  } else if (filter === "hidden") {
    return await xata.db.accounts
      .filter(hiddenFilter)
      .sort("hidden", "desc")
      .getPaginated(params);
  } else if (search) {
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
          filter: followingFilter,
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
