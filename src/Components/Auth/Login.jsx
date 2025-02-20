import {React,useState} from 'react'
import "../../css/login.css"
import axios from "axios"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
export default function Login() {

  const navigate = useNavigate(); 	
  const[formData,setFormData] =useState({
    email: "",
    password: "",
  })
   
  const handleOnChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      const client = await axios.post('http://localhost:8080/auth/login',formData)
      console.log(client)
      console.log("User Created:", client.data);
      alert("User login successfully!");
	  navigate("/home");
    } catch (error) {
      console.error("Error while login user:", error);
      
    }
  }

  return (
  <>
  <div className="container">
	<div className="d-flex justify-content-center h-100">
		<div className="card">
			<div className="card-header">
				<h3>Sign In</h3>
				<div className="d-flex justify-content-end social_icon">
					<span><i className="fab fa-facebook-square"></i></span>
					<span><i className="fab fa-google-plus-square"></i></span>
					<span><i className="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={handleSubmit}>
					<div className="input-group form-group">
						{/* <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div> */}
						<input  type="e-mail" name='email' value={formData.email} onChange={handleOnChange} className="form-control" placeholder="username"/>
						
					</div>
					<div className="input-group form-group mt-4">
						{/* <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div> */}
						<input type="password" className="form-control" name='password' value={formData.password} onChange={handleOnChange} placeholder="password"/>
					</div>
					<div className="row align-items-center remember">
						<input type="checkbox"/>Remember Me
					</div>
					<div className="form-group">
						<input type="submit" value="Login" className="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center links">
					Don't have an account?<Link to="/registration">Sign Up</Link>
				</div>
				<div className="d-flex justify-content-center">
					<Link to="#">Forgot your password?</Link>
				</div>
			</div>
		</div>
	</div>
</div>
  
  </>
  )
}
