<template>
<div>
  <header></header>
  <main>
    <div class="todo-body">
      <div class="todo-header">
         <h1>TODO</h1>
        <!-- <img src="/images/icon-sun.svg" alt="">  -->
        <div>
          <label for="toggle"></label>
         <input type="checkbox" name="" id="slider" @change="toggleTheme">
        </div>
        
      </div>
      <div class="todo-input">
        {{this.$store.getters.alltodos}}
        <span>
          <!-- <img src="/images/icon-check.svg" alt="" style="text-align:center"> -->
        </span>
        <input type="text" placeholder="Create a new todo..." v-model="todoItem" @keyup.enter = "addToDo(todoItem)" required>
      </div>
      <!-- <div class="todo-tasks" v-if="fetchTodo ==''" style="height:80px">
        <p style="text-align:center" >Your Todo List is empty</p>
      </div> -->

      <div class="todo-container">
        <draggable :fetchTodo = fetchTodo>
        <transition-group name="list">
        <div class="todo-tasks" v-for="(todo, ix) in fetchTodo" :key="ix" >
          <input type="checkbox" name="" id="" v-model="todo.completed">
          <p v-if="todo.completed" ><s>{{todo.text}}</s></p>
          <p v-else>{{todo.text}}</p>
          <img src="/images/icon-cross.svg" alt="" @click="removeTodo(todo.id)">
        </div>
        
          </transition-group>
        </draggable>
        <!-- <div class="todo-tasks" @drop="drop(event)" @dragover="allowDrop(event)">
          
        </div> -->
         <div class="todo-state">
          <p>{{remainder()}} items left</p>
          <div class="todo-active">
            <p @click="addToFilter('all')" :class="{active:isActive  =='all'}">All</p>
            <p @click="addToFilter('active')" :class="{active:isActive  =='active'}">Active</p>
            <p @click="addToFilter('completed')" :class="{active:isActive  =='completed'}">Completed</p>
          </div>
           <p @click="clearCompleted">Clear Completed</p>
         </div> 
      </div>
      <footer>Drag and drop to reorder Tasks</footer>
      
    </div>
  </main>
</div>
  
</template>

<script>

import { v4 } from 'uuid';
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  name: 'App',
  components:{
    draggable: VueDraggableNext,
  },
  data (){
    return{
      todoItem:'',
      filtered:'',
      enabled: true,
      dragging:false,
      isActive: 'all'
    }
  },
  computed:{
    fetchTodo(){
      let x  = this.$store.state.todo
      if (this.filtered == '' ){
        return x
      } 
      else{
      return x.filter(list => {
        
				if (this.filtered == 'active') {
          this.isActive = 'active'
					return !list.completed;
				}
				else if (this.filtered == 'completed'){
          this.isActive = 'completed'
					return list.completed;
				}
        else{
          this.isActive = 'all'
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
      this.$store.dispatch('AddTo', this.$store.state.todo)
      
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
    remainder(){
      return this.$store.getters.remainder
    },
    clearCompleted() {
      Array.prototype.removeWhere = function (callback) {
        var i = this.length;
        while (i--) {
          if (callback(this[i], i)) {
            this.splice(i, 1);
          }
        }
      };
     this.$store.state.todo.removeWhere((val) => val.completed);
    },
    setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    },
    toggleTheme() {
      if (localStorage.getItem('theme') === 'theme-dark') {
            this.setTheme('theme-light');
      } 
      else {
            this.setTheme('theme-dark');
      }
    },
    setThemeNow () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        this.setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        this.setTheme('theme-dark');
        document.getElementById('slider').checked = true;
    }
    }
  },
  mounted(){
      this.setThemeNow()
  }
}
</script>

<style scoped>

</style>
