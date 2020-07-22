import React, { useState } from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap";
import API from "../utils/API";

const Home = () => {
  const [selected, setSelected] = useState();

  const [loading, setLoading] = useState(false);

  const [prices, setPrices] = useState();

  const scrapAzulemex = () => {
    // set selected
    setLoading(true);
    setSelected("Azulemex");

    // scrap azulemex website (3 pages)
    API.scrapAzulemex()
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert("Ocurrió un error con el proceso");
      });
  };

  const scrapGersa = () => {
    // set selected
    setLoading(true);
    setSelected("Gersa");

    // scrap azulemex website (3 pages)
    API.scrapAzulemex()
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
    <Container className="pt-4">
      <h1 className="mt-4 display-4" style={{ fontWeight: 700 }}>
        Precios de Calentadores
      </h1>
      <div className="mt-3 d-flex flex-row">
        <Button
          variant="outline-info"
          active={selected === "Azulemex" ? true : false}
          onClick={scrapAzulemex}
          className="shadow-sm"
        >
          Azulemex
        </Button>
        {/* <Button
          variant="outline-info"
          active={selected === "Gersa" ? true : false}
          onClick={scrapGersa}
          className="shadow-sm ml-2"
        >
          Gersa
        </Button> */}
      </div>
      <div className="my-4">
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
                <th className="py-3">Marca</th>
                <th className="py-3">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, idx) => {
                return (
                  <tr key={idx}>
                    <td>{p.brand}</td>
                    <td>{p.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}
      </div>
    </Container>
  );
};

export default Home;
