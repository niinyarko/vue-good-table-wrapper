<template>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    mode="remote"
    @on-row-click="onRowClick"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange"
    :line-numbers="lineNumbers"
    :fixed-header="fixedHeader"
    :row-style-class="rowStyleClass"
    :isLoading.sync="isLoading"
    :totalRows="totalRecords"
    :pagination-options="{
      enabled: true,
      mode: 'records',
      perPage: 2
    }"
  >
    <div slot="table-actions">
      <slot name="table-actions"></slot>
    </div>
    <div slot="table-actions-bottom">
      <slot name="table-actions-bottom"></slot>
    </div>
    <div slot="emptystate">
      <slot name="emptystate"></slot>
    </div>
  </vue-good-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    getFromServer: {
      type: Function,
      required: true
    },
    onRowClick: {
      type: Function,
      required: true
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    lineNumbers: {
      type: Boolean,
      default: false
    },
    rowStyleClass: {
      type: Function,
      default: () => ""
    }
  },
  data() {
    return {
      serverParams: {
        columnFilters: {},
        sort: {
          field: "",
          type: ""
        },
        page: 1,
        perPage: 2 // set to whatever
      },
      totalRecords: 0,
      rows: [],
      isLoading: false
    };
  },
  created() {
    this.loadItems();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
      this.loadItems();
    },

    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.loadItems();
    },

    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },

    // load items is what brings back the rows from server
    loadItems() {
      this.isLoading = true;
      this.getFromServer(this.serverParams)
        .then(response => {
          this.isLoading = false;
          this.totalRecords = response.totalRecords;
          this.rows = response.rows;
        })
        .catch(e => {
          this.isLoading = false;
          console.log(e);
        });
    }
  }
};
</script>
