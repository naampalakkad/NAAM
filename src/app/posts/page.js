'use client'
import { useState, useEffect } from 'react';
import { Box, Heading, Button, Select, Flex, Text } from "@chakra-ui/react";
import { getpostsfromdb, checkuserrole } from "@/lib/firebase";
import { BlogPost } from './blogpage';
import Link from 'next/link';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("all"); 
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            const isUserAdmin = await checkuserrole('blogger');
            setIsAdmin(isUserAdmin);
        };
    
        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsFromDb = await getpostsfromdb();
            if(postsFromDb)
                setPosts(Object.entries(postsFromDb));
        };

        fetchPosts();
    }, []);

    const filteredPosts = filter === "all" ? posts : posts.filter(post => post[1].type === filter);

    return (
        <Box marginTop={100}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="50px"
                mb="50px"
            >
                <Box
                    width="100%"
                    mb="20px"
                    px={['50px', '100px']}
                >
                    <Heading mb="30px" textAlign="center">
                        NEWS AND UPDATES
                    </Heading>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Select
                            onChange={(e) => setFilter(e.target.value)}
                            width='200px'
                            padding='10px'
                            size="lg"
                            bg="white"
                            _hover={{ bg: "gray.100" }}
                            _focus={{ borderColor: "blue.500" }}
                            color={"black"}
                        >
                            <option value="all">All</option>
                            <option value="EVENT">Events</option>
                            <option value="JOB">Job Offers</option>
                            <option value="anoun">Announcements</option>
                            <option value="BLOG">Blog</option>
                        </Select>
                        {isAdmin &&  
                            <Link href="/addnew">
                                <Button colorScheme="blue" size="lg">Add Post</Button>
                            </Link>
                        }
                    </Flex>
                </Box>
                {filteredPosts.length === 0 ? (
                    <Text textAlign="center" fontSize="xl" color="gray.600">
                        No content available.
                    </Text>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap="20px"
                        width="100%"
                        margin="20px"
                    >
                        {filteredPosts.map((post, index) => (
                            <BlogPost key={index} post={post} />
                        )).reverse()}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Blog;
