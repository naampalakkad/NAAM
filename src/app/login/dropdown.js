import React, { useState, useCallback } from 'react';
import CreatableSelect from 'react-select/creatable';

const selectedlocationdata = {
  locationlist: ['Mumbai', 'Chennai', 'Banglore'],
  nativelocationlist: ['Kodumb', 'Palakkad', 'Chittur', 'Mundur']
};

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const createOptionsFromArray = (array) => array.map(createOption);

const locationlist = createOptionsFromArray(selectedlocationdata.locationlist);
const nativelocationlist = createOptionsFromArray(selectedlocationdata.nativelocationlist);

function RenderDropdown({ detail }) {
  const optionname = detail.name;
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(detail.default);
  const [options, setOptions] = useState(
    optionname === "location" ? locationlist : nativelocationlist
  );

  const printUpdatedLocations = (locations) => {
    console.log('Updated locations:', locations.map(loc => loc.label));
  };

  const handleCreate = useCallback((inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => {
        const newOptions = [...prev, newOption];
        printUpdatedLocations(newOptions);
        return newOptions;
      });
      setValue(newOption);
    }, 1000);
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
    printUpdatedLocations(options);
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      id={"profile" + detail.name}
    />
  );
}

export default React.memo(RenderDropdown);
