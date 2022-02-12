import React, { useCallback, useMemo, useState } from "react";
import { generateDelay, getDebounceMagic } from "./utils/utils";
import "./App.css";
import SearchList from "./components/Search/SearchList/SearchList";
import { searchService } from "./services/api-services/SearchService";
import SearchListItem from "./components/Search/SearchListItem/SearchListItem";
import SearchItem from "./Models/SearchItem";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [estimatedDelay, setEstimatedDelay] = useState<number>();
  const [searchResults, setSearchResult] = useState<SearchItem[]>([]);
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
                const res = await searchService.getSearchResults(q);
                setSearchResult(res.data ?? []);
                setIsFetching(false);
              } catch (err: any) {
                console.log(err);
                setIsError(true);
                setErrorMessage(
                  (err?.errors && err.errors[0]?.message) || err?.message
                );
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
    [timer]
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

  const renderList = (list: SearchItem[]) => (
    <SearchList>
      {list.map((searchItem) => (
        <SearchListItem key={searchItem.id} text={searchItem.text} />
      ))}
    </SearchList>
  );

  const displayMessage = () => (
    <p>
      {query
        ? !isFetching && "No matching string found!"
        : "Type something to search"}
    </p>
  );

  const shouldDisplayList = (): boolean => searchResults.length !== 0;

  const render = () => (
    <>
      <span className="query-info">
        {estimatedDelay !== undefined &&
          query &&
          `Searching for ${query}, estimated: ${estimatedDelay}ms`}
      </span>
      <div className="results">
        {shouldDisplayList() ? renderList(searchResults) : displayMessage()}
      </div>
    </>
  );

  return (
    <div className="App">
      <input type="search" onInput={(e) => handleInput(e)} value={query} />
      {isError ? (
        <div>
          Some error occured
          <br />
          detail:{errorMessage}
        </div>
      ) : (
        render()
      )}
    </div>
  );
};

export default App;
