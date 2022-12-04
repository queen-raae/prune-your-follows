import React from "react";
import parse from "html-react-parser";
import clsx from "clsx";
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from "@heroicons/react/20/solid";

import { Avatar } from "./Avatar";
import useAccountAction from "./useAccountAction";

const display = (...props) => {
  const theString = props
    .filter((item) => item !== undefined)
    .map((item) => "" + item)
    .reduce((acc, item) => {
      return acc || item;
    }, "");

  return theString ? parse(theString) : "";
};

export function AccountCard(props) {
  const { as, highlight, ...account } = props;
  const { actions, status } = useAccountAction(account);

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
        "rounded-lg border-2 bg-green-50 shadow-sm",
        status === "error" ? "border-red-600" : "border-lime-600",
        (status === "success" || status === "loading") && "hidden"
      )}
    >
      <div className="flex px-4 pt-5">
        <div className="flex-shrink-0">
          <Avatar
            imageUrl={avatarImageUrl}
            altText={avatarImageAlt}
            name={account.name}
            className="h-10 w-10"
          />
        </div>
        <div className="pl-3 pr-5">
          <p className="text-sm font-medium leading-5">
            {displayName && (
              <a
                href={twitterUrl}
                className="group text-stone-700 hover:text-stone-900"
                target="_blank"
                rel="noreferrer"
              >
                {displayName}&nbsp;
                <ExternalLinkIcon className="ml-1 inline h-3 opacity-50 transition group-hover:opacity-100" />
              </a>
            )}
          </p>
          <p className="leading- text-sm">
            {displayUsername && <>@{displayUsername}</>}
            {displayLocation && <> - {displayLocation}</>}
          </p>
        </div>
      </div>
      <p className="leading- px-5 py-4 text-sm">
        {displayDescription || <>&nbsp;</>}
      </p>
      <div
        className={clsx(
          "mt-auto flex justify-between space-x-3 border-t border-green-200 bg-green-100 py-3 px-4"
        )}
      >
        <p className="text-xs leading-5 text-green-800">
          <strong>{displayFollowerCount}</strong> Followers
          <br />
          <strong>{displayFollowingCount}</strong> Following
        </p>
        <p className="text-right text-xs leading-5 text-green-800">
          Joined <strong>{displayYearsOnTwitter}</strong> years ago
          <br />
          Average <strong>{displayAverageTweetsPerYear}</strong> tweets per year
        </p>
      </div>

      <div className="isolate flex items-stretch border-t border-green-600">
        {actions.map((action, index) => {
          return (
            <button
              key={(action, index)}
              className={clsx(
                "grow border-r border-green-800 bg-white p-3",
                "text-sm font-medium text-green-900 hover:bg-green-100",
                "focus:z-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-500",
                "disabled:bg-transparent disabled:opacity-60",
                "first:rounded-bl-lg last:rounded-br-lg last:border-r-0 last:bg-green-200"
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
