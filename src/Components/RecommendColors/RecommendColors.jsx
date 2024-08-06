import React, { useEffect, useState } from 'react'
import layer2 from '../../Layer 2.png'
import layer3 from '../../Layer 3.png'
import bg from '../../full-shot-man-clothing-formality-scale.png'
import bg1 from '../../color_page.png'
import { Link } from 'react-router-dom'
// import Cloths from '../Cloths/Cloths'
import axios from 'axios'

export default function RecommendedColors(props) {
  const [image,setImage]= useState("");
  const[isLoading , setIsLoading] = useState(false);
  const[colors , setColors] = useState([]);
  

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    //  console.log(e.target.files[0]);
  };

  // {
  //   headers: {
  //     access_token: localStorage.getItem('UserToken')
  //   }
  // }
  async function changeImage(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData =await new FormData();
    formData.append('file', image);
    let {data} = await axios.post(`http://54.85.241.201:8000/color-extraction`,formData);
    if (data) {
      setIsLoading(false);
      console.log(data.preferred_colors);
      setColors(data.preferred_colors)
    }
   
 }

  return (
    <>
      <div className='d-flex w-100 bgOfAll pt-5 h-100  justify-content-center align-items-center '>
            <div className='d-flex flex-column h-75 w-75 mt-5 w-lg-50 justify-content-center '>
                <div className='desc d-flex h-100 w-100 flex-column justify-content-center px-3 align-items-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <h2 className='my-3 titles' style={{letterSpacing: "2px"}} >Colors Recommendition</h2>
                        <form onSubmit={changeImage} class="mb-3 d-flex w-100 flex-column justify-content-center align-items-center">
                            <p className='fs-6 paragraphs' htmlFor="file">Enter an example image of what you are think about</p>
                            <input class="w-75 fs-6 form-control-lg reverse_dir second-bg main-color" onChange={handleFileChange} name='file' id="formFileSm" type="file"/>
                            <button className='btn my-3 py-2 w-25 rounded-5 main-color button ' type="submit">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Search"}</button>
                        </form>
                    </div>
                    
                </div>
                <div className=' w-100 my-3 d-flex mx-2  flex-wrap justify-content-center align-items-start'>
                        <div className='d-flex flex-column second-bg rounded-3 col-md-5 col-12 flex-wrap justify-content-center align-items-center'>
                          <h3 className='titles main-color fs-1'>Matching colors</h3>
                          <div className='d-flex rounded-3  col-12 flex-wrap justify-content-center align-items-center'>
                              {colors.map((color)=>{
                                          return(
                                            <div className='col-2  d-flex justify-content-center' ><div style={{ backgroundColor: color[1] ,height:"50px"}} className='w-75 h my-3 rounded-2' alt="" srcset="" /></div>                    
                                          )
                                      })}
                          </div>
                        </div>
                        <div className='d-flex  col-md-6 mx-2  flex-wrap justify-content-center align-items-center'>
                            <img src={bg1} className='w-75 my-3 rounded-2' alt="" srcset="" />
                        </div>
             </div>
            </div> 
              
      </div>  
    </>
  )
}