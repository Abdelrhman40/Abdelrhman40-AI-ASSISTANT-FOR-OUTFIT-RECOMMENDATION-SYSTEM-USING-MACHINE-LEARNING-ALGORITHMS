import React, { useState } from 'react'
import bg1 from '../../bg.png'
import { useEffect } from 'react';
import axios from 'axios';

// import { useSelector } from 'react-redux'

export default function Cloths(props) {
    // const state = useSelector((state)=> state.handleCart);  
    // const [cloths,setCloths] =  useState([]);
    // const [categories,setCategories] =  useState([]);
    // const [data, setData] = useState(props.data);
    const [isLoading,setIsLoading] = useState(true);
    // const [togButton,setTogButton] = useState();
    
    // async function getData(){
    //     let{data} =await axios.get('https://clothes-style.site/api/all');
    //     console.log(data);
    //     setCloths(data.data);
    //     setCategories(data.categories)
    // }
    function handlLoading(type) {
        setIsLoading(true);
        timeout();
        props.filterType(type);
    }
    function timeout (){
        setTimeout(() => {
        // Set the value after 5 seconds
        setIsLoading(false);// Replace 'New Value' with the desired value
      }, 4000);
      return () => clearTimeout(timeout);
    }
    useEffect(()=>{
        // getData();
            timeout()
              // Clean up the timeout to avoid memory leaks
        
    },[]) 
    useEffect(()=>{
        // getData();
            timeout()
              // Clean up the timeout to avoid memory leaks
        
    },[props.data]) 
  return (
    <>
      <div className='full-h'>
        <div className='w-100  my-3 d-flex flex-column flex-wrap justify-content-center align-items-center'>
                            <div className='d-flex w-100 align-items-center justify-content-between my-3'>
                            <h4 className="titles">category</h4>
                                <form>
                                    <label for="cars" className=' px-1'>Choose a type:</label>
                                    <select className=' bg-transparent border-0 fw-bold second-color' onChange={(e)=>handlLoading(e.target.value)} name="cars" id="cars">
                                        {props.types.map((type)=>   <option key={type} value={type} >{type}</option>)}
                                    </select>
                                </form>
                            </div>
                            {isLoading?<div class=" my-5 loader"></div>:
                            <div className='d-flex  flex-wrap justify-content-center align-items-center'>
                                {props.data.map((cloth)=>{
                                        return(
                                            <div className='mb-3 col-md-4 h-50 col-lg-3 col-sm-6 col-12'>
                                                <img src={cloth.image} className='clothImg my-2 mx-3 bg-light shadow_style  rounded-4' alt="" srcset="" /> 
                                            </div>
                                        )
                                    })}
                            </div>}
            </div>
      </div>
    </>
  )
}

 

// {cloths.map((cloth)=>{
//     return(
//         <div className='mb-3 col-md-4 col-lg-3 col-sm-6 col-12'>
//             <img src={cloth.image} className='w-75 my-2 mx-3 bg-light shadow_style  rounded-4' alt="" srcset="" />
//         </div>
//     )
// })}
