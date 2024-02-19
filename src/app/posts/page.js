// This is the component that will be rendered when the user navigates to /news
// It should render a list of news articles/updates/blogs etc. 
import React from 'react';
import './page.css'
let posts = [
    {
        title: "Post 1",
        content: "This is the first post",
        type: "news",
        date: "14/02/2024",
        author: "Unnimaya T",
        edited: "15/02/2024",
        url : "https://naam.com/posts/how-to-learn-reactjs-in-2024"
    },
    {
        title: "Post 2",
        content: "This is the second post",
        type: "news",
        date: "15/02/2024",
        author: "Sreejith KS",
        edited: "16/02/2024",
        url : "https://naam.com/posts/how-to-learn-reactjs-in-2025"
    },
    {
        title: "Post 3",
        content: "This is the third post",
        type: "news",
        date: "16/02/2024",
        author: "Anjitha J",
        edited: "17/02/2024",
        url : "https://naam.com/posts/how-to-learn-reactjs-in-2026"
    },
    
  
];

export default function Posts() {
    return (
        <div className='background'>
            <div style={{display:"flex",flexDirection:"row",padding:"10px",width:"97%"}}>
            <h1 className='news'>News</h1>
            <button className='button'><a className='readmore' href>Add </a></button> 
            </div>
            
            <ul >
            {posts.map((post, index) => (
                <li key={index} className='bigbox'>
                <h2  className='title'>{post.title}</h2>
                <p className='date'>{post.date}</p>
                <p className='author'>{post.author}</p> 
                <p className='content'>{post.content}</p>
                
                <button className='button'><a className='readmore' href={post.url}>Read more</a></button> 
                </li>
            ))}
            </ul>
        </div>
    );
    }