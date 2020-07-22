import axios from "axios";

export default {
  scrapAzulemex: () => axios.get("/api/scrap/azulemex"),

  scrapGersa: () => axios.get("/api/scrap/gersa"),
};
