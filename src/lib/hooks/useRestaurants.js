import { useQuery } from 'react-query';
import { getRestaurants } from '../api/getRestaurants';

const useRestaurants = (requestParams) => {
  const result = useQuery('restaurantResults', () => getRestaurants(requestParams), {
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });
  return result;
};

export default useRestaurants;
