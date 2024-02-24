'use client'
import React from 'react';
import { Box, Heading, Button } from "@chakra-ui/react";

const posts = [
    {
        imageUrl: "https://source.unsplash.com/800x600/?dubai",
        title: "gettogether@dubai",
        type: "anoun",
        date: "14/02/2024",
        author: "Unnimaya T",
        edited: "15/02/2024",
        url: "https://naam.com/posts/how-to-learn-reactjs-in-2024",
    },
    {
        imageUrl: "https://source.unsplash.com/800x600/?job",
        title: "JOB@ABC",
        type: "JOB",
        date: "15/02/2024",
        author: "Sreejith KS",
        edited: "16/02/2024",
        url: "https://images.app.goo.gl/AAH6H7P3chsmgeBK9",
    },
    {
        imageUrl: "https://source.unsplash.com/800x600/?event,people",
        title: "MEET@25",
        type: "EVENT",
        date: "16/02/2024",
        author: "Anjitha J",
        edited: "17/02/2024",
        url: "https://images.app.goo.gl/jLKtYGRnVWrYQFyV9",
    },
    {
        
        title: "FOREST",
        type: "BLOG",
        date: "16/02/2024",
        author: "NIRANJANA",
        edited: "19/02/2024",
        url: "https://images.app.goo.gl/jLKtYGRnVWrYQFyV9",
    },
];



const BlogPost = ({ post }) => {
    const defaultImage = "https://source.unsplash.com/800x600/?letter,d";

    return (
        <Box
            mb={['20px', '0']}
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
            bg="#161a30"
            color="white"
            style={{ flex: '0 0 auto', maxWidth: ['100%', '50%'] }}
        >
            <Box p="20px" borderBottom="1px solid" backgroundColor="#161a30">
                <img
                    src={post.imageUrl || defaultImage}
                    alt={post.title}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                />
                <Heading fontSize={['lg', 'xl']} mb="2">{post.title}</Heading>
                <p>Author: {post.author}</p>
                <p>Date: {post.date}</p>
                <p>Edited: {post.edited}</p>
                <Button colorScheme="teal" size="sm" mt="2">
                    <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                        Read more
                    </a>
                </Button>
            </Box>
        </Box>
    );
};

const Blog = () => {
    const [filter, setFilter] = React.useState("all");

    const filteredPosts = filter === "all" ? posts : posts.filter(post => post.type === filter);

    return (
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={['20px', '50px']}
                px={['20px', '100px', '150px']}
                mb={['20px', '50px']}
            >
                <Heading mb="30px">NEWS AND UPDATES</Heading>
                <Box mb="20px" width={['100%', 'auto']}>
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ width: '200px', padding: '10px' }}
                    >
                        <option value="all">All</option>
                        <option value="EVENT">Events</option>
                        <option value="JOB">Job Offers</option>
                        <option value="anoun">Announcements</option>
                        <option value="BLOG">Blog</option>
                    </select>
                </Box>
                
                <Box
                    display="grid"
                    gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    gap={['20px', '20px']}
                    width="100%"
                >
                    {filteredPosts.map((post, index) => (
                        <BlogPost key={index} post={post} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;
