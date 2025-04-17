interface loginProps{
    codigo: number | string;
    pass: string 
}

const valLoginCli = (codigo: number, pass:string ) => {

    const ci = parseInt(codigo.toString());

    if(!ci || isNaN(ci)){
        return("ERROR. ci no valido. no tiene ningun valor o no es un número válido");
    }
    if(ci.toString().length < 5){
        return("ERROR. ci no valido, debe ser un número positivo mayor a 5 digitos");
    }
    if(ci.toString().length > 9){
        return("ERROR. ci no valido, debe ser un número positivo menor a 9 digitos");
    }

    if(!pass || pass.trim() === ""){
        return("ERROR. contraseña no valida, no tiene ningun valor");
    }
    if(pass.length <5){
        return("ERROR. contraseña no valida, cuenta con menos de 5 caracteres");
    }
    if(pass.length >99){
        return("ERROR. contraseña no valida, cuenta con mas de 100 caracteres");
    }

    return "EXITO.";
}

const valLoginArq = (codigo:string, pass:string) => {

    if(!codigo || codigo.length < 5){
        return("ERROR. codigo no valido, ingreso de codigo menor a 5 digitos")
    }
    if(codigo.length > 999999999){
        return("ERROR. codigo no valido, ingreso de codigo mas de 9 digitos")
    }

    if(!pass || pass.trim() === ""){
        return("ERROR. contraseña no valida, no tiene ningun valor");
    }
    if(pass.length <5){
        return("ERROR. contraseña no valida, cuenta con menos de 5 caracteres");
    }
    if(pass.length >99){
        return("ERROR. contraseña no valida, cuenta con mas de 100 caracteres");
    }

    return "EXITO.";
}

export { valLoginCli, valLoginArq };