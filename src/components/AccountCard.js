import React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import Open from "@mui/icons-material/OpenInNew";

const AccountCard = ({ sx, ...rest }) => {
  const { username, name, description, profile_image_url } = rest;
  const { followers_count = "YYY", following_count = "ZZZ" } = rest;
  const { average_tweets_per_year = "Z", age = "X" } = rest;
  const isPlaceholder = !username;

  return (
    <Card
      variant={isPlaceholder ? "plain" : "outlined"}
      sx={{ opacity: isPlaceholder ? 0.6 : 1, ...sx }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pb: 2, gap: 1.5 }}>
        <Avatar variant="soft" src={profile_image_url} />
        <Box>
          <Typography
            fontWeight="lg"
            level="body1"
            component="h3"
            lineHeight={1.2}
          >
            {name}
          </Typography>
          {isPlaceholder ? (
            <Typography lineHeight={1.2}>&nbsp;</Typography>
          ) : (
            <Typography lineHeight={1.2}>@{username}</Typography>
          )}
        </Box>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
          component="a"
          target="_blank"
          href={`https://twitter.com/${username}`}
          disabled={isPlaceholder}
        >
          <Open />
        </IconButton>
      </Box>

      {description && (
        <Typography sx={{ px: 1, pb: 2, maxWidth: "100%" }}>
          {description}
        </Typography>
      )}

      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          borderTop: "1px solid",
          borderColor: "neutral.outlinedBorder",
          bgcolor: "background.level1",
          mt: "auto",
        }}
      >
        <Box>
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {followers_count} Followers
          </Typography>
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {following_count} Following
          </Typography>
        </Box>
        <Box sx={{ width: 2, bgcolor: "divider" }} />
        <Box>
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            Joined <strong>{age}</strong> years ago
          </Typography>
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            <strong>{average_tweets_per_year}</strong> tweets per year
          </Typography>
        </Box>
      </CardOverflow>
    </Card>
  );
};

export default AccountCard;
