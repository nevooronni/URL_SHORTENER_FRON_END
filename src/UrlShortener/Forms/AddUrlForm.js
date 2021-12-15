import React from 'react';
import { HStack, VStack, Text, Button, Input } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form';

function AddUrlForm() {
  //USE FORM VARIABLES
  const { handleSubmit, errors, control, reset, formState } = useForm();

  return (
    <HStack w='100%' as='form' justify='center'>
      <Controller
        name='name'
        control={control}
        rules={{
          required: 'This is a required field',
        }}
        render={({ onChange, name, onBlur, value }) => (
          <Input
            maxW='400px'
            name={name}
            onBlur={onBlur}
            value={value}
            background='white'
            placeholder='Enter Url you want shortened'
            onChange={onChange}
          />
        )}
      />
      <Button
        variant='solid'
        type='submit'
        w='200px'
        border='1px solid white'
        background='transparent'
        color='white'
        _hover={{
          background: 'white',
          color: '#2c96df'
        }}
        // isDisabled={submitIsDisabled}
        // isLoading={isLoading}
        loadingText='Shortening...'
      >
          Shorten Url
      </Button>
    </HStack>
  );
}

export default AddUrlForm;
 