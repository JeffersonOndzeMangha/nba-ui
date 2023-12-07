import { getState } from "../store/store";

// A mock function to mimic making an async request for data
export const fetchPlayers = (search?: string, newMeta?: {
  [key: string]: string | number;
}) => {

  return new Promise<{data: any[], meta: any}>((resolve, reject) => {
    // Simulate a 3-second delay using setTimeout
    setTimeout(() => {
      fetch(`https://www.balldontlie.io/api/v1/players?${
        search ? `search=${search}` : ''
      }${
        newMeta ? `&${Object.keys(newMeta).map((key) => `${key}=${newMeta[key]}`).join('&')}` : ''
      }`)
        .then((response) =>
          response
            .json()
            .then((resp) => resolve(resp))
            .catch((error) => reject(error))
        );
    }, 1000); // to show the loading states
  });
};
