import React from 'react'
import bg from '../../bg.png'
import { Link } from 'react-router-dom'
import About from '../About/About'
import Features from '../Features/Features'
// import { useSelector } from 'react-redux'

export default function Home(props) {
    // const state = useSelector((state)=> state.handleCart);   
  return (
    <>
      <div className='d-flex full-h'>
        <div className="col-md-6 justify-content-center align-items-center home-left bg-light">
            <div className="d-flex w-50 flex-column">
                <p className='titles pb-3'>FASHION FLASH</p>
                <p className='paragraphs'>Clothes-Style is a web application that uses AI technology to help users choose their style and enhance their shopping experience. The platform offers personalized clothing recommendations,a style advisor, fashion tips, and a wardrobe management system.</p>
                <button className='btn py-2 text-light w-50 rounded-5 button'>
                    <Link className='nav-link' to='/about' >learn more</Link>
                </button>
            </div>
        </div>
          <div className="col-md-6 col-12  justify-content-center align-items-center d-flex bgOfAll">
            <div className=' child-half-right'>
                <div className=" box w-50 flex-column">
                    <p className='titles pb-3'>FASHION FLASH</p>
                    <p className='paragraphs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laboriosam esse, quibusdam quia excepturi maiores perspiciatis voluptas quis recusandae similique!</p>
                    <button className='btn py-2 w-50 rounded-5 button'>
                        <Link className='nav-link' to='/about' >learn more</Link>
                    </button>
                </div>
                <img className='home-img-size mt-3' src={bg} alt="background" />
            </div> 
          </div>
      </div>
      <About/>  
      <Features/>
    </>
  )
}