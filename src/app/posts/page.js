'use client'
import { useState, useEffect } from 'react';
import { Box, Heading, Button } from "@chakra-ui/react";
import { getpostsfromdb , checkuserrole} from "@/lib/firebase";
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
            console.log(postsFromDb);
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
                // px={['100px', '150px']}
                mb="50px"
            >
                <Box
                    display="flex"
                    flexDirection={['column', 'row']}
                    alignItems={['start', 'center']}
                    justifyContent={['center', 'space-between']}
                    width="100%"
                    mb="20px"
                    px={['50px', '100px']}
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
                    {isAdmin &&  <Link href="/posts/addnew">
                        <Button colorScheme="blue">Add Post</Button>
                    </Link>}
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                    alignItems="center"
                    gap="20px"
                    width="100%"
                    margin={"20px"}
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