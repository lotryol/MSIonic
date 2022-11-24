<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>M-S</ion-title>
          <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end" expand="block" @click="mostrar" class="boton">
          <ion-button>
          <ion-icon name="log-in-outline"></ion-icon>Cerrar Sesion
          </ion-button>
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
                    <h2>Perfil empresarial</h2>
                    <h1>{{ Nombre_Empresa }}</h1>
                    <ion-text color="medium">
                      <h2>Nombre de la organización</h2>
                    </ion-text>
                    <h1>{{Nit_Empresa}}</h1>
                    <ion-text color="medium">
                      <h2>Nit de la empresa</h2>
                    </ion-text>
                    <h1>{{Correo_Electronico}}</h1>
                    <ion-text color="medium">
                      <h2>Correo electronico de la empresa</h2>
                    </ion-text>
                    <h1>{{Direccion_Empresa}}</h1>
                    <ion-text color="medium">
                      <h2>Dirección de la empresa</h2>
                    </ion-text>
                    <h1>{{Numero_Telefonico}}</h1>
                    <ion-text color="medium">
                      <h2>Telefono</h2>
                    </ion-text>
                    <h1>{{Nombre_Encargado}}</h1>
                    <ion-text color="medium">
                      <h2>Encargado</h2>
                    </ion-text>
                    <h1>{{Cargo_Encargado}}</h1>
                    <ion-text color="medium">
                      <h2>Cargo del encargado</h2>
                    </ion-text>

                  </ion-label>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-button expand="block" @click="mostrar">analizar</ion-button>
                </ion-list>
              </ion-card-content>
              <ion-card-content>
                <ion-list>
                  <ion-button expand="block" @click="grafico">Visualizar Graficos</ion-button>
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
  IonText,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonBackButton,
  IonIcon
 
} from "@ionic/vue";
import { defineComponent } from "vue";
import router from "@/router";
import app from "../dbfirebase/initFirebase";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import {onMounted,  onActivated} from "vue"
export default defineComponent({
    name: "ProfilePage",
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
        IonText,
        IonCardHeader,
        IonCardContent,
        IonCard,
        IonCol,
        IonRow,
        IonGrid,
        IonBackButton,
        IonIcon
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
    },
    methods:{
      //print cookie
      async mostrar(){
        const aux = document.cookie;
        const aux2 = aux.toString();

          const db = getFirestore(app);
          const docRef = doc(db, "usuario", aux2);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.Nombre_Empresa = docSnap.data().nombre;
            this.Nit_Empresa = docSnap.data().nit;
            this.Correo_Electronico = docSnap.data().email;
            this.Direccion_Empresa = docSnap.data().direccion;
            this.Numero_Telefonico = docSnap.data().telefono;
            this.Nombre_Encargado = docSnap.data().encargado;
            this.Cargo_Encargado = docSnap.data().cargo;
          } else {
            console.log("No such document!");
          }

      },
      grafico(){
        router.push('/graficos')
      }
    }
}); 
</script>

<style>
.perfil{
  text-align: center;
}
.boton{
    /** primary **/
    --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;

  /** secondary **/
  --ion-color-secondary: #3dc2ff;
  --ion-color-secondary-rgb: 61, 194, 255;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #36abe0;
  --ion-color-secondary-tint: #50c8ff;

  /** tertiary **/
  --ion-color-tertiary: #5260ff;
  --ion-color-tertiary-rgb: 82, 96, 255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255, 255, 255;
  --ion-color-tertiary-shade: #4854e0;
  --ion-color-tertiary-tint: #6370ff;

  /** success **/
  --ion-color-success: #2dd36f;
  --ion-color-success-rgb: 45, 211, 111;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255, 255, 255;
  --ion-color-success-shade: #28ba62;
  --ion-color-success-tint: #42d77d;

  /** warning **/
  --ion-color-warning: #ffc409;
  --ion-color-warning-rgb: 255, 196, 9;
  --ion-color-warning-contrast: #000000;
  --ion-color-warning-contrast-rgb: 0, 0, 0;
  --ion-color-warning-shade: #e0ac08;
  --ion-color-warning-tint: #ffca22;

  /** danger **/
  --ion-color-danger: #eb445a;
  --ion-color-danger-rgb: 235, 68, 90;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade: #cf3c4f;
  --ion-color-danger-tint: #ed576b;

  /** dark **/
  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34, 36, 40;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255, 255, 255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  /** medium **/
  --ion-color-medium: #92949c;
  --ion-color-medium-rgb: 146, 148, 156;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255, 255, 255;
  --ion-color-medium-shade: #808289;
  --ion-color-medium-tint: #9d9fa6;

  /** light **/
  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244, 245, 248;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;
}
</style>