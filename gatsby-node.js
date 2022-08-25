const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);

const createUserAvatarNodes = async (gatsbyUtils) => {
  // Create a single supabase client for interacting with your database
  const { actions, createNodeId, createContentDigest, reporter } = gatsbyUtils;
  const { createNode } = actions;

  const { data, error } = await serviceSupabase
    .from("public_profiles")
    .select("username, avatar_url")
    .limit(10);

  if (error) {
    // If not we'll have errors later in the Avatars component
    reporter.panic(`Source user avatar problem: ${error.message}`);
  } else {
    data.forEach((item) => {
      createNode({
        id: createNodeId(item.username),
        avatarUrl: item.avatar_url,
        username: item.username,
        internal: {
          type: "UserAvatar",
          contentDigest: createContentDigest(item),
        },
      });
    });
  }
};

exports.sourceNodes = async (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.verbose("Sourcing user avatars - START");
  await createUserAvatarNodes(gatsbyUtils);
  reporter.verbose("Sourcing user avatars - DONE");
};
