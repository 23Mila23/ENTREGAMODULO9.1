import{LineaTicket, ResultadoLineaTicket} from "./modelo"

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

  export const calculaTicket = (lineasTicket: LineaTicket[]) : ResultadoLineaTicket[] => { //TAMBIÉN SE PUEDE USAR REDUCE
    let resultadoLinea : ResultadoLineaTicket[] = [];
    
     for (let i = 0; i < lineasTicket.length; i++) {
        const {producto, cantidad} = lineasTicket[i]; // MAS O MENOS CLARO

       const precioSinIva = producto.precio * cantidad;

       let precioConIva = 0;
       switch (producto.tipoIva){
         case "general" :
         precioConIva = ((precioSinIva*21)/100) + precioSinIva;
         break;
         case "reducido" :
         precioConIva = ((precioSinIva*10)/100) + precioSinIva;
         break;
         case "superreducidoA":
         precioConIva = ((precioSinIva*5)/100) + precioSinIva;
         break;
         case "superreducidoB":
         precioConIva = ((precioSinIva*4)/100) + precioSinIva;
         break;
         case "superreducidoC":
         precioConIva = ((precioSinIva*0)/100) + precioSinIva; // ESTOS DAN 0 SI NO LOS PONGO PASA ALGO?
         break;
         case "sinIva":
         precioConIva = ((precioSinIva*0)/100) + precioSinIva;
         break;
       }
  
       const objetoTicket : ResultadoLineaTicket = {
        nombre: producto.nombre,
        cantidad : cantidad,
        precioSinIva : precioSinIva,
        tipoIva :producto.tipoIva,
        precioConIva : precioConIva,
       }

       resultadoLinea.push(objetoTicket)
     }

     return resultadoLinea
   }; 
  



/*TENEMOS QUE LLEGAR A ESTE FINAL:
interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
} */