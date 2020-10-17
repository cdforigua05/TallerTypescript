export class Student{
    codigo:number; 
    cedula:string; 
    edad:number; 
    direccion:string;
    telefono:string; 

    constructor(codigo:number, cedula:string,edad:number,direcccion:string,telefono:string){
        this.codigo=codigo;
        this.cedula=cedula; 
        this.edad=edad;
        this.direccion=direcccion; 
        this.telefono=telefono;
    }
}