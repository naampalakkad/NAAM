import React from 'react';
import { Flex, Circle, Text, Heading } from '@chakra-ui/react';
import { statistics } from './data';

export default function Statisticspanel() {
    return (
        <Flex justifyContent="center" gap={6} p={5} className='cardcontainer'>
            {statistics.map((statistic, index) => (
                <Circle
                    key={index}
                    size="250px"
                    bgGradient="linear(to-r, teal.500, green.500)"
                    boxShadow="xl"
                    _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading fontSize="6xl" color="white" className='statsval'>
                        {statistic.text}
                    </Heading>
                    <Text fontSize="3xl" color="whiteAlpha.800" className='statstitle'>
                        {statistic.title}
                    </Text>

                </Circle>
            ))}
        </Flex>
    );
}
