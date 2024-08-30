import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IActivity } from "../../interfaces";
import axios from "../../axios";


type ActivityState = {
    listActivities: IActivity[]
    error: string| null,
    loading: boolean
}

//получение всех активностей пользователя
export const getActivities = createAsyncThunk<IActivity[], undefined, {rejectValue:string}>(
    "activities/getActivities",
    async(_, {rejectWithValue})=>{
        try {
           const {data} =  await  axios.get<IActivity[]>("http://localhost:5000/activities") 

           return(data)
        } catch (err) {
            return rejectWithValue("Не удалось получить список активностей")
        }
    }
)

//создание новой активности
export const createNewActivity = createAsyncThunk<IActivity, {idColor: number; nameNewActivity: string}, {rejectValue: string}>(
    "activities/createNewActivity",
    async(values, {rejectWithValue})=>{
        try{
            const {data} = await axios.post<IActivity>("http://localhost:5000/activities", values)
            
            return data
        }catch(err){
            return rejectWithValue("Не удалось создать новую активность")
        }
    }
)

//редактирование активности
export const editActivity = createAsyncThunk<IActivity, {idActivity: number, nameActivity: string, idColor: number}, {rejectValue:string}>(
    "activities/editActivity",
    async(values, {rejectWithValue})=>{
        try {
            const {data} = await axios.patch<IActivity>("http://localhost:5000/activities", values)

            return data
        } catch (err) {
            return rejectWithValue("Не удалось отредактировать активность")
        }   
    }
)

//TODO:Удаление активности

const initialState: ActivityState = {
    listActivities: [],
    error: null,
    loading: true
}

export const activitiesSlice = createSlice({
    name: "activities",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(getActivities.pending, (state)=>{
                state.listActivities = []
                state.error = null
                state.loading = true
            })
            .addCase(getActivities.fulfilled, (state, action)=>{
                state.loading = false
                state.listActivities = action.payload
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.error = action.payload!;
                state.loading = false;
            })

            .addCase(createNewActivity.pending, (state)=>{
                state.error = null
                state.loading = true
            })
            .addCase(createNewActivity.fulfilled, (state, action)=>{
                state.loading = false
                state.listActivities.push(action.payload)
            })
            .addCase(createNewActivity.rejected, (state, action) => {
                state.error = action.payload!;
                state.loading = false;
            })

            .addCase(editActivity.pending, (state)=>{
                state.error = null
                state.loading = true
            })
            .addCase(editActivity.fulfilled, (state, action)=>{
                state.loading = false
                state.listActivities = state.listActivities.map(elem=>{
                    if(elem.id === action.payload.id){
                        return action.payload
                    }
                    return elem
                })
            })
            .addCase(editActivity.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload!
            })
    }
})

export default activitiesSlice.reducer