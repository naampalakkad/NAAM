"use client"
import { React, useEffect, useState } from "react";
import { auth ,signInoutWithGoogle, savedatatodb} from "@/lib/firebase";
import './login.css';
import { Box, Heading, Image, Button, Input, Card } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";


export default function signin() {
    const [user, setUser] = useState(null);

    let personaldetails = [
        {
            prop: "Name",
            default: "Enter your name",
            type: "text"
        },
        {
            prop: "Email",
            default: "Enter your email",
            type: "email"
        },
        {
            prop: "batch",
            default: "Enter your batch,  eg: 25",
            type: "Number"
        },
        {
            prop: "number",
            default: "Enter your Mobile number",
            type: "Number"
        },
        {
            prop: "Facebook Profile",
            default: "Enter your Facebook Profile",
            type: "text"
        },
        {
            prop: "occupation",
            default: "Enter your occupation",
            type: "text"
        },
        {
            prop: "JNV Roll No",
            default: "Enter your JNV Roll No",
            type: "Number"
        },

    ]

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);

 

    function updatefirebaseuserdata() {
        console.log("updating user data");
        let name = document.querySelector(".detaillist:nth-child(1) input").value;
        let email = document.querySelector(".detaillist:nth-child(2) input").value;
        let batch = document.querySelector(".detaillist:nth-child(3) input").value;
        let number = document.querySelector(".detaillist:nth-child(4) input").value;
        let facebook = document.querySelector(".detaillist:nth-child(5) input").value;
        let occupation = document.querySelector(".detaillist:nth-child(6) input").value;
        let rollno = document.querySelector(".detaillist:nth-child(7) input").value;
        let photo = user.photoURL;
        let userdetails = {
            name: name,
            email: email,
            batch: batch,
            number: number,
            facebook: facebook,
            occupation: occupation,
            rollno: rollno,
            photo: photo
        }
       savedatatodb("users/"+user.uid,userdetails);
    }


    return (
        user ? (
            <div className="cardcontainer">
                <Card className="profilebox">
                        <Image src={user.photoURL} className="profileimage" alt={user.displayName} />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <Button onClick={signInoutWithGoogle}>Sign out</Button>
                </Card>
                <Box spacing={4} className="infobox">
                    {personaldetails.map((detail, index) => (
                        <div className="detaillist" key={index}>
                            <label>{detail.prop}</label>
                            <Input className="detailitem" variant={"filled"} type={detail.type} placeholder={detail.default} />
                        </div>
                    ))}
                    <Button onClick={updatefirebaseuserdata}>Save</Button>
                </Box>
            </div>
        ) :
            (
                <div className="cardcontainer">
                    <Card className="profilebox">
                        <Heading>Sign In to NAAM website</Heading>
                        <Button onClick={signInoutWithGoogle}>Sign In</Button>
                    </Card>
                    <Card className="infobox">
                        <Heading>Sign In to NAAM website</Heading>
                        <p>
                            Sign in with your google account to set your details so that other users can find you, or to view other's details.
                            We will not share your details with anyone else, and we will not use your details for any other purpose.
                            Google may collect your details as per their privacy policy.
                        </p>
                    </Card>
                </div>
            )
    );
}