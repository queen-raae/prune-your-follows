const { createClient } = require("@supabase/supabase-js");
const { reporter } = require("gatsby-cli/lib/reporter/reporter");

const supabase = createClient(
  "https://islqgwsslkxjcaiehclw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbHFnd3NzbGt4amNhaWVoY2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAzMjc4MTksImV4cCI6MTk3NTkwMzgxOX0.ZnKcbjJ2SFycpWIRcXY0A9d4owIyQtszxFwYGs_xRU4"
);

const createAvatars = async (gatsbyUtils) => {
  // Create a single supabase client for interacting with your database
  const { actions, createNodeId, createContentDigest } = gatsbyUtils;
  const { createNode } = actions;

  const { data, error } = await supabase
    .from("public_profiles")
    .select()
    .limit(10);

  console.log(data);

  if (error) {
    reporter.warn(error);
  } else {
    data.forEach((item) => {
      createNode({
        id: createNodeId(item.username),
        avatarUrl: item.avatar_url,
        username: item.username,
        internal: {
          type: "Avatar",
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      });
    });
  }
};

exports.sourceNodes = async (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.info("Sourcing nodes - START");
  await createAvatars(gatsbyUtils);
  reporter.info("Sourcing nodes - DONE");
};
