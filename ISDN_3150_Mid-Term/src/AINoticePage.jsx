import React from 'react';

const AINoticePage = ({ setCurrentView }) => {
    const handleContinue = () => {
        setCurrentView('nextAIPage'); // You can define what page comes next
    };

    return (
        <div className="main">
            <div className="ai-notice">
                <img src="Tychepic.png" alt="AI Notice" style={{ width: '40%' }} />
                <h1>Meet Tyche</h1>
                <br />
                <div style={{ padding: '5px', textAlign: 'left' }}>
                    <p>Hi! I’m Tyche - just about the best cheat assistant in town!</p>
                    <br />
                    <p>Whether you want to fake your attendance, remember everything for an exam or learn that skill your dream job needs within seconds, I know what’s the best for everything.</p>
                    <br />
                    <p>However, proceed with caution - do you want to risk being tempted to buy our cheat products?</p>
                </div>
                <br />
                <button onClick={handleContinue} className="fancy-neon-corner-button">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default AINoticePage;