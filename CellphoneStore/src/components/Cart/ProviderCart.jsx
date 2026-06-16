import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem("techprecise_cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    //si CartItem se modifique, ejecuta este code para pasarlo a texto plano y poder guardarlo en localStorage
    useEffect(() => {
        localStorage.setItem("techprecise_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);
            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    //elimina por completo un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId),
        );
    };

    //si 0 >= cantidad puede eliminar un prodcuto x id 
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

    //setea nueva cantidad de items meintras item.id === proudctId
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    const clearCart = () => setCartItems([]);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
    };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

