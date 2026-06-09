import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '../../firebase';
import type { AppDispatch } from '../store';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Failed to log in'));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to log out'));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to log in';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to log out';
      });
  },
});

export const { setUser, setLoading, clearAuthError } = authSlice.actions;

export const startAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(currentUser));
    dispatch(setLoading(false));
  });

  return unsubscribe;
};

export default authSlice.reducer;
