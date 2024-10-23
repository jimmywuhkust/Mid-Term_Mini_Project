import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './ProductPage.css';

const ModelViewer = ({ modelPath, autoRotate }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={3}/>; // Adjusted scale to 2.5
};

// Remove the local cart state and use the passed addToCart prop
const ProductPage = ({ addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAutoRotate(true); // Enable auto-rotation when a product is selected
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="main">
      {selectedProduct ? (
        <div className="product-detail">
          <button onClick={handleBackClick}>Back</button>
          <div className="product-content">
            <div className="product-creator">
              <p>{selectedProduct.creator}</p>
            </div>
            <h1>{selectedProduct.name}</h1>
            <div className="product-description">
              <p>{selectedProduct.description}</p>
            </div>
            <div className="product-availability">
              <p>Stock: {selectedProduct.stock}</p>
            </div>
            <div className="product-3dmodel">
              {/* 3D Model Viewer */}
              <Canvas>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <ModelViewer modelPath={selectedProduct.threeDModel} autoRotate={autoRotate} />
                  <OrbitControls 
                    enableZoom={true} 
                    autoRotate={autoRotate} 
                    autoRotateSpeed={1} 
                    onStart={() => setAutoRotate(false)} 
                    onEnd={() => setAutoRotate(false)} 
                  />
                </Suspense>
              </Canvas>
            </div>
            <div className="product-main">
              <div className="product-left">
                <p>Price: ${typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : 'N/A'}</p>
                <button>Buy Now</button>
                {/* Use the passed addToCart prop */}
                <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
              </div>
              <div className="product-right">
                <p>Review: {selectedProduct.review}</p>
                <button>
                  <img src="path/to/chatbot-icon.png" alt="Chat with AI" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-page">
          <div className="product-list">
            {products.map((product, index) => (
              <div key={index} className="product">
                <div className="product-thumbnail" onClick={() => handleProductClick(product)}>
                  <img src={product.thumbnail} alt={product.name} />
                </div>
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Use addToCart from props */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const products = [
  {
    name: 'ClearGaze X',
    price: 15.00,
    rating: 4.5,
    creator: 'Shadow',
    description: 'Ace your exams with style! ClearGaze X is the ultimate smart glasses designed to help you stay ahead of the competition. Equipped with an invisible laser, these glasses can erase answers on others’ exam papers—so you can boost your marks without anyone knowing!',
    stock: 10,
    review: 'Review of Product A',
    thumbnail: 'product/Glasses.png',
    threeDModel: 'product/shadow_glasses_rot.glb'
  },
  {
    name: 'HoloWand',
    price: 25.00,
    rating: 4.0,
    creator: 'Creator B',
    description: 'Description of Product B',
    stock: 5,
    review: 'Review of Product B',
    thumbnail: 'product/Hologram.png',
    threeDModel: 'product/hologram.glb'
  },
  {
    name: 'Skill Shake',
    price: 35.00,
    rating: 3.5,
    creator: 'Creator C',
    description: 'Description of Product C',
    stock: 8,
    review: 'Review of Product C',
    thumbnail: 'product/Shake.png',
    threeDModel: 'product/skill-shake.glb'
  },
  {
    name: 'Product D',
    price: 45.00,
    rating: 4.8,
    creator: 'Creator D',
    description: 'Description of Product D',
    stock: 2,
    review: 'Review of Product D',
    thumbnail: 'path/to/thumbnailD.jpg',
    threeDModel: 'path/to/3DModelD.glb'
  },
  {
    name: 'Product E',
    price: 55.00,
    rating: 5.0,
    creator: 'Creator E',
    description: 'Description of Product E',
    stock: 0,
    review: 'Review of Product E',
    thumbnail: 'path/to/thumbnailE.jpg',
    threeDModel: 'path/to/3DModelE.glb'
  },
];


export default ProductPage;
