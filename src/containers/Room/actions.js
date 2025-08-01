import * as types from './constants';

export const fetchRooms = () => ({ type: types.FETCH_ROOMS });
export const fetchCinemas = () => ({ type: types.FETCH_CINEMAS });
export const createRoom = (data) => ({ type: types.CREATE_ROOM, payload: data });
export const updateRoom = (data) => ({ type: types.UPDATE_ROOM, payload: data });
export const deleteRoom = (id) => ({ type: types.DELETE_ROOM, payload: id });
export const setRooms = (rooms) => ({ type: types.SET_ROOMS, payload: rooms });
export const setCinemas = (cinemas) => ({ type: types.SET_CINEMAS, payload: cinemas });
export const showBeginEditModal = () => ({ type: types.SHOW_BEGIN_EDIT_MODAL });
export const showEndEditModal = () => ({ type: types.SHOW_END_EDIT_MODAL });
export const setBeginLoadingStatus = () => ({ type: types.SET_BEGIN_LOADING_STATUS });
export const setEndLoadingStatus = () => ({ type: types.SET_END_LOADING_STATUS });
export const setFailedMessage = (message) => ({ type: types.SET_FAILED_MESSAGE, payload: message });
export const setSuccessMessage = (message) => ({ type: types.SET_SUCCESS_MESSAGE, payload: message });
export const clearMessages = () => ({ type: types.CLEAR_MESSAGES});

