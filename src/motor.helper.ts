import{LineaTicket, ResultadoLineaTicket, ResultadoTotalTicket, TotalPorTipoIva} from "./modelo"

  export const calculaTicket = (lineasTicket: LineaTicket[]) : ResultadoLineaTicket[] => { //TAMBIÉN SE PUEDE USAR REDUCE
    let resultadoLinea : ResultadoLineaTicket[] = [];
    console.trace("lineasTicket", lineasTicket)
     for (let i = 0; i < lineasTicket.length; i++) {
        const {producto, cantidad} = lineasTicket[i]; // MAS O MENOS CLARO

       const precioSinIva = producto.precio * cantidad;

       let precioConIva = 0;
       switch (producto.tipoIva){
         case "general" :
         precioConIva = parseFloat(((precioSinIva*21)/100).toFixed(2)) + precioSinIva;
         break;
         case "reducido" :
         precioConIva = parseFloat(((precioSinIva*10)/100).toFixed(2)) + precioSinIva;
         break;
         case "superreducidoA":
         precioConIva = parseFloat(((precioSinIva*5)/100).toFixed(2)) + precioSinIva;
         break;
         case "superreducidoB":
         precioConIva = parseFloat(((precioSinIva*4)/100).toFixed(2)) + precioSinIva;
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

   export const calcularTotalTicket = (resultadoLineaTicket : ResultadoLineaTicket[]) : ResultadoTotalTicket => {

    let totalSinIva = 0;
    let totalConIva = 0;
    let totalIva = 0;

    for( let i = 0; i < resultadoLineaTicket.length; i++) {
        const {precioSinIva, precioConIva, tipoIva} = resultadoLineaTicket[i];
        totalSinIva += precioSinIva;
        totalConIva += precioConIva;
        switch (tipoIva){
            case "general" :
            totalIva += parseFloat(((precioSinIva*21)/100).toFixed(2));
            break;
            case "reducido" :
            totalIva += parseFloat(((precioSinIva*10)/100).toFixed(2));
            break;
            case "superreducidoA":
            totalIva += parseFloat(((precioSinIva*5)/100).toFixed(2));
            break;
            case "superreducidoB":
            totalIva += parseFloat(((precioSinIva*4)/100).toFixed(2));
            break;
            case "superreducidoC":
            totalIva += ((precioSinIva*0)/100); 
            break;
            case "sinIva":
            totalIva += ((precioSinIva*0)/100);
            break;
          }
    }
    return {
        totalSinIva,
        totalConIva,
        totalIva
    }
    }
  

export const totalPorTipoIva = (resultadoLineaTicket : ResultadoLineaTicket []) : TotalPorTipoIva [] => {
    let ivaGeneral : TotalPorTipoIva= {
        tipoIva : "general",
        cuantia : 0,
    };

    let ivaReducido : TotalPorTipoIva = {
        tipoIva : "reducido",
        cuantia : 0,
    }

    let ivaSuperReducidoA : TotalPorTipoIva = {
        tipoIva : "superreducidoA",
        cuantia : 0,
    }

    let ivaSuperReducidoB : TotalPorTipoIva = {
        tipoIva : "superreducidoB",
        cuantia : 0,
    }

for(let i = 0; i < resultadoLineaTicket.length; i++){
    const {precioConIva, precioSinIva, tipoIva} = resultadoLineaTicket[i];
    
    switch (tipoIva){
        case "general" :
        ivaGeneral.cuantia += parseFloat((precioConIva - precioSinIva).toFixed(2));
        break;
        case "reducido" :
        ivaReducido.cuantia += parseFloat((precioConIva - precioSinIva).toFixed(2));
        break;
        case "superreducidoA":
        ivaSuperReducidoA.cuantia += parseFloat((precioConIva - precioSinIva).toFixed(2));
        break;
        case "superreducidoB":
        ivaSuperReducidoB.cuantia += parseFloat((precioConIva - precioSinIva).toFixed(2));
        break;
      }

}
 const  totalPorTipoIva : TotalPorTipoIva [] = [ivaGeneral,ivaReducido,ivaSuperReducidoA,ivaSuperReducidoB];

 return totalPorTipoIva

}
