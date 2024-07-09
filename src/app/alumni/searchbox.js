import { personaldetailsdata } from "@/lib/data";
import React from 'react';
import {Box, Flex, Input, Button, Select} from "@chakra-ui/react";

const SearchBox = ({ searchTerm, setSearchTerm, formData, setFormData, optionsData }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleReset = () => {
      setSearchTerm("");
      setFormData({
        location: '',
        nativelocation: '',
        profession: '',
        specialization: '',
      });
    };
  
    const selectFields = personaldetailsdata.filter(field => field.type === 'selectable');
    console.log(selectFields)
  
    return (
      <Box>
        <Flex flexDirection="row" alignItems="center" gap={3} wrap="wrap" mb={4}>
          <Input
            placeholder="Search with Name or Batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            flex="1"
            padding={4}
            marginTop={2}
            size="lg"
          />
          <Button 
            colorScheme="red" 
            onClick={handleReset} 
            padding={4}
            marginTop={2}
            size="lg"
          >
            Clear
          </Button>
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={3} wrap="wrap">
          {selectFields.map((field, index) => (
            <Select
              key={field.name}
              placeholder={field.default}
              value={formData[field.name]}
              name={field.name}
              onChange={handleChange}
              flex="1"
              minWidth="200px"
              marginY={2}
            >
              {optionsData[field.options]?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          ))}
        </Flex>
      </Box>
    );
  };

  export default SearchBox;