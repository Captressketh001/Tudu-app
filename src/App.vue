<template>
<div>
  <header></header>
  <main>
    <div class="todo-body">
      <div class="todo-header">
        <h1>TODO</h1>
        <img src="/images/icon-sun.svg" alt="">
      </div>
      <div class="todo-input">
        <span>
          <!-- <img src="/images/icon-check.svg" alt="" style="text-align:center"> -->
        </span>
        <input type="text" placeholder="Create a new todo..." v-model="todoItem" @keyup.enter = "addToDo(todoItem)" required>
      </div>
      <div class="todo-tasks" v-if="fetchTodo ==''" style="height:80px">
        <p style="text-align:center" >Your Todo List is empty</p>
      </div>
      <div class="todo-container" v-else>
        <div class="todo-tasks" v-for="(todo, ix) in fetchTodo" :key="ix">
          <input type="checkbox" name="" id="" v-model="todo.completed">
          <p v-if="todo.completed" ><s>{{todo.text}}</s></p>
          <p v-else>{{todo.text}}</p>
          <img src="/images/icon-cross.svg" alt="" @click="removeTodo(todo.id)">
        </div>
         <div class="todo-state">
          <p>{{this.$store.state.todo.length}} left</p>
          <div class="active">
            <p @click="addToFilter('all')">All</p>
          <p @click="addToFilter(false)">Active</p>
          <p @click="addToFilter(true)">Completed</p>
          </div>
          <p @click="clearComplete">Clear Completed</p>
        </div> 
      </div>
      <footer>Drag and drop to reorder Tasks</footer>
      
    </div>
  </main>
</div>
  
</template>

<script>

import { v4 } from 'uuid';
export default {
  name: 'App',
  data (){
    return{
      todoItem:'',
      filtered:''
    }
  },
  computed:{
    fetchTodo(){
      let x  = this.$store.state.todo
      if (this.filtered == ''){
        return x
      } 
      else{
      return x.filter(list => {
        
				if (list.completed == this.filtered) {
					return list.completed == true;
				}
				else if (list.active == this.filtered && list.completed == false){
					return list.active == false;
				}
        else{
          return x
        }
      
			});
      }
    }
  },
  methods:{
    addToDo(item){
      let data = {
                id: v4(),
                text: item,
                active: true,
                completed: false,
            }
      this.$store.dispatch('pushTodo', data)
      this.todoItem = ''
    },
    addToFilter(data){
         this.filtered = data
    },
    removeTodo(id){
      this.$store.dispatch('doDelete', id)
      // this.$store.state.todo.forEach((i, index) => {
      //   if (i.id == id){
      //     this.$store.state.todo.splice(index, 1)
      //   }
      // })
    },
    clearComplete(){
      for(let x  in this.$store.state.todo){
        console.log('x', this.$store.state.todo[x].completed)
        if(this.$store.state.todo[x].completed){
          this.$store.state.todo.splice(x);
        }
        // console.log('x', this.$store.state.todo[x].completed)
      }
      // this.$store.state.todo.filter(i => {
      //   if(i.completed){
      //     // this.$store.state.todo.splice(i);
      //     console.log(typeof this.$store.state.todo)
      //     console.log('i see')
      //   
      // })
      
      // console.log(this.$store.state.todo)
    }
  }
}
</script>

<style scoped>

</style>
