 # Technical Design

 ## Component Breakdown:
 
 ### App Component:
 * The root component that renders the entire application.
 * Contains the header and the Players component.
 
 ### Players Component:
 * Displays a list of NBA players and a list of favorite players.
 * Utilizes Redux for state management.
 * Manages player data, including player list, filtered players, favorite players, and meta information.
 * Provides search functionality to filter players by name.
 * Implements pagination support to display a limited number of players per page.
 * Utilizes CSS Modules and in-line styles for styling isolation.
 * Implements responsive design for various screen sizes.
 * Utilizes a custom component library (material ui) and builds custom UI components for consistent and polished UI.
 
 ### PlayerCardList Component:
 * Displays a card with list of players in a table.
 * Receives a list of players as props.
 * Supports pagination for large player lists.
 * Allows adding and removing players from favorites.
 * Customizable title for the list.
  
 ### ErrorBoundary Component:
 * Wraps components that may throw errors.
 * Catches errors during rendering and displays a fallback UI.
 * Resets error state on page reload/refresh.
 
 ## State Management Architecture:

 ### Redux Store:
 * Utilizes @reduxjs/toolkit to create the Redux store.
 * Contains a players slice to manage player-related data, including player list, filtered players, favorite players, and meta information.
 * Handles API request status and error information.
 * Includes reducers and actions to modify player-related state.
 * Uses asynchronous actions (createAsyncThunk) for fetching player data from the API.
 * Implements an action to reset the error state on page reload/refresh.
 
 ### API Interaction:

 * API Service (playersAPI.ts):
 * Makes asynchronous requests to the NBA players API (https://www.balldontlie.io/api/v1/players).
 * Accepts optional parameters for searching and meta information.
 * Simulates a 1-second delay using setTimeout for a more realistic async request.
 
 ## Complex Features:
 
 ### Client-Side Caching:
 * Implement client-side caching to optimize API calls.
 * Cache player data to reduce redundant API requests.
 * Update the cache when new data is fetched.
 
 ### Error Handling:
 * Implemented error handling for API requests.
 * Displays error messages when API requests fail.
 * Implemented snackbar to use as dispatcher for errors or success messages
 
 ### Pagination:
 * Added pagination support to the player list.
 * Can display a limited number of players per page.
 * Allows users to navigate through pages.
 
 ### Search Functionality:
 * Provided a search bar for users to search for players by name.
 * Implement live filtering of players as the user types.
 * Reset the search filter when cleared.
 
 ### Styling and Responsiveness:
 * Use CSS Modules and in-line styles for styling.
 * Ensure responsive design to support various screen sizes.
 * Utilize a component library (material-ui) and built custom UI components.
