import Accordion from "react-bootstrap/Accordion";

import React from "react";

const FaqAccordion = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Preguntas frecuentes</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>¿Cómo puedo comprar un producto? </Accordion.Header>
          <Accordion.Body>
            Podés seleccionar el producto, agregarlo al carrito y luego
            finalizar la compra completando tus datos.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Qué métodos de pago aceptan? </Accordion.Header>
          <Accordion.Body>
            Aceptamos efectivo, transferencias bancarias y billeteras
            virtuales..
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>¿Cuánto tarda el envío? </Accordion.Header>
          <Accordion.Body>
            El envío puede tardar entre 2 y 5 días hábiles dependiendo de tu
            ubicación.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>¿Puedo devolver un producto? </Accordion.Header>
          <Accordion.Body>
            Sí, tenés hasta 10 días para solicitar la devolución siempre que el
            producto esté en condiciones originales.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            ¿Cómo hago el seguimiento de mi pedido?
          </Accordion.Header>
          <Accordion.Body>
            Una vez realizada la compra, verás tu número de seguimiento.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
