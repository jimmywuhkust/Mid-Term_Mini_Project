# Edge Trade - ISDN 3150 Mid Term Mini Project

This is a React-based product display app that features interactive 3D models, product pages, and a shopping cart. Built with React and Vite, it showcases a futuristic shopping experience designed for mobile views.

## Project Overview

This app is designed to offer a seamless user experience for a virtual souvenir shop. It includes:
- Interactive 3D models of products using `@react-three/fiber` and `@react-spring/three`.
- A shopping cart functionality.
- A futuristic theme with AI interactions to enhance user engagement.
- Mobile-first design, optimized for iPhone 14 Pro resolution.

## Key Features

1. **3D Model Viewer**: View and interact with 3D models of products, auto-rotate, and zoom controls using `@react-three/drei`.
2. **Dynamic Product Pages**: Displays product details such as name, price, stock, and description, with the ability to add items to the shopping cart.
3. **Interactive AI Chat**: Placeholder for an AI-powered chat function, where users can interact with the system for shopping-related queries.
4. **Splash and Brand Pages**: An animated splash screen followed by a brand introduction before reaching the main home page.
5. **Shopping Cart**: Add products to the cart, view the number of items in the cart, and proceed to checkout.

## Tech Stack

- **React**: The main framework for building the user interface.
- **Vite**: Development environment for fast builds and hot reloading.
- **React Three Fiber**: Rendering 3D models within React components.
- **React Spring**: Animation library for smooth transitions.
- **CSS**: Styling for the futuristic theme.
- **JavaScript**: Main programming language for all logic.
- **Three.js**: Underlying WebGL library for 3D rendering.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/edge-trade.git
    cd ISDN_3150_Mid-Term
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the app**:
    ```bash
    npm run dev
    ```

4. **View the app**:
    The app is designed as a mobile app, so for the best experience, open the developer tools in your browser and set the viewport to iPhone 14 Pro dimensions (430 x 932). The app will run on `http://localhost:3000`.

## Folder Structure

- `src/`
  - `components/`: Contains reusable UI components like product pages, shopping cart, and more.
  - `3DModels/`: Contains `.glb` files for the interactive 3D models.
  - `ProductPage.js`: Manages the product page UI and functionality, including the 3D model viewer.
  - `App.js`: The main file managing app state, navigation, and rendering of components.

## Usage Instructions

1. **Start the App**:
    - Open the app and click the "Start" button to begin.
    - Follow the flow starting with the splash screen and brand page.
    
2. **Product Interaction**:
    - Click on any product to view its details, including 3D model interaction.
    - Use the auto-rotate and zoom features for a better view of the product.
    
3. **Add to Cart**:
    - Click the "Add to Cart" button to add the product to your shopping cart.
    - Click the shopping cart icon to view the items and their quantity.

4. **AI Interaction**:
    - Placeholder for interacting with an AI chatbot that will assist with product queries and shopping-related tasks (under development).

## Future Development

- **AI Chat Functionality**: Integration of a GPT model to provide product recommendations and help users navigate the shop.
- **Checkout Flow**: Complete the e-commerce flow by adding a checkout page.
- **Improved 3D Models**: More realistic and detailed product models.

## Contributors

- **Jimmy Wu**: Developer of the app.
- **Saanvi**: Prompt Engineer.