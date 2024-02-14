import React from 'react';
let blogposts = {
    "posts": [
        {
            "title": "Post 1",
            "content": "This is the first post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150"
        },
        {
            "title": "Post 2",
            "content": "This is the second post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150"
        },
        {
            "title": "Post 3",
            "content": "This is the third post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150"
        },
        {
            "title": "Post 4",
            "content": "This is the fourth post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150"
        },
        
    ]

}

let styles = {
    "cardcontainer": {
        "padding": "10px",
        "borderRadius": "10px",
        "display": "flex",
        "flexdirection": "row",
        "overflowX":"scroll",
        width: "100%",
        backgroundColor: "#f2f2f2",
       
    },

    "card": {
        width:"30vh",
        backgroundColor: "white",
        color: "black",
        "margin": "10px",
        "boxShadow": "0 0 10px rgba(0,0,0,0.1)",
        "padding": "10px",
        "borderRadius": "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },

    "cardImage": {
        "borderRadius": "10px",
        "marginLeft": "auto",
        "marginRight": "auto",
        width: "80%",
       "aspectRatio": "1/1",
    },
    "cardTitle": {
        "fontSize": "1.5em",
        "padding": "10px",
    },
    "cardText": {
        "fontSize": "1.2em",
        "padding": "10px",
    },
    "cardButton": {
        "fontSize": "1.2em",
        "margin": "10px",
        "padding": "10px",
        "borderRadius": "10px",
        "backgroundColor": "blue",
        "color": "white",
        "border": "none",
        "cursor": "pointer",
        "boxShadow": "0 0 10px rgba(0,0,0,0.1)",
        "transition": "0.3s",
        "textDecoration": "none",
        "textAlign": "center",
        "padding": "10px",
    }

}

export default function Blogspanel(){

   
    return (
        <div id="blogspanel" data-ride="panel" >
            <div style={styles.cardcontainer}>
                {blogposts.posts.map((post, index) => {
                    return (
                        <div className="col-4" key={index}>
                            <div className="card" style={styles.card}>
                                <img src={post.image} className="card-img-top" style={styles.cardImage} alt={post.title}/>
                                <div className="card-body">
                                    <h5 className="card-title" style={styles.cardTitle}>{post.title}</h5>
                                    <p className="card-text" style={styles.cardText}>{post.content}</p>
                                    <a href="/" className="btn btn-primary" style={styles.cardButton}>Read More</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>    
    )
}