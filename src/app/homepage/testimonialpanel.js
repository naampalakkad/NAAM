'use client'
import React, { useEffect, useState } from 'react';
import { getdatafromdb } from '@/lib/firebase';
import { Card, CardBody, CardHeader, Box, Image, Text, VStack, Flex } from '@chakra-ui/react';

export default function TestimonialPanel() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getdatafromdb('/testimonials');
                if (data) {
                    const formattedData = Object.keys(data).map(key => ({
                        ...data[key],
                        timestamp: key
                    }));
                    const sortedData = formattedData.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
                    setTestimonials(sortedData);
                }
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <Flex className='cardcontainer scroll'>
        <Box width="100%" overflowX="auto" whiteSpace="nowrap" >
            <Flex>
                {testimonials.map((item, index) => (
                    <Card key={index} m={2} minWidth="260px" display="inline-block">
                        <CardHeader>
                            <Box display="flex" alignItems="center">
                                <Image src={item.photo} alt={item.authorName} borderRadius="full" boxSize="50px" />
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
            </Flex>
        </Box>
        </Flex>
    );
}
