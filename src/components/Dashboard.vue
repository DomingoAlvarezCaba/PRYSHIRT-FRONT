<template>
  <div class="dashboard">
    <b-container>
      <h2 class="text-left pt-4">Welcome {{currentUserName}}</h2>
      <b-button class="login-button mt-2 mb-4 " v-b-modal.create-order-form>Create order</b-button>
      <b-modal id="create-order-form" size="lg" centered title="Add a product" hide-footer hide-header>
        <b-tabs class="login-tab" content-class="mt-3">
          <b-tab title="Create shirt" @click="resetAll()">
            <b-container class="centered-container">
              <b-row>
                  <b-col>
                      <b-form class="text-center">
                          <b-form-input v-model="discount" class="login-input mt-2" size="xl" placeholder="Discount"></b-form-input>
                          <b-form-input v-model="price" class="login-input mt-2" size="xl" placeholder="Price"></b-form-input>
                          <h3 class="form-errors text-left mt-1" v-if="priceError != '' ">{{priceError}}</h3>
                          <b-form-input v-model="color" class="login-input mt-2" size="xl" placeholder="Color"></b-form-input>
                          <h3 class="form-errors text-left mt-1" v-if="colorError != '' ">{{colorError}}</h3>
                          <b-form-input v-model="size" class="login-input mt-2" size="xl" placeholder="Size"></b-form-input>
                          <h3 class="form-errors text-left mt-1" v-if="sizeError != '' ">{{sizeError}}</h3>
                          <b-button @click="addProduct()" class="login-button mt-4 login-button">Add</b-button>
                          <b-toast id="product-toast" title="Shirt added">{{newProduct}}</b-toast>
                      </b-form>
                  </b-col>
              </b-row>
            </b-container>
          </b-tab>
          <b-tab title="Create order" @click="resetAll()">
            <b-container class="centered-container">
              <b-row>
                  <b-col>
                    <section v-if="newProducts.length > 0">
                      <p>Current shirts</p>
                      <p v-for="product in newProducts" :key="product.color">{{product}}</p>
                    </section>
                    <section v-else>
                      <p>There aren't any shirts</p>
                    </section>
                    <b-button @click="createOrder()" class="login-button mt-4 login-button">Create order</b-button>
                    <h3 class="mt-2" v-if="orderError != ''">{{orderError}}</h3>
                  </b-col>
              </b-row>
            </b-container>
          </b-tab>
        </b-tabs>
      </b-modal>
      <b-row>
        <b-col>
          <p>Orders</p>
          <b-table striped hover :fields="fields" :items="orders" @row-clicked="myRowClickHandler"></b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p v-if="currentRow.length > 0">Products</p>
          <b-table striped hover :items="currentRow"></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8081/pryshirt/'

    export default{
        data(){
            return{
                currentUserName: '',
                newProducts: [],
                newProduct: {},
                discount: '',
                price: '',
                color: '',
                size: '',
                priceError: '',
                colorError: '',
                sizeError: '',
                orderError: '',
                orders: [],
                currentRow: [],
                fields: [ 'id' , 'state', 'date', 'dateState', 'userId' ]
            }
        },
        mounted(){
          this.getOrders()
          this.setCurrentUserName()
        },
        methods: {
          setCurrentUserName(){
            this.currentUserName = this.$store.state.user.name
          },
          async getOrders(){
            await this.$store.dispatch('getOrders', this.$store.state.user.id).then(response => {
                this.orders = response
            })
          },
          resetInputs(){
            this.discount = ''
            this.price = ''
            this.color = ''
            this.size = ''
          },
          resetErrors(){
            this.priceError = ''
            this.colorError = ''
            this.sizeError = ''
            this.orderError = ''
          },
          resetAll(){
            this.resetInputs()
            this.resetErrors()
          },
          validateShirt(){
          },
          addProduct(){
            this.resetErrors()

            if(this.discount == ''){
              this.discount = 0.0
            }
            if(this.price == ''){
              this.priceError = 'Required'
            }
            if(this.color == ''){
              this.colorError = 'Required'
            }
            if(this.size == ''){
              this.sizeError = 'Required'
            }
            if(this.sizeError == '' && this.colorError == '' && this.priceError == ''){
              const shirt = { color: this.color, size: this.size }
              const product = { price: this.price, discount: this.discount, shirt: shirt}
              this.$bvToast.show('product-toast', true)
              this.newProduct = product
              this.newProducts.push(product)
            }
          },
          createOrder(){
            if(this.newProducts.length == 0){
              this.orderError = 'You must add at least one shirt'
            } else{
              const order = {
                  state: 'prueba',
                  userId: this.$store.state.user.id,
                  products: this.newProducts
              }
              axios.post('order', order)
                .then( response => {
                    this.$bvModal.hide('create-order-form')
                    this.orders.push(response.data)
                })
                .catch( e=> console.log(e))
              this.newProducts = []
            }
          },
          myRowClickHandler(record) {
            console.log(record)
            this.currentRow = record.products
          }
        }
    }
</script>