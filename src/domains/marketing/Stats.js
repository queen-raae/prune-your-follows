import React from "react";

export function Stats() {
  return (
    <section className="bg-green-100 pt-1">
      <div className=" bg-green-50 pb-6">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-green-100" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-2">
                <div className="flex flex-col border-b border-stone-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-stone-500">
                    Users
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-green-600">
                    186
                  </dd>
                </div>
                <div className="flex flex-col border-t border-stone-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-stone-500">
                    Unfollows
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-green-600">
                    3971
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
