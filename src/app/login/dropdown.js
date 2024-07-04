import { useState } from 'react';
import { Select, Input, Button } from '@chakra-ui/react';

const selectableData = {
  locationlist: ["Mumbai", "Chennai", "Bangalore"],
  nativelocationlist: ["Kodumb", "Palakkad"],
};


const RenderDropdown = (props) => {
    let detail = props.detail
  const initialOptions = selectableData[detail.options]
  const [options, setOptions] = useState(initialOptions);
  const [newOption, setNewOption] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption)) {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      selectableData[detail.options] = updatedOptions;
      setNewOption('');
      setShowInput(false);
    }
  };

  return (
    <>
      <Select
        className="detailitem"
        variant="filled"
        placeholder={detail.default}
        id={"profile" + detail.name}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </Select>
      {/* {showInput ?(
        <Button onClick={() => setShowInput(true)}>Add new {detail}</Button>
      ):
      <Button onClick={() => setShowInput(true)}>Add new {detail}</Button>
    } */}
    </>
  );
};

export default RenderDropdown;
