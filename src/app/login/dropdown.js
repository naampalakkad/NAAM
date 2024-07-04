import { Select } from "@chakra-ui/react";
const selectableData = {
  locationlist: ["Mumbai", "Chennai", "Bangalore"],
  nativelocationlist: ["Kodumb", "Palakkad"],
};


export default function RenderDropdown (props) {
    let detail = props.detail;
    const options = selectableData[props.detail.options];
    console.log(options)
  
  
    return (
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
    );
  };