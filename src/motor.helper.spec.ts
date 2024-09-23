import { calculaTicket, calcularTotalTicket, totalPorTipoIva } from "./motor.helper";
import { LineaTicket, ResultadoLineaTicket } from "./modelo";

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

describe("calcularTotalTicket", () => {
  it("Debería devolver un objeto con el total con IVA, sin IVA y el total del IVA", () => {
    //Arrange
    const resultadoLineasTicket : ResultadoLineaTicket[] = [
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
    ]
    //Act

    const result = calcularTotalTicket(resultadoLineasTicket);

  //Assert

  expect(result).toEqual({
    totalSinIva : 64,
    totalConIva : 77.44,
    totalIva : 13.44
  })
  })
})

describe("totalPorTipoIva", () => {
  it("Debería devolver un array de objetos con el tipo de iva y su cantidad total aplicada", () => {
    //Arrange
    const resultadoLineasTicket : ResultadoLineaTicket[] = [
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
      
    ];
    //Act
     const result = totalPorTipoIva(resultadoLineasTicket);
    //Assert

    expect(result).toEqual([
      {
        tipoIva : "general",
        cuantia : 13.44,
      },

      {
        tipoIva : "reducido",
        cuantia : 0,
      },
      {
        tipoIva : "superreducidoA",
        cuantia : 0,
      },
      {
        tipoIva : "superreducidoB",
        cuantia : 0,
      },
    ])
  })
})