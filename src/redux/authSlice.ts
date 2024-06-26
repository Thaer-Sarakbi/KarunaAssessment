import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { User } from '../types/types';

interface MyState {
  user: User | undefined
  status: string
}

export const setUser = createAsyncThunk("auth/setUser",async(user: User | any) => {
  let userData

  await firestore().collection('users').get()
  .then(querySnapshot => { 
    querySnapshot.docs.forEach(documentSnapshot => {
      if(user.email === documentSnapshot.data().email){
        userData = {
          id: documentSnapshot.id,
          email: documentSnapshot.data().email,
          password: documentSnapshot.data().password,
        }
      }
    });
  }).catch((e) => {
    console.log(e)
  })

  return userData
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    status: ''
  } as MyState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(setUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(setUser.fulfilled, (state, { payload }) => {
      state.status = 'succeeded'
      state.user = payload
    })
  }
})

export default authSlice