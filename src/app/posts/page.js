'use client'
import React from 'react';
import { Box, Heading } from "@chakra-ui/react";

// Your posts data
const posts = [
    {
        title: "gettogether@dubai",
        type: "newS",
        date: "14/02/2024",
        author: "Unnimaya T",
        edited: "15/02/2024",
        url: "https://naam.com/posts/how-to-learn-reactjs-in-2024"
    },
    {
        title: "JOB@ABC",
        type: "JOB",
        date: "15/02/2024",
        author: "Sreejith KS",
        edited: "16/02/2024",
        url: "https://naam.com/posts/how-to-learn-reactjs-in-2025"
    },
    {
        title: "MEET@25",
        type: "EVENT",
        date: "16/02/2024",
        author: "Anjitha J",
        edited: "17/02/2024",
        url: "https://naam.com/posts/how-to-learn-reactjs-in-2026"
    },
];

const Blog = () => {
    const [filter, setFilter] = React.useState("all"); // "all" is the default option

    const filteredPosts = filter === "all" ? posts : posts.filter(post => post.type === filter);

    return (
        <Box>
            {/* Blog section */}
            <Box display="flex" flexDirection="column" alignItems="center" mt="50px" px={['10px', '150px']} mb="50px">
                <Heading mb="30px">Blog</Heading>

                {/* Filter dropdown */}
                <Box
                    mb="20px"
                    width={['100%', 'auto']}
                >
                    <select onChange={(e) => setFilter(e.target.value)} style={{ width: '200px', padding: '10px' }}>
                        <option value="all">All</option>
                        <option value="EVENT">Events</option>
                        <option value="JOB">Job Offers</option>
                        <option value="newS">Announcements</option>
                        <option value="BLOG">Blog</option>
                    </select>
                </Box>

                {/* Render filtered blog posts horizontally */}
                <Box
                    display="flex"
                    flexDirection={['column', 'row']}
                    alignItems={['center', 'flex-start']}
                    justifyContent="space-between"
                    flexWrap={['wrap', 'nowrap']}
                    width="100%"
                >
                    {/* Render blog posts */}
                    {filteredPosts.map((post, index) => (
                        <Box key={index} width={['100%', '30%']} mb={['20px', '0']} borderRadius="8px" overflow="hidden" boxShadow="md" bg="#161a30" color="white">
                            <Box p="20px" borderBottom="1px solid" backgroundColor="#161a30">
                                <Heading fontSize={['lg', 'xl']} mb="2">{post.title}</Heading>
                               
                                <p>Author: {post.author}</p>
                                <p>Date: {post.date}</p>
                                <p>Edited: {post.edited}</p>
                                <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;
