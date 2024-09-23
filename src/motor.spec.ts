import { calculaTicket } from "./motor";
import { LineaTicket } from "./modelo";

describe("calculaTicket", () => {
  it("deberia devolver un array con el precio calculado con y sin Iva", () => {
    //Arrange
    const productos: LineaTicket[] = [
      {
        producto: {
          nombre: "Legumbres",
          precio: 2,
          tipoIva: "general",
        },
        cantidad: 2,
      },
      {
        producto: {
          nombre: "Perfume",
          precio: 20,
          tipoIva: "general",
        },
        cantidad: 3,
      },
    ];
    //Act
    const result = calculaTicket(productos);
    //Assert
    expect(result).toEqual([
      {
        nombre: "Legumbres",
        cantidad: 2,
        precioSinIva: 4,
        tipoIva: "general",
        precioConIva: 4.84,
      },
      {
        nombre: "Perfume",
        cantidad: 3,
        precioSinIva: 60,
        tipoIva: "general",
        precioConIva: 72.6,
      },
    ]);
  });
});
