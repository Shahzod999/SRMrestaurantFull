import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import toast from "react-hot-toast";


interface Table {
  place: string;
  table: number;
}


// interface OrderedFood {
//   _id: string;
//   name: string;
//   price: number;
//   type: string;
//   amount: number;
//   portion: string;
//   table?: Table;// Делаем необязательным, если не всегда присутствует
//   orderTime?: string; // Делаем необязательным
// }


export interface OrderedFood {
  _id: string;
  amount: number;
  portion: number;
  [key: string]: any;
}
export interface TablePlace {
  place: string;
  table: number;
}
export interface OrderedFoodState {
  orderedFoods: OrderedFood[];
  choosenTable: TablePlace | null;
  totalCheck: Record<string, OrderedFood[]>; // Словарь, где ключ — тип еды, значение — массив OrderedFood


  orderNumber: number;
  orderedWaitingCards: any
}

const initialState: OrderedFoodState = {
  orderedFoods: JSON.parse(localStorage.getItem("order") || "[]"),
  choosenTable: JSON.parse(localStorage.getItem("choosenTable") || "null"),
  totalCheck: JSON.parse(localStorage.getItem("totalCheck") || "{}"),

  orderNumber: 0,
  orderedWaitingCards: JSON.parse(localStorage.getItem("orderedWaitingCards") || "[]"),
}


export const orderedFoodSlice = createSlice({
  name: "orderedFoods",
  initialState,
  reducers: {
    addOrderToFoodState: (state, action) => {
      const index = state.orderedFoods.findIndex((food) => food._id + food.portion === action.payload._id + action.payload.portion)


      if (index !== -1 && action.payload.amount > 0) {
        state.orderedFoods[index] = {
          ...state.orderedFoods[index],
          ...action.payload,
        };
      } else if (action.payload.amount > 0) {
        state.orderedFoods.push(action.payload);
      }
      state.orderedFoods.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem("order", JSON.stringify(state.orderedFoods))

      toast('Barakallah!', {
        icon: '👏',
      });
    },
    removeFoodfromOrder: (state, action) => {
      state.orderedFoods = state.orderedFoods.filter((item) => item._id + item.portion !== action.payload._id + action.payload.portion)
      localStorage.setItem("order", JSON.stringify(state.orderedFoods))
      toast.success('Food delete', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    },
    removeOrderFoodList: (state) => {


      if (state.orderedFoods.length > 0) {
        state.orderNumber++;
        // Группируем заказы из orderedFoods и добавляем информацию о выбранном столе
        const groupedFoods = state.orderedFoods.reduce((acc: Record<string, OrderedFood[]>, food) => {
          const key = food.type;

          if (!acc[key]) {
            acc[key] = state.totalCheck[key] ? [...state.totalCheck[key]] : [];
          }

          // Добавляем информацию о выбранном столе к каждому заказу
          acc[key].push({
            ...food,
            table: state.choosenTable || undefined,
            orderTime: new Date().toISOString(), // Время принятия заказа в формате ISO
          });

          return acc;
        }, {});

        // Объединяем новые сгруппированные заказы с уже существующими в totalCheck
        state.totalCheck = { ...state.totalCheck, ...groupedFoods };
        localStorage.setItem("totalCheck", JSON.stringify(state.totalCheck));
        //Группируем end


        // Add to orderedWaitingCards with the incremented order number
        state.orderedWaitingCards.push({
          orderNumber: state.orderNumber,
          foods: [...state.orderedFoods], // Copy of the current orders
          table: state.choosenTable || undefined,
          orderTime: new Date().toISOString(),
        });
        localStorage.setItem("orderedWaitingCards", JSON.stringify(state.orderedWaitingCards)); // Save to local storage
      }








      state.choosenTable = null;
      state.orderedFoods = [];
      localStorage.removeItem("order");
      localStorage.removeItem("choosenTable")
      toast.success('Food delete', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    },
    tableChoose: (state, action) => {
      state.choosenTable = action.payload
      localStorage.setItem("choosenTable", JSON.stringify(action.payload))
      toast('Table!', {
        icon: '🍴',
      });
    }
  }
})

export const selectedOrderedFoods = (state: RootState) => state.orderedFoods.orderedFoods
export const selectedTotalCheck = (state: RootState) => state.orderedFoods.totalCheck
export const selectedGuestTable = (state: RootState) => state.orderedFoods.choosenTable

export const selectedWaitingCards = (state: RootState) => state.orderedFoods.orderedWaitingCards

export const { addOrderToFoodState, removeFoodfromOrder, removeOrderFoodList, tableChoose } = orderedFoodSlice.actions
export default orderedFoodSlice.reducer