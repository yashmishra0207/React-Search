import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ObjectWithIdKey,
  searchService,
} from "../../../services/api-services/SearchService";
import { generateDelay, getDebounceMagic } from "../../../utils/utils";
import CustomError from "../../CustomError/CustomError";
import SearchList from "../SearchList/SearchList";
import SearchListItem from "../SearchListItem/SearchListItem";
import styles from "./CustomSearchBar.module.css";
import searchIcon from "../../../assets/icons/search-icon.svg";

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
        setSearchedQuery("");
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
    <p className={styles["no-result-message-container"]}>
      {
        q && !isFetching && "No matching results!"
      }
    </p>
  );

  const shouldDisplayList = useMemo(
    () => (): boolean => searchResults.length !== 0,
    [searchResults]
  );

  const showQueryMessage = useMemo(
    () => (q: string) =>
      `${isFetching ? "Searching for" : "Fetched"}  "${q}"${
        isFetching ? ", estimated:" : " in"
      } ${estimatedDelay ?? '...'}ms`,
    [isFetching, estimatedDelay]
  );

  const renderBody = () => (
    <>
      <div className={styles["query-info"]}>
        {
          query && showQueryMessage(query)
        }
      </div>
      <div className={styles['search-results-list']}>
        {shouldDisplayList() && query ? renderList() : displayMessage(query)}
      </div>
    </>
  );

  return (
    <div className={styles.main}>
      <div className={styles["searchbar-container"]}>
        <img
          className={styles["search-icon"]}
          src={searchIcon}
          alt="search icon"
        />
        <input
          className={styles.input}
          type="search"
          onInput={(e) => handleInput(e)}
          value={query}
          placeholder="Type Something..."
        />
      </div>
      <div className={styles["search-result-container"]}>
        {isError ? <CustomError description={errorMessage} /> : renderBody()}
      </div>
    </div>
  );
};

export default memo(CustomSearchBar);
