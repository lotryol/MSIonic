<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>M-S</ion-title>
            <ion-buttons slot="start">
            <ion-back-button default-href="/profile"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>
                    <ion-label class="perfil">
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </ion-label>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-list>
                    <ion-button expand="block" @click="mostrar">Generar grafico</ion-button>
                  </ion-list>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCardTitle,
    IonButton,
    IonButtons,
    IonList,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonBackButton,
   
  } from "@ionic/vue";
  import { defineComponent } from "vue";
  //import AccountInfo from "../views/Login.vue";
  //import {  getFirestore,  collection,  getDocs,  doc,  setDoc,  getDoc,  QuerySnapshot,} from "firebase/firestore/lite";
  import router from "@/router";
  import app from "../dbfirebase/initFirebase";
  import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
  import {onMounted,  onActivated} from "vue"

import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers'

  export default defineComponent({
      name: "GrapicPage",
      components: {
          IonContent,
          IonHeader,
          IonPage,
          IonTitle,
          IonToolbar,
          IonLabel,
          IonCardTitle,
          IonButton,
          IonButtons,
          IonList,
          IonCardHeader,
          IonCardContent,
          IonCard,
          IonCol,
          IonRow,
          IonGrid,
          IonBackButton,
          
        },        
      data() {
          return {
            Nombre_Empresa: "",
            Nit_Empresa: "",
            Direccion_Empresa: "",
            Sector_Empresa: "",
            Nombre_Encargado: "",
            Cargo_Encargado: "",
            Correo_Electronico: "",
            Numero_Telefonico: "",
            Contrasena1: "",
            sesion: "",
          };
      },
      setup(){
        onMounted(() => {
          //console.log("onMounted")
      })
      },
      mounted(){
          //console.log("updated")
        },
        updated(){
          //console.log("updated")
        },
      methods:{
        //print cookie
        async mostrar(){
            const aux = document.cookie;
            const aux2 = aux.toString();
            const db = getFirestore(app);
            const docRef = doc(db, "usuario", aux2);
            const docSnap = await getDoc(docRef);

            const docRef1 = doc(db, "datos", "20500386")
            const docSnap1 = await getDoc(docRef1)

            const docRef2 = doc(db, "datos", "8320111376")
            const docSnap2 = await getDoc(docRef2)

            const docRef3 = doc(db, "datos", "9000699195")
            const docSnap3 = await getDoc(docRef3)

            const docRef4 = doc(db, "datos", "9005945201")
            const docSnap4 = await getDoc(docRef4)

            const docRef5 = doc(db, "datos", "9012515693")
            const docSnap5 = await getDoc(docRef5)


            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{

                        data: [{id: docSnap.data().nombre, nested:{ value:docSnap.data().puntajeTotal}, label:docSnap.data().name}, {id:'Blue',nested:{value:docSnap1.data().puntajeTotal}, label:'Blue'}, {id:'Yellow',nested:{ value:docSnap2.data().puntajeTotal}, label:'Yellow'}, {id:'Green',nested:{ value:docSnap3.data().puntajeTotal}, label:'Green'}, {id:'Purple',nested:{ value:docSnap4.data().puntajeTotal}, label:'Purple'}, {id:'Orange',nested:{ value:docSnap5.data().puntajeTotal}, label:'Orange'},],

                        label: [docSnap.data().nombre],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    parsing:{
                        xAxisKey: 'id',
                        yAxisKey: 'nested.value'
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
      }
  }); 
  </script>
  
  <style>
  .perfil{
    text-align: center;
  }
  </style>