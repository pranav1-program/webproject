import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async (id: number) => {
  const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
  return data;
};

export const useFetchUser = (id?: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      if (id === undefined) {
        throw new Error('User ID is undefined');
      }
      return fetchUser(id);
    },
    enabled: !!id,
  });
};
