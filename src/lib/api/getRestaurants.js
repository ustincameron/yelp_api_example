import axios from 'axios';

export const getRestaurants = async (requestParams) => {
   const apiURL = `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_API_URL}businesses/search`;
   try {
      const { data } = await axios.get(apiURL, {
         params: {
            ...requestParams,
         },
         headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
            "Content-type": "application/json",
         }
      }
      );
      return data;
   } catch (error) {
      console.error(error);
   }
};
