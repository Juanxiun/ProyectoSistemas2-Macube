
interface DataLogin{
    ci : number;
    password : number;
}

interface DataRegister{
    ci : number;
    extension : string;
    nombres : string;
    apellidos : string;
    telefono1 : number;
    telefono2 : number;
    correo : string;
    pass : string;
}

export function  ValLogin( { ci, password } : DataLogin ) : Promise<string>{

    let _message: string = "";
    if(ci === null || password === null){
        _message = "ingreso de dato null";
        return Promise.resolve(_message);
    }

    if(ci > 10){
        _message = "ecceso de caracteres"
    }
    
    return Promise.resolve("");
}


export function ValRegister( { ci, extension, nombres, apellidos, telefono1, telefono2, correo, pass } : DataRegister ) : Promise<string> {
    return Promise.resolve("Login successful");
}