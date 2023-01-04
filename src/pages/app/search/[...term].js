import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

import useSiteMetadata from "../../../domains/common/useSiteMetadata";
import { AppLayout } from "../../../domains/app/AppLayout";
import { SearchForm, SearchResults } from "../../../domains/app/search";
import { useDebounce } from "usehooks-ts";

export const Head = () => {
  const meta = useSiteMetadata();
  return (
    <>
      <title>{meta?.title} - app</title>
      <meta name="description" content={meta?.description} />
    </>
  );
};

export default function App(props) {
  const { term: encodedTerm, location } = props;
  const [term, setTerm] = useState(decodeURIComponent(encodedTerm || ""));
  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    const newEncodedTerm = encodeURIComponent(debouncedTerm || "");

    if (newEncodedTerm) {
      navigate(`/app/search/${newEncodedTerm}/`);
    } else {
      navigate(`/app/`, { state: { searchAutoFocus: true } });
    }
  }, [debouncedTerm]);

  return (
    <>
      <AppLayout
        header={
          <SearchForm
            term={term}
            onTermChange={setTerm}
            autoFocus={location.state?.searchAutoFocus}
          />
        }
      >
        <SearchResults term={encodedTerm} />
      </AppLayout>
    </>
  );
}
