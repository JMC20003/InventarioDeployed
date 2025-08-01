import { TallaStockDTO } from "./TallaStockDTO";

export interface Productodto{
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  categoria: string;
  tallas: TallaStockDTO[];
}