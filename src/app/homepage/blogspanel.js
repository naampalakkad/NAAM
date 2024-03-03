import { CardBody, CardHeader, Stack, Badge, Card, Button, SimpleGrid, CardFooter, Image } from '@chakra-ui/react';
import React from 'react';
import './blogspanel.css';
import { blogposts } from './data';


export default function Blogspanel() {


    return (
        <SimpleGrid minChildWidth='260px'  spacing='10px' className='cardcontainer' >
            {blogposts.posts.map((post, index) => {
                return (
                    <Card key={index} minBlockSize={300} variant={"elevated"} size={"sm"} className='card'>
                        <Image src={post.image} alt={post.title} className='cardImage' />
                        <CardHeader className='cardTitle'>{post.title} </CardHeader>
                        <CardBody className='cardText'>{post.content}</CardBody>
                        <Stack direction='row'>
                            <Badge colorScheme={"yellow"} > {post.author} </Badge>
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