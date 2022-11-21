import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ followerId, filter, search }) {
  const meta = await xata.db.meta.read({ id: followerId });

  console.log(`PYF GET Accounts For ${followerId}:`, search, filter);

  const followingFilter = {
    followed_by: followerId,
    $all: [
      // Account imported in last import,
      // or unfollowed/followed in app since last import
      { last: { $ge: meta?.last } },
      // Account is not unfollowed and not hidden
      { $notExists: "unfollowed" },
      { $notExists: "hidden" },
      // Account has new data shape
      { $exists: "last" },
    ],
  };

  const unfollowedFilter = {
    followed_by: followerId,
    $all: [
      // Account is unfollowed, or not part of last import
      { $any: [{ $exists: "unfollowed" }, { last: { $lt: meta?.last } }] },
      // Account has new data shape
      { $exists: "last" },
    ],
  };

  const hiddenFilter = {
    followed_by: followerId,
    $all: [
      // Account imported in last import
      { last: { $ge: meta?.last } },
      // Account is not unfollowed and is hidden
      { $notExists: "unfollowed" },
      { $exists: "hidden" },
      // Account has new data shape
      { $exists: "last" },
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
    const records = await xata.db.accounts
      .filter(unfollowedFilter)
      .sort("last", "desc")
      .sort("unfollowed", "desc")
      .getAll();
    return { records };
  } else if (filter === "hidden") {
    const records = await xata.db.accounts
      .filter(hiddenFilter)
      .sort("hidden", "desc")
      .getAll();
    return { records };
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
