import React from 'react';


let testimonial = [
    {
        name: "Sreejith KS",
        batch: "25th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name:"Anjitha J",
        batch: "25th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name:"Unnimaya T",
        batch: "5th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        name:"suneeb",
        batch: "17th Batch",
        testimonial: "I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good. I am very happy to be a part of this institution. I have learned a lot from here. The teachers are very helpful and the environment is very good.",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
]

let styles = {
    "testimonialspanel": {
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "center",
        width: "80%",
    },

    "testimonialitem": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "width": "300px",
        backgroundColor: "222222",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
        boxShadow: "2px 3px 10px 2px #010110",
    },
    "testimonialimage": {
        "width": "100px",
        "height": "100px",
        "borderRadius": "50%",
        "margin": "10px",
    },
    "testimonialname": {
        "fontSize": "20px",
        "fontWeight": "bold",
    },
    "testimonialbatch": {
        "fontSize": "15px",
        "fontWeight": "bold",
        textAlign: "right",
    },
    "testimonialcontent": {
        "fontSize": "15px",
    }

}



export default function Testimonialpanel(){

   
    return (
        <div style={styles.testimonialspanel}  data-ride="panel" >
                {testimonial.map((item, index) => {
                    return (
                        <div  className="testimonialitem" style={styles.testimonialitem}  key={index} >
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <img src={item.image} alt={item.name} style={styles.testimonialimage} />
                                <div>
                                <div className="testimonialname" style={styles.testimonialname} >{item.name}</div>
                                <div className="testimonialbatch" style={styles.testimonialbatch} >{item.batch}</div>
                                </div>
                            </div>
                                <div className="testimonialcontent" style={styles.testimonialcontent} >{item.testimonial}</div>
                        </div>
                    )
                })}
            </div>   
    )
}