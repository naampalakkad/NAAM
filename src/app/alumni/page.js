'use client'
import React, { useState, useEffect } from 'react';
import { Heading, Image, Button, Input, Card, SimpleGrid, background } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import { SocialIcon } from 'react-social-icons/component'
import "./alumni.css";
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/whatsapp'
import 'react-social-icons/email'

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
        <div id='contentbox'>
            <Input id="search_bar" type="text" variant={"filled"} placeholder="Search" />
            <div className='alumni_box'>

                <SimpleGrid minChildWidth='200px' gridAutoColumns={200} spacing='10px'>
                    {
                        alumnidata ? alumnidata.map((alumni, index) => {
                            return (
                                <Card className='alumniitem' key={index}>
                                    <Image src={alumni.photo} className='alumniimage' />
                                    <div className='alumnidetails'>
                                        <Heading as='h3' size='md'>{alumni.name}</Heading>
                                        <p><span>Batch :</span> <span>{alumni.batch}</span></p>
                                        <p><span>Phone. :</span> <span>{alumni.number}</span></p>
                                        <div className='alumni_contact'>
                                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}`} target="_blank" rel="noopener noreferrer">
                                                    <SocialIcon network="email" style={{ height: 25, width: 25 }}  />
                                            </a>
                                            <a href={`https://www.linkedin.com/in/${alumni.linkedIn}`} target="_blank" rel="noopener noreferrer">
                                                    <SocialIcon network="linkedin" style={{ height: 25, width: 25 }} />
                                            </a>
                                            <a href={`https://www.facebook.com/${alumni.facebook}`} target="_blank" rel="noopener noreferrer">
                                                    <SocialIcon network="facebook" style={{ height: 25, width: 25 }} />
                                            </a>
                                            <a href={`https://wa.me/${alumni.number}`} target="_blank" rel="noopener noreferrer">
                                                    <SocialIcon network="whatsapp" style={{ height: 25, width: 25 }} />
                                            </a>
                                        </div>
                                    </div>
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