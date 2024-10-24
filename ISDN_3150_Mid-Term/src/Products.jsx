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
    scene.position.y = 0.7 * (1 - scaleValue / 3); // Move up by 0.7 units
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
              <p>Creator: {selectedProduct.creator}</p>
            </div>
            <h1>{selectedProduct.name}</h1>
            <div className="product-tagline">
              <h3>{selectedProduct.Tagline}</h3>
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
                      <button className="neon-button" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                      </div>
                      <div className="product-right">
                        <p>Review: {selectedProduct.review}</p>
                      </div>
                      </div>
                      <div className="popup-text-window">
                        <textarea placeholder="Type your message here..."></textarea>
                        <button className="send-button">Send</button>
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
                            <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
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
    creator: 'Chan Ying Tung, Shadow',
    Tagline: 'Erase others’ answers, Ace your exams!',
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
    creator: 'KANDASAMY, Shalini',
    Tagline: "Be Present, Even When You're Not!",
    description: 'The Holo Wand is your ultimate academic companion, empowering you to attend classes virtually while managing your real-world commitments. With its advanced holographic technology, you can project a lifelike avatar, engage in discussions, and earn those attendance points—all from the comfort of your own space. Embrace the future of learning with Holo Wand!',
    stock: 5,
    review: 'Review of Product B',
    thumbnail: 'product/Hologram.png',
    threeDModel: 'product/hologram.glb'
  },
  {
    name: 'SkillShake',
    price: 35.00,
    rating: 3.5,
    creator: 'KATYAYAN, Saanvi Ravi',
    Tagline: 'Blend new skills, sip your success!',
    description: "Elevate your career prospects with SkillShake, the innovative product that revolutionizes skill acquisition. Simply scan the job application requirements using the built-in camera, then blend your favorite ingredients into a delicious milkshake. Once you drink it, you'll instantly access the skills you need to stand out as if you have been practicing these skills for years!",
    stock: 8,
    review: 'Review of Product C',
    thumbnail: 'product/Shake.png',
    threeDModel: 'product/skill-shake.glb'
  },
  {
    name: 'DreamWeaver',
    price: 45.00,
    rating: 4.8,
    creator: 'Wu Chun Ming, Jimmy',
    Tagline: 'Study while you dream, wake up smarter.',
    description: 'The Dream Weaver is a groundbreaking sleep-study tool that turns your downtime into productive hours. Leveraging advanced neuro-audio technology, it optimizes your brain’s natural learning processes during sleep, making cramming for exams or absorbing new information effortless. Simply wear the Dream Weaver headband before bed, and wake up feeling more prepared and refreshed.',
    stock: 2,
    review: 'Review of Product D',
    thumbnail: 'product/Dream_Weaver.png',
    threeDModel: 'product/Dream_Weaver.glb'
  },
  {
    name: 'NeruoDrive',
    price: 55.00,
    rating: 5.0,
    creator: 'Chan Ho, Echo',
    Tagline: "Expand your brain’s storage",
    description: 'Introducing NeuroDrive, the cutting-edge device designed for students who aspire to transcend traditional learning methods. With its innovative brain-machine interface, NeuroDrive seamlessly connects your mind to a vast, high-speed storage system filled with encyclopedic knowledge.',
    stock: 4,
    review: 'Review of Product E',
    thumbnail: 'product/NeruoDrive.png',
    threeDModel: 'product/NeuroDrive.glb'
  },
];

export default ProductPage;
