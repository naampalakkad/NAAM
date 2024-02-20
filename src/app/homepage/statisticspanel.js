import React from 'react';
import './statisticspanel.css';
import { Card, CardBody, CardHeader, SimpleGrid } from '@chakra-ui/react';

let statistics = [
    {
        "title": "years",
        "text": "7",
    },
    {
        "title": "Years of Service",
        "text": "35+",
    },
    {
        "title": "Almunis",
        "text": "10k+",
    },
    {
        "title": "branches",
        "text": "10+",
    }


]

export default function Statisticspanel() {
    return (
        <SimpleGrid spacing={4} className='cardcontainer' >
            {statistics.map((statistic, index) => {
                return (
                    <Card variant={"elevated"} size={"sm"} className='card' key={index}>
                        <CardHeader className='statsval'>{statistic.text}</CardHeader>
                        <CardBody className='statstitle'>{statistic.title}</CardBody>
                    </Card>
                )
            })}
        </SimpleGrid>
    )
}