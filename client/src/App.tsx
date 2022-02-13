import React from "react";
import "./App.css";
import searchRoutes from "./services/api-routes/search.routes";
import CustomSearchBar from "./components/Search/CustomSearchBar/CustomSearchBar";
import TextView from "./components/TextView/TextView";

const App: React.FC = () => (
  <div className="App">
    <CustomSearchBar
      url={searchRoutes.search}
      queryResultItemElement={TextView}
    />
  </div>
);

export default App;
