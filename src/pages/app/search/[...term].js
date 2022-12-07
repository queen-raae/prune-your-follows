import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

import useSiteMetadata from "../../../domains/common/useSiteMetadata";
import { AppLayout } from "../../../domains/app/AppLayout";
import { SearchForm, SearchResults } from "../../../domains/app/search";

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

  useEffect(() => {
    const newEncodedTerm = encodeURIComponent(term || "");

    if (newEncodedTerm) {
      navigate(`/app/search/${newEncodedTerm}/`);
    } else {
      navigate(`/app/`, { state: { searchAutoFocus: true } });
    }
  }, [term]);

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
