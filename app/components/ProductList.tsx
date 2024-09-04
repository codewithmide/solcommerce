"use client";

import React, { useEffect, useState } from "react";
import { createQR, encodeURL, TransferRequestURLFields, findReference, validateTransfer } from "@solana/pay";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { FaOpencart } from "react-icons/fa";

interface Product {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const staticProducts: Product[] = [
  { name: "White T-Shirt", price: 0.2, quantity: 50, imageUrl: "/t-shirt.jpeg" },
  { name: "Cap", price: 0.3, quantity: 30, imageUrl: "/cap.jpeg" },
  { name: "Hoodie", price: 0.5, quantity: 15, imageUrl: "/hoodie.jpeg" },
  {
    name: "Black T-Shirt",
    price: 0.7,
    quantity: 10,
    imageUrl: "/t-shirt-black.jpeg",
  },
];

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    // Combine static products and stored products
    setProducts([...staticProducts, ...storedProducts]);
  }, []);

  // Function to handle selecting a new product
  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
    // Reset payment states when a new product is selected
    setPaymentConfirmed(false);
    setTransactionSignature(null);
    setLoading(false);
  };

  const handlePayment = async (product: Product) => {
    setLoading(true);
    const recipient = new PublicKey("21QpNtBDtm2k2uwTCU3HLPCBSN8Ssu3u1VdgM3HKZNNp");
    const amount = new BigNumber(product.price);
    const reference = new Keypair().publicKey;
    const label = product.name;
    const message = `${product.name} purchase`;

    const transactionDetails: TransferRequestURLFields = {
      recipient,
      amount,
      reference,
      label,
      message,
    };

    const url = encodeURL(transactionDetails);
    const qr = createQR(url.toString(), 400, "transparent");

    const qrCodeContainer = document.getElementById("qr-code-container");
    if (qrCodeContainer) {
      qrCodeContainer.innerHTML = "";
      qr.append(qrCodeContainer);
    }

    // Poll for payment confirmation using the reference
    await verifyPayment(recipient, amount, reference);
  };

  const verifyPayment = async (recipient: PublicKey, amount: BigNumber, reference: PublicKey) => {
    try {
      const interval = setInterval(async () => {
        try {
          // Search for a transaction with the reference
          const foundTransaction = await findReference(connection, reference);
          if (foundTransaction.signature) {
            clearInterval(interval); // Stop polling

            // Validate the transaction to ensure the correct recipient and amount
            const result = await validateTransfer(
              connection,
              foundTransaction.signature,
              {
                recipient,
                amount,
                reference,
              },
              { commitment: "confirmed" }
            );

            if (result) {
              setTransactionSignature(foundTransaction.signature);
              setPaymentConfirmed(true);
              setLoading(false);
            }
          }
        } catch (error) {
          console.log("No valid transaction found yet, retrying...");
        }
      }, 5000); // Poll every 5 seconds
    } catch (err) {
      console.error("Error verifying payment:", err);
    }
  };

  return (
    <div className="w-full mt-3 mx-auto">
      <ul className="flex flex-wrap gap-6">
        {products.map((product, index) => (
          <li
            key={index}
            className="w-[32%] flex flex-col items-start bg-white p-4 shadow-md rounded-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[300px] rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-medium">{product.name}</h3>
            <div className="center gap-2">
              <img src="/solanaLogoMark.png" height={15} width={15} alt="sol" />
              <p className="text-lg">{product.price} SOL</p>
            </div>
            <p className="text-sm text-gray-500">
              Quantity: {product.quantity}
            </p>
            <button
              onClick={() => handleProductSelection(product)}
              className="mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-10 py-3 rounded-lg center gap-2"
            >
              <FaOpencart />
              <p>View & Pay</p>
            </button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white fixed bottom-0 w-screen h-[90%] rounded-lg shadow-lg p-8 overflow-auto">
            <button
              className="absolute top-4 right-4 text-black text-4xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <div className="center mt-10 gap-20">
              <div className="w-1/2 h-full">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-[800px] h-[700px] object-cover"
                />
              </div>
              <div className="w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2">
                  <img
                    src="/solanaLogoMark.png"
                    alt="sol"
                    className="size-[20px]"
                  />
                  <p className="text-2xl">{selectedProduct.price} SOL</p>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Quantity: {selectedProduct.quantity}
                </p>
                <div id="qr-code-container" className="my-4"></div>

                {/* Button to Generate QR Code */}
                <button
                  className={`mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-10 py-3 rounded-lg center gap-2 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => handlePayment(selectedProduct)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Awaiting Payment Confirmation...
                    </>
                  ) : (
                    "Generate QR Code for Payment"
                  )}
                </button>

                {paymentConfirmed && (
                  <div className="mt-6 text-green-500">
                    <p>Payment Confirmed!</p>
                    <p className="text-[0.7rem]">Transaction Signature: {transactionSignature}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
