import React, { useEffect, useState } from 'react';
import { savedatatodb, updateprofilepic, getdatafromdb } from "@/lib/firebase";
import { Flex, useToast, Modal, ModalOverlay, Heading, ModalContent, ModalHeader, Center, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formerrors, setFormErrors] = useState({});

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
            setIsModalOpen(true);
          }
          setVerifiedProfile(false);
        }
        setUserdata(userdataa);
        setProfileImage(userdataa.photoURL);
      } else {
        console.error("user not available");
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
    let errors = {};
    if(userdata.name == "") {
      errors.name = "Name is required";
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userdata.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userdata.email)) {
      errors.email = "Invalid email format";
    }
  
    // Validate batch
    const batch = Number(userdata.batch);
    if (!userdata.batch) {
      errors.batch = "Batch number is required";
    } else if (isNaN(batch)) {
      errors.batch = "Batch number must be a number";
    } else if (batch <= 0) {
      errors.batch = "Batch number must be greater than 0";
    } else if (batch >= 100) {
      errors.batch = "Batch number must be less than 100";
    }
  
    // // Validate phone number
    // const phoneRegex = /^\d{10}$/;
    // if (!userdata.number) {
    //   errors.number = "Phone number is required";
    // } else if (!phoneRegex.test(userdata.number)) {
    //   errors.number = "Phone number must be a 10-digit number";
    // }
  
    // // Validate alternate phone number
    // if (userdata.alternate && !phoneRegex.test(userdata.alternate)) {
    //   errors.alternate = "Alternate phone number must be a 10-digit number";
    // }
  
    // Validate roll number
    const rollNumber = Number(userdata.rollno);
    if (!userdata.rollno) {
      errors.rollno = "Roll number is required";
    } else if (isNaN(rollNumber)) {
      errors.rollno = "Roll number must be a number";
    } else if (rollNumber < 0) {
      errors.rollno = "Roll number must be greater than 0";
    } else if (rollNumber >= 10000) {
      errors.rollno = "Roll number must be less than 10000";
    }
  
    // Validate LinkedIn URL
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z0-9]{2,6})(:[0-9]{1,5})?(\/.*)?$/;
    if (userdata.linkedIn && !urlRegex.test(userdata.linkedIn)) {
      errors.linkedIn = "Invalid LinkedIn URL format";
    }
  
    // Validate Facebook URL
    if (userdata.facebook && !urlRegex.test(userdata.facebook)) {
      errors.facebook = "Invalid Facebook URL format";
    }

  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
    if (validateData(userdata)) {
      try {
        await savedatatodb((verifiedProfile ? "approvedUsers/" : "users/") + user.uid, userdata);
        toast({
          title: "Profile updated.",
          description: "Your profile information has been saved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEditing(false); // Hide details section after saving
        setIsModalOpen(false); // Close the modal after saving
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
    } else {
      const errorMessages = Object.values(formerrors).map((error, index) => `${index + 1}. ${error}`).join("  \n");
      toast({
        title: 'Invalid Data Entered',
        description: <pre>{errorMessages}</pre>,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
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
            errors={formerrors}
          />
        )}
      </Flex>
      <Modal size={"full"} isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Heading size="xl">Complete Your Profile to Login</Heading>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection="column">
              <DetailsSection
                personaldetailsdata={personaldetailsdata}
                updateFirebaseUserData={updateFirebaseUserData}
                userdata={userdata}
                handleChange={handleChange}
                errors={formerrors}
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignedInBox;
