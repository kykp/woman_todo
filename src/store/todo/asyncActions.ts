import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchGames = createAsyncThunk<
//   Game[],
//   GameItem,
//   { rejectValue: string }
// >(
//   "games/fetchGames",
//   async (
//     {
//       platformId,
//       isDateSort,
//       isRatingSort,
//       isSortDirectionDec,
//       ordering,
//       page,
//       search,
//     },
//     { rejectWithValue, dispatch }
//   ) => {
//     const URL = generateNewUrl(
//       platformId,
//       isDateSort,
//       isRatingSort,
//       isSortDirectionDec,
//       ordering,
//       page,
//       search
//     );
//     const response = await asyncActionFetcherGames(URL);
//     if (!response.ok) {
//       return rejectWithValue(`server error`);
//     }
//     const data = await response.json();
//     dispatch(setSearchCounter({ counter: data.count }));
//     return data.results;
//   }
// );
