'use client'
import React, { useState, useEffect } from 'react';
import { Heading, Image, Button, Input, Card, SimpleGrid, background } from "@chakra-ui/react";
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
            <Input id="search_bar" type="text" placeholder="Search" />
            <div className='alumni_box'>

                <SimpleGrid minChildWidth='300px' gridAutoColumns={300} spacing='40px'>
                    {
                        alumnidata ? alumnidata.map((alumni, index) => {
                            return (
                                <Card className='alumniitem' backgroundColor={"rgb(0, 19, 59)"} key={index}>
                                    <Image src={alumni.photo} className='alumniimage' />
                                    {/* <div className='alumnidetails'>
                                        <Heading>{alumni.name}</Heading>
                                        <p>Batch : {alumni.batch}</p>
                                        <p>Job : {alumni.occupation}</p>
                                        <p>Email : {alumni.email}</p>
                                        <p>Phone N. : {alumni.number}</p>
                                        <p>Facebook ID : {alumni.facebook}</p>
                                        <p>Admission No. : {alumni.rollno}</p>
                                    </div> */}
                                    <div className='alumnidetails'>
                                        <Heading>{alumni.name}</Heading>
                                        <p><span>Batch :</span> <span>{alumni.batch}</span></p>
                                        <p><span>Job :</span> <span>{alumni.occupation}</span></p>
                                        <p><span>Email :</span> <span>{alumni.email}</span></p>
                                        <p><span>Phone N. :</span> <span>{alumni.number}</span></p>
                                        <p><span>Facebook ID :</span> <span>{alumni.facebook}</span></p>
                                        <p><span>Admission No. :</span> <span>{alumni.rollno}</span></p>
                                    </div>
                                    <Button id='button'>Connect</Button>
                                </Card>
                            )
                        })
                            : <p>
                                Loading...
                            </p>
                    }
                </SimpleGrid>
            </div>
        </div>
    );
}