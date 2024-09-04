# **Solana-Pay Point-Of-Sale Web Application**

This web application allows users to add products, view product listings, and handle payments using **Solana Pay**. Built using **Next.js**, **Tailwind CSS**, and the **Solana Pay SDK**, the app provides a smooth user experience for product management and secure payments on the Solana blockchain.

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Components Overview](#components-overview)
- [Local Storage](#local-storage)
- [Payment Workflow](#payment-workflow)
- [Contributing](#contributing)

## **Features**

- **Product Management**:
  - Add new products with images, names, prices, and quantities.
  - View and manage products in a dynamic list.
  
- **Solana Pay Integration**:
  - Generate Solana Pay QR codes for product payments.
  - Dynamically confirm payments on the Solana blockchain using transaction references.

- **Image Upload**:
  - Upload product images and preview them before submission.

- **Local Storage**:
  - Products are stored in local storage for persistence across sessions.

## **Technologies Used**

- **Next.js**: Framework for building React applications with server-side rendering (SSR).
- **TypeScript**: Provides static typing to improve development experience.
- **Tailwind CSS**: Utility-first CSS framework for fast and customizable UI development.
- **Solana Pay**: A decentralized payment protocol built on Solana for fast, secure payments.
- **Solana Web3.js**: Solana's JavaScript SDK to interact with the blockchain.

## **Getting Started**

To get the application running on your local machine, follow these instructions.

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/codewithmide/solcommerce
   cd solcommerce
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### **Running the Application**

Once dependencies are installed and environment variables are set up, you can run the app locally.

1. **Run the development server**:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### **Building for Production**

To build the app for production:

```bash
npm run build
```

This will generate optimized static assets in the `.next` directory.

### **Components Overview**

- **Navbar.tsx**: The navigation bar at the top of the app with links to different pages (e.g., Add Product, View Products).
- **ProductForm.tsx**: A form to add new products to local storage. It includes fields for the product name, price, quantity, and an option to upload an image.
- **ProductList.tsx**: Displays all products stored in local storage. Users can click on "View & Pay" to generate a Solana Pay QR code for payments.
- **AddProductPage.tsx**: The page that contains the `ProductForm` and allows users to add new products.
- **ProductListPage.tsx**: The page that displays a list of all available products with options to view product details and proceed with Solana Pay.

### **Local Storage**

The products added through the form are stored in the browser's **local storage**. This ensures that products persist across browser refreshes and sessions. The following fields are stored for each product:

- `name`: The name of the product.
- `price`: The price of the product (in SOL).
- `quantity`: Available stock for the product.
- `imageUrl`: Base64 image string representing the product image.

### **Payment Workflow**

1. **Adding Products**: Users can add products via the **ProductForm**. Each product includes details like name, price, quantity, and an optional image.
  
2. **View Products**: The product list displays all the products stored locally. Clicking on "View & Pay" for a product opens a modal with product details and a **Solana Pay** QR code.

3. **Solana Pay**: The app generates a unique Solana Pay URL using `@solana/pay`, which includes the product price, a reference ID, and other details. The user scans the QR code to make the payment.

4. **Payment Confirmation**: The app uses `findReference` and `validateTransfer` to confirm the payment. It continuously polls the Solana network for the transaction and validates it.

### **Contributing**

Contributions are welcome! To contribute:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.
