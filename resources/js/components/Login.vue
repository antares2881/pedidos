<template>  
  <v-app>
    <v-row>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        
        <v-col md="6" class="login p-5">
          <v-img
            max-width="300"
            max-height="300"
            src="images/logo.png"
          ></v-img>
          <v-text-field 
            prepend-icon="mdi-account"
            label="Username"
            v-model="login.username"
            :rules="usernameRules"
          >
          </v-text-field>
          <v-text-field 
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-icon="mdi-lock"
            label="Password"
            v-model="login.password"
            @click:append="show1 = !show1"
            :rules="passRules"
          >
          </v-text-field>
          <a href="#" class="my-2">Olvidaste tu contraseña?</a>
          <v-btn block color="primary" @click="submitLogin">
            Entrar
          </v-btn> 
        </v-col>
      </v-form>
    </v-row>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        login: {username: '', password: ''},
        passRules: [
          v => !!v || 'Password es requerido'
        ],
        show1: false,
        usernameRules: [
          v => !!v || 'Username es requerido',
          v => /.+@.+\..+/.test(v) || 'Username no valido',
        ],
        valid: true
      }
    },
    methods: {
      submitLogin(){
        axios.post('/login', this.login)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
  }
</script>
<style scoped>
  .login{
    left: 25%;
    position: absolute;
    top: 20%;
  }

  @media screen and (max-width: 900px){
    .login{
      left: 0px;
    }
  }
</style> 