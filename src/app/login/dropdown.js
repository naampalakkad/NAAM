import React, { useState, useEffect, useCallback } from 'react';
import CreatableSelect from 'react-select/creatable';
import { savedatatodb, getdatafromdb } from '@/lib/firebase';
import { useColorMode, useTheme } from '@chakra-ui/react';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const createOptionsFromArray = (array) => array.map(createOption);

function RenderDropdown({ detail }) {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const optionname = detail.name;
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(detail.default);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getdatafromdb('otherdata/locationdata');
      if (data) {
        const fetchedOptions = createOptionsFromArray(data[optionname === 'location' ? 'locationlist' : 'nativelocationlist']);
        setOptions(fetchedOptions);
      } else {
        // Initialize the data if not present
        const initialData = {
          locationlist: [],
          nativelocationlist: [],
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

          // Save updated options to Firebase
          const updatedData = newOptions.map((option) => option.label);
          const dataKey = optionname === 'location' ? 'locationlist' : 'nativelocationlist';
          getdatafromdb('otherdata/locationdata').then((data) => {
            const newData = { ...data, [dataKey]: updatedData };
            savedatatodb('otherdata/locationdata', newData);
          });

          return newOptions;
        });
        setValue(newOption);
      }, 1000);
    },
    [optionname]
  );

  const handleChange = (newValue) => {
    setValue(newValue);
    printUpdatedLocations(options);
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

  return (
    <CreatableSelect
      className="detailitem"
      styles={customStyles}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      id={'profile' + detail.name}
    />
  );
}

export default React.memo(RenderDropdown);