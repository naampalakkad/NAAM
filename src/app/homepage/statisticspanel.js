import React from 'react';

let styles = {
    "cardcontainer": {
        "padding": "10px",
        "borderRadius": "10px",
        "display": "flex",
        "flexdirection": "row",
        "overflowX":"scroll",
        width: "70%",
    },
    "card": {
        width:"90%",
        backgroundColor: "white",
        color: "black",
        "margin": "10px",
        "boxShadow": "0 0 10px rgba(0,0,0,0.5)",
        "padding": "10px",
        "borderRadius": "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    "statsval": {
        "fontSize": "5em",
        "padding": "10px",
        color:"teal",
        fontWeight:"bold",
        textAlign:"center",
    },
    "statstitle": {
        "fontSize": "2em",
        "padding": "10px",
        color:"black",
        fontWeight:"bold",
        textAlign:"center",
    },

}

let statistics = [
    {
        "title": "years",
        "text": "7",
    },
    {
        "title": "Years of Service",
        "text": "35+",
    },
    {
        "title": "Almunis",
        "text": "10k+",
    },
    {
        "title": "branches",
        "text": "10+",
    }

  
]

export default function Statisticspanel(){

   
    return (
        <div style={styles.cardcontainer}>
            {statistics.map((statistic, index) => {
                return (
                    <div style={styles.card} key={index}>
                        <h2 style={styles.statsval}>{statistic.text}</h2>
                        <h3 style={styles.statstitle}>{statistic.title}</h3>
                        
                    </div>
                )
            })}
        </div>
 
    )
}