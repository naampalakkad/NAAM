'use client';
import React, { useEffect, useState } from 'react';
import { getdatafromdb } from '@/lib/firebase';
import { Card, CardBody, CardHeader, Box, Image, Text, VStack, Flex, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function TestimonialPanel() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getdatafromdb('content/approvedtestimonials');
                if (data) {
                    const formattedData = Object.keys(data).map(key => ({
                        ...data[key],
                        timestamp: key
                    }));
                    const shuffledData = formattedData.sort(() => 0.5 - Math.random());
                    const selectedTestimonials = shuffledData.slice(0, 4);
    
                    setTestimonials(selectedTestimonials);
                }
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            } finally {
                setLoading(false);
            }
        }
    
        fetchData();
    }, []);
    

    if (loading) {
        return (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} minWidth="260px" maxWidth="300px" m={2}>
                        <CardHeader>
                            <Skeleton  size="50px" />
                            <SkeletonText mt="4" noOfLines={2} spacing="4" />
                        </CardHeader>
                        <CardBody>
                            <SkeletonText noOfLines={4} spacing="4" />
                        </CardBody>
                    </Card>
                ))}
            </Grid>
        );
    }

    return (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} overflowX="auto">
            {testimonials.map((item, index) => (
                <Card key={index} minWidth="260px" maxWidth="300px" m={2}>
                    <CardHeader>
                        <Box display="flex" alignItems="center">
                            <Image src={item.photo || `/assets/usericon.webp`} alt={item.authorName} borderRadius="full" boxSize="50px" />
                            <VStack align="start" ml={4}>
                                <Text fontWeight="bold">{item.authorName}</Text>
                                <Text color="gray.500">{item.batch}</Text>
                            </VStack>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Text>{item.content}</Text>
                    </CardBody>
                </Card>
            ))}
        </Grid>
    );
}
