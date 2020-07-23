import React, { useState } from "react";
import {
  Button,
  Container,
  Table,
  Spinner,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
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
        alert("Ocurrió un error con el proceso");
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
        alert("Ocurrió un error con el proceso");
      });
  };

  return (
    <Container>
      {/* title */}
      <Fade>
        <h1 className="mt-4 display-3" style={{ fontWeight: 700 }}>
          Web Scraping
        </h1>
        <hr />
      </Fade>
      {/* content */}
      <Row>
        {/* menu */}
        <Col md={2}>
          <h3>Azulemex</h3>
          <Button
            variant="outline-info"
            active={selected === "Azulemex-Calentadores" ? true : false}
            onClick={scrapAzulemexCalentadores}
            className="shadow-sm"
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
        </Col>
        {/* table */}
        <Col md={10}>
          <div>
            {loading ? (
              <div className="mt-4 pt-4 text-center">
                <Spinner animation="border" variant="info" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : prices ? (
              <Table className="shadow-sm" striped bordered hover size="sm">
                <thead>
                  <tr>
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
                        <td>{p.brand}</td>
                        <td>
                          {p.name}
                          {p.hasDiscount ? (
                            <Badge variant="danger" className="ml-1">
                              Oferta
                            </Badge>
                          ) : null}
                        </td>
                        {p.price ? (
                          <td>{p.price}</td>
                        ) : (
                          <td>
                            <strong className="text-danger">Agotado</strong>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
