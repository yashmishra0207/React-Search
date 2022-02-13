import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ObjectWithIdKey,
  searchService,
} from "../../../services/api-services/SearchService";
import { generateDelay, getDebounceMagic } from "../../../utils/utils";
import CustomError from "../../CustomError/CustomError";
import SearchList from "../SearchList/SearchList";
import SearchListItem from "../SearchListItem/SearchListItem";

interface PropsInterface {
  url: string;
  queryResultItemElement: React.FunctionComponent<any>;
}

const CustomSearchBar: React.FC<PropsInterface> = ({
  url,
  queryResultItemElement: ResultItemElement,
}) => {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [estimatedDelay, setEstimatedDelay] = useState<number>();
  const [searchResults, setSearchResult] = useState<ObjectWithIdKey[]>([]);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [timer, setTimer] = useState<any>();

  const makeSearchApiCall = useCallback(
    (q: string) => {
      if (q) {
        const generatedDelay = generateDelay();

        setEstimatedDelay(generatedDelay);
        setIsFetching(true);
        setIsError(false);
        setErrorMessage(undefined);

        if (timer) clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            const temp = async () => {
              try {
                const res =
                  await searchService.getSearchResults<ObjectWithIdKey>(url, q);
                setSearchResult(res.data ?? []);
                setSearchedQuery(q);
              } catch (err: any) {
                console.log(err);
                setIsError(true);
                setErrorMessage(
                  (err?.errors && err.errors[0]?.message) || err?.message
                );
              } finally {
                setIsFetching(false);
              }
            };
            temp();
          }, generatedDelay)
        );
      } else {
        setSearchResult([]);
        setIsFetching(false);
        setIsError(false);
        setErrorMessage(undefined);
      }
    },
    [timer, url]
  );

  const smartApiCaller = useMemo(
    () => getDebounceMagic(makeSearchApiCall, 300),
    [makeSearchApiCall]
  );

  const handleInput = (e: any) => {
    setQuery(e.target.value);

    clearTimeout(timer);

    // to prevent displaying "No matching string found!" for a fraction of second on searching in empty search box.
    setIsFetching(true);

    if (estimatedDelay) {
      setEstimatedDelay(undefined);
    }

    smartApiCaller(e.target.value);
  };

  const renderList = () => (
    <SearchList>
      {searchResults.map((...[{ id, ...searchItem }]) => (
        <SearchListItem key={id}>
          <ResultItemElement
            {...searchItem}
            textToBeHighlighted={searchedQuery}
          />
        </SearchListItem>
      ))}
    </SearchList>
  );

  const displayMessage = (q: string) => (
    <p>
      {q
        ? !isFetching && "No matching string found!"
        : "Type something to search"}
    </p>
  );

  const shouldDisplayList = useMemo(
    () => (): boolean => searchResults.length !== 0,
    [searchResults]
  );

  const showQueryMessage = useMemo(
    () => (q: string) =>
      `${isFetching ? "Searching for" : "Fetched"}  ${q}, ${
        isFetching ? "estimated" : "in"
      }: ${estimatedDelay}ms`,
    [isFetching, estimatedDelay]
  );

  const renderBody = () => (
    <>
      <span className="query-info">
        {estimatedDelay !== undefined && query && showQueryMessage(query)}
      </span>
      <div className="results">
        {shouldDisplayList() ? renderList() : displayMessage(query)}
      </div>
    </>
  );

  return (
    <>
      <input type="search" onInput={(e) => handleInput(e)} value={query} />
      {isError ? <CustomError description={errorMessage} /> : renderBody()}
    </>
  );
};

export default memo(CustomSearchBar);
