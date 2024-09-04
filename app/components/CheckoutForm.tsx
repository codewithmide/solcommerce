import React, { useState } from 'react';
import { encodeURL, createQR, TransferRequestURLFields } from '@solana/pay';
import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutForm({ products }: { products: Product[] }) {
  const [paymentURL, setPaymentURL] = useState<string | null>(null);

  const handlePayment = () => {
    const recipient = new PublicKey('<YOUR_SOLANA_ADDRESS>');
    const amount = new BigNumber(products.reduce((acc, product) => acc + product.price * product.quantity, 0));

    const transactionDetails: TransferRequestURLFields = {
      recipient,
      amount,
      label: 'POS Checkout',
      message: 'Thank you for your purchase!',
    };

    const url = encodeURL(transactionDetails);
    setPaymentURL(url.toString());

    const qr = createQR(url.toString(), 400, 'transparent');
    
    // Get the QR code container element
    const qrCodeContainer = document.getElementById('qr-code-container');
    
    // Check if the container exists before appending the QR code
    if (qrCodeContainer) {
      qr.append(qrCodeContainer);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Generate Solana Pay QR Code</button>
      <div id="qr-code-container"></div>
      {paymentURL && (
        <p>
          <a href={paymentURL} target="_blank" rel="noopener noreferrer">
            Pay with Solana Pay
          </a>
        </p>
      )}
    </div>
  );
}
