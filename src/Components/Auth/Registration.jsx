import {React,useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Registration() {
	const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile_number: "",
        password: ""
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('hi')
       console.log(formData)
      try {
          const client = await axios.post("http://localhost:8080/auth/create-user", formData     
            );
            console.log(client)
            console.log("User Created:", client.data);
            alert("User registered successfully!");
            navigate('/login')
      } catch (error) {
        console.log("Error",error)
      }
      }  
  return (
    <>
    <div className="container">
	<div className="d-flex justify-content-center h-100 mt-4">
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
						<input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control" placeholder="username"/>
						
					</div>
                    <div className="input-group form-group mt-4">
						{/* <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div> */}
						<input type="e-mail" name ='email' value={formData.email} onChange={handleChange} className="form-control" placeholder="E-Mail"/>
						
					</div>
                    <div className="input-group form-group mt-4">
						{/* <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div> */}
						<input type="number" name='mobile_number' value ={formData.mobile_number} onChange={handleChange} className="form-control" placeholder="Mobile Number"/>
						
					</div>
					<div className="input-group form-group mt-4">
						{/* <div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div> */}
						<input type="password" name='password' value={formData.value} onChange={handleChange} className="form-control" placeholder="password"/>
					</div>
					<div className="row align-items-center remember mt-2">
						<input type="checkbox"/>Remember Me
					</div>
					<div className="form-group mt-2">
						<input type="submit" value="Login" className="btn float-right login_btn"/>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
    
    </>
  )
}
