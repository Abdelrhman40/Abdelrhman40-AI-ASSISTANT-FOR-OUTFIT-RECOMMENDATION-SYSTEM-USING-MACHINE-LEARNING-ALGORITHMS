import React from 'react'
import layer2 from '../../Layer 2.png'
import layer3 from '../../Layer 3.png'
import { Link } from 'react-router-dom'

export default function About(props) {
  return (
    <>
      <div className='d-flex w-100 bgOfAll full-h'>
            <div className='col-lg-4 left-layer'>
                <img className='layer3' src={layer3} alt="layer3" />
            </div>   
            <div className='d-flex col-lg-4 col-7'>
                <div className='desc d-flex flex-column justify-content-center px-3 align-items-center'>
                    <h2 className='titles'>About Us</h2>
                    <p className='paragraphs'>Imagine one day struggling to get dressed on your own or feeling lost when it comes to finding your personal style. What would you do?

What obstacles would you face? More than millions of people around the world struggle with fashion and style, whether due to physical limitations, lack of confidence, or simply not knowing where to start. They suffer from the inability to express themselves through their clothing choices and may feel self-conscious about their appearance. In addition, they may rely on others to help them dress or choose outfits, which can be frustrating and limiting. So, we decided to help people with fashion and style challenges with Clothes-Style, a website designed to assist and empower individuals to find their unique style and dress with confidence.
The website will provide a personalized and accessible platform for users to explore fashion and style, with features such as AI-powered recommendations, virtual try-on, and style advice. By using Clothes-Style, users will be able to overcome their fashion and style obstacles and feel more confident and self-assured in their daily lives.</p>
                </div>
            </div>   
            <div className='col-lg-4 col-5 right-layer'>
                <img className='layer2' src={layer2} alt="layer2" />
            </div>   
      </div>  
    </>
  )
}