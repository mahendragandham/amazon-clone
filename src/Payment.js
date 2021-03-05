import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect }from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const[succeeded, setSucceeded] = useState(false);
    const[processing, setProcessing] = useState("");
    const[clientSecret, setclientSecret] = useState(true);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

   

    console.log("This is the client secret >>>",clientSecret)
    const handleSubmit = async (event) =>{
        event.preventDefault();     
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replaceState('/orders')
        })
    }
    
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items </Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Near Steamer Road,</p>
                        <p>Narsapuram - 534 275</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payement__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onClick={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="paymnt__priceContainer">
                                <CurrencyFormat 
                                renderText = {(value) => (
                                    <>
                                    <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeperator={true}
                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Payment
