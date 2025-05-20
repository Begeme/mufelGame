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

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Mufel Pop",
    tipoOpciones: "unico",
    descripcion: "Figura coleccionable edición limitada de Mufel en su versión Funko Pop, con traje elegante.",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/mufel-pop.png"],
        precio: 24.99,
      },
    ],
  },
  {
    id: 2,
    nombre: "Sudadera MBH",
    tipoOpciones: "completo",
    descripcion: "Sudadera MBH con capucha, ideal para mantenerte abrigado con estilo Mufel.",
    tallas: ["XS", "S", "M", "L", "XL"],
    variantes: [
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/sudadera-offwhite1.png", "/img/sudadera-offwhite2.png"],
        precio: 29.99,
      },
      {
        color: "Rojo",
        disponible: true,
        imagenes: ["/img/sudadera-roja1.png", "/img/sudadera-roja2.png"],
        precio: 29.99,
      },
      {
        color: "Azul",
        disponible: true,
        imagenes: ["/img/sudadera-azul1.png", "/img/sudadera-azul2.png"],
        precio: 29.99,
      },
      {
        color: "Amarillo",
        disponible: true,
        imagenes: ["/img/sudadera-amarilla1.png", "/img/sudadera-amarilla2.png"],
        precio: 29.99,
      },
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/sudadera-negra1.png", "/img/sudadera-negra2.png"],
        precio: 29.99,
      },
    ],
  },
  {
    id: 3,
    nombre: "Taza MBH",
    tipoOpciones: "color",
    descripcion: "Empieza tus mañanas con una taza de café y el espíritu de Mufel.",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/taza-negra.png"],
        precio: 12.99,
      },
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/taza-blanca.png"],
        precio: 12.99,
      },
      {
        color: "Edición Especial",
        disponible: true,
        imagenes: ["/img/taza-edicion-especial.png"],
        precio: 14.99,
      },
    ],
  },
  {
    id: 4,
    nombre: "Peluche Mufel",
    tipoOpciones: "unico",
    descripcion: "Suave peluche de Mufel, perfecto para acompañarte en tus aventuras y siestas.",
    variantes: [
      {
        color: "Único",
        disponible: true,
        imagenes: ["/img/peluche-mufel.png"],
        precio: 19.99,
      },
    ],
  },
  {
    id: 5,
    nombre: "Alfombrilla Mufel",
    tipoOpciones: "talla",
    descripcion: "Alfombrilla gamer con diseño de Mufel. Disponible en tamaño clásico y XL.",
    tallas: ["M", "XL"],
    variantes: [
      {
        color: "M",
        disponible: true,
        imagenes: ["/img/alfombrilla.png"],
        precio: 9.99,
      },
      {
        color: "XL",
        disponible: true,
        imagenes: ["/img/alfombrilla-xl.png"],
        precio: 14.99,
      },
    ],
  },
  {
    id: 6,
    nombre: "Gorra Mufel",
    tipoOpciones: "color",
    descripcion: "Gorra ajustable con el logo de Mufel. Disponible en varios colores, incluido edición especial.",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/gorra-negra.png"],
        precio: 15.99,
      },
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/gorra-blanca.png"],
        precio: 15.99,
      },
      {
        color: "Edición Especial",
        disponible: true,
        imagenes: ["/img/gorra-edicion-especial.png"],
        precio: 18.99,
      },
    ],
  },
];
