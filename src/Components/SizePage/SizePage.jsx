import React, { useEffect, useState } from 'react'
import icon from '../../icon.png'
import image from '../../Image.png'
import { Link } from 'react-router-dom'
import About from '../About/About'
import Features from '../Features/Features'
import axios from "axios";
// import { useSelector } from 'react-redux'

export default function SizePage(props) {
    // const state = useSelector((state)=> state.handleCart);   
    const[isLoading , setIsLoading] = useState(false);
    const [error,setError]= useState([]);
    const [errorList,setErrorList]= useState([]);
    const [size,setSize]= useState("");
    const [userData,setUserData] = useState({
      weight:"",
      height:"",
      age:""
      });
  
    function getdata(e){
      setUserData({
        ...userData,
        [e.target.name] : e.target.value
      })
      // console.log(userData);
    }
  
    const config = {
      headers: {
              "Content-Type": "application/json",
          },
      }
  
    async function submitRegisteration(e) {
      e.preventDefault()
      setIsLoading(true);
      // console.log(data.weight);
      const formData = await new FormData();
      formData.append('weight', userData.weight);
      formData.append('height', userData.height);
      formData.append('age', userData.age);
      // console.log(formData.entries());
        let {data} = await axios.post('http://54.85.241.201:8000/predict',formData)
        console.log(data);
          if (data) {
            setIsLoading(false);
            setSize(data.prediction)
          }
       
    }
 
  return (
    <>
      <div className='d-flex full-h'>
        <div className="col-md-4 justify-content-center align-items-center home-left bg-light">
            <div className="move-right d-flex w-75 mt-3 flex-column">
                <img src={image} alt="bg" srcset="" />
            </div>
        </div>
         <div className="col-md-8 col-12  justify-content-center align-items-center mt-0 d-flex flex-column bgOfAll">
            <div className='child-half-right d-flex justify-content-center w-50 align-items-center  flex-column'>
              <div>
               <p className='titles pb-3'>Size Prediction</p>
                <p className='paragraphs fw-bold fs-4'><img src={icon} alt="" width={"25px"} /> Enter Your Measurements </p>
                <p className='paragraphs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, omnis commodi maiores sint doloremque autem laboriosam.</p>
              </div>
                    <form  onSubmit={submitRegisteration} >
                      <div className='bg-form p-3 rounded-3'>
                        <div className='d-flex my-3 input-line justify-content-between pb-3 px-3'>
                            <label htmlFor="height" className='main-color fs-5'>Height</label>
                            <input type="number" onChange={getdata} className='form-control rounded-5  bg-input' name="height"/>
                        </div>
                        <div className='d-flex input-line  my-3 justify-content-between pb-3 px-3'>
                            <label htmlFor="weight" className='main-color fs-5'>Weight</label>
                            <input type="number" onChange={getdata} className='form-control rounded-5  bg-input' name="weight"/>
                        </div>
                        <div className='d-flex my-3 justify-content-between  px-3'>
                            <label htmlFor="age" className='main-color fs-5'>age</label>
                            <input type="number" onChange={getdata} className='form-control rounded-5  bg-input' name="age"/>
                        </div>
                      </div>  
                      <div className='rtl'><button className=" rounded-2 btn py-0 sub-button mt-4">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"submit"}</button></div>
                    </form>
            </div> 
            <p className=' paragraphs fw-bold fs-2'>Size : {size}</p>
          </div>
      </div>
    </>
  )
}