"use client"
import { React, useEffect, useState } from "react";
import { auth ,db} from "@/lib/firebase";
import './login.css'
import { getDatabase, ref, set } from "firebase/database";
import { Box, Heading, Image, Button, Input, Card } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


export default function signin() {
    const [user, setUser] = useState(null);
    const [buttonText, setButtonText] = useState('Sign in with Google');

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
        console.log(userdetails);

        savetofirebase(userdetails);
    }

    function savetofirebase(userDetails) {
        console.log("Saving to Firebase");
        if (user) {
            console.log("User exists");
            let userRef = ref(db, 'users/' + user.uid);
            set(userRef, userDetails)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }

    return (
        user ? (
            <div className="cardcontainer">
                <Card className="profilebox">
                        <Image src={user.photoURL} className="profileimage" alt={user.displayName} />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <Button onClick={user ? handleSignOut : handleSignIn}>Sign out</Button>
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
                        <Button onClick={user ? handleSignOut : handleSignIn}>{buttonText}</Button>
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