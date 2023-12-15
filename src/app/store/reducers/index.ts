import { combineReducers } from "redux";
import playersSliceReducer from "./playersSlice";
import snackbarSliceReducer from "./snackbarSlice";

const reducers = combineReducers({
    players: playersSliceReducer,
    snackbar: snackbarSliceReducer,
});

export default reducers;

