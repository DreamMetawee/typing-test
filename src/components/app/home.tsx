import React from 'react';
import speedtypingame from '../typing-test/speedtypingame';
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Typing Test App</h1>
        <p>Improve your typing speed and accuracy!</p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => navigate("/speedtypingame")} // ✅ เปลี่ยนหน้า
        >
          Start Test
        </button>
      </div>
    );
};

export default Home;