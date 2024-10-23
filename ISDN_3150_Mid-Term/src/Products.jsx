import React, { useState } from 'react';
import './ProductPage.css';

const products = [
  {
    name: 'ClearGaze X',
    price: '$15.00',
    rating: 4.5,
    creator: 'Shadow',
    description: 'Ace your exams with style! ClearGaze X is the ultimate smart glasses designed to help you stay ahead of the competition. Equipped with an invisible laser, these glasses can erase answers on others’ exam papers—so you can boost your marks without anyone knowing!',
    stock: 10,
    review: 'Review of Product A',
    thumbnail: 'product/Glasses.png',
    threeDModel: 'product/Shadow_Glasses.glb'
  },
  {
    name: 'Product B',
    price: '$25.00',
    rating: 4.0,
    creator: 'Creator B',
    description: 'Description of Product B',
    stock: 5,
    review: 'Review of Product B',
    thumbnail: 'product/Hologram.png',
    threeDModel: 'path/to/3DModelB.glb'
  },
  {
    name: 'Product C',
    price: '$35.00',
    rating: 3.5,
    creator: 'Creator C',
    description: 'Description of Product C',
    stock: 8,
    review: 'Review of Product C',
    thumbnail: 'product/Shake.png',
    threeDModel: 'path/to/3DModelC.glb'
  },
  {
    name: 'Product D',
    price: '$45.00',
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
    price: '$55.00',
    rating: 5.0,
    creator: 'Creator E',
    description: 'Description of Product E',
    stock: 0,
    review: 'Review of Product E',
    thumbnail: 'path/to/thumbnailE.jpg',
    threeDModel: 'path/to/3DModelE.glb'
  },
];

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
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
              <p>3D Model: {selectedProduct.threeDModel}</p>
            </div>
            <div className="product-main">
              <div className="product-left">
                <p>Price: {selectedProduct.price}</p>
                <button>Buy Now</button>
                <button>Add to Cart</button>
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
              <div key={index} className="product" onClick={() => handleProductClick(product)}>
                <div className="product-thumbnail">
                  <img src={product.thumbnail} alt={product.name} />
                </div>
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
