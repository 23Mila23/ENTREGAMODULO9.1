import {
  LineaTicket,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TipoIva,
  TotalPorTipoIva,
} from "./modelo";

const calcularIva = (precioSinIva: number, tipoIva: TipoIva): number => {
  let iva = 0;
  switch (tipoIva) {
    case "general":
      iva = parseFloat(((precioSinIva * 21) / 100).toFixed(2));
      break;
    case "reducido":
      iva = parseFloat(((precioSinIva * 10) / 100).toFixed(2));
      break;
    case "superreducidoA":
      iva = parseFloat(((precioSinIva * 5) / 100).toFixed(2));
      break;
    case "superreducidoB":
      iva = parseFloat(((precioSinIva * 4) / 100).toFixed(2));
      break;
    case "superreducidoC":
      iva = 0;
      break;
    case "sinIva":
      iva = 0;
      break;
  }

  return iva;
};
export const calculaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultadoLinea: ResultadoLineaTicket[] = lineasTicket.map((item) => {
    const { producto, cantidad } = item;

    const precioSinIva = producto.precio * cantidad;

    let precioConIva =
      calcularIva(precioSinIva, producto.tipoIva) + precioSinIva;

    const objetoTicket: ResultadoLineaTicket = {
      nombre: producto.nombre,
      cantidad: cantidad,
      precioSinIva: precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva: precioConIva,
    };

    return objetoTicket;
  });

  return resultadoLinea;
};

export const calcularTotalTicket = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;

  resultadoLineaTicket.forEach((item) => {
    const { precioSinIva, precioConIva, tipoIva } = item;
    totalSinIva += precioSinIva;
    totalConIva += precioConIva;
    totalIva += calcularIva(precioSinIva, tipoIva);
  });

  return {
    totalSinIva,
    totalConIva,
    totalIva,
  };
};

export const totalPorTipoIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  let ivaGeneral: TotalPorTipoIva = {
    tipoIva: "general",
    cuantia: 0,
  };

  let ivaReducido: TotalPorTipoIva = {
    tipoIva: "reducido",
    cuantia: 0,
  };

  let ivaSuperReducidoA: TotalPorTipoIva = {
    tipoIva: "superreducidoA",
    cuantia: 0,
  };

  let ivaSuperReducidoB: TotalPorTipoIva = {
    tipoIva: "superreducidoB",
    cuantia: 0,
  };

  resultadoLineaTicket.forEach((item) => {
    const { precioSinIva, tipoIva } = item;

    switch (tipoIva) {
      case "general":
        ivaGeneral.cuantia += calcularIva(precioSinIva, tipoIva);
        break;
      case "reducido":
        ivaReducido.cuantia += calcularIva(precioSinIva, tipoIva);
        break;
      case "superreducidoA":
        ivaSuperReducidoA.cuantia += calcularIva(precioSinIva, tipoIva);
        break;
      case "superreducidoB":
        ivaSuperReducidoB.cuantia += calcularIva(precioSinIva, tipoIva);
        break;
    }
  });

  const totalPorTipoIva: TotalPorTipoIva[] = [
    ivaGeneral,
    ivaReducido,
    ivaSuperReducidoA,
    ivaSuperReducidoB,
  ];

  return totalPorTipoIva;
};
