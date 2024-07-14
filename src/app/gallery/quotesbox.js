import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const quotes = [
    {
        text: "Photographs are our memories captured in time.",
        author: "Anonymous"
    },
    {
        text: "A picture is a poem without words.",
        author: "Horace"
    },
    {
        text: "Every picture tells a story.",
        author: "Unknown"
    },
    {
        text: "In photography there is a reality so subtle that it becomes more real than reality.",
        author: "Alfred Stieglitz"
    },
    {
        text: "What I like about photographs is that they capture a moment that's gone forever, impossible to reproduce.",
        author: "Karl Lagerfeld"
    }
];

export default function QuoteBox() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextQuote = () => {
        setIndex((index + 1) % quotes.length);
    };

    const prevQuote = () => {
        setIndex((index - 1 + quotes.length) % quotes.length);
    };

    return (
        <Center>
            <Box 
                maxW="80vw" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                boxShadow="lg" 
                bgGradient="linear(to-r, teal.500, green.500)" 
                color="white"
                p="6"
            >
                <Center>
                    <Text fontSize="xl" fontWeight="bold" mb="4">"{quotes[index].text}"</Text>
                </Center>
                <Text fontSize="md" color="gray.300" textAlign="right">- {quotes[index].author}</Text>
                <Flex justifyContent="space-between" mt="4">
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        aria-label="Previous"
                        onClick={prevQuote}
                        colorScheme="teal"
                    />
                    <IconButton
                        icon={<ChevronRightIcon />}
                        aria-label="Next"
                        onClick={nextQuote}
                        colorScheme="teal"
                    />
                </Flex>
            </Box>
        </Center>
    );
}
