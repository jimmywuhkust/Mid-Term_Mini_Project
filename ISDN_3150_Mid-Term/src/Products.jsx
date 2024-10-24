import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import './ProductPage.css';
import { Triangle } from 'three';

const ModelViewer = ({ modelPath, autoRotate }) => {
  const { scene } = useGLTF(modelPath);
  const [scale, setScale] = useState(3);

  const { animatedScale } = useSpring({
    animatedScale: scale,
    config: { duration: 1500 },
  });

  useEffect(() => {
    setScale(1); // Animate to 50% of the original scale (3)
  }, []);

  useFrame(() => {
    const scaleValue = animatedScale.get();
    scene.scale.set(scaleValue, scaleValue, scaleValue);
    scene.position.y = 1 * (1 - scaleValue / 3); // Move up by 1.5 units
  });

  return <primitive object={scene} />;
};

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
          <div className="product-content">
            <div className="product-creator">
              <p>{selectedProduct.creator}</p>
            </div>
            <h1>{selectedProduct.name}</h1>
            <div className="product-tagline">
              <h2>{selectedProduct.Tagline}</h2>
            </div>
            <div className="product-description">
              <p>{selectedProduct.description}</p>
            </div>
            <div className="product-availability">
              <p>Stock: {selectedProduct.stock}</p>
            </div>
            <div className="Blank_Space">
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
                <button className="neon-button">Buy Now</button>
                {/* Use the passed addToCart prop */}
                <button className="neon-button" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
              </div>
              <div className="product-right">
                <p>Review: {selectedProduct.review}</p>
                <button className="neon-button">
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
                  <h3>{product.name}</h3>
                  <p>${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</p>
                  <button className="neon-button" onClick={() => addToCart(product)}>Add to Cart</button> {/* Use addToCart from props */}
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
    Tagline: 'Ace your exams with style!',
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
    Tagline: 'Ace your exams with style!',
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
    Tagline: 'Ace your exams with style!',
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
    Tagline: 'Ace your exams with style!',
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
    Tagline: 'Ace your exams with style!',
    description: 'Description of Product E',
    stock: 0,
    review: 'Review of Product E',
    thumbnail: 'path/to/thumbnailE.jpg',
    threeDModel: 'path/to/3DModelE.glb'
  },
];

export default ProductPage;
