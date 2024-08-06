import React from 'react'
import bg1 from '../../size_page.png'
import bg2 from '../../cloths_pg.png'
import bg3 from '../../types_page.png'
import bg4 from '../../color_page.png'
import { Link } from 'react-router-dom'

export default function Features(props) {
  return (
    <>
      <div className='d-flex w-100 flex-column align-items-center justify-content-center bgOfAll full-h'>
                <div>
                    <p className='titles'>Features</p>
                </div>
            <div className="w-100 d-flex align-items-center light">
                <div className=" py-3 m-auto d-flex flex-wrap">
                    <div className="d-flex flex-column justify-content-center align-items-center col-lg-3 col-sm-6 col-6" >
                        <img src={bg1} className='featuresImg' alt="" srcset="" />
                        <Link className=' py-3 p-feature fw-bold' to="/sizepage">Size Prediction</Link>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center col-lg-3 col-sm-6 col-6" >
                        <img src={bg2} className='featuresImg' alt="" srcset="" />
                        <Link className=' py-3 p-feature fw-bold' to="/cloths_recommendation">Cloths Recommendition</Link>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center col-lg-3 col-sm-6 col-6" >
                        <img src={bg3} className='featuresImg' alt="" srcset="" />
                        <Link className=' py-3 p-feature fw-bold' to="/clothestypes">Clothes types</Link>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center col-lg-3 col-sm-6 col-6" >
                        <img src={bg4} className='featuresImg' alt="" srcset="" />
                        <Link className=' py-3 p-feature fw-bold 'to="/colors_recommendation">colors Recommendition</Link>
                    </div>
                </div>
            </div>
        </div>  
    </>
  )
}