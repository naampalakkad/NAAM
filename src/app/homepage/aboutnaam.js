import { Card, Image, CardBody, CardHeader,Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { aboutnaam } from './data';
import './aboutnaam.css'


export default function AboutNaam() {
    return (
        <SimpleGrid  columns={{ base: 1, md: 2 }} spacing={4} p={0} className='cardcontainer'>
            <Card p={0} boxShadow="lg" >
                <CardHeader fontSize="5xl" color="rgb(23, 110, 81)" >About Naam</CardHeader>
                <CardBody >
                    <SimpleGrid columns={{ base: 1, md: 2 }} gridTemplateColumns="1fr 2fr" gap='6'>
                    <Image  boxSize='150px' src={"/assets/logo.png"} alt="naam logo"/>
                    {aboutnaam.about}
                    </SimpleGrid>
                </CardBody>
            </Card>
            <Card p={0} boxShadow="lg" bg="white" borderRadius="10px" >
                <CardHeader fontSize="5xl"  color="rgb(23, 110, 81)" >Our Mission</CardHeader>
                <CardBody  >
                    {aboutnaam.mission}
                </CardBody>
            </Card>
        </SimpleGrid>
    );
}