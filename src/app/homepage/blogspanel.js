'use client'
import { CardBody, CardHeader, Stack, Badge, Card, Button, SimpleGrid, CardFooter, Image } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import './blogspanel.css';
import { getpostsfromdb } from "@/lib/firebase";
const defaultImage = "./assets/logo.webp";


export default function Blogspanel() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const postsFromDb = await getpostsfromdb();
            if (postsFromDb){
            const postsArray = Object.values(postsFromDb);
            const slicedPosts = postsArray.length >= 4 ? postsArray.slice(0, 4) : postsArray;
            setPosts(slicedPosts);
            }
        };

        fetchPosts();
    }, []);



    return (
        <SimpleGrid minChildWidth='260px'  spacing='10px' className='cardcontainer' >
            {posts.map((post, index) => {
                return (
                    <Card key={index} minBlockSize={300} variant={"elevated"} size={"sm"} className='card'>
                        <Image src={post.thumbnail || defaultImage} alt={post.title} className='cardImage' />
                        <CardHeader className='cardTitle'>{post.title} </CardHeader>
                        <CardBody className='cardText'>{post.description}</CardBody>
                        <Stack direction='row'>
                            <Badge colorScheme={"yellow"} > {post.authorName} </Badge>
                            <Badge colorScheme={"blue"} >{post.type} </Badge>
                        </Stack>
                        <CardFooter >
                            <Button variant='solid' colorScheme='blue'>
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </SimpleGrid>
    )
}