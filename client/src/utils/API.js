import axios from "axios";

export default {
  // ==============================================
  // AZULEMEX
  // ==============================================
  scrapAzulemexCalentadores: () =>
    axios.get("/api/scrap/azulemex/calentadores"),

  scrapAzulemexPegazulejos: () => axios.get("/api/scrap/azulemex/pegazulejos"),

  // ==============================================
  // GERSA
  // ==============================================
  scrapGersaCalentadores: () => axios.get("/api/scrap/gersa/calentadores"),

  // ==============================================
  // EL SURTIDOR
  // ==============================================
  scrapElSurtidorCalentadores: () =>
    axios.get("/api/scrap/elsurtidor/calentadores"),

  // ==============================================
  // HOME DEPOT
  // ==============================================
  scrapHomeDepotCalentadores: () =>
    axios.get("/api/scrap/homedepot/calentadores"),
};
