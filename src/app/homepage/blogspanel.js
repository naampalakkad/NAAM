import { CardBody, CardHeader, Stack, Badge, Card, Button, SimpleGrid, CardFooter, Divider } from '@chakra-ui/react';
import React from 'react';
import './blogspanel.css';
let blogposts = {
    "posts": [
        {
            "title": "Post 1",
            "content": "This is the first post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "offer",
            author: "unnimaya",
        },
        {
            "title": "Post 2",
            "content": "This is the second post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "blog",
            author: "Sreejith KS",
        },
        {
            "title": "Post 3",
            "content": "This is the third post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "announcement",
            author: "Suneeb vishnu",
        },
        {
            "title": "Post 4",
            "content": "This is the fourth post. this is some dummy text used to fill in the rest of the page, and this is some random text",
            "image": "https://via.placeholder.com/150",
            type: "blog",
            author: "Anjitha J",
        },

    ]

}

export default function Blogspanel() {


    return (
        <SimpleGrid className='cardcontainer'  >
            {blogposts.posts.map((post, index) => {
                return (
                    <Card key={index} variant={"elevated"} size={"sm"} className='card'>
                        <img src={post.image} alt={post.title} className='cardImage' />
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