"use client"
import { React, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import './login.css'
import { Box, Heading, Image, Center, Stack, Flex, Button, SimpleGrid, Input, InputGroup, InputLeftElement, InputRightElement, CheckIcon } from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


export default function signin() {
    const [user, setUser] = useState(null);
    const [buttonText, setButtonText] = useState('Sign in with Google');

    let personaldetails= [
        {
            prop: "Name",
            default: "Enter your name",
            type : "text"
        },
        {
            prop: "Email",
            default: "Enter your email",
            type : "email"
        },
        {
            prop: "batch",
            default: "Enter your batch",
            type : "Number"
        },
        {
            prop: "number",
            default: "Enter your Mobile number",
            type : "Number"
        },
        {
            prop: "Facebook Profile",
            default: "Enter your Facebook Profile",
            type : "text"
        },
        {
            prop: "occupation",
            default: "Enter your occupation",
            type : "text"
        },
        {
            prop: "JNV Roll No",
            default: "Enter your JNV Roll No",
            type : "Number"
        },

    ]

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setButtonText('Sign out');
            } else {
                setUser(null);
                setButtonText('Sign in with Google');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setUser(user);
                setButtonText('Sign out');
                alert('Signed in successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setButtonText('Sign in with Google');
                alert('Signed out successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="cardcontainer">
            
            <Box className="profilebox">
            <Heading>Profile</Heading>
            
                {user ? (
                    <div>
                        <Image src={user.photoURL} alt={user.displayName} />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <Button onClick={user ? handleSignOut : handleSignIn}>Sign out</Button>
                    </div>
                ):
                <Button onClick={user ? handleSignOut : handleSignIn}>Sign In</Button>
                }

            </Box>
            <Box spacing={4} className="infobox">
                {personaldetails.map((detail, index) => (
                    <div className="detailitem" key={index}>
                        <Input className="detailitem" variant={"filled"} type={detail.type} placeholder={detail.default} />
                    </div>
                ))}
            </Box>
        </div>
    );
}