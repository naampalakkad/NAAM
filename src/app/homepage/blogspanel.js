'use client'
import { CardBody, CardHeader, Stack, Badge, Card, Button, SimpleGrid, CardFooter, Image } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getpostsfromdb } from '@/lib/firebase';
import './blogspanel.css';
const defaultImage = "./assets/logo.webp";

export default function Blogspanel() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromDb = await getpostsfromdb();
      if (postsFromDb) {
        const postsArray = Object.entries(postsFromDb);
        postsArray.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const reversedPosts = postsArray.reverse();
        const slicedPosts = reversedPosts.slice(0, 4);
        setPosts(slicedPosts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <SimpleGrid minChildWidth='260px' spacing='10px' className='cardcontainer'>
      {posts.map(([id, post]) => (
        <Card key={id} minBlockSize={300} variant="elevated" size="sm" className="card">
          <Image src={post.thumbnail || defaultImage} alt={post.title} className="cardImage" />
          <CardHeader className="cardTitle">{post.title}</CardHeader>
          <CardBody className="cardText">{post.description}</CardBody>
          <Stack direction="row">
            <Badge colorScheme="yellow">{post.authorName}</Badge>
            <Badge colorScheme="blue">{post.type}</Badge>
          </Stack>
          <CardFooter>
            <Link href={`/blog/${id}`} passHref>
              <Button as="div" variant="solid" colorScheme="blue">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
}
