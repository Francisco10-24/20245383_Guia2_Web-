import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Guitar } from './components/Guitar'
import { db } from './data/db'


export const App = () => {

    function initialCart() {
        const localStorageCart=localStorage.getItem('cart')
        return localStorageCart? JSON.parse(localStorageCart):[]
        
    }

    const [data, setData] = useState(db);
    const [cart, setCart]=useState(initialCart)

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    function addToCart(guitar) {
        const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
        console.log(itemIndex);
        if(itemIndex===-1){ //Ese articulo aun no existe
            guitar.quantity=1;
            setCart([...cart,guitar])
        }
        else{ //Si la guitarra ya se habia añadido al carrito
            const updatedCart=[...cart] //Generando una copia de la vatiable de estado
            updatedCart[itemIndex].quantity++;
            setCart(updatedCart);
        }
       
    } 

    //Eliminar un producto del cart
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        
    }

    //Sumando producto desde el card (+)
    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id) {
                return {
                    ...item,quantity: item.quantity +1
                }
            }
            return item 
        })
        setCart(updatedCart)
        
    }

    //Restando producto del card
    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }


    //Vaciar carrito
    function clearCart() {
        setCart([])
    }




    function calculateTotal(){
        /*let total=0;
        for (const guitar of cart) {
            total += guitar.price * guitar.quantity;
        }*/
       let total = cart.reduce((total,item)=>total+item.price*item.quantity, 0)
        return total;
    }

   
    return (
    <>
        <Header cart={cart} total={calculateTotal()}    
        removeFromCart={removeFromCart}
         increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}/>
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) =>(
                    <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
                    
                ))}


            </div>
        </main>
        <Footer/>
    </>
    )
}
