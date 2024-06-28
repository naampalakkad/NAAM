import React from 'react';
import { testimonial } from './data';
import './testimonial.css';
import { Card, CardBody, CardHeader, SimpleGrid, Box, Image, Text, VStack } from '@chakra-ui/react';

export default function TestimonialPanel() {
    return (
        <SimpleGrid spacing={4} className='cardcontainer' columns={[1, 2, 3, 4]} data-ride="panel">
            {testimonial.map((item, index) => (
                <Card key={index} className="testimonialitem">
                    <CardHeader>
                        <Box display="flex" alignItems="center">
                            <Image src={item.image} alt={item.name} className='testimonialimage' borderRadius="full" boxSize="50px" />
                            <VStack align="start" ml={4}>
                                <Text fontWeight="bold" className="testimonialname">{item.name}</Text>
                                <Text color="gray.500" className="testimonialbatch">{item.batch}</Text>
                            </VStack>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Text className="testimonialcontent">{item.testimonial}</Text>
                    </CardBody>
                </Card>
            ))}
        </SimpleGrid>
    );
}
