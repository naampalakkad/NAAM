'use client'
import React, { useState, useEffect } from 'react'
import { Heading, Image, Button, Input, Card, SimpleGrid, background } from "@chakra-ui/react"
import { getdatafromdb } from "@/lib/firebase"
import { SocialIcon } from 'react-social-icons/component'
import "./alumni.css"
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/whatsapp'
import 'react-social-icons/email'

export default function alumnilist() {
  const [alumnidata, setAlumnidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredAlumni = alumnidata.filter((alumni) => {
    const searchTermLower = searchTerm.toLowerCase();
    return searchTerm === "" ||
      alumni.name.toLowerCase().includes(searchTermLower) ||
      alumni.batch.toLowerCase().includes(searchTermLower);
  });

  return (
    <div id='contentbox'>
      <Input
        id="search_bar"
        type="text"
        variant={"filled"}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='alumni_box'>
        <SimpleGrid minChildWidth='200px' gridAutoColumns={200} spacing='10px'>
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni, index) => (
              <Card className='alumniitem' key={index}>
                <Image src={alumni.photo} className='alumniimage' />
                <div className='alumnidetails'>
                  <Heading as='h3' size='md'>{alumni.name}</Heading>
                  <p><span>Batch :</span> <span>{alumni.batch}</span></p>
                  <p><span>Phone. :</span> <span>{alumni.number}</span></p>
                  <div className='alumni_contact'>
                      <SocialIcon network="email"    style={{ height: 25, width: 25 }} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}`} />
                      <SocialIcon network="linkedin" style={{ height: 25, width: 25 }} href={`https://www.linkedin.com/in/${alumni.linkedIn}`} />
                      <SocialIcon network="facebook" style={{ height: 25, width: 25 }} href={`https://www.facebook.com/${alumni.facebook}`} />
                      <SocialIcon network="whatsapp" style={{ height: 25, width: 25 }} href={`https://wa.me/${alumni.number}`}/>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </SimpleGrid>
      </div>
    </div>
  );
}