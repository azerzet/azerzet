Vue.component('togglebutton', {
    props: ['label', 'name'],
    template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">{{ label }}</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
  </div>`,
    model: {
        prop: 'checked',
        event: 'change'
    },
    data: function() {
        return {
            isactive: false
        }
    },
    methods: {
        onToogle: function() {
            this.$emit('clicked', this.isactive)
        }
    }
});

var todolist = new Vue({
    el: '#todolist',
    data: {
        newitem: '',
        sortByStatus: false,
        todo: [
            { id: 1, label: "learn English B1", done: false },
            { id: 2, label: "career ios-engineer", done: false },
        ]
    },
    methods: {
        addItem: function() {
            this.todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false });
            this.newitem = '';
        },
        markAsDoneOrUndone: function(item) {
            item.done = !item.done;
        },
        deleteItemFromList: function(item) {
            let index = this.todo.indexOf(item)
            this.todo.splice(index, 1);
        },
        clickontoogle: function(active) {
            this.sortByStatus = active;
        }
    },
    computed: {
        todoByStatus: function() {

            if (!this.sortByStatus) {
                return this.todo;
            }

            var sortedArray = []
            var doneArray = this.todo.filter(function(item) { return item.done; });
            var notDoneArray = this.todo.filter(function(item) { return !item.done; });

            sortedArray = [...notDoneArray, ...doneArray];
            return sortedArray;
        }
    }
});
