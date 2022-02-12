import SearchItem from '../../Models/SearchItem';
import searchRoutes from '../api-routes/search.routes';
import { baseApiService } from './BaseApiService';

const routes = searchRoutes;

class SearchService {
  static getInstance() {
    return new SearchService();
  }

  async getSearchResults(query: string): Promise<{ data: SearchItem[] }> {
    return baseApiService.get(routes.search, { params: { query } });
  }
}

export const searchService = SearchService.getInstance();
