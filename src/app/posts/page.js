// This is the component that will be rendered when the user navigates to /news
// It should render a list of news articles/updates/blogs etc. 

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
        <div>
            <h1>News</h1>
            <ul>
            {posts.map((post, index) => (
                <li key={index}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.date}</p>
                <p>{post.author}</p>
                <p>{post.edited}</p>
                <a href={post.url}>Read more</a>
                </li>
            ))}
            </ul>
        </div>
    );
    }