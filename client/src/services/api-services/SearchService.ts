import { baseApiService } from './BaseApiService';

export type ObjectWithIdKey = { id: any; [key: string]: any };

class SearchService {
  static getInstance() {
    return new SearchService();
  }

  async getSearchResults<T extends ObjectWithIdKey>(url: string, query: string): Promise<{ data: T[] }> {
    return baseApiService.get(url, { params: { query } });
  }
}

export const searchService = SearchService.getInstance();
