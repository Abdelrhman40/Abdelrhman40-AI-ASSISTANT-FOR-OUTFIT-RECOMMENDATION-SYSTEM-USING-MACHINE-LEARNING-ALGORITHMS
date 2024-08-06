import React, { useState } from 'react'
import layer2 from '../../Layer 2.png'
import layer3 from '../../Layer 3.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Joi from 'joi';

export default function Login(props) {

  let navigate = useNavigate();
  const[isLoading , setIsLoading] = useState(false);
  const [error,setError]= useState()
  const [errorList,setErrorList]= useState([]);
  const[user , setUSer] = useState({
    email:"",
    password:""
  })

  function getuser(e){
    setUSer({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  function validateLogin(user) 
    {
        let schema =Joi.object({
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password:Joi.string().pattern(/^[a-zA-Z0-9/#@*-_]{6,20}$/),
            })
        return schema.validate(user,{abortEarly:false})
    }

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    let validateResult = validateLogin(user);
    // console.log(validateResult);
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
      console.log(validateResult.error.details);
      setIsLoading(false);
    }else{
      let {data} = await axios.post('https://clothes-style.site/api/login',user)
      console.log(data);
      if (data.msg =="Successfuly") {
        setIsLoading(false);
        navigate('/home');
        localStorage.setItem('UserToken',data.access_token)
        localStorage.setItem('user',JSON.stringify(data.user))
        // console.log(data);
        props.handleUser();
      } else {
        //console.log(data);
        setIsLoading(false);
        setError(data.msg);
        //console.log(error);
      }
    }
  }
  return (
    <>
      <div className='full-h'>
        <div className='d-flex pt-5 w-100 bgOfAll full-h'>
                <div className='d-flex  my-5 flex-column col-lg-4 m-auto fit rounded-4 py-2 px-4 bg-ingrad col-7'>
                        <h2 className='titles fs-1'>Login Now</h2>
                        <form onSubmit={submitLogin} className='d-flex flex-column justify-content-center py-3 '> 
                            <label htmlFor="email" className='main-color'>Email</label>
                            <input type='text' name='email' onChange={getuser} className="form-control mb-2 mt-1"/>  
                            <label htmlFor="password" className='main-color'>Password</label>
                            <input type='password' name='password' onChange={getuser} className="form-control mb-2 mt-1"/>  
                            <button className='ms-auto rounded-3  mt-2 sub-register' type="submit">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Login"}</button>
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
                            {error? <div className="alert alert-danger">{error}</div>:null}
                          </div>
                        </form>
                </div> 
        </div> 
      </div>  
    </>
  )
}