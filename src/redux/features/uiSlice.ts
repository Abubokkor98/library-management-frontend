import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isLoading: boolean;
  error: string | null;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
  };
}

const initialState: UiState = {
  isLoading: false,
  error: null,
  toast: {
    message: '',
    type: 'info',
    show: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.toast = {
        ...action.payload,
        show: true,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const { setLoading, setError, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;