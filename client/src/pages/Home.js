import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  Container,
  Table,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import ScrollButton from "../components/scrollbutton";
import firebase from "../firebase";
import Login from "../components/login";

const Home = () => {
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState();

  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((fbUser) => (fbUser ? setIsLogged(fbUser) : null));
  });

  const scrapAzulemexCalentadores = () => {
    // set selected
    setLoading(true);
    setSelected("Azulemex-Calentadores");

    // scrap azulemex website (3 pages)
    API.scrapAzulemexCalentadores()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  const scrapAzulemexPegazulejos = () => {
    // set selected
    setLoading(true);
    setSelected("Azulemex-Pegazulejos");

    // scrap azulemex website
    API.scrapAzulemexPegazulejos()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  const scrapGersaCalentadores = () => {
    // set selected
    setLoading(true);
    setSelected("Gersa-Calentadores");

    // scrap azulemex website
    API.scrapGersaCalentadores()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  const scrapElSurtidorCalentadores = () => {
    // set selected
    setLoading(true);
    setSelected("ElSurtidor-Calentadores");

    // scrap azulemex website
    API.scrapElSurtidorCalentadores()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  const scrapHomeDepotCalentadores = () => {
    // set selected
    setLoading(true);
    setSelected("HomeDepot-Calentadores");

    // scrap azulemex website
    API.scrapHomeDepotCalentadores()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  const scrapHomeDepotAdhesivos = () => {
    // set selected
    setLoading(true);
    setSelected("HomeDepot-Adhesivos");

    // scrap azulemex website
    API.scrapHomeDepotAdhesivos()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error al cargar los productos, intenta de nuevo");
        window.location.reload();
      });
  };

  // show stuff only if admin is logged
  return (
    <Container>
      {/* title */}
      <Fade>
        <h1 className="mt-0 mt-md-2 display-4" style={{ fontWeight: 700 }}>
          Web Scraping
        </h1>
      </Fade>
      {isLogged ? (
        <>
          <Row className="mt-0 mt-md-4">
            {/* menu */}
            <Col md={2} className="d-flex flex-column">
              {/* azulemex */}
              <span style={{ fontWeight: 600, fontSize: "18px" }}>
                <i className="fas fa-globe mr-1" style={{ fontSize: "15px" }} />
                azulemex
              </span>
              <Button
                variant="outline-info"
                active={selected === "Azulemex-Calentadores" ? true : false}
                onClick={scrapAzulemexCalentadores}
                className="shadow-sm mt-2"
                size="sm"
              >
                Calentadores
              </Button>
              <Button
                variant="outline-info"
                active={selected === "Azulemex-Pegazulejos" ? true : false}
                onClick={scrapAzulemexPegazulejos}
                className="shadow-sm mt-2"
                size="sm"
              >
                Pegazulejos
              </Button>
              {/* gersa */}
              <span
                style={{ fontWeight: 600, fontSize: "18px" }}
                className="mt-3"
              >
                <i className="fas fa-globe mr-1" style={{ fontSize: "15px" }} />
                gersamex
              </span>
              <Button
                variant="outline-info"
                active={selected === "Gersa-Calentadores" ? true : false}
                onClick={scrapGersaCalentadores}
                className="shadow-sm mt-2"
                size="sm"
              >
                Calentadores
              </Button>
              {/* el surtidor */}
              <span
                style={{ fontWeight: 600, fontSize: "18px" }}
                className="mt-3"
              >
                <i className="fas fa-globe mr-1" style={{ fontSize: "15px" }} />
                surtidor
              </span>
              <Button
                variant="outline-info"
                active={selected === "ElSurtidor-Calentadores" ? true : false}
                onClick={scrapElSurtidorCalentadores}
                className="shadow-sm mt-2"
                size="sm"
              >
                Calentadores
              </Button>
              {/* home depot méxico */}
              <span
                style={{ fontWeight: 600, fontSize: "18px" }}
                className="mt-3"
              >
                <i className="fas fa-globe mr-1" style={{ fontSize: "15px" }} />
                homedepot
              </span>
              <Button
                variant="outline-info"
                active={selected === "HomeDepot-Calentadores" ? true : false}
                onClick={scrapHomeDepotCalentadores}
                className="shadow-sm mt-2"
                size="sm"
              >
                Calentadores
              </Button>
              <Button
                variant="outline-info"
                active={selected === "HomeDepot-Adhesivos" ? true : false}
                onClick={scrapHomeDepotAdhesivos}
                className="shadow-sm mt-2"
                size="sm"
              >
                Adhesivos
              </Button>
            </Col>
            {/* table */}
            <Col md={10} className="mt-4 mt-md-0 mb-3">
              <div>
                {loading ? (
                  <div className="mt-4 pt-4 text-center">
                    <h5 className="text-info">Harvesting...</h5>
                    <Spinner animation="border" variant="info" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : prices ? (
                  <>
                    <h3>
                      {selected}
                      <span
                        className="text-info ml-2"
                        title="Productos encontrados"
                      >
                        ({prices.length})
                      </span>
                    </h3>
                    <Table
                      responsive
                      style={{ fontSize: "14px" }}
                      className="shadow-sm"
                      striped
                      bordered
                      hover
                      size="sm"
                    >
                      <thead>
                        <tr>
                          <th className="py-3 bg-dark text-light">Tipo</th>
                          <th className="py-3 bg-dark text-light">Marca</th>
                          <th className="py-3 bg-dark text-light">Nombre</th>
                          <th className="py-3 bg-dark text-light">Precio</th>
                          <th className="py-3 bg-dark text-light">
                            PrecioOferta
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {prices.map((p, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="align-middle">{p.type}</td>
                              <td className="align-middle">{p.brand}</td>
                              <td className="align-middle">
                                {p.name}
                                {p.hasDiscount ? (
                                  <i
                                    className="fas fa-tags ml-1 text-danger"
                                    title="En oferta"
                                  />
                                ) : null}
                              </td>
                              <td className="text-right align-middle">
                                {p.price}
                              </td>
                              <td className="text-right align-middle">
                                {p.discountPrice ? p.discountPrice : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <div className="my-4 text-center">
                    <Image
                      src="/images/pickaxe.png"
                      height="200"
                      width="200"
                      style={{ opacity: "0.1", marginTop: "90px" }}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {/* scroll */}
          <ScrollButton scrollStepInPx={150} delayInMs={16.66} />
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default Home;
