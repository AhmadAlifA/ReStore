import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";

interface OrderState {
    order: Order | null;
    status: string;
}

const initialState: OrderState = {
    order: null,
    status: 'idle'
};

export const fetchOrderstAsync = createAsyncThunk<Order, number>(
    'orders/fetchOrderstAsync' ,
    async (Id, thunkAPI) => {
        try {
            return await agent.Orders.fetch(Id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderItems(state, action: PayloadAction<Order>) {
        state.order = action.payload;
        },
    }
});

export const { setOrderItems } = orderSlice.actions;
