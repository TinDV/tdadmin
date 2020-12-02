<template>
  <div id="app">
    <a-card title="VS.Logs">
      <a-space size="middle" slot="extra">
        <a-select
          :default-value="typeSelected"
          style="width: 120px"
          @change="handleTypeChange">
          <a-select-option value="vs">
            VS
          </a-select-option>
          <a-select-option value="other">
            Other
          </a-select-option>
        </a-select>
        <a-button
          type="danger"
          size="default"
          icon="plus"
          :loading="loading"
          @click="createVs">
            Create
        </a-button>
      </a-space>
      <div class="card-content">
        <h3>Total: <a-badge :count="data.length" /></h3>
        <a-table :columns="columns" :data-source="data" rowKey='id' bordered>
          <template slot="operation" slot-scope="text, record">
            <a-space size="small">
              <a-button type="primary" icon="edit" size="small"></a-button>
              <a-button type="danger" icon="delete" size="small" @click="deleteVs(record.id)"></a-button>
            </a-space>
          </template>
          <span slot="types" slot-scope="text, record">
            <a-tag :color="record.type === 'vs' ? 'geekblue' : 'green'">{{ record.type | capitalize }}</a-tag>
          </span>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    scopedSlots: { customRender: 'types' },
  },
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Note',
    dataIndex: 'note',
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      data: [],
      columns,
      typeSelected: 'vs',
      loading: false
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get(process.env.VUE_APP_API_URL)
        .then(res => {
          this.data = res.data;
        })
    },
    handleTypeChange(value) {
      this.typeSelected = value
    },
    createVs() {
      this.loading = true
      const params = {
        type: this.typeSelected,
        time: moment().format("HH:mm:ss"),
        date:  moment().format("DD/MM/YYYY"),
        note: "OK"
      }
      setTimeout(() => {
        axios
        .post(`${process.env.VUE_APP_API_URL}/create-vs`, params)
        .then(res => {
          if(res) {
            this.loading = false
            this.$toasted.success('Create success !!!', {
              position: 'bottom-right',
              duration: 1500,
              keepOnHover: true,
              iconPack: 'custom-class',
              icon: "fa fa-check"
            })
            this.getData()
          }
        })
      }, 500);
    },
    deleteVs(id) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/delete-vs/${id}`)
        .then(res => {
          if(res) {
            this.$toasted.success('Delete success !!!', {
              position: 'bottom-right',
              duration: 1500,
              keepOnHover: true,
              iconPack: 'custom-class',
              icon: "fa fa-trash-o"
            })
            this.getData()
          }
        })
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>

</style>
