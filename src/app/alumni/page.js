'use client'
import React, { useState, useEffect } from 'react';
import { Heading, Image, Button, Input, Card, SimpleGrid, background } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import { SocialIcon } from 'react-social-icons/component'
import "./alumni.css";
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/whatsapp'

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
                                    <div className='alumnidetails'>
                                        <Heading>{alumni.name}</Heading>
                                        <p><span>Batch :</span> <span>{alumni.batch}</span></p>
                                        <p><span>Admission No. :</span> <span>{alumni.rollno}</span></p>
                                        <p><span>Job :</span> <span>{alumni.occupation}</span></p>
                                        <p><span>Phone N. :</span> <span>{alumni.number}</span></p>
                                        <p><span>Email :</span> <span>{alumni.email}</span></p>
                                        <p><span>About Me :</span> <span>{alumni.about}</span></p>
                                        <div className='alumni_contact'>
                                            {/* <a href={`mailto:${alumni.email}`}>
                                                <Button>Email</Button>
                                            </a> */}
                                            <a href={`https://www.linkedin.com/in/${alumni.linkedIn}`} target="_blank" rel="noopener noreferrer">
                                                <Button>
                                                    <SocialIcon network="linkedin" style={{ height: 25, width: 25 }} />
                                                </Button>
                                            </a>
                                            <a href={`https://www.facebook.com/${alumni.facebook}`} target="_blank" rel="noopener noreferrer">
                                                <Button>
                                                    <SocialIcon network="facebook" style={{ height: 25, width: 25 }} />
                                                </Button>
                                            </a>
                                            <a href={`https://wa.me/${alumni.number}`} target="_blank" rel="noopener noreferrer">
                                                <Button>
                                                    <SocialIcon network="whatsapp" style={{ height: 25, width: 25 }} />
                                                </Button>
                                            </a>
                                        </div>
                                        {/* 
                                        
                                        <p><span>Facebook ID :</span> <span>{alumni.facebook}</span></p>
                                        <p><span>LinkedIn :</span> <span>{alumni.linkedIn}</span></p> */}

                                    </div>
                                    {/* <Button id='button'>Connect</Button> */}
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