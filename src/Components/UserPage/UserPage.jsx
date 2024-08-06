import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
// import Joi from 'joi';
import image_show from '../../male.png'
import { useEffect } from 'react';

export default function UserPage(props) {
  let navigate = useNavigate();
  const[isLoading , setIsLoading] = useState(false);
  const[loadingImg , setLoadingImg] = useState(false);
  const[isChange , setIsChange] = useState(false);
  const [error,setError]= useState([]);
  const [success,setSuccess]= useState("");
  const [newImage,setNewImage]= useState("");
  const [errorList,setErrorList]= useState([]);
  const [user,setUser]= useState({});
  const [newPassword,setNewPassword] = useState({
    old_password:"",
    new_password:"",
    new_password_confirmation:""
});

  function getPassword(e){
    setNewPassword({
      ...newPassword,
      [e.target.name] : e.target.value
    })
    console.log(newPassword);
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
    // console.log(e.target);
  };

    async function changeImage(e,id) {
      e.preventDefault();
      setIsChange(true);
      const formData =await new FormData();
      formData.append('image', newImage);
      setIsChange(true);
      let {data} = await axios.post(`https://clothes-style.site/api/updateImage/${id}}`,formData,{
        headers: {
          access_token: localStorage.getItem('UserToken')
        }
      });
      if (data.message ==="Image updated successfully") {
          console.log(user.image);
          setError([]);
          localStorage.setItem('user',JSON.stringify(data.user))
          setSuccess(data.message);
          setIsChange(false);
        }else{
          setIsChange(false);
          // console.log(data);
          setSuccess("");
          setError(Object.values(data.error).flat());
      }
   }

  async function ChangePassword(e,id) {
    e.preventDefault()
      setIsChange(true);
      let {data} = await axios.post(`https://clothes-style.site/api/resetPassword/${id}}`,newPassword,{
        headers: {
          access_token: localStorage.getItem('UserToken')
        }
      });
      console.log(data);
        if (data.message === "Password updated successfully") {
          //console.log(data);
          setNewPassword({
            old_password:"",
            new_password:"",
            new_password_confirmation:""
          });        
          setError([]);
          setSuccess(data.message);
          setIsChange(false);
        }else{
          setIsChange(false);
          // console.log(data);
          setSuccess("");
          setError(Object.values(data.error).flat());
        }
  }

  useEffect(() =>{ setUser(props.user);console.log(user.image);},[])

  return (
    <>
      <div className='full-h'>
        <div className='d-flex pt-5 w-100 bgOfAll full-h'>
              <div className='d-flex my-5 flex-column fit col-lg-4 m-auto align-items-center rounded-4 py-2 px-4 second-bg col-7'>
                      {/* <h2 className='text-decoration-none titles fs-2'><Link className='text-decoration-none titles' to='/dashboard'><i class="fa-solid fa-circle-left fs-4"></i></Link> Add New Item</h2> */}
                      <div className='mt-3'><img src={user.image === ""? image_show : user.image} className='square' style={{ borderRadius: "50%" }} alt="" srcset="" /></div>
                      <div className='mt-2 text-decoration-underline main-color bg-transparent' onClick={()=>setLoadingImg(!loadingImg)} type="button">Change Photo</div>
                      {loadingImg?
                      <div>
                        <form onSubmit={(e)=>changeImage(e,user.id)} className='d-flex flex-column justify-content-center  '>
                          <label htmlFor="image" className='main-color'>Image</label>
                          <input class="w-100 fs-6 form-control-lg sub-add"  name='image'  onChange={handleFileChange} id="formFileSm" type="file"/>
                          <button className=' w-50 m-auto rounded-3  mt-2 sub-add btn' type="submit">{isChange?<i className="fa-solid fa-spinner fa-spin"></i>:"Change"}</button>
                          <div className='my-3'>
                            {error?error.map((err)=><div className="alert alert-danger">{err}</div>):null}
                            {success?<div className="alert alert-success w-100" role="alert">{success+" , Reload page ."}</div>:null}
                          </div>
                      </form>
                      </div>
                      :null}
                      <h4 className=' titles fs-2'>Welcome, {user.name}</h4>
                      <p className=' main-color fs-5'>User Name : {user.name}</p>
                      <p className=' main-color fs-5'>Email : {user.email}</p>
                      <p className=' main-color fs-5'>Role : {user.role}</p>
                      <button className=' rounded-3  my-2 sub-add btn' onClick={()=>setIsLoading(!isLoading)} type="button">Rest Password</button>
                      {isLoading?
                      <div>
                        <form onSubmit={(e)=>ChangePassword(e,user.id)} className='d-flex flex-column justify-content-center py-3 '>
                          <label htmlFor="old_password" className='main-color'>Old Password</label>
                          <input type='password' name='old_password' onChange={getPassword} value={newPassword.old_password} className="form-control mb-2 mt-1"/>  
                          <label htmlFor="new_password" className='main-color'>new Password</label>
                          <input type='password' name='new_password' onChange={getPassword} value={newPassword.new_password} className="form-control mb-2 mt-1"/>  
                          <label htmlFor="new_password_confirmation" className='main-color'>confirm new password</label>
                          <input type='password' name='new_password_confirmation' onChange={getPassword} value={newPassword.new_password_confirmation} className="form-control mb-2 mt-1"/> 
                          <button className='ms-auto rounded-3  mt-2 sub-add btn' type="submit">{isChange?<i className="fa-solid fa-spinner fa-spin"></i>:"Change"}</button>
                          <div className='my-3'>
                            {error?error.map((err)=><div className="alert alert-danger">{err}</div>):null}
                            {success?<div className="alert alert-success w-100" role="alert">{success}</div>:null}
                          </div>
                      </form>
                      </div>
                      :null}
              </div>   
        </div>  
      </div>
    </>
  )
}