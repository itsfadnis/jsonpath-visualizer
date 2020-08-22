import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyJSON, JSONPath, Base16ThemeName } from './types';
import { AppThunk } from './store';

type State = {
  isLoading: boolean;
  loadError: string;
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  paths: JSONPath[];
  theme: Base16ThemeName;
  view: string;
};

const initialState: State = {
  isLoading: false,
  loadError: '',
  query: '$..book[?(@.price<10)]',
  data: {
    store: {
      book: [
        {
          category: 'reference',
          author: 'Nigel Rees',
          title: 'Sayings of the Century',
          price: 8.95,
        },
        {
          category: 'fiction',
          author: 'Evelyn Waugh',
          title: 'Sword of Honour',
          price: 12.99,
        },
        {
          category: 'fiction',
          author: 'Herman Melville',
          title: 'Moby Dick',
          isbn: '0-553-21311-3',
          price: 8.99,
        },
        {
          category: 'fiction',
          author: 'J. R. R. Tolkien',
          title: 'The Lord of the Rings',
          isbn: '0-395-19395-8',
          price: 22.99,
        },
      ],
      bicycle: {
        color: 'red',
        price: 19.95,
      },
    },
  },
  paths: [],
  theme: 'monokai',
  view: 'tree',
};

const jsonSlice = createSlice({
  name: 'json',
  initialState,
  reducers: {
    getDataRequest(state): void {
      state.isLoading = true;
    },
    getDataSuccess(state, action: PayloadAction<AnyJSON>): void {
      state.isLoading = false;
      // Clear error if any
      if (state.loadError) {
        state.loadError = '';
      }
      // Reset query when new json is loaded
      if (state.query) {
        state.query = '';
      }
      // Default to tree view for new json
      if (state.view !== 'tree') {
        state.view = 'tree';
      }
      state.data = action.payload;
      state.paths = [];
    },
    getDataFailure(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.loadError = action.payload;
    },
    setQuery(state, action: PayloadAction<string>): void {
      state.query = action.payload;
    },
    setPaths(state, action: PayloadAction<JSONPath[]>): void {
      state.paths = action.payload;
    },
    setTheme(state, action: PayloadAction<Base16ThemeName>): void {
      state.theme = action.payload;
    },
    setView(state, action: PayloadAction<string>): void {
      state.view = action.payload;
    },
  },
});

export const {
  getDataRequest,
  getDataSuccess,
  getDataFailure,
  setQuery,
  setPaths,
  setTheme,
  setView,
} = jsonSlice.actions;

export const loadJSON = (file: File): AppThunk => (dispatch): void => {
  dispatch(getDataRequest());

  const reader = new FileReader();

  const onError = (err?: string): void => {
    dispatch(getDataFailure(err || 'Failed to read file'));
  };

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      try {
        dispatch(getDataSuccess(JSON.parse(reader.result)));
      } catch (e) {
        onError();
      }
    } else {
      onError();
    }
  };

  reader.onerror = () => {
    onError(reader.error ? reader.error.message : undefined);
    reader.abort();
  };

  reader.readAsText(file);
};

export default jsonSlice.reducer;
