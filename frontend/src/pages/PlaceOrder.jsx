import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import PaystackPop from "@paystack/inline-js";
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('paystack'); // Default to Paystack
  console.log("Selected payment method:", method);

  const {
    navigate,
    updateDeliveryFee,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
    deliveryFee,
    paystackPublicKey, // Assuming you added the public key in ShopContext
  } = useContext(ShopContext);

  console.log("Cart items:", cartItems);
  console.log("Delivery fee:", deliveryFee);
  console.log("Backend URL:", backendUrl);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    location: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
    console.log(`Updated form field: ${name} =`, value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Submit button clicked. Form data:", formData);

    try {
      let orderItems = [];

      // Prepare order items from cart
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log("Prepared order items:", orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      console.log("Order data prepared:", orderData);

      if (method === 'paystack') {
        console.log("Triggering Paystack payment");
        handlePaystackPayment(orderData); // Trigger Paystack payment
      } else {
        console.log("Triggering Cash on Delivery");
        const response = await axios.post(
          backendUrl + '/api/order/place',
          orderData,
          { headers: { token } }
        );
        console.log("COD response received:", response.data);

        if (response.data.success) {
          toast.success('Order placed successfully!');
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message || 'Order failed. Please try again.');
        }
      }
    } catch (error) {
      console.error("Error in onSubmitHandler:", error);
      toast.error('Something went wrong!');
    }
  };

  const handlePaystackPayment = (orderData) => {
    console.log("Initializing Paystack payment with data:", orderData);

    const paystack = new PaystackPop();

    // Initialize Paystack payment
    paystack.newTransaction({
      key: 'pk_live_49b0aaf027ca5ee543468774d81d36da80043d05', // Use dynamic public key from context
      email: formData.email, // Customer's email
      amount: (getCartAmount() + deliveryFee) * 100, // Amount in kobo
      currency: 'NGN',
      reference: `order-${Math.floor(Math.random() * 1000000000)}`, // Unique reference
      onSuccess: async (transaction) => {
        console.log("Paystack transaction successful:", transaction);

        // Payment successful, place order
        orderData.paymentReference = transaction.reference;
        try {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          );
          console.log("Order placement response:", response.data);

          if (response.data.success) {
            toast.success('Order placed successfully!');
            {/*setCartItems({});*/ }
            navigate('/orders');
          } else {
            toast.error(response.data.message || 'Order placement failed.');
          }
        } catch (error) {
          console.error("Error placing order after Paystack payment:", error);
          toast.error('Order placement failed!');
        }
      },
      onCancel: () => {
        console.log("Paystack payment canceled by user");
        toast.error('Payment canceled by user.');
      },
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*-------------left side-------------*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'Delivery '} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <select
          name="location"
          value={formData.location}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full bg-white text-gray-700"
          onChange={(e) => {
            onChangeHandler(e); // Call the first handler
            updateDeliveryFee(e.target.value); // Call the second handler
            console.log("Location selected:", e.target.value);
          }}
        >
          <option value="">Select Location</option>
          <option value="lagos">Lagos</option>
          <option value="outside-lagos">Outside Lagos</option>
        </select>
        <div className="flex flex-col gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/*-------------Right side-------------*/}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'Method'} />
          {/*-------------Payment Method Selection-------------*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('paystack')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paystack' ? 'bg-green-400' : ''
                  }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.paystackseeklogo}
                alt="Paystack"
              />
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
