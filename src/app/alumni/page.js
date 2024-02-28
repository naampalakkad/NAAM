import react from 'react';
import { Box, Heading, Image, Button, Input, Card, SimpleGrid } from "@chakra-ui/react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import "./alumni.css";
let alumnidata = [];

export default function alumnilist() {
    // get all the data from the database and display it in a card
    const alumniListRef = ref(db, 'users');
    onValue(alumniListRef, (snapshot) => {
        const data = snapshot.val();
        alumnidata = Array.from(Object.values(data));
        console.log(alumnidata);
    }, (error) => {
        console.error("Error: ", error);
    });
    return (
        <>
            <Input placeholder="Search" className='searchipt' />
            <SimpleGrid minChildWidth='300px' gridAutoColumns={300} spacing='40px'>
                {
                    alumnidata.map((alumni) => {
                        return (
                            <Card className='alumniitem'>
                                <Image src={alumni.photo} className='alumniimage' />
                                <div className='alumnidetails'>
                                    <Heading>{alumni.name}</Heading>
                                    <p>{alumni.batch}</p>
                                    <p>{alumni.occupation}</p>
                                    <p>{alumni.email}</p>
                                    <p>{alumni.number}</p>
                                    <p>{alumni.facebook}</p>
                                    <p>{alumni.rollno}</p>
                                </div>
                                <Button>Connect</Button>
                            </Card>
                        )
                    })
                }
            </SimpleGrid>
        </>
    );
}