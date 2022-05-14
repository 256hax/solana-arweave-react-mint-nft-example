import { Box, TextField, Button } from '@mui/material';
import { attributesType, handleOnChangeType, removeFieldType } from '../../types/metadata';

export const Attributes = (props: any) => {

  const handleAttributesChange: handleOnChangeType = (event, index) => {
    let data = [...props.stateValue];
    data[index][event.target.name] = event.target.value;
    props.stateSetValue(data);
  };

  const addAttributes = () => {
    let emptyValue: attributesType = {
      type: '',
      value: '',
    }

    props.stateSetValue([...props.stateValue, emptyValue])
  };

  const removeAttributes: removeFieldType = (index) => {
    let data = [...props.stateValue];
    data.splice(index, 1)
    props.stateSetValue(data)
  };

  return (
    <Box>
      {props.stateValue.map((value: attributesType, index: number) => {
        return (
          <Box key={index} sx={{ m: 1 }}>
            <TextField
              name='type'
              label='Type'
              onChange={event => handleAttributesChange(event, index)}
              value={value.type}
            />
            <TextField
              name='value'
              label='Value'
              onChange={event => handleAttributesChange(event, index)}
              value={value.value}
            />
            <Button color="primary" onClick={() => removeAttributes(index)}>Remove</Button>
          </Box>
        )
      })}
      <Box>
        <Button color="primary" onClick={addAttributes}>Add</Button>
      </Box>
    </Box>
  );
}
