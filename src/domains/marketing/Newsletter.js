import React from "react";

export function Newsletter() {
  return (
    <section className="bg-lime-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8 xl:flex xl:items-center">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-orange-50 sm:text-3xl">
            Sign up for product news and updates
          </h2>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
          <form
            className="sm:flex"
            action="https://forms.userlist.com/0e1abbbf-73fe-48cf-b5de-8dc7828b54b0/submissions"
            method="POST"
            accept-charset="UTF-8"
          >
            <label htmlFor="fields[email]" className="sr-only">
              Email address
            </label>
            <input
              id="fields_email"
              name="fields[email]"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-md px-5 py-3 placeholder-stone-500"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-5 py-3 text-base font-medium text-orange-50 hover:bg-green-600 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
