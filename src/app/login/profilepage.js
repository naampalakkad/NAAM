import React, { useEffect, useState } from 'react';
import { savedatatodb, updateprofilepic, getdatafromdb } from "@/lib/firebase";
import { Flex, useToast } from "@chakra-ui/react";
import ProfileSection from './profilesection';
import DetailsSection from './detailsection';
import ProfileDetails from './detailsdisplay';
import { personaldetailsdata } from "@/lib/data";

const SignedInBox = ({ user }) => {
  const toast = useToast();
  const [userdata, setUserdata] = useState({});
  const [profileImage, setProfileImage] = useState(user.photoURL);
  const [editing, setEditing] = useState(false);
  const [verifiedProfile, setVerifiedProfile] = useState(false);

  useEffect(() => {
    const setuserdetails = async () => {
      if (user) {
        setProfileImage(user.photoURL);
        let userdataa = await getdatafromdb('approvedUsers/' + user.uid);
        if (userdataa) {
          setVerifiedProfile(true);
        } else {
          userdataa = await getdatafromdb('users/' + user.uid);
          if (!userdataa) {
            userdataa = {
              name: "",
              email: "",
              batch: "",
              number: "",
              alternate: "",
              rollno: "",
              linkedIn: "",
              facebook: "",
              location: "",
              nativelocation: "",
              profession: "",
              specialization: "",
              about: "",
              phoneperm: "",
              photoURL: user.photoURL,
            };
          }
          setVerifiedProfile(false);
        }
        setUserdata(userdataa);
        setProfileImage(userdataa.photoURL);
      } else {
        console.log("user not available");
      }
    };
    setuserdetails();
  }, [user]);

  const handleChange = (name, value) => {
    setUserdata((prevUserdata) => ({
      ...prevUserdata,
      [name]: value,
    }));
  };

  const validateData = (userdata) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userdata.email)) {
      errors.email = "Invalid email format";
    }
    const batch = Number(userdata.batch);
    if (isNaN(batch) || batch <= 0 || batch >= 100) {
      errors.batch = "Enter a valid batch name";
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userdata.number)) {
      errors.number = "Invalid phone number format";
    }
    if (userdata.alternate && !phoneRegex.test(userdata.alternate)) {
      errors.alternate = "Invalid alternate phone number format";
    }
    const rollNumber = Number(userdata.rollno);
    if (isNaN(rollNumber) || rollNumber <= 0 || rollNumber >= 10000) {
      errors.rollno = "Enter a valid JNV roll number";
    }
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9]{2,6})(:[0-9]{1,5})?(\/.*)?$/;
    if (userdata.linkedIn && !urlRegex.test(userdata.linkedIn)) {
      errors.linkedIn = "Invalid LinkedIn URL";
    }
    if (userdata.facebook && !urlRegex.test(userdata.facebook)) {
      errors.facebook = "Invalid Facebook URL";
    }

    return Object.keys(errors).length > 0 ? errors : true;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const newImageUrl = await updateprofilepic(user.uid, file);
        setProfileImage(newImageUrl);
        setUserdata((prevUserdata) => ({
          ...prevUserdata,
          photoURL: newImageUrl,
        }));
        savedatatodb((verifiedProfile ? "approvedUsers/" : "users/") + user.uid, {
          ...userdata,
          photoURL: newImageUrl,
        });
        toast({
          title: "Success",
          description: "Changed your profile image",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error changing profile image:', error);
        toast({
          title: "Error",
          description: "Failed to change your profile image",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const updateFirebaseUserData = async () => {
    const validationResult = validateData(userdata);
    if (validationResult !== true) {
      const errorMessages = Object.keys(validationResult)
        .map((key, index) => `${index + 1}. ${validationResult[key]}`).join("  \n");
      toast({
        title: 'Invalid Data Entered',
        description: <pre>{errorMessages}</pre>,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      try {
        savedatatodb((verifiedProfile ? "approvedUsers/" : "users/") + user.uid, userdata);
        toast({
          title: "Profile updated.",
          description: "Your profile information has been saved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEditing(false); // Hide details section after saving
      } catch (error) {
        console.error('Error updating profile:', error.message);
        toast({
          title: "Error updating profile.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      w={"90vw"}
    >
      <ProfileSection
        user={user}
        profileImage={profileImage}
        handleImageChange={handleImageChange}
        verified={verifiedProfile}
        onEdit={toggleEdit}
      />
      {!editing && <ProfileDetails personaldetailsdata={personaldetailsdata} userdata={userdata} verifiedProfile={verifiedProfile} />}
      {editing && (
        <DetailsSection
          personaldetailsdata={personaldetailsdata}
          updateFirebaseUserData={updateFirebaseUserData}
          userdata={userdata}
          handleChange={handleChange}
        />
      )}
    </Flex>
  );
};

export default SignedInBox;
