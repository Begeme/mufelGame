export interface Variante {
  color: string;
  disponible: boolean;
  imagenes: string[];
  precio: number;
}

export interface Producto {
  id: number;
  nombre: string;
  variantes: Variante[];
  tipoOpciones: "unico" | "completo" | "color" | "talla";
  tallas?: string[];
  descripcion?: string;
}