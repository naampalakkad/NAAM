'use client'
import React, { useState, useEffect } from 'react';
import { Heading, Image, Button, Input, Card, SimpleGrid } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import "./alumni.css";

export default function alumnilist() {
    const [alumnidata, setAlumnidata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getdatafromdb('users');
            if (data) {
                setAlumnidata(Object.values(data));
            } else {
                console.error('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Input type="text" placeholder="Search" />
        <SimpleGrid minChildWidth='300px' gridAutoColumns={300} spacing='40px'>
           
            {
              alumnidata?  alumnidata.map((alumni,index) => {
                    return (
                        <Card className='alumniitem' key={index}>
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
                :<p>
                    Loading...
                </p>
            }
        </SimpleGrid>
        </div>
    );
}