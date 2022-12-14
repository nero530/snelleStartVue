//import createPersistedState from "vuex-persistedstate";


import axios from "axios";


const state={

menukaart:[],
bestelling:[],
categorie:'alles',
totaal:'',
datum:'',
adres:{gemeente:'', straat:'',huisnummer:''}

}

const actions={
    menukaart({commit,getters}){
    console.log(getters.menukaart)
        if (JSON.parse(JSON.stringify(getters.menukaart)).length==0){
    
    axios.get('http://localhost:3001/gerecht/allegerechten')
.then(response=>{
commit('MENUKAART', response.data)
console.log('nieuwe kaart')}
//console.log(response)
        )}


    },
toevoegenAanBestelling({commit}, gerecht){


 commit('TOEVOEGENAANBESTELLING', gerecht)//;console.log(state.bestelling)
    

},
herbeginnen({commit}){

commit('HERBEGINNEN')



},
verwijderen({commit},gerecht){

commit('VERWIJDEREN',gerecht )



},

andereCategorie({commit},gerecht){

commit('ANDERECATEGORIE', gerecht)



},

tijd({commit},datum){
commit('TIJD',datum)


},
totaal({commit},totaal){
    commit('TOTAAL',totaal)
},

gemeente({commit},gemeente){
    commit('GEMEENTE', gemeente)
    console.log('gemeente:'+gemeente)

},
straat({commit},straat){
    commit('STRAAT', straat)
console.log('straat:'+straat)

},

huisnummer({commit},huisnummer){
    commit('HUISNUMMER', huisnummer)
console.log('huisnummer:'+huisnummer)

},


plaatsen({commit}, tijdEnTotaal){
console.log(tijdEnTotaal)
commit('TIJD', tijdEnTotaal.datum)
commit('TOTAAL', tijdEnTotaal.totaal)



},
/*async */bevestigen({commit,getters,rootGetters}/*, adres*/){
   console.log(adres)
 /*await commit('GEMEENTE', adres.gemeente)
 await commit('STRAAT', adres.straat)
 await commit('HUISNUMMER', adres.huisnummer)*/
const klant=rootGetters['Klant/klant']||''

console.log(getters.bestelling)
    axios({
        url: 'http://localhost:3001/bestelling/create',
        method:'post',
data:{
bestelling:getters.bestelling,
datum:getters.datum,
totaal: getters.totaal,
klant: klant,
adres:{gemeente:getters.adres.gemeente||klant.gemeente, straat:getters.adres.straat||klant.straat, huisnummer:getters.adres.huisnummer||klant.huisnummer}


}
}).then(()=>commit('GEMEENTE',''),commit('STRAAT',''), commit('HUISNUMMER',''), commit('HERBEGINNEN',''), commit('TIJD',''), commit('TOTAAL',0))
//defaulState







    }






}








const mutations={
MENUKAART(state,payload){
state.menukaart=payload
},
TOEVOEGENAANBESTELLING(state,payload){
    const indexBestelling=state.bestelling.findIndex(e=>e.naam==payload.naam)
if (indexBestelling ==-1){
    payload.aantal=1
//state.bestelling.push(payload)}
state.bestelling.splice(state.bestelling.length,0,payload)}
else{
  
  
state.bestelling[indexBestelling].aantal++
//console.log(indexBestelling)

//const indexMenukaart=state.menukaart.findIndex(e=>e.naam==payload.naam)
//state.menukaart[indexMenukaart].aantal++
}
}, 

HERBEGINNEN(state){
    state.menukaart= []
    state.bestelling=[]
console.log('In orde?')
},
VERWIJDEREN(state, payload){

const index=state.bestelling.findIndex(e=>e.naam==payload.naam)
console.log(index)
console.log(state.bestelling)
state.bestelling[index].aantal--
if (state.bestelling[index].aantal==0)
{state.bestelling.pop(state.bestelling[index])}

},


ANDERECATEGORIE(state,payload){
state.categorie=payload



},

TIJD(state, tijd){
state.datum=tijd;
console.log(state.datum)
},
ADRES(state, adres){

state.adres=adres


},

TOTAAL(state, totaal ){
state.totaal=totaal

},

GEMEENTE(state, gemeente ){
    state.adres.gemeente=gemeente
    console.log('gemeente:'+gemeente)
    },
    STRAAT(state, straat ){
        state.adres.straat=straat
        
        },   
  HUISNUMMER(state, huisnummer ){
state.adres.huisnummer=huisnummer
            
 }, 

}





const getters={
    
        menukaart: (state) => {return state.menukaart},
        bestelling: (state)=> { return state.bestelling},
        datum:(state) =>{return state.datum} ,  
        totaal:(state) =>{return state.totaal} ,    
        adres :(state) =>{return state.adres}, 
        categorie:(state) =>{return state.categorie}


    }

 const Bestelling = {
namespaced:true,
state,
actions,
mutations,
getters,



};

 export default Bestelling