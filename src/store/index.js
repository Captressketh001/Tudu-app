import {createStore} from "vuex";

export default createStore({
    state:{
        todo:[]
    },
    mutations:{
        setTodo(state, todo){
            state.todo = todo
        },
        addTodo(state, todo){
            state.todo.push(todo)
        },
        deleteTodo(state, id){
            state.todo = state.todo.filter(list => list.id != id)
        },

       
         // let total = 0
                
            // getters.cartProducts.forEach(product => {
                
            //   total  += product.price * product.quantity
            // })
            // return total
            // return getters.cartProducts.reduce((total, product) => total + product.discounted_price * product.quantity, 0)

    },
    actions:{
        fetchTodo(context, data){
            context.commit('setTodo', data)
        },
        pushTodo(context, todo){
            
            context.commit('addTodo', todo)
        },
        doDelete(context, id){
            context.commit('deleteTodo', id)
        },
        addTo(context, data){
            localStorage.setItem("todoItem", JSON.stringify(data));
            context.commit('setTodo', data)
        }
    },
    getters:{
        remainder(state){
            return state.todo.reduce(
                    (total, todo) => (todo.completed ? total : total + 1),
                    0
                  );
        },
        alltodos(){
           return JSON.parse(localStorage.getItem("todoItem"));
        }
    //    allTodos: (state) => state.todo,
//        remainder = () =>
//   baseTodos.value.reduce(
//     (total, todo) => (todo.completed ? total : total + 1),
//     0
//   );
    }

})