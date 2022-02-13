import React from "react";
import styles from "./App.module.css";
import searchRoutes from "./services/api-routes/search.routes";
import CustomSearchBar from "./components/Search/CustomSearchBar/CustomSearchBar";
import TextView from "./components/TextView/TextView";

const App: React.FC = () => (
  <div className={styles.App}>
    <div className={styles["search-bar-container"]}>
      <CustomSearchBar
        url={searchRoutes.search}
        queryResultItemElement={TextView}
      />
      <div className={styles["feature-list-container"]}>
        <header>Below are the features of above search suggestion.</header>
        <ul>
          <li>Has debounced query search.</li>
          <li>Prevents race condition while highlighting matching text.</li>
        </ul>
      </div>
      <blockquote className={styles.quote}>
        &quot;What is the most used tool by a <code>{`</>`}</code> developer?
        Guess what!&quot;
      </blockquote>
    </div>
  </div>
);

export default App;
