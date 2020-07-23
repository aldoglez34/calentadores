import axios from "axios";

export default {
  scrapAzulemexCalentadores: () =>
    axios.get("/api/scrap/azulemex/calentadores"),

  scrapAzulemexPegazulejos: () => axios.get("/api/scrap/azulemex/pegazulejos"),
};
