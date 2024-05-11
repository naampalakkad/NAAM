"use client"
import { React, useEffect,  useState } from "react";
import {
    auth,
    signInoutWithGoogle,
    savedatatodb,
    getuserdetailfromdb,
    uploadImageToStorage,
    getImageUrlFromStorage,
  } from "@/lib/firebase";
import './login.css';
import { Box, Heading, Image, Button, Input, Tooltip, Card } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { personaldetailsdata } from "../homepage/data";
export default function signin() {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null); 
    let personaldetails = personaldetailsdata

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            const userdata = await getuserdetailfromdb(user.uid);
            setdatacolumns(userdata); // Assuming setdatacolumns updates profile details
    
            // Fetch profile image URL from storage
            const imageUrl = await getImageUrlFromStorage(user.uid);
            console.log( "profile pic url",imageUrl);
            setProfileImage(imageUrl || user.photoURL); // Use Google photo URL as default if no profile image exists
          } else {
            setUser(null);
            setProfileImage(null); // Clear profile image state when user signs out
          }
        });
    
        return () => unsubscribe();
      }, [auth]);

      function setdatacolumns(userdata) {
        for (const { prop, name, default: defaultValue, type } of personaldetails) {
          const input = document.getElementById(`profile${name}`);
          if (input) {
            input.value = userdata[name]? userdata[name]: defaultValue;
            input.type = type;
          } else {
            console.warn(`No detaillist input found with ID: profile${name}`);
          }
        }
      }

    function updatefirebaseuserdata() {
        let userdetails = {}
        userdetails["photo"]=document.getElementById("profileimagebox").src;
        console.log(document.getElementById("profileimagebox").src);
        personaldetails.forEach(detail => {
            userdetails[detail.name] = document.getElementById("profile" + detail.name).value;  
        });
    }
 
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // Handle no file selection
    
        try {
          const imageUrl = await uploadImageToStorage(user.uid, file);
          setProfileImage(imageUrl); // Update profile image state with uploaded URL
          console.log(`Image URL: ${imageUrl}`);
          updatefirebaseuserdata();
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle image upload errors (e.g., display notification)
        }
      };

    return (
        user ? (
            <div className="cardcontainer">
              <Card className="profilebox">
                  <Image
                    src={profileImage || user.photoURL} // Display profile image or default to Google photo URL
                    className="profileimage"
                    id="profileimagebox"
                    alt={user.displayName}
                  />
               <input type="file" onChange={handleImageChange}/>
                <p>{user.displayName}</p>
                <p>{user.email}</p>
                <Button onClick={signInoutWithGoogle}>Sign out</Button>
              </Card>
              <Box spacing={4} className="infobox">
                {/* Personal details section (unchanged from previous code) */}
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
                <Button onClick={updatefirebaseuserdata}>Save</Button>
              </Box>
            </div>
          ) :  (
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