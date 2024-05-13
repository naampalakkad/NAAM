import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Flex, Spacer, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import './gallery.css'
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

export default function quotebox() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % quotes.length);
        }, 5000); // Change interval as needed
        return () => clearInterval(interval);
    }, [index]);

    const nextQuote = () => {
        setIndex((index + 1) % quotes.length);
    };

    const prevQuote = () => {
        setIndex((index - 1 + quotes.length) % quotes.length);
    };

    return (
        <Center>
            <Box maxW="80vw" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" className='quote-container'>
                <Box p="6">
                    <Center>
                        <Text className='quotetext' fontSize="xl" fontWeight="bold" mb="4">"{quotes[index].text}"</Text>
                    </Center>
                    <Text fontSize="md" color="gray.500" textAlign="right">- {quotes[index].author}</Text>
                </Box>
                <Flex justifyContent="space-between" p="4">
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        aria-label="Previous"
                        onClick={prevQuote}
                        disabled={index === 0}
                    />
                    <Spacer />
                    <IconButton
                        icon={<ChevronRightIcon />}
                        aria-label="Next"
                        onClick={nextQuote}
                        disabled={index === quotes.length - 1}
                    />
                </Flex>
            </Box>
        </Center>
    );
}
