import { Player } from "../types/Player";

/**
 * Fetches a list of players from the BallDontLie API based on optional search parameters and metadata.
 *
 * @param {string} [search] - Optional search query for filtering players.
 * @param {object} [newMeta] - Optional metadata object for custom filtering.
 * @returns {Promise<{ data: Player[], meta: any }>} A Promise that resolves with player data and metadata.
 *
 * @throws {Error} If there's an error during the fetch operation.
 *
 * @example
 * // Fetch all players
 * fetchPlayers()
 *   .then((response) => {
 *     console.log(response.data); // List of players
 *     console.log(response.meta); // Metadata
 *   })
 *   .catch((error) => {
 *     console.error('Error fetching players:', error);
 *   });
 *
 * // Fetch players with a search query
 * fetchPlayers('LeBron James')
 *   .then((response) => {
 *     console.log(response.data); // List of players matching the search query
 *     console.log(response.meta); // Metadata
 *   })
 *   .catch((error) => {
 *     console.error('Error fetching players:', error);
 *   });
 *
 * // Fetch players with custom metadata
 * const customMetadata = { page: 1, per_page: 10 };
 * fetchPlayers(undefined, customMetadata)
 *   .then((response) => {
 *     console.log(response.data); // List of players based on custom metadata
 *     console.log(response.meta); // Custom metadata
 *   })
 *   .catch((error) => {
 *     console.error('Error fetching players:', error);
 *   });
 */
const fetchPlayers = (search: string | null, newMeta: {[key: string]: string | number}): Promise<{ data: Player[]; meta: any; }> => {
  return new Promise((resolve, reject) => {
    // Simulate a 1-second delay using setTimeout
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
    }, 1000); // To show the loading states
  });
};

export default fetchPlayers;

