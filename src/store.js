import Vue from "vue"
import Vuex from "vuex"
// import axios from "axios"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        atcountries : ['AT', 'BE', 'BG', 'CH', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'HR', 'HU', 'IT', 'LU', 'LT', 'LV', 'MC', 'NL', 'PL', 'PT', 'RO', 'SE', 'SK', 'SI'],
        countries : ['AD','AL','AM','AT','AZ','BA','BE','BG','BY','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GE','GR','HR','HU','IS','IT','LI','LT','LU','LV','MC','MD','ME','MK','MT','NL','NO','PL','PT','RO','RU','RS','SE','SI','SK','TR','UA','IE'],
    
    },
    mutations : {
        initData(state, countries){
            state.countries = countries
        },
        addData(state,country){
            state.countries.push(country)
        },
        updateData(state,country){
            let index = state.countries.findIndex(c => c.id == country.id)
            if(index > -1){
                state.countries[index] = country
            }
        },
        deleteData(state,country){
            let index = state.countries.findIndex(c => c.id == country.id)
            if(index > -1){
                state.countries.splice(index,1)
            }
        }
    },
    actions : {
        // initData(context){
        //     axios.get("http://dummy.restapiexample.com/api/v1/employees")
        //     .then(response => {
        //         context.commit('initData', response.data.data)
        //         console.log(response)
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })
        // },
        // addData(context, employee){
        //     context.commit('addData', employee)
        // },
        // updateData(context, employee){
        //     context.commit('updateData', employee)
        // },
        // deleteData(context, employee){
        //     context.commit('deleteData', employee)
        // }
    },
    getters : {

        getCountries(state){
            return state.countries
        },
        getAtCountries(state){
            return state.atcountries
        }
    }
})
