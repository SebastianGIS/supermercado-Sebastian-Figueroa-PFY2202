import React, { createContext, useReducer, useContext } from 'react';

// 1. Definimos las acciones para evitar errores tipográficos
const ACTIONS = {
    AGREGAR_INVENTARIO: 'agregar-inventario',
    AGREGAR_AL_CARRITO: 'agregar-al-carrito',
    MODIFICAR_CANTIDAD_CARRITO: 'modificar-cantidad-carrito',
    ELIMINAR_DEL_CARRITO: 'eliminar-del-carrito'
};

// 2. Estado inicial con inventario de prueba (incluyendo stock) y carrito vacío
const estadoInicial = {
    inventario: [
        { id: 1, nombre: 'Manzana Fuji', marca: 'Granja', tipo: 'Frutas y Verduras', stock: 50, precio: 1200 },
        { id: 2, nombre: 'Leche Entera 1L', marca: 'Colun', tipo: 'Lácteos', stock: 20, precio: 1500 },
        { id: 3, nombre: 'Arroz G1 1kg', marca: 'Tucapel', tipo: 'Abarrotes', stock: 15, precio: 1800 },
    ],
    carrito: []
};

// 3. Función Reducer: Contiene toda la lógica de negocio (matemáticas de stock y carrito)
function supermercadoReducer(state, action) {
    switch (action.type) {
        case ACTIONS.AGREGAR_INVENTARIO: {
            // Buscamos el ID más alto en el arreglo actual. Si está vacío, partimos de 0.
            const maxId = state.inventario.length > 0 
                ? Math.max(...state.inventario.map(item => item.id)) 
                : 0;
            
            // Creamos el nuevo artículo asignándole el siguiente número correlativo
            const nuevoArticulo = { ...action.payload, id: maxId + 1 };

            return {
                ...state,
                inventario: [...state.inventario, nuevoArticulo]
            };
        }

        case ACTIONS.AGREGAR_AL_CARRITO: {
            const producto = action.payload;
            const itemEnCarrito = state.carrito.find(item => item.id === producto.id);
            const productoInventario = state.inventario.find(item => item.id === producto.id);
            
            // Si no hay stock disponible en el inventario, no hacemos nada
            if (!productoInventario || productoInventario.stock <= 0) return state;

            // Restamos 1 al stock del inventario general
            const nuevoInventario = state.inventario.map(item =>
                item.id === producto.id ? { ...item, stock: item.stock - 1 } : item
            );

            // Si ya está en el carrito, sumamos 1 a su cantidad; si no, lo agregamos con cantidad 1
            let nuevoCarrito;
            if (itemEnCarrito) {
                nuevoCarrito = state.carrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                nuevoCarrito = [...state.carrito, { ...producto, cantidad: 1 }];
            }

            return { ...state, inventario: nuevoInventario, carrito: nuevoCarrito };
        }

        case ACTIONS.MODIFICAR_CANTIDAD_CARRITO: {
            // "cambio" será +1 (sumar) o -1 (restar)
            const { id, cambio } = action.payload;
            const itemEnCarrito = state.carrito.find(item => item.id === id);
            const productoInventario = state.inventario.find(item => item.id === id);

            if (!itemEnCarrito || !productoInventario) return state;

            // Validamos que si el usuario quiere sumar (+1), exista stock en el inventario
            if (cambio > 0 && productoInventario.stock < 1) return state;
            
            const nuevaCantidad = itemEnCarrito.cantidad + cambio;

            // Si la cantidad en el carrito llega a 0, ejecutamos la acción de eliminar
            if (nuevaCantidad <= 0) {
               return supermercadoReducer(state, { type: ACTIONS.ELIMINAR_DEL_CARRITO, payload: { id } });
            }

            // Actualizamos stock del inventario (si restamos del carrito, el stock sube y viceversa)
            const nuevoInventario = state.inventario.map(item =>
                item.id === id ? { ...item, stock: item.stock - cambio } : item
            );

            // Actualizamos la cantidad dentro del carrito
            const nuevoCarrito = state.carrito.map(item =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            );

            return { ...state, inventario: nuevoInventario, carrito: nuevoCarrito };
        }

        case ACTIONS.ELIMINAR_DEL_CARRITO: {
            const { id } = action.payload;
            const itemEnCarrito = state.carrito.find(item => item.id === id);
            if (!itemEnCarrito) return state;

            // Al eliminar por completo, devolvemos todo el stock retenido al inventario general
            const nuevoInventario = state.inventario.map(item =>
                item.id === id ? { ...item, stock: item.stock + itemEnCarrito.cantidad } : item
            );

            const nuevoCarrito = state.carrito.filter(item => item.id !== id);

            return { ...state, inventario: nuevoInventario, carrito: nuevoCarrito };
        }

        default:
            return state;
    }
}

// 4. Creación del Contexto
const SupermercadoContext = createContext();

// 5. Componente Proveedor que envuelve a la aplicación
export function SupermercadoProvider({ children }) {
    const [estado, dispatch] = useReducer(supermercadoReducer, estadoInicial);

    // Funciones que despachan las acciones hacia el reducer
    const agregarArticuloInventario = (articulo) => {
        dispatch({ type: ACTIONS.AGREGAR_INVENTARIO, payload: { ...articulo, id: Date.now() } });
    };

    const agregarAlCarrito = (producto) => {
        dispatch({ type: ACTIONS.AGREGAR_AL_CARRITO, payload: producto });
    };

    const modificarCantidadCarrito = (id, cambio) => {
        dispatch({ type: ACTIONS.MODIFICAR_CANTIDAD_CARRITO, payload: { id, cambio } });
    };

    const eliminarDelCarrito = (id) => {
        dispatch({ type: ACTIONS.ELIMINAR_DEL_CARRITO, payload: { id } });
    };

    return (
        <SupermercadoContext.Provider value={{
            inventario: estado.inventario,
            carrito: estado.carrito,
            agregarArticuloInventario,
            agregarAlCarrito,
            modificarCantidadCarrito,
            eliminarDelCarrito
        }}>
            {children}
        </SupermercadoContext.Provider>
    );
}

// 6. Hook personalizado para usar el contexto en cualquier página
export function useSupermercado() {
    return useContext(SupermercadoContext);
}