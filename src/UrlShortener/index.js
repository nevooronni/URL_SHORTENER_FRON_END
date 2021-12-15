import React from 'react';
import { HStack, VStack, Text, Button, Input } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form';

const UrlCard = ({ longUrl, shorUrl }) => {
  return (
    <HStack
      maxW='610px'
      w='full'
      justify='space-between'
      background='white'
      p={3}
    >
      <Text>
        docs.google.com/document/d/1
      </Text>
      <Text color='#2c96df'>
        rb.gy/xhtapt
      </Text>
      <Button
        color='#2c96df'
        background='white'
        border='1px solid #2c96df'
        _hover={{
          background: '#2c96df',
          color: 'white'
        }}
      >
        copy
      </Button>
    </HStack>
  );
};

function UrlShortener() {
  //USE FORM VARIABLES
  const { handleSubmit, errors, control, reset, formState, watch } = useForm();
  console.log("🚀 ~ file: index.js ~ line 38 ~ UrlShortener ~ watch", watch());
  
  const data = [
    {
      id: 1,
      longUrl: 'docs.google.com/document/d/1',
      shortUrl: 'rb.gy/xhtaptiq'
    },
    {
      id: 2,
      longUrl: 'docs.google.com/document/d/2',
      shortUrl: 'rb.gy/xhtapt12'
    },
    {
      id: 3,
      longUrl: 'docs.google.com/document/d/4',
      shortUrl: 'rb.gy/xhtapt122'
    },
  ];



  return (
    <VStack w='full'>
      <HStack w='full' justify='center' p={10} background='white'>
        <Text fontSize='24px' color='#2281c2' fontWeight='bold'>
          URL SHORTENER
        </Text>
      </HStack>
      <HStack w='full' background='#2c96df' px={10} py={16}>
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
      </HStack>
      <VStack w='full' background='#f9f9fa' px={10} py={16} spacing={3}>
        {data?.length > 0 ? data.map(url => (
          <UrlCard longUrl={url?.longUrl} shortUrl={url?.shortUrl} />
        )) : null}
      </VStack>
    </VStack>
  );
}

export default UrlShortener;
