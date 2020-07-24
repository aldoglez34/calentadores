import React, { useState } from "react";
import { Button, Container, Table, Spinner, Row, Col } from "react-bootstrap";
import API from "../utils/API";
import Fade from "react-reveal/Fade";

const Home = () => {
  const [selected, setSelected] = useState();

  const [loading, setLoading] = useState(false);

  const [prices, setPrices] = useState();

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
      });
  };

  return (
    <Container>
      {/* title */}
      <Fade>
        <h1 className="mt-0 mt-md-4 display-3" style={{ fontWeight: 700 }}>
          Web Scraping
        </h1>
      </Fade>
      {/* content */}
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
          <span style={{ fontWeight: 600, fontSize: "18px" }} className="mt-3">
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
          <span style={{ fontWeight: 600, fontSize: "18px" }} className="mt-3">
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
          <span style={{ fontWeight: 600, fontSize: "18px" }} className="mt-3">
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
                      <th className="py-3 bg-dark text-light">PrecioOferta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((p, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{p.type}</td>
                          <td>{p.brand}</td>
                          <td>
                            {p.name}
                            {p.hasDiscount ? (
                              <i
                                className="fas fa-tags ml-1 text-danger"
                                title="En oferta"
                              />
                            ) : null}
                          </td>
                          <td>{p.price}</td>
                          <td>{p.discountPrice ? p.discountPrice : null}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
