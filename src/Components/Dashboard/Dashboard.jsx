import React, { useEffect, useState } from 'react'
import bg from '../../full-shot-man-clothing-formality-scale.png'
import Cloths from '../Cloths/Cloths'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
    const [cloths,setCloths] =  useState([]);
    const [success,setSuccess] =  useState("");
    const [isLoading,setIsLoading] = useState(true);
    // const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    async function getData(){
            let{data} =await axios.get('https://clothes-style.site/api/all');
            setCloths(data.data);
            console.log(cloths);
    }
    async function deleteItem(id,e){
        e.preventDefault();
        console.log(`https://clothes-style.site/api/all/delete/${id}`);
            let { data } = await axios.delete(`https://clothes-style.site/api/all/delete/${id}`,{
                headers: {
                  access_token: localStorage.getItem('UserToken')
                }
              });
              
            console.log(data);
            //navigate('/dashboard')
            setSuccess("Item Deleted Successfly"); 
    }

    async function timeout (){
        setTimeout(() => {
        // Set the value after 5 seconds
        setIsLoading(false);// Replace 'New Value' with the desired value
      }, 3000);
      return () => clearTimeout(timeout);
    }

    useEffect(()=>{
        getData();
        timeout();
    },[])

  return (
    <>
      <div className='d-flex w-100 full-h bgOfAll pt-5  justify-content-center align-items-center '>
            <div className='d-flex h-75 w-75 mt-5 w-lg-50 justify-content-center '>
                {isLoading?<div className=' full-h'><div class="my-5 loader"></div></div>:
                <div id='top' className='desc d-flex h-100 w-100 flex-column justify-content-center px-3 align-items-center'>
                    {success?<div class="alert alert-success w-50" role="alert">
                        {success}
                    </div>:null}
                    <div className='w-75 my-3 d-flex justify-content-between align-items-center'>
                        <h2 className='titles' style={{letterSpacing: "2px"}} >Dashboard</h2>
                        <Link className='text-decoration-none titles fs-5' to='/create'>Add New Item<i className="ms-3 fa-solid rounded-5 pluse-icon fa-plus"></i> </Link>
                    </div>
                    <div className='d-flex flex-column w-100 align-items-center'>
                        <table className="w-75 table text-center">
                            <thead>
                                    <tr>
                                    <th className=' bg-transparent second-color' scope="col">ID</th>
                                    <th className=' bg-transparent second-color' scope="col">Image</th>
                                    <th className=' bg-transparent second-color' scope="col">Category</th>
                                    <th className=' bg-transparent second-color' scope="col">Type</th>
                                    <th className=' bg-transparent second-color' scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                            {cloths.map((cloth)=>{ return(<>
                                <tr key={cloth.id}>
                                    <td className='w-25 bg-transparent second-color'>{cloth.id}</td>
                                    <td className='w-25 bg-transparent second-color'><img src={cloth.image} className='w-25 rounded-2' alt="" /></td>
                                    <td className='w-25 bg-transparent second-color'>{cloth.category}</td>
                                    <td className='w-25 bg-transparent second-color'>{cloth.type}</td>
                                    <td className='w-25 bg-transparent second-color'>
                                        <button href='#top' type="button" class="btn btn-danger" 
                                        onClick={(e)=>{ 
                                             window.scrollTo({ top: 0, behavior: 'smooth' });
                                            deleteItem(cloth.id,e)}}>Delete</button>
                                    </td>                                    
                                </tr>
                                </>)})}
                            </tbody>
                        </table>
                    </div>
                    
                </div>}
            </div>   
      </div>  
    </>
  )
}