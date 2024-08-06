import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Joi from 'joi';

export default function Register(props) {
  let navigate = useNavigate();
  const[isLoading , setIsLoading] = useState(false);
  const [error,setError]= useState([]);
  const [errorList,setErrorList]= useState([]);
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    password_confirmation:""
});

  function getuser(e){
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
    //console.log(user);
  }

  function validateRegrstration(user) 
    {
        let schema =Joi.object({
          name:Joi.string().alphanum().required(),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password:Joi.string().pattern(/^[a-zA-Z0-9/#@*-_]{6,20}$/),
          password_confirmation: Joi.ref('password'),
            })
        return schema.validate(user,{abortEarly:false})
    }

  async function submitRegisteration(e) {
    e.preventDefault()
    setIsLoading(true);
    let validateResult = validateRegrstration(user);
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
      console.log(validateResult.error.details);
      setIsLoading(false);
    }else{
      let {data} = await axios.post('http://clothes-style.site/api/register',user)
      console.log(data);
        if (data.msg === "Successfuly") {
          console.log(data);
          setIsLoading(false);
          navigate('/login');
        }else{
          setIsLoading(false);
          setError(Object.values(data.error).flat());
        }
    }

  }
  return (
    <>
      <div className='full-h'>
        <div className='d-flex pt-5 w-100 bgOfAll full-h'>
              {/* <div className='col-lg-4 left-layer'>
                  <img className='layer3' src={layer3} alt="layer3" />
              </div>    */}
              <div className='d-flex my-5 flex-column fit col-lg-4 m-auto rounded-4 py-2 px-4 bg-ingrad col-7'>
                      <h2 className='titles fs-1'>Register Now</h2>
                      <form onSubmit={submitRegisteration} className='d-flex flex-column justify-content-center py-3 '>
                          <label htmlFor="name" className='main-color'>User Name</label>
                          <input type='text' name='name' id='name' onChange={getuser} className="form-control mb-2 mt-1"/> 
                          <label htmlFor="email" className='main-color'>Email</label>
                          <input type='text' name='email' onChange={getuser} className="form-control mb-2 mt-1"/> 
                          <label htmlFor="password" className='main-color'>Password</label>
                          <input type='password' name='password' onChange={getuser} className="form-control mb-2 mt-1"/>  
                          <label htmlFor="password_confirmation" className='main-color'>confirm password</label>
                          <input type='password' name='password_confirmation' onChange={getuser} className="form-control mb-2 mt-1"/>  
                          <button className='ms-auto rounded-3  mt-2 sub-register' type="submit">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Register"}</button>
                          <div className='my-3'>
                            {errorList.map((error,index)=>{
                                    if (error.context.label==="password") { 
                                    return <div key={index} className="alert alert-danger"> password invalid,it must be strong min 6 and max 20</div>
                                    }
                                    else {
                                    return <div key={index} className="alert alert-danger"> {error.message}</div>
                                    }
                                    }   
                            )}
                            {error?error.map((err)=><div className="alert alert-danger">{err}</div>):null}
                          </div>
                      </form>
              </div>   
        </div>  
      </div>
    </>
  )
}