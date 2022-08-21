import React, { useState } from "react";

import { Box, Tabs, Tab, TabList, Typography, Container } from "@mui/joy";

import { LogoutButton } from "../domains/app/LogoutButton";
import AccountCard from "../domains/app/AccountCard";

import useSiteMetadata from "../domains/common/useSiteMetadata";
import useUser from "../domains/app/useUser";
import useFollowing, { SORT } from "../domains/app/useFollowing";
import usePopulateFollowing from "../domains/app/usePopulateFollowing";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App() {
  usePopulateFollowing(); // Kickstart if needed

  const [sort, setSort] = useState(SORT.INACTIVE);
  const { data: user } = useUser();
  const { data: following, isFetched } = useFollowing({ sort });
  const siteMetadata = useSiteMetadata();

  const siteTagline = siteMetadata?.tagline || "";
  const username = user?.user_metadata.user_name || "";

  const handleOnChange = (event, newValue) => {
    setSort(newValue);
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ my: 7 }}>
      <Box
        component="header"
        sx={{ display: "flex", alignItems: "center", my: 3, gap: 1.5 }}
      >
        <Typography level="h1">
          👋🏻 {siteTagline} {user && `@${username}!`}
        </Typography>
        <LogoutButton />
      </Box>

      <Tabs value={sort} onChange={handleOnChange} sx={{ my: 5 }}>
        <TabList>
          {Object.keys(SORT).map((key) => {
            return (
              <Tab key={key} value={SORT[key]} disabled={!isFetched}>
                {SORT[key]}
              </Tab>
            );
          })}
        </TabList>
      </Tabs>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {(following || []).map((account, index) => (
          <AccountCard key={account.id || index} {...account} />
        ))}
      </Box>
    </Container>
  );
}
