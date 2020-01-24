// this is an example params that will be sent to the server
/* serverParams: {
  columnFilters: {
    age: 20, // i want you to filter the records by only those with age = 20
  },
  sort: {
    field: 'age', // sort the records by the age column
    type: 'asc' //  sort in ascending order
  },
  page: 1, // what page I want to show
  perPage: 10 // how many items I'm showing per page
} */

const database = [
  {
    id: 1,
    name: "John",
    age: 20,
    createdAt: "2011-10-19",
    score: 0.03343
  },
  {
    id: 2,
    name: "Jane",
    age: 24,
    createdAt: "2011-10-19",
    score: 0.03343
  },
  {
    id: 3,
    name: "Susan",
    age: 16,
    createdAt: "2011-10-18",
    score: 0.03343
  },
  {
    id: 4,
    name: "Chris",
    age: 55,
    createdAt: "2011-10-17",
    score: 0.03343
  },
  {
    id: 5,
    name: "Dan",
    age: 40,
    createdAt: "2011-10-16",
    score: 0.03343
  },
  {
    id: 6,
    name: "Kofi",
    age: 20,
    createdAt: "2011-10-22",
    score: 0.03343
  },
  {
    id: 7,
    name: "Prince",
    age: 23,
    createdAt: "2011-11-30",
    score: 0.03343
  },
  {
    id: 8,
    name: "Evans",
    age: 25,
    createdAt: "2011-11-01",
    score: 0.03343
  },
  {
    id: 9,
    name: "William",
    age: 28,
    createdAt: "2011-11-30",
    score: 0.03343
  },
  {
    id: 10,
    name: "James",
    age: 28,
    createdAt: "2011-11-12",
    score: 0.03343
  }
];

const R = require("ramda");

// Example server implementation
export default class Server {
  constructor(params) {
    this.params = params;
  }

  paginate(array, page_size, page_number) {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
  getData() {
    return new Promise(resolve => {
      setTimeout(() => {
        const filters = this.params.columnFilters;
        const isFilterable = Object.keys(filters).length > 0;
        let records = [];
        if (isFilterable) {
          const filterkey = Object.keys(filters)[0];
          records = database.filter(
            d => d[filterkey] === parseInt(filters[filterkey])
          );
        } else {
          records = database;
        }

        const sort = this.params.sort;
        const isSortable = Object.keys(sort).length > 0;

        if (isSortable) {
          records = R.sortBy(R.prop(sort.field), records);
          if (sort.type === "desc") {
            records = R.reverse(records);
          }
        }

        const data = {
          rows: this.paginate(records, this.params.perPage, this.params.page),
          totalRecords: isFilterable ? records.length : database.length
        };
        resolve(data);
      }, 1000);
    });
  }
}
