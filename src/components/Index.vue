<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col 
            cols="12"
            sm="12"
            md="6">
            <v-form @submit.prevent="book">
            <v-card class="mx-auto" :elevation="12">
              <v-card-title
                color="light"
                flat>
                <p>Calculate price now</p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container fluid>
                  <v-row align="center">
                    <v-col
                      cols="12"
                      sm="2"
                    >
                      <v-autocomplete
                        :items="countries"
                        v-model="SLcountry"
                        label="Loading"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="5"
                      v-if="loadcombo"
                    >
                      <v-autocomplete
                        :items="Lpostcodes"
                        :item-text="getCountryText"
                        :item-value="getCountryValue"
                        v-model="SLpostcode"
                        @keyup="updateRegion"
                        label="Enter postcode/city"
                      ></v-autocomplete>

                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      v-if="!loadcombo"
                    >
                      <v-text-field
                        dense
                        label="Enter postcode"
                        v-model="Lpostcode"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      v-if="!loadcombo"
                      cols="12"
                      sm="3"
                    >
                      <v-text-field
                        dense
                        label="Enter city"
                        v-model="Lcity"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="5"
                    >
                      <span>Add loading address</span>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="2"
                    >
                      <v-autocomplete
                        :items="countries"
                        v-model="SUcountry"
                        label="Unloading"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="5"
                      v-if="loadcomboU"
                    >
                      <v-autocomplete
                        :items="Upostcodes"
                        :item-text="getCountryText"
                        :item-value="getCountryValue"
                        v-model="SUpostcode"
                        @keyup="updateRegionU"
                        label="Enter postcode/city"
                      ></v-autocomplete>

                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      v-if="!loadcomboU"
                    >
                      <v-text-field
                        dense
                        label="Enter postcode"
                        v-model="Upostcode"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      v-if="!loadcomboU"
                      cols="12"
                      sm="3"
                    >
                      <v-text-field
                        dense
                        label="Enter city"
                        v-model="Ucity"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="5"
                    >
                      <span>Add unloading address</span>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <p class="text-end">Total</p>
                      <p class="price text-end">{{total}} - EUR</p>
                      <p class="alt-price text-end">excl. {{vatrate*100}}% VAT Gross - {{exctotal}} EUR</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  
                color="#E72A50"
                class="send"
                dark
                type="submit"
                >Book transport</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>
import axios from "axios"
import Swal from "sweetalert2"
  export default {
    data: () => ({
      countries:[],
      atcountries:[],
      Lpostcodes:[],
      vatrate:'',
      SLpostcode:'',
      SLcountry:'DE',
      Lpostcode:'',
      Lcity:'',
      Upostcodes:[],
      SUpostcode:'',
      SUcountry:'DE',
      Upostcode:'',
      Ucity:'',
      total:'',
      exctotal:''
    }),

    methods : {
      updateRegion:function (e){
          axios.get(`https://interview.develop.zipmend.com/api/v3/cities/${this.SLcountry}/${e.target.value}`)
            .then(response => {
              this.Lpostcodes=response.data.data
            })
  
      },
      updateRegionU:function (e){
          axios.get(`https://interview.develop.zipmend.com/api/v3/cities/${this.SUcountry}/${e.target.value}`)
            .then(response => {
              this.Upostcodes=response.data.data
            })
  
      },
      getCountryText(item) {
          return `${item.zipCode} ${item.name}`;
      },
      getCountryValue(item) {
          return {zipCode:item.zipCode, name:item.name};
      },
      book(){
        if(this.formIsValid){
          axios.post('https://interview.develop.zipmend.com/api/v3/price',
          {
            "token":"tb7iVecOI1XQcj58346jN2bQJ8MrDG7YXwr4NXvS",
             "addresses": [
                  {
                      "country": this.SLcountry,
                      "zip": this.loadcombo ? this.SLpostcode.zipCode:this.Lpostcode,
                      "city": this.loadcombo ? this.SLpostcode.name:this.Lcity,
                  },
                  {
                      "country": this.SUcountry,
                      "zip": this.loadcomboU ? this.SUpostcode.zipCode:this.Upostcode,
                      "city": this.loadcomboU ? this.SUpostcode.name:this.Ucity,
                  }
              ]
          }
          )
            .then(response => {
              if(response.data.message=="Success!"){
                this.vatrate = response.data.data.vat_rate
                this.total = response.data.data.price
                this.exctotal = (this.total*(1+this.vatrate)).toFixed(2)
              }
              else{
                Swal.fire(
                  'Have any error',
                  '',
                  'error'
                )
              }
            })
        }
        else{
          Swal.fire(
              'Fill all inputs',
              '',
              'info'
          )
        }

      }
    },
    created(){
        this.countries = this.$store.getters.getCountries
        this.atcountries = this.$store.getters.getAtCountries

    },
    computed : {   
      formIsValid(){
        if(this.loadcombo && this.SLpostcode==''){
          return false
        }
        if(!this.loadcombo){
          if(this.Lcity=='' || this.Lpostcode=='')
            return false
        }
        if(this.loadcomboU && this.SUpostcode==''){
          return false
        }
        if(!this.loadcomboU){
          if(this.Ucity=='' || this.Upostcode=='')
            return false
        }

        return true

      },
      loadcombo(){
        if(this.atcountries.findIndex(c => c == this.SLcountry)>-1)
        return true

        return false
      },
      loadcomboU(){
        if(this.atcountries.findIndex(c => c == this.SUcountry)>-1)
        return true

        return false
      }
    },

  }
</script>
<style>
  p {
    font-weight: 570;
  }
  .price {
    font-size: 30px;
  }
  .alt-price {
    font-size: 15px;
  }
  .send{
    width: 100%;
    margin-bottom: 20px;
  }
</style>