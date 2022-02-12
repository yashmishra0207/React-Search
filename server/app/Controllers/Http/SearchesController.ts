import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import searchService from "App/Services/SearchService";
import SearchQueryValidator from "App/Validators/SearchQueryValidator";

export default class SearchesController {
  public async query({ request, response }: HttpContextContract) {
    const sanitisedPayload = await request.validate(SearchQueryValidator);
    const { query } = sanitisedPayload;

    const filteredList = await searchService.searchQuery(query);

    if (!filteredList.length) {
      return response.status(204);
    }

    return response.status(200).json({
      data: filteredList,
    });
  }
}
