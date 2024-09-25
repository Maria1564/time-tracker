import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
            return rejectWithValue("")
        }
    }

)

//изменение данных пользователя
export const changeInfoUser = createAsyncThunk<Pick<IUser, "id"|"login">, {login? : string, password?: string}, {rejectValue: string}>(
    "user/changeInfoUser",
    async(valuesForm, {rejectWithValue}) => {
        try{
            const {data} = await axios.patch<Pick<IUser, "id"|"login">>("http://localhost:5000/user/account", valuesForm)

            return data
        }catch(err){
            return rejectWithValue("Не удалось сохранить изменённые данные")
        }
    }
)

//изменение аватарки пользователя
export const updateUserAvatar = createAsyncThunk<Pick<IUser, "id"|"pathAvatar">, FormData, {rejectValue: string} >(
    "user/updateUserAvatar",
    async(formData, {rejectWithValue})=>{
        try {
            const {data} = await axios.post<Pick<IUser, "id"|"pathAvatar">>("http://localhost:5000/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })

              return data
        } catch (err) {
            return rejectWithValue("Не удалось изменить аватарку")
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
        },
        logOut: (state, action: PayloadAction<{isAuth: boolean, infoUser: null}>) =>{
            state.isAuth = action.payload.isAuth
            state.infoUser = action.payload.infoUser
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
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string  ;
                state.loading = false;
            })
            
            .addCase(registerUser.pending,  (state)=>{
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action)=> {
                state.infoUser = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
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
            .addCase(getInfoUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(changeInfoUser.pending,  (state)=>{
                state.error = null
                state.loading = true
            })
            .addCase(changeInfoUser.fulfilled, (state, action)=> {
                if(action.payload.login){
                    if(state.infoUser){
                        state.infoUser.login = action.payload.login
                    }
                }
                state.loading = false
            })
            .addCase(changeInfoUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(updateUserAvatar.pending, (state)=>{
                state.error = null
                state.loading = true
            })
            .addCase(updateUserAvatar.fulfilled, (state, action)=>{
                state.loading = false
                if(state.infoUser){
                    state.infoUser.pathAvatar = action.payload.pathAvatar
                }
            })
            .addCase(updateUserAvatar.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload as string
            })
    }

})


export default userSlice.reducer
export const {clearError, logOut} = userSlice.actions
