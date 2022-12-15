import React from "react";
import { useUpdateUser } from "./user";

export function EmailForm() {
  const { handleUpdateUser, status, error } = useUpdateUser();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ email: event.target.email.value });
  };

  const errorMessage = error?.response?.data?.message;
  const isDisabled = status === "loading" || status === "success";

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:flex sm:items-center">
        <div className="w-full disabled:opacity-50 sm:max-w-xs">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            required
            disabled={isDisabled}
            className="block w-full rounded-md border border-stone-300 py-2 px-3 shadow-sm focus:border-green-700 sm:text-sm"
            placeholder="you@example.com"
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "email-error" : null}
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-4 py-2 font-medium text-orange-50 shadow-sm transition hover:bg-green-700 disabled:opacity-20 disabled:hover:bg-green-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
          <span className="inline-block w-full">please try again</span>
        </p>
      )}
    </form>
  );
}
