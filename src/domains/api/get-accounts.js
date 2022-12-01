import { getXataClient } from "../xata";

const xata = getXataClient();

export default async function ({ userId, filter, search, size, offset }) {
  const meta = await xata.db.meta.read({ id: userId });

  console.log(`PYF GET Accounts For ${userId}:`, search, filter, size, offset);

  const followingFilter = {
    followed_by: userId,
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
    followed_by: userId,
    $all: [
      // Account is unfollowed, or not part of last import
      { $any: [{ $exists: "unfollowed" }, { last: { $lt: meta?.last } }] },
      // Account has new data shape
      { $exists: "last" },
    ],
  };

  const hiddenFilter = {
    followed_by: userId,
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

  const params = { pagination: { size: size, offset: offset } };
  let results = { records: [] };

  if (filter === "inactive") {
    results = await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "asc")
      .sort("calculated_metrics.years_on_twitter", "desc")
      .getPaginated(params);
  } else if (filter === "active") {
    results = await xata.db.accounts
      .filter(followingFilter)
      .sort("calculated_metrics.average_tweets_per_year", "desc")
      .sort("calculated_metrics.years_on_twitter", "asc")
      .getPaginated(params);
  } else if (filter === "unpopular") {
    results = await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "asc")
      .getPaginated(params);
  } else if (filter === "popular") {
    results = await xata.db.accounts
      .filter(followingFilter)
      .sort("public_metrics.followers_count", "desc")
      .getPaginated(params);
  } else if (filter === "unfollowed") {
    results = await xata.db.accounts
      .filter(unfollowedFilter)
      .sort("last", "desc")
      .sort("unfollowed", "desc")
      .getPaginated(params);
  } else if (filter === "hidden") {
    results = await xata.db.accounts
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

    const records = results.map((result) => {
      return {
        ...result,
        searchInfo: result.record.getMetadata(),
      };
    });
    results = { records };
  }

  return results;
}
