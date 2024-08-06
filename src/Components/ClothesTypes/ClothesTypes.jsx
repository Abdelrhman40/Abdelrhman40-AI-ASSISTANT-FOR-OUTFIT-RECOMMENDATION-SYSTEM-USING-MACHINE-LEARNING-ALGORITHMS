import React, { useEffect, useState } from 'react'
import bg from '../../full-shot-man-clothing-formality-scale.png'
import Cloths from '../Cloths/Cloths'
import axios from 'axios'

export default function ClothesTypes(props) {
    const [cloths,setCloths] =  useState([]);
    const [categories,setCategories] =  useState([]);
    const [types,setTypes] =  useState([]);
    const [isLoading,setIsLoading] = useState(true);
    // const [isLoading,setIsLoading] = useState(true);
    async function filterData(category){
        if (category=="All") {
            let{data} =await axios.get('https://clothes-style.site/api/all');
            console.log(data);
            setCloths(data.data);
            setCategories(data.categories)   
            setTypes([])
        } else {
          console.log(`https://clothes-style.site/api/all/${category}`);
            let { data } = await axios.post(`https://clothes-style.site/api/all/${category}`, null, {
                headers: {
                  access_token: localStorage.getItem('UserToken')
                }
              });
            console.log(data);
            // console.log(categories);
            setCloths(data.data);
            setTypes(data.types)
        }
        
    }
    async function filterType(type){
            let { data } = await axios.post(`https://clothes-style.site/api/category/${type}`, null, {
                headers: {
                  access_token: localStorage.getItem('UserToken')
                }
              });
            // console.log("data");
            setCloths(data.data);
    }

    async function timeout (){
        let{data} =await axios.get('https://clothes-style.site/api/all');
            // console.log(data);
            // setCloths(data.data);
            setCategories(data.categories)
        setTimeout(() => {
        // Set the value after 5 seconds
        setIsLoading(false);// Replace 'New Value' with the desired value
      }, 3000);
      return () => clearTimeout(timeout);
    }

    useEffect(()=>{
        timeout()
    },[])
  return (
    <>
      <div className='d-flex w-100 bgOfAll pt-5  justify-content-center align-items-center '>
            <div className='d-flex h-75 w-75 mt-5 w-lg-50 justify-content-center '>
                {isLoading?<div className=' full-h'><div class="my-5 loader"></div></div>:
                <div className='desc d-flex h-100 w-100 flex-column justify-content-center px-3 align-items-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <h2 className='my-3 titles' style={{letterSpacing: "2px"}} >Types Of Clothes</h2>
                        <div className='d-flex second-bg flex-row justify-content-center  col-12 flex-wrap rounded-2 navbar-nav  m-auto my-2'>
                                    <li class="nav-item">
                                            <button className='nav-link second-nav-color active px-2 fs-5' onClick={()=>filterData("All")}>All</button>
                                    </li>
                            {categories.map((cat)=>{
                                return(
                                    <li class="nav-item">
                                            <button className='nav-link second-nav-color active px-2 fs-5' onClick={()=>filterData(cat)}>{cat.charAt(0).toUpperCase()+cat.slice(1).toLowerCase()}</button>
                                    </li>
                                    )
                            })}
                        </div>
                    </div>
                    {cloths.length>0?<Cloths data={cloths} types={types} categories={categories} filterType={filterType}/>:<img className='layer2' src={bg} alt="bg" />}
                    
                </div>}
            </div>   
      </div>  
    </>
  )
}