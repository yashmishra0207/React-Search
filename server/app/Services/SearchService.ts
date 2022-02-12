import SearchItem from "App/Models/SearchItem";
import database from "../../start/dummyDB";

class SearchService {
  static getInstance() {
    return new SearchService();
  }

  async searchQuery(query: string): Promise<SearchItem[]> {
    return database.filter((searchItem) => searchItem.text.startsWith(query) ?? searchItem);
  }
}

const searchService = SearchService.getInstance();

export default searchService;
