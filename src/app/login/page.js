"use client"
import { React, useEffect, useState } from "react";
import {
  auth,
  signInoutWithGoogle,
  savedatatodb,
  getuserdetailfromdb,
  uploadImageToStorage,
} from "@/lib/firebase";
import './login.css';
import { Box, Heading, Image, Button, Switch, Text, Input, Card } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { personaldetailsdata } from "../homepage/data";
export default function signin() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  let personaldetails = personaldetailsdata
  const [phonepermission, setPermission] = useState(false);

  const handlePermissionChange = () => {
    setPermission(!phonepermission);
  };

  const handleSave = () => {
    onUpdate(permission);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userdata = await getuserdetailfromdb(user.uid);
        setdatacolumns(userdata);

        const imageUrl = userdata.photo;
        console.log("profile pic url", imageUrl);
        setProfileImage(imageUrl);
      } else {
        setUser(null);
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

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

  function updatefirebaseuserdata() {
    let userdetails = {}
    userdetails["photo"] = profileImage;
    userdetails["phoneperm"]= phonepermission;
    personaldetails.forEach(detail => {
      userdetails[detail.name] = document.getElementById("profile" + detail.name).value;
    });
    savedatatodb("users/" + user.uid, userdetails);
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToStorage(user.uid, file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  // useEffect(() => {
  //   console.log(`profile Image URL after update: ${profileImage}`);
  // }, [profileImage]);
  useEffect(() => {
    if (profileImage) {
      updatefirebaseuserdata();
    }
  }, [profileImage]);

  return (
    user ? (
      <div className="cardcontainer">
        <Card className="profilebox">
          <div className="profileimagecontainer">
            <label htmlFor="profileImageInput" className="profileimage">
              <Image
                src={profileImage}
                id="profileimagebox"
                alt={user.displayName}
              />
              <span className="upload-icon">Upload</span>
            </label>
            <input
              type="file"
              id="profileImageInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <p>{user.displayName}</p>
          <p>{user.email}</p>
          <Button onClick={signInoutWithGoogle}>Sign out</Button>
        </Card>
        <Box spacing={4} className="infobox">
          {personaldetails.map((detail, index) => (
            <div className="detaillist" key={index}>
              <label>{detail.prop}</label>
              <Input
                className="detailitem"
                variant={"filled"}
                type={detail.type}
                placeholder={detail.default}
                id={"profile" + detail.name}
              />
            </div>
          ))}
          <Card direction={"row"} width={"90%"} align='center'>
            <Heading as='h6' size='xs' >
              Share your contact ? &nbsp; &nbsp;&nbsp; 
            </Heading>
            <Switch isChecked={phonepermission} onChange={handlePermissionChange} mr={2} />
            <Text>{phonepermission ? "Yes, display my phone number for others to see." : "No, I don't want to be contacted through phone."}</Text>
          </Card>
          <Button Button mt={4} colorScheme="blue" onClick={updatefirebaseuserdata}>Save</Button>
        </Box>
      </div>
    ) : (
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