import { createAsyncThunk } from '@reduxjs/toolkit'

export const refreshTokenAction = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { rejectValue: { message: string } }
>('user/refreshToken', async (_, { rejectWithValue }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
      },
    },
  )
  const data = await response.json()
  if (!response.ok) {
    return rejectWithValue(data.message)
  }
  return { accessToken: data.access_token, refreshToken: data.refresh_token }
})
