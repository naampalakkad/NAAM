'use client'
import { useState, useEffect } from 'react';
import {
  Box, Button, Textarea, FormControl, FormLabel, VStack, Heading, Input, HStack, IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, checkuserrole } from "@/lib/firebase";
import { statistics, MenuItems } from "@/lib/data.js";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    statistics: statistics,
    MenuItems: MenuItems,
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const isUserAdmin = await checkuserrole('admin');
        setIsAdmin(isUserAdmin);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleChange = (e, key, index, field) => {
    const newData = { ...formData };
    newData[key][index][field] = e.target.value;
    setFormData(newData);
  };

  const handleAdd = (key) => {
    const newData = { ...formData };
    newData[key].push({}); // Assuming each item is an object
    setFormData(newData);
  };

  const handleDelete = (key, index) => {
    const newData = { ...formData };
    newData[key].splice(index, 1);
    setFormData(newData);
  };

  const handleSave = () => {
    // Implement save functionality to update the data in your storage (e.g., Firebase or local file)
    console.log('Data to be saved:', formData);
  };

  if (loading) return <Box>Loading...</Box>;

  if (!user) return <Box>Please sign in to access the admin panel.</Box>;

  if (!isAdmin) return <Box>Access Denied. You are not an admin.</Box>;

  return (
    <Box p={5} pt={'10vh'}>
      <Heading mb={5}>Admin Panel</Heading>
      <VStack spacing={4}>
        {Object.keys(formData).map((key) => (
          <Box key={key} w="100%">
            <FormControl id={key}>
              <FormLabel>{key}</FormLabel>
              {formData[key].map((item, index) => (
                <HStack key={index} mb={2}>
                  {Object.keys(item).map((field) => (
                    <Input
                      key={field}
                      name={field}
                      value={item[field]}
                      onChange={(e) => handleChange(e, key, index, field)}
                      placeholder={field}
                    />
                  ))}
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(key, index)}
                    colorScheme="red"
                  />
                </HStack>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => handleAdd(key)}
                colorScheme="teal"
              >
                Add {key.slice(0, -1)}
              </Button>
            </FormControl>
          </Box>
        ))}
        <Button onClick={handleSave} colorScheme="teal">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminPanel;
