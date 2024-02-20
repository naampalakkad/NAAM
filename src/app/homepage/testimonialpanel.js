import React from 'react';
import { testimonial } from './data';
import './testimonial.css';

export default function Testimonialpanel(){

   
    return (
        <div className='testimonialspanel' data-ride="panel" >
                {testimonial.map((item, index) => {
                    return (
                        <div  className="testimonialitem"  key={index} >
                            <div >
                                <img src={item.image} alt={item.name} className='testimonialimage' />
                                <div>
                                <div className="testimonialname">{item.name}</div>
                                <div className="testimonialbatch" >{item.batch}</div>
                                </div>
                            </div>
                                <div className="testimonialcontent"  >{item.testimonial}</div>
                        </div>
                    )
                })}
            </div>   
    )
}