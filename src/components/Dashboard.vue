<template>
  <div class="dashboard">
    <b-container>
      <b-row>
        <b-col>
          <h2 class="text-center pt-4">Welcome {{$store.state.user.name}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :fields="fields" :items="orders" @row-clicked="myRowClickHandler"></b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="currentRow"></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default{
        data(){
            return{
                orders: '',
                ordersComplete: '',
                currentRow: '',
                fields: [ 'id' , 'state', 'date', 'dateState', 'userId' ]
            }
        },
        mounted(){
          this.getOrders()
        },
        methods: {
          async getOrders(){
            await this.$store.dispatch('getOrders', this.$store.state.user.id).then(response => {
                this.orders = response
                this.ordersComplete = response
                //  for (var i = 0; i < this.orders.length; i++) {
                //     delete this.orders[i].products
                // }
            })
          },
          myRowClickHandler(record) {
            console.log(record)
            this.currentRow = record.products
          }
        }
    }
</script>