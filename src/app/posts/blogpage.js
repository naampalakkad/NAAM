import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";



export const BlogPost = ({ post }) => {
    let postdata = post[1];
    console.log(postdata);
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
                    src={postdata.thumbnail || defaultImage}
                    alt={postdata.title}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                />
                <Heading fontSize={['lg', 'xl']} mb="2">{post.title}</Heading>
                <p>Author: {postdata.authorName}</p>
                <p>Date: {postdata.time}</p>
                <p>Edited: {postdata.time}</p>
                <Button colorScheme="teal" size="sm" mt="2">
                    <a href={"/"} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                        Read more
                    </a>
                </Button>
            </Box>
        </Box>
    );
};
