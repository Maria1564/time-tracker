import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";
import axios from "../../axios";

type UserState = {
    infoUser: IUser | null,
    isAuth: boolean,
    error: string| null,
    loading: boolean
}

//авторизация
export const loginUser = createAsyncThunk<IUser, {login: string, password: string}, {rejectValue: string}> (
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
            return rejectWithValue("Неверный логин или пароль")
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
export const getInfoUser = createAsyncThunk<IUser, undefined, {rejectValue: string}>(
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
    error: null,
    loading: true
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state, action: PayloadAction<null>)=>{
            state.error = action.payload
        }
    },
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
            .addCase(registerUser.fulfilled, (state, action)=> {
                state.infoUser = action.payload
            })
            .addCase(getInfoUser.pending,  (state)=>{
                state.error = null
                state.loading = true
            })
            .addCase(getInfoUser.fulfilled, (state, action)=> {
                state.infoUser = action.payload
                state.isAuth = true
                state.loading = false
            })
            .addMatcher(logError, (state, action: PayloadAction<string>)=>{
                state.error = action.payload
                state.isAuth = false
                state.loading = false
            })
    }

})

const logError = (action: UnknownAction)=>{
    return action.type.endsWith("rejected")
}

export default userSlice.reducer
export const {clearError} = userSlice.actions
