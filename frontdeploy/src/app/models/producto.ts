export interface Producto{
    id?:number,
    nombre:string,
    precio:number,
    stock:number,
    categoria:string,
    descripcion:string,
    imagen:string,
    talla:string | string[];
}