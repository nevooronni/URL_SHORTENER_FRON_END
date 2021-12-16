import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

const httpV2 = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API_ENDPOINT,
});
  
const urlFetchKeys = {
  shortUrls: 'shortUrls',
};

export const fetchAllUrls = async () => {
  const response = await httpV2.get(`/url/all`);
  return response.data;
};

export const useAllUrls = () =>
  useQuery(
    [urlFetchKeys?.shortUrls],
    fetchAllUrls,
  );

export const createShortUrl = async payload => {
  const response = await httpV2.post(`/url`, {
    ...payload,
  });
  return response;
};

export const useCreateShortUrlQuery = () => {
  const queryClient = useQueryClient();

  return useMutation(createShortUrl, {
    onSuccess: data => {
      const { status } = data;
      console.log("🚀 ~ file: index.js ~ line 30 ~ useCreateShortUrlQuery ~  data",  data)
      toast({
        title: 'Success',
        description: data?.data?.message || 'Your request was successful!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      if (status === 200) {
        queryClient.invalidateQueries(urlFetchKeys?.shortUrls);
      }
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.response.data?.message || 'An error occured while making the request',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
};