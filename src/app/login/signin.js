import React from 'react';
import {  Heading, Button, Card } from "@chakra-ui/react";
import {signInoutWithGoogle} from "@/lib/firebase";


export default function SigninBox() {
  function signInWithGoogle() {
    signInoutWithGoogle();
  }
  return (
    <div className="cardcontainer">
      <Card className="profilebox">
        <Heading>Sign In to NAAM website</Heading>
        <Button onClick={()=>signInWithGoogle()}>Sign In</Button>
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
  );
}