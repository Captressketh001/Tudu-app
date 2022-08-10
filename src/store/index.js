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
        }

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
        }
    },
    getters:{
       allTodos: (state) => state.todo
    }

})