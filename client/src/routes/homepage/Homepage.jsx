import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from 'react-type-animation';
import { useState } from "react";

const Homepage = () => {

  const [typingSatus, setTypingStatus] = useState("Human1");


  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
     <div className="left">
      <h1>React AI</h1>
      <h2>Supercharge your creativity and productivity</h2>
      <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h3>
      <Link to="/dashboard">Get Started</Link>
     </div>
     <div className="right">
      <div className="imgContainer">
        <div className="bgContainer">
          <div className="bg"></div>
        </div>
        <img src="/bot.png" alt="" className="bot"/>
        <div className="chat">
          <img src={typingSatus === "Human1" ? "/human1.jpeg" : typingSatus === "Human2" ? "/human2.jpeg" : "/bot.png"} alt=""/>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Human1: We produce food for Mice',
              2000, ()=>{
                setTypingStatus("Bot")
              },
              'Bot: We produce food for Hamsters',
              2000, ()=>{
                setTypingStatus("Human2")
              },
              'Human2: We produce food for Guinea Pigs',
              2000, ()=>{
                setTypingStatus("Bot")
              },
              'Bot: We produce food for Chinchillas',
              2000, ()=>{
                setTypingStatus("Human1")
              },
            ]}
            wrapper="span"
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
     </div>
     <div className="terms">
      <img src="/logo.png" alt=""/>
      <div className="links">
        <Link to="/">Terms of Service</Link>
        <Link to="/">Privacy Policy</Link>
      </div>
     </div>
    </div>
  );
};

export default Homepage;
