import React, { useCallback } from 'react';
import { Box, Input, Textarea, Button, Heading, Grid, Card, FormControl, FormErrorMessage, FormLabel,Switch  } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";
import RenderDropdown from './dropdown';

const DetailsSection = ({ personaldetailsdata, updateFirebaseUserData, userdata, handleChange, errors }) => {
  const renderInput = useCallback((detail) => (
    <Input
      variant="filled"
      type={detail.type}
      placeholder={detail.default}
      id={"profile" + detail.name}
      value={userdata[detail.name] || ''}
      onChange={(e) => handleChange(detail.name, e.target.value)}
    />
  ), [userdata, handleChange]);

  const renderTextarea = useCallback((detail) => (
    <Textarea
      variant="filled"
      placeholder="Tell us about yourself..."
      borderRadius="md"
      resize="vertical"
      height="150px"
      id={"profile" + detail.name}
      value={userdata[detail.name] || ''}
      onChange={(e) => handleChange(detail.name, e.target.value)}
    />
  ), [userdata, handleChange]);

  const renderSwitch = useCallback((detail) => (
    <label>
      <Switch 
        colorScheme='teal' 
        size='lg'
        id={"profile" + detail.name}
        isChecked={userdata[detail.name] || false}
        onChange={(e) => handleChange(detail.name, e.target.checked)}
      />
    </label>
  ), [userdata, handleChange]);

  const renderDropdown = useCallback((detail) => (
    <RenderDropdown detail={detail} userdata={userdata} handleChange={handleChange} />
  ), [userdata, handleChange]);

  return (
    <Card
      p={3}
      m={1}
      textAlign="left"
      borderRadius="md"
      boxShadow="sm"
      w={{ base: '100%', md: '55%' }}
    >
      <Heading as="h4" size="lg" align="center" mb={4}>Edit your Details</Heading>
      {personaldetailsdata.map((detail, index) => (
        <FormControl key={index} isInvalid={errors && errors[detail.name]}>
          <Grid key={index} templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={2} mb={2}>
            <FormLabel as="label" htmlFor={"profile" + detail.name} fontWeight="bold">{detail.prop}</FormLabel>
            <Box>
              {detail.type === "textarea" && renderTextarea(detail)}
              {detail.type === "selectable" && renderDropdown(detail)}
              {detail.type === "checkbox" && renderSwitch(detail)}
              {!["textarea", "selectable", "select", "checkbox"].includes(detail.type) && renderInput(detail)}
              <FormErrorMessage>{errors && errors[detail.name]}</FormErrorMessage>
            </Box>
          </Grid>
        </FormControl>
      ))}
      <Button mt={2} colorScheme="blue" leftIcon={<FaSave />} onClick={updateFirebaseUserData}>
        Save
      </Button>
    </Card>
  );
};

export default DetailsSection;
