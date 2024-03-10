'use client'
import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";

export const BlogPost = ({ post }) => {
    let postdata = post[1];
    console.log(postdata);
    const defaultImage = "https://source.unsplash.com/800x600/?letter,d";
    const postDate = new Date(postdata.time);
    const formattedDate = postDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

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
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                />
                <p style={{ textAlign: 'right' }}>{formattedDate}</p>
                <p>Author: {postdata.authorName}</p>
                <Heading fontSize={['lg', 'xl']} mb="2" textAlign="center">{postdata.title}</Heading>
                <Box
                    maxH="2em"   // Set a maximum height for two lines
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="normal"
                    lineHeight="1em"  // Set line height to control the spacing between lines
                    maxLines={2}     // Limit the description to two lines
                >
                    <p>{postdata.description}</p>
                </Box>
                <Box textAlign="right">
                    <Button colorScheme="teal" size="sm" mt="2">
                        <a href={"/"} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                            Read more
                        </a>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}; 
