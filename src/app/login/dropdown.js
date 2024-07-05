import React, { useState, useEffect, useCallback } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { savedatatodb, getdatafromdb } from '@/lib/firebase';
import { useColorMode, useTheme } from '@chakra-ui/react';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const createOptionsFromArray = (array) => array.map(createOption);

function RenderDropdown({ detail, userdata, handleChange }) {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const optionname = detail.name;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getdatafromdb('otherdata/locationdata');
      if (data) {
        const fetchedOptions = createOptionsFromArray(
          data[optionname === 'location' ? 'locationlist' : 
               optionname === 'nativelocation' ? 'nativelocationlist' :
               optionname === 'profession' ? 'professionlist' :
               'specializationlist']
        );
        setOptions(fetchedOptions);
      } else {
        // Initialize the data if not present
        const initialData = {
          locationlist: [],
          nativelocationlist: [],
          professionlist: [],
          specializationlist: [],
        };
        savedatatodb('otherdata/locationdata', initialData);
        setOptions([]);
      }
    };

    fetchData();
  }, [optionname]);

  const printUpdatedLocations = (locations) => {
    console.log('Updated locations:', locations.map((loc) => loc.label));
  };

  const handleCreate = useCallback(
    (inputValue) => {
      setIsLoading(true);
      setTimeout(() => {
        const newOption = createOption(inputValue);
        setIsLoading(false);
        setOptions((prev) => {
          const newOptions = [...prev, newOption];
          printUpdatedLocations(newOptions);
          const updatedData = newOptions.map((option) => option.label);
          const dataKey = optionname === 'location' ? 'locationlist' :
                          optionname === 'nativelocation' ? 'nativelocationlist' :
                          optionname === 'profession' ? 'professionlist' :
                          'specializationlist';
          getdatafromdb('otherdata/locationdata').then((data) => {
            const newData = { ...data, [dataKey]: updatedData };
            savedatatodb('otherdata/locationdata', newData);
          });

          return newOptions;
        });
        handleChange(detail.name, inputValue); 
      }, 1000);
    },
    [optionname, handleChange, detail.name]
  );

  const handleSelectChange = (newValue) => {
    handleChange(detail.name, newValue ? newValue.label : '');
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.white,
      borderColor: colorMode === 'dark' ? theme.colors.gray[600] : theme.colors.gray[300],
      color: colorMode === 'dark' ? theme.colors.white : theme.colors.gray[900],
    }),
    menu: (provided) => ({
      ...provided,
      background: colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.white,
      color: colorMode === 'dark' ? theme.colors.white : theme.colors.gray[900],
    }),
    input: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? theme.colors.white : theme.colors.gray[900],
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? theme.colors.white : theme.colors.gray[900],
    }),
    placeholder: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? theme.colors.gray[400] : theme.colors.gray[500],
    }),
  };

  const customComponents = {
    Input: (props) => (
      <components.Input
        {...props}
        id={'profile' + detail.name}
      />
    ),
  };

  return (
    <CreatableSelect
      className="detailitem"
      styles={customStyles}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleSelectChange}
      onCreateOption={handleCreate}
      options={options}
      components={customComponents}
      placeholder={userdata[detail.name]}
    />
  );
}

export default React.memo(RenderDropdown);