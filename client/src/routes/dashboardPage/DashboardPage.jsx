import "./dashboardPage.css";
import {useAuth} from "@clerk/clerk-react"

const DashboardPage = () => {

  // const {userId} = useAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const text = e.target.text.value;
    console.log(text);
    if(!text) return
    await fetch("http://localhost:3030/api/chats", {
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({text})
    })
  }
 
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="./logo.png" alt="" />
          <h1>React AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="./chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="./image.png" alt="" />
            <span>Analyse Images</span>
          </div>
          <div className="option">
            <img src="./code.png" alt="" />
            <span>Write your code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
