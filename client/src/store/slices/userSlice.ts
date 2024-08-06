import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";
import axios from "../../axios";

type UserState = {
    infoUser: IUser | null,
    isAuth: boolean,
    error: string| null
}

//авторизация
export const loginUser = createAsyncThunk<IUser, {email: string, password: string}, {rejectValue: string}> (
    "user/loginUser",
    async(valuesForm, {rejectWithValue}) => {
        try {
            const {data} = await axios.post<IUser>("http://localhost:5000/auth/login", valuesForm)
            const {token, ...otherInfo} = data
            console.log("token ", token)
            console.log("otherInfo ", otherInfo)

            if(token) {
                localStorage.setItem("token", token)
            }

            return otherInfo
        } catch (error) {
            return rejectWithValue("Не удалось войти в учётный запись")
        }
    }
)

//регистрация
export const registerUser = createAsyncThunk<IUser, {login: string, email: string, password: string}, {rejectValue: string}>(
    "user/registerUser",
    async(valuesForm, {rejectWithValue})=>{
        try {
            const {data} = await axios.post<IUser>("http://localhost:5000/auth/register", valuesForm)
            console.log("data reg >> ", data)
            return data
        } catch (err) {
            return rejectWithValue("Не удалось создать новую учетную запись")
        }
    }
)

//информация о пользователе
export const getInfoUser = createAsyncThunk<IUser, null, {rejectValue: string}>(
    "user/getInfoUser",
    async(_, {rejectWithValue})=>{
        try {
            const {data} = await axios.get<IUser>("http://localhost:5000/auth/me")
            console.log("data getInf >> ", data)
            return data
        } catch (err) {
            return rejectWithValue("Не удалось войти")
        }
    }

)



const initialState: UserState = {
    infoUser: null,
    isAuth: false,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(loginUser.pending, (state)=>{
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.infoUser = action.payload
                state.isAuth = true
            })
            .addCase(registerUser.pending,  (state)=>{
                state.error = null
            })
            .addCase(getInfoUser.pending,  (state)=>{
                state.error = null
            })

            .addMatcher(logError, (state, action: PayloadAction<string>)=>{
                state.error = action.payload
                state.isAuth = false
            })
    }

})

const logError = (action: UnknownAction)=>{
    return action.type.endsWith("rejected")
}

export default userSlice.reducer
