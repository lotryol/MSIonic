<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Bienvenido a M-S</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
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
                  <ion-label>
                    <h2>Registro</h2>
                  </ion-label>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-label position="floating">Nombre de la empresa</ion-label>
                    <ion-input type="text" v-model="Nombre_Empresa"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Nit de la empresa</ion-label>
                    <ion-input type="text" v-model="Nit_Empresa"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Direccion</ion-label>
                    <ion-input type="text" v-model="Direccion_Empresa" placeholder=""></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Sector de la empresa</ion-label>
                    <ion-input type="text" v-model="Sector_Empresa"></ion-input>
                  </ion-item>
                  <!-- hasta aqui va la informacion de la empresa -->
                  <ion-item>
                    <ion-label position="floating">Nombre del encargado</ion-label>
                    <ion-input type="text" v-model="Nombre_Encargado"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Cargo que el encargado desempeña en la empresa</ion-label>
                    <ion-input type="text" v-model="Cargo_Encargado"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Correo electronico</ion-label>
                    <ion-input type="text" v-model="Correo_Electronico"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Número de celular o teléfono</ion-label>
                    <ion-input type="text" v-model="Numero_Telefonico"></ion-input>
                  </ion-item>
                  <!-- hasta aqui va la informacion del encargado -->
                  <ion-item>
                    <ion-label position="floating">Contraseña</ion-label>
                    <ion-input type="text" v-model="Contrasena1"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Confirmar Contraseña</ion-label>
                    <ion-input type="text" v-model="Contrasena2"></ion-input>
                  </ion-item>
                  <!-- hasta aqui va la informacion de las contraseñas-->
                </ion-list>
                <ion-button expand="block" @click="comparador">Registrar</ion-button>
                <ion-button expand="block" @click="login">Iniciar sesion</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="typescript">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCardTitle,
  IonCardHeader,
  IonItem,
  IonList,
  IonButtons,
  IonButton,
  IonCardContent,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonInput,
  alertController,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";

  import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc,
    QuerySnapshot,
  } from "firebase/firestore/lite";

import router from "@/router";
import app from "../dbfirebase/initFirebase";
//import sha256 from "js-sha256";
import * as forge from 'node-forge';
export default defineComponent({
  name: "RegisterPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCardTitle,
    IonCardHeader,
    IonItem,
    IonList,
    IonButtons,
    IonButton,
    IonCardContent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
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
      Contrasena2: "",
      err: "",
      eme: "",
    };
  },
  methods: {
    async registrar() {
      const db = getFirestore(app);
      const docRef = doc(db, "usuario", this.Nit_Empresa);
      const md = forge.md.sha256.create()
      md.update(this.Contrasena1)
          if (this.Nombre_Empresa.length > 0 && this.Nit_Empresa.length > 0 && this.Direccion_Empresa.length > 0 && this.Sector_Empresa.length > 0 && this.Nombre_Encargado.length > 0 && this.Cargo_Encargado.length > 0 && this.Correo_Electronico.length > 0 && this.Numero_Telefonico.length > 0 && this.Contrasena1.length > 0 && this.Contrasena2.length > 0) {
            setDoc(doc(db, "usuario", this.Nit_Empresa), {
              cargo: this.Cargo_Encargado,
              contraseña: md.digest().toHex(),
              direccion: this.Direccion_Empresa,
              email: this.Correo_Electronico,
              encargado: this.Nombre_Encargado,
              encuesta: "No",
              estado: "Activo",
              fechaCreacion: "esta por verse",
              img: "",
              nit: this.Nit_Empresa,
              nombre: this.Nombre_Empresa,
              telefono: this.Numero_Telefonico,
              tipo: "empresa"
            });
             router.push("/login");
      }
    },
    login() {
      router.push("/login");
    },
    home() {
      router.push("/Home");
    },
    async errorLogin() {
      const alert = await alertController.create({
        header: "Error",
        message: "Usuario o email ya registrados",
        buttons: ["OK"],
        cssClass: "my-custom-class",
      });
      await alert.present();
    },
     async comparador(){
      const db =getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "usuario"))
        var i = 0;
      querySnapshot.forEach((doc) => {
        if(doc.data().nit==this.Nit_Empresa){
          i++;
        }
      })
        if(i==0){
          this.registrar()
        }else{
          this.errorLogin();
        }
    } 
  },
});
</script>

<style>
</style>