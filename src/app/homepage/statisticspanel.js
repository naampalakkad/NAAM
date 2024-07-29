import React from 'react';
import { Flex, Circle, Text, Heading } from '@chakra-ui/react';
import { statistics } from '@/lib/data';

export default function Statisticspanel() {
    return (
        <Flex justifyContent="center" gap={{ base: 6, md: 10 }} p={5} className='cardcontainer' flexWrap="wrap">
            {statistics.map((statistic, index) => (
                <Circle
                    key={index}
                    size={{ base: "120px", md: "250px" }} // Responsive size based on screen width
                    bgGradient="linear(to-r, teal.500, green.500)"
                    boxShadow="xl"
                    _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    mb={{ base: 1, md: 0 }} // Margin bottom for spacing, 0 on medium screens
                >
                    <Heading fontSize={{ base: "4xl", md: "6xl" }} color="white" className='statsval'>
                        {statistic.text}
                    </Heading>
                    <Text fontSize={{ base: "xl", md: "3xl" }} color="whiteAlpha.800" className='statstitle'>
                        {statistic.title}
                    </Text>
                </Circle>
            ))}
        </Flex>
    );
}
