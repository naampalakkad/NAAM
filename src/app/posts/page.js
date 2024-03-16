'use client'
import { useState, React, useEffect } from 'react';
import { Box, Heading, Button } from "@chakra-ui/react";
import { getpostsfromdb } from "@/lib/firebase";
import {BlogPost} from './blogpage'



const Blog = () => {
    const [posts, setPosts] = useState([]);
    // const [filter, setFilter] = useState("all"); // "all" is the default option
    // const filteredPosts = filter === "all" ? posts : posts.filter(post => post.type === filter);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsFromDb = await getpostsfromdb();
            console.log(postsFromDb);
            setPosts(Object.entries(postsFromDb));
            
        };

        fetchPosts();
    }, []);




    return (
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="50px"
                px={['100px', '150px']}
                mb="50px"
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
                    gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
                    gap={['20px', '20px']}
                    width="100%"
                >
              
                    {posts.map((post, index) => (
                        <BlogPost key={index} post={post} />
                    ))} 
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;