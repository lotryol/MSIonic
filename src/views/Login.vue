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
                    <h2>Iniciar sesion</h2>
                  </ion-label>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    
                    <ion-label position="floating">NIT</ion-label>
                    <ion-input type="text" v-model="Nit_Empresa"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Contraseña</ion-label>
                    <ion-input type="password" v-model="contrasena1"></ion-input>
                  </ion-item>
                </ion-list>
                <ion-button expand="block" @click="login">Iniciar Sesion</ion-button>
                <ion-button expand="block" @click="Register">Registrar</ion-button>
              </ion-card-content>
              {{ passIncorrect }}
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import router from "@/router";
import "@/dbfirebase/initFirebase";
import app from "../dbfirebase/initFirebase";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import ProfilePage from "@/views/ProfilePage.vue";
import * as forge from 'node-forge';
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
  IonButton,
  IonButtons,
  IonCardContent,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonInput,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({


  name: "LoginLinea",
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
    IonButton,
    IonButtons,
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
      Nit_Empresa: "",
      contrasena1: "",
      passIncorrect: "",
      sesion: "",
      cookie: "",
    };
  },
  methods: {
// el metodo register es un boton que permite el redireccionamiento del usuario a la pagina de register.
    Register() {
      router.push("/Register");
    },
//el metodo home redirecciona al usuario a la pantalla principal
    home() {
      router.push("/Home");
    },
    async login() {
      const db = getFirestore(app);
      const docRef = doc(db, "usuario", this.Nit_Empresa);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const md = forge.md.sha256.create()
        md.update(this.contrasena1)
        const contraseña = docSnap.data();
        const comparar = md.digest().toHex();
        console.log("esta es la contraseña de comparar " , comparar)
        console.log("esta es la contraseña de la consulta " , contraseña.contraseña)

        if (comparar == contraseña.contraseña) {
          //enviar nit a perfil.vue
          document.cookie = this.Nit_Empresa;
          this.sesion = this.Nit_Empresa;
          router.push("/profile");

        } else {
          this.passIncorrect = "Contraseña incorrecta";
        }
      } else {
        this.passIncorrect = "Datos erroneos";
        console.log("No such document!");
      }
    },
    //document do cookie
    


  },
});

</script>
<style scoped>
</style>
