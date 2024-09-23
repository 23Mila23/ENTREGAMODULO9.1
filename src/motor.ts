import{LineaTicket,TicketFinal} from "./modelo"
import {calculaTicket, calcularTotalTicket, totalPorTipoIva} from "./motor.helper"

export const productos: LineaTicket[] = [
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
    {
      producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
      },
      cantidad: 6,
    },
    {
      producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    },
  ];

  
 export const ticketFinal = (productos : LineaTicket[]) : TicketFinal => {
    const lineas = calculaTicket(productos);
    const total = calcularTotalTicket(lineas);
    const desgloseIva = totalPorTipoIva(lineas);

    const ticketFinal : TicketFinal = {
        lineas,
        total,
        desgloseIva
    }
    return ticketFinal
 }
