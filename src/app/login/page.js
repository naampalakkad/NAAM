'use client'
import { React, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { personaldetailsdata } from "../homepage/data";
import { Box, Heading, Image, Button, Input, Tooltip, Card } from "@chakra-ui/react";
import {
    auth,
    signInoutWithGoogle,
    savedatatodb,
    getuserdetailfromdb,
    uploadImageToStorage,
} from "@/lib/firebase";
import './login.css';
  let personaldetails = personaldetailsdata;

function UserProfile({ user, profileImage, onUpdate }) {
  return (
    <div className="cardcontainer">
      <Card className="profilebox">
        <div className="profileimagecontainer">
          <label htmlFor="profileImageInput" className="profileimage">
            <Image src={profileImage} id="profileimagebox" alt={user.displayName} />
            <span className="upload-icon">Upload</span>
          </label>
          <input
            type="file"
            id="profileImageInput"
            onChange={onUpdate} // Pass handleImageChange as a prop
            style={{ display: "none" }}
          />
        </div>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <Button onClick={signInoutWithGoogle}>Sign out</Button>
      </Card>
      <Box spacing={4} className="infobox">
        {/* Personal details section (unchanged from previous code) */}
        {personaldetailsdata.map((detail, index) => (
          <PersonalDetail key={index} detail={detail} />
        ))}
        <Button onClick={onUpdate}>Save</Button>
      </Box>
    </div>
  );
}

function setdatacolumns(userdata) {
    for (const { prop, name, default: defaultValue, type } of personaldetails) {
        const input = document.getElementById(`profile${name}`);
        if (input) {
            input.value = userdata[name] ? userdata[name] : defaultValue;
            input.type = type;
        } else {
            console.warn(`No detaillist input found with ID: profile${name}`);
        }
    }
}


function PersonalDetail({ detail }) {
  const inputId = `profile${detail.name}`;
  return (
    <div className="detaillist" key={detail.prop}>
      <label>{detail.prop}</label>
      <Input
        className="detailitem"
        variant={"filled"}
        type={detail.type}
        placeholder={detail.default}
        id={inputId}
      />
    </div>
  );
}


function SignIn() {
  return (
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
  );
}


export default function Signin() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userdata = await getuserdetailfromdb(user.uid);
        setdatacolumns(userdata); // Assuming setdatacolumns updates profile details
        setProfileImage(userdata.photo);
      } else {
        setUser(null);
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  function updatefirebaseuserdata() {
    let userdetails = {}
    userdetails["photo"] = profileImage;
    console.log(profileImage);
    personaldetails.forEach(detail => {
        userdetails[detail.name] = document.getElementById("profile" + detail.name).value;
    });
    savedatatodb("users/" + user.uid, userdetails);
}

const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // Handle no file selection

    try {
        const imageUrl = await uploadImageToStorage(user.uid, file);
        setProfileImage(imageUrl); 
        updatefirebaseuserdata(); 

    } catch (error) {
        console.error("Error uploading image:", error);
        alert("error in uploading image: " + error.message)
    }
};

  return (
    <div>
      {user ? (
        <UserProfile
          user={user}
          profileImage={profileImage}
          onUpdate={() => {
            handleImageChange();
            updatefirebaseuserdata();
          }} 
        />
      ) : (
        <SignIn />
      )}
    </div>
  );
}
