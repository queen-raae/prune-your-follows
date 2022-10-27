import React from "react";
import parse from "html-react-parser";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import UnfollowButton from "./UnfollowButton";

const display = (...props) => {
  const theString = props
    .filter((item) => item !== undefined)
    .map((item) => "" + item)
    .reduce((acc, item) => {
      return acc || item;
    }, "");

  return theString ? parse(theString) : "";
};

export function AccountCard({ sx, highlight, ...account }) {
  const twitterUrl = account.username
    ? `https://twitter.com/${account.username}`
    : "";
  const avatarImageUrl = account.meta?.profile_image_url;
  const avatarImageAlt = `${account.username} Avatar Image`;

  const displayUsername = display(highlight?.username?.[0], account.username);
  const displayName = display(highlight?.name?.[0], account.name);
  const displayLocation = display(
    highlight?.meta?.location?.[0],
    account.meta?.location
  );
  const displayDescription = display(
    highlight?.meta?.description?.[0],
    account.meta?.description
  );

  console.log({
    displayUsername,
    test: highlight?.username?.[0] || account.username,
    test1: highlight?.username?.[0],
    test2: account.username,
  });

  console.log({
    displayName,
    test1: highlight?.name?.[0],
    test2: account.name,
  });

  const displayFollowingCount = display(
    account.public_metrics?.following_count,
    "YYYY"
  );
  const displayFollowerCount = display(
    account.public_metrics?.followers_count,
    "XXXX"
  );

  const displayYearsOnTwitter = display(
    account.calculated_metrics?.years_on_twitter,
    "Y"
  );
  const displayAverageTweetsPerYear = display(
    account.calculated_metrics?.average_tweets_per_year,
    "X"
  );

  return (
    <div className="flex-space flex h-full flex-col rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="flex px-4 pt-5">
        <div className="flex-shrink-0">
          {avatarImageUrl ? (
            <img
              className="h-10 w-10 rounded-full border"
              src={avatarImageUrl}
              alt={avatarImageAlt}
            />
          ) : (
            <div className="h-10 w-10 rounded-full border" />
          )}
        </div>
        <div className="pl-3 pr-5">
          <p className="text-sm font-medium leading-5 text-gray-900">
            {displayName && (
              <a
                href={twitterUrl}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                {displayName}{" "}
              </a>
            )}
          </p>
          <p className="truncate text-sm leading-5 text-gray-500">
            {displayUsername && <>@{displayUsername}</>}
            {displayLocation && <> - {displayLocation}</>}
          </p>
        </div>
      </div>

      <p className="px-5 py-4 text-sm leading-5 text-gray-900">
        {displayDescription}
      </p>

      <div className="mt-auto flex justify-between space-x-3 border-t bg-slate-100 py-3 px-4">
        <p className="text-xs leading-5 text-gray-500">
          <strong>{displayFollowerCount}</strong> Followers
          <br />
          <strong>{displayFollowingCount}</strong> Following
        </p>
        <p className="text-right text-xs leading-5 text-gray-500">
          Joined <strong>{displayYearsOnTwitter}</strong> years ago
          <br />
          Average <strong>{displayAverageTweetsPerYear}</strong> tweets per year
        </p>
      </div>

      <div className="flex border-t">
        <UnfollowButton
          className="relative z-10 ml-auto w-1/2 rounded-br-lg border-l p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          accountId={account.id}
        >
          Unfollow
        </UnfollowButton>
      </div>
    </div>
  );
}
