import { getXataClient } from "../xata";

const xata = getXataClient();

export async function getExport({ userId }) {
  console.log(`PYF Get meta for ${userId}`);

  const meta = await xata.db.meta.read({ id: userId });

  console.log(`PYF GET Export For ${userId}`);

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

  const records = await xata.db.accounts
    .select([
      "username",
      "accountId",
      "meta.description",
      "meta.url",
      "meta.location",
      "meta.created_at",
    ])
    .filter(followingFilter)
    .getAll();

  console.log("PYF Export records: ", records.length);

  const transformed = records.map((record) => {
    return {
      id: record.accountId,
      username: record.username,
      name: record.name,
      ...record.meta,
    };
  });

  return { records: transformed };
}
