<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <data-table
      :columns="columns"
      :get-from-server="getFromServer"
      :on-row-click="onRowClick"
    >
      <div slot="table-actions">
        <button>print</button>
      </div>
      <div slot="table-actions-bottom">
        <button>export</button>
      </div>
      <div slot="emptystate">
        <p>There are no items at this time!</p>
      </div>
    </data-table>
  </div>
</template>

<script>
import DataTable from "./components/DataTable";
import Server from "./server";
export default {
  components: {
    DataTable
  },
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
          filterable: true
        },
        {
          label: "Age",
          field: "age",
          type: "number",
          filterable: true,
          filterOptions: {
            enabled: true,
            placeholder: "Filter by Age",
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "yyyy-MM-dd"
        },
        {
          label: "Percent",
          field: "score",
          type: "percentage"
        }
      ]
    };
  },
  methods: {
    getFromServer(params) {
      return new Promise(resolve => {
        const server = new Server(params);
        const data = server.getData();
        resolve(data);
      });
    },
    onRowClick(params) {
      // Note: you can access the row data using params.row
      console.log(params);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
