import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Joi from 'joi';

export default function Creat(props) {
  let navigate = useNavigate();
  const[isLoading , setIsLoading] = useState(false);
  const [errors,setErrors]= useState([]);
  const [success,setSuccess]= useState("");
  const [errorList,setErrorList]= useState([]);

const [item, setItem] = useState({
    title: "",
    category: "",
    type: ""
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('category', item.category);
    formData.append('type', item.type);
    formData.append('image', image);
}

  async function addItem(e) {
    e.preventDefault()
    setIsLoading(true);
    const formData = await new FormData();
    formData.append('title', item.title);
    formData.append('category', item.category);
    formData.append('type', item.type);
    formData.append('image', image)
    // console.log(formData);
      let {data} = await axios.post('https://clothes-style.site/api/create',formData,{
        headers: {
          access_token: localStorage.getItem('UserToken')
        }
      });
    //   console.log(data);
        if (data.msg === "created successfuly") {
          // console.log(data);
          setIsLoading(false);
          setErrors([]);
          setSuccess('Item Created Successfuly');
        }else{
          setIsLoading(false);
        //   console.log(data.msg);
          setErrors( Object.values(data.msg));
          console.log(errors);
        }
  }
  return (
    <>
      <div className='full-h'>
        <div className='d-flex pt-5 w-100 bgOfAll full-h'>
              {/* <div className='col-lg-4 left-layer'>
                  <img className='layer3' src={layer3} alt="layer3" />
              </div>    */}
              <div className='d-flex my-5 flex-column fit col-lg-4 m-auto rounded-4 py-2 px-4 second-bg col-7'>
                      <h2 className='text-decoration-none titles fs-2'><Link className='text-decoration-none titles' to='/dashboard'><i class="fa-solid fa-circle-left fs-4"></i></Link> Add New Item</h2>
                      <form onSubmit={addItem} className='d-flex flex-column justify-content-center py-3 '>
                          <label htmlFor="title" className='main-color'>Title</label>
                          <input type='text' name='title' id='title' onChange={handleInputChange} className="form-control mb-2 mt-1"/> 
                          <label htmlFor="category" className='main-color'>Category</label>
                          <input type='text' name='category' onChange={handleInputChange} className="form-control mb-2 mt-1"/> 
                          <label htmlFor="type" className='main-color'>Type</label>
                          <input type='text' name='type' onChange={handleInputChange} className="form-control mb-2 mt-1"/>  
                          <label htmlFor="image" className='main-color'>Image</label>
                          <input class="w-100 fs-6 form-control-lg sub-add" onChange={handleFileChange} name='image' id="formFileSm" type="file"/>
                          <button className='ms-auto rounded-3  mt-2 sub-add btn' type="submit">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Add"}</button>
                          <div className='my-3'>
                            {errors.map((err)=><div className="alert alert-danger text-center">{err}</div>)}
                            {success?<div className="alert alert-success text-center" role="alert">{success}</div>:null}
                          </div>
                      </form>
              </div>   
        </div>  
      </div>
    </>
  )
}