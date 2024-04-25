'use client'
import { useState, useEffect } from 'react';
import { Box, Heading, Button } from "@chakra-ui/react";
import { getpostsfromdb } from "@/lib/firebase";
import { BlogPost } from './blogpage';
import Link from 'next/link';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("all"); 

    useEffect(() => {
        const fetchPosts = async () => {
            const postsFromDb = await getpostsfromdb();
            console.log(postsFromDb);
            setPosts(Object.entries(postsFromDb));
        };

        fetchPosts();
    }, []);

    const filteredPosts = filter === "all" ? posts : posts.filter(post => post[1].type === filter);

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
                <Box
                    display="flex"
                    flexDirection={['column', 'row']}
                    alignItems={['start', 'center']}
                    justifyContent={['center', 'space-between']}
                    width="100%"
                    mb="20px"
                >
                    <Box mb={['20px', '0px']} width={['100%', 'auto']}>
                        <Heading mb="30px">NEWS AND UPDATES</Heading>
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
                    <Link href="/posts/addnew">
                        <Button colorScheme="blue" style={{ backgroundColor: '#161a30', fontSize: 'medium' }}>Add Post</Button>
                    </Link>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
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
