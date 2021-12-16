import React from 'react';
import {
  HStack,
  VStack,
  Text,
  Button,
  Input,
  Image,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  createStandaloneToast,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form';
import { useCreateShortUrlQuery, useAllUrls } from './Data';
import urlBackgroundimage from '../assets/url_shortener.png';
import urlImage from '../assets/cropped_link_image.jpeg';

const UrlCard = ({ longUrl, shortUrl }) => {
  const toast = createStandaloneToast();

  const copyToClipBoard = async shortUrl => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: 'Success',
        description: 'Copied!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <HStack
      maxW='610px'
      w='full'
      justify='space-between'
      background='white'
      p={4}
      borderRadius='6px'
      boxShadow='0px 10px 20px #0000000D'

    >
      <Text isTruncated maxW='300px' fontSize='sm'>
        {longUrl || '-'}
      </Text>
      <Text color='#2c96df' fontSize='sm' isTruncated maxW='150px'>
        {shortUrl || '-'}
      </Text>
      <Button
        color='#2c96df'
        background='white'
        border='1px solid #2c96df'
        _hover={{
          background: '#2c96df',
          color: 'white'
        }}
        onClick={() => {
          // window.open(shortUrl, '_blank')
          copyToClipBoard(shortUrl)
        }}
      >
        copy
      </Button>
    </HStack>
  );
};

function UrlShortener() {
  //USE FORM VARIABLES
  const {
    handleSubmit,
    errors,
    control,
    watch,
    reset,
  } = useForm({
    mode: 'onTouched',
  });
  
  const watchUrl = watch('url');
  

  //QUERIES
  const urls = useAllUrls();
  const data = urls?.data?.urls;
  const listData = data?.length > 0 ? data.slice().reverse() : [];
  const createShortUrl = useCreateShortUrlQuery();

  function submit(formData) {
    createShortUrl.mutate(formData, {
      onSuccess: data => {
        console.log("🚀 ~ file: index.js ~ line 73 ~ submit ~ data?.success", data?.success)
        if (data?.status === 200) reset({ url: '' });
      }
    });
  };
  
  return (
    <VStack w='full'>
      <HStack w='full' justify='center' p={10} background='white'>
        <Image
          src={urlImage}
          width='70px'
          height='70px'
          borderRadius='50px'
        />
        <Text fontSize='24px' color='#2281c2' fontWeight='bold'>
          URL SHORTENER
        </Text>
      </HStack>
      <HStack
        w='full'
        // background='#2c96df'
        px={10}
        py={16}
        backgroundImage={`url(${urlBackgroundimage}), linear-gradient(85deg,#2c96df -1%,#2c96df 0,#8355e1)`}
      >
        <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
          <HStack w='100%' justify='center'>
            <FormControl
              isRequired
              isInvalid={errors?.url}
              isDisabled={urls?.isLoading}
              maxW='400px'
            >
              <Controller
                name='url'
                control={control}
                render={({ field }) =>
                  <Input
                    {...field}
                    background='white'
                    placeholder='Enter Url you want shortened'
                    isDisabled={urls?.isLoading}
                  />
                }
              />
              <FormErrorMessage>
                <FormErrorIcon />
                {errors?.url?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              variant='solid'
              type='submit'
              w='200px'
              border='1px solid white'
              background={createShortUrl?.isLoading ? 'white' : '#2c96df'}
              color={createShortUrl?.isLoading ? '#2c96df' : 'white'}
              _hover={{
                background: 'white',
                color: '#2c96df'
              }}
              loadingText='Shortening...'
              isDisabled={urls?.isLoading}
              isLoading={createShortUrl?.isLoading}
            >
                Shorten Url
            </Button>
          </HStack>
        </form>
      </HStack>
      <VStack
        w='full'
        // maxH='480px'
        // overflowY='scroll'
        background='#f9f9fa'
        px={10}
        py={16}
        spacing={3}
      >
        {listData?.length > 0 ? listData.map(url => (
          <UrlCard longUrl={url?.longUrl} shortUrl={url?.shortUrl} />
        )) : null}
      </VStack>
    </VStack>
  );
}

export default UrlShortener;
