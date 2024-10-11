import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "",email: "",password: "",cpassword: ""});
  let navigate= useNavigate();  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch("http://127.0.0.1:44444/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    });
    const json=await response.json()
    console.log(json);
    if (json.success){
      //Save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate('/');
      props.showAlert("Account Created Successfully","success")
    }else{
      props.showAlert("Invalid Details","danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="signup-container mt-2">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
            value={credentials.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            minLength={5}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
