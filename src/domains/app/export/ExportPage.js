import clsx from "clsx";
import React from "react";
import useExportToFile, { EXPORT_TYPES } from "./useExportFile";
import { ArrowDownTrayIcon as ExportIcon } from "@heroicons/react/24/outline";

export function ExportPage(props) {
  const { className } = props;
  const { exportToFile, status, error } = useExportToFile();

  const disabled = status === "loading";

  const handleExport = async (event) => {
    event.preventDefault();
    exportToFile({ type: event.target.exportType.value });
  };

  return (
    <div className="mb-6 max-w-md space-y-6">
      <section className="space-y-1.5">
        <h3 className="font-semibold">
          This is quick implementation of an export feature.
        </h3>
        <p>
          The export includes: name, username, description, url and location for
          each account you follow.
        </p>
      </section>

      <form onSubmit={handleExport}>
        <fieldset className="mt-4 mb-6 space-y-2" disabled={disabled}>
          <legend className="text-base font-medium">
            How would you like your data exported?
          </legend>

          {EXPORT_TYPES.map((exportType) => (
            <div key={exportType} className="flex items-center">
              <input
                id={exportType}
                name="exportType"
                type="radio"
                value={exportType}
                defaultChecked={exportType === "CSV"}
                className={clsx(
                  "h-4 w-4 border-stone-300 text-green-600 focus:ring-green-500",
                  "disabled:text-green-400"
                )}
              />
              <label
                htmlFor={exportType}
                className="ml-3 block text-sm font-medium text-stone-700"
              >
                as a {exportType} file
              </label>
            </div>
          ))}
        </fieldset>

        <button
          className={clsx(
            "group inline-flex items-center justify-center rounded-full py-2 px-4",
            "text-sm font-semibold",
            "hover:text-stone-10 bg-green-600 text-white hover:bg-green-500",
            "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600",
            "active:bg-green-800 active:text-green-100",
            "disabled:bg-green-400",
            className
          )}
          disabled={disabled}
        >
          <ExportIcon
            className={clsx("mr-2 w-6", "group-disabled:animate-pulse")}
          />
          <span className="group-disabled:opacity-60">Export follows</span>
        </button>
      </form>

      {status === "loading" && (
        <section className="space-y-1.5">
          <h3 className="font-semibold">Keep tab open</h3>
          <p>The export should take less than 30 seconds.</p>
        </section>
      )}

      {status === "error" && (
        <section className="space-y-1.5">
          <h3 className="font-semibold">Something went wrong...</h3>
          <p>
            Please report to{" "}
            <a href="https://twitter.com/raae" target="_blank" rel="noreferrer">
              @raae
            </a>{" "}
            in a Twitter DM, or create an issue on{" "}
            <a
              href="https://github.com/queen-raae/prune-your-follows/issues"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            .
          </p>
          <p>Include the following:</p>
          <pre className="whitespace-pre-line text-xs">
            {JSON.stringify(error)}
          </pre>
        </section>
      )}
    </div>
  );
}
