import React from "react";
import parse from "html-react-parser";
import clsx from "clsx";

import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from "@heroicons/react/20/solid";

const display = (...props) => {
  const theString = props
    .filter((item) => item !== undefined)
    .map((item) => "" + item)
    .reduce((acc, item) => {
      return acc || item;
    }, "");

  return theString ? parse(theString) : "";
};

export function AccountCardLayout(props) {
  const { as, highlight, actions, status, ...account } = props;

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

  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "transistion flex flex-col",
        "rounded-lg border border-gray-300 bg-white shadow-sm",
        status === "error" && "border-red-300"
      )}
    >
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
          <p className="text-sm font-medium leading-5">
            {displayName && (
              <a
                href={twitterUrl}
                className="group text-gray-700 hover:text-gray-900"
                target="_blank"
                rel="noreferrer"
              >
                {displayName}&nbsp;
                <ExternalLinkIcon className="ml-1 inline h-3 opacity-50 transition group-hover:opacity-100" />
              </a>
            )}
          </p>
          <p className="text-sm leading-5 text-gray-500">
            {displayUsername && <>@{displayUsername}</>}
            {displayLocation && <> - {displayLocation}</>}
          </p>
        </div>
      </div>
      <p className="px-5 py-4 text-sm leading-5 text-gray-900">
        {displayDescription || <>&nbsp;</>}
      </p>
      <div
        className={clsx(
          "mt-auto flex justify-between space-x-3 border-t bg-slate-100 py-3 px-4"
        )}
      >
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

      <div className="isolate inline-flex border-t">
        {actions.map((action, index) => {
          return (
            <button
              key={(action, index)}
              className={clsx(
                actions.length > 1 ? `w-1/${actions.length}` : `w-full`,
                "border-r p-3",
                "text-sm font-medium text-gray-700 hover:bg-gray-50",
                "focus:z-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500",
                "disabled:bg-transparent disabled:text-gray-300",
                "first:rounded-bl-md last:rounded-br-md last:border-r-0 last:text-indigo-600"
              )}
              {...action}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </Component>
  );
}
