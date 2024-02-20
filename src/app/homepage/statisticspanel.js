import React from 'react';
import './statisticspanel.css';
import { Card, CardBody, CardHeader, SimpleGrid } from '@chakra-ui/react';
import { statistics } from './data';

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