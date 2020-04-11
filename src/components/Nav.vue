<template>
    <div id="nav">
        <b-navbar class="nav" toggleable="sm">
            <!-- <b-navbar-brand href="#"> -->
                <!-- <img src="@/assets/img/masterserver-logo.png" id="nav-logo" alt=""> -->
            <!-- </b-navbar-brand> -->
            <b-navbar-toggle v-model="expanded" @click="expanded = !expanded" target="nav-collapse">
                <i class="light_gray-font fas fa-angle-up" v-if="expanded"></i>
                <i class="light_gray-font fas fa-angle-down" v-else></i>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="navbar-container ml-auto text-center">
                    <b-nav-item :to="{name: 'home'}" exact>Home</b-nav-item>
                    <b-nav-item @click="logout()" v-if="currentId > 0" :to="{name: 'login'}">Logout</b-nav-item>
                    <b-nav-item v-if="currentId > 0" :to="{name: 'dashboard'}">Dashboard</b-nav-item>
                    <b-nav-item v-if="currentId == null" v-b-modal.login-form>Login
                        <b-modal id="login-form" centered title="Login" hide-footer hide-header>
                            <b-tabs class="login-tab" content-class="mt-3">
                                <b-tab title="Login">
                                    <b-container class="centered-container">
                                        <b-row>
                                            <b-col>
                                                <b-form class="text-center">
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrenIconClass('usernameFocused')" class="input-group-text login-input-span"><i class="fa fa-user fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="email" class="login-input" :class="getCurrentClass('usernameFocused')" @focus="setFocus('usernameFocused', true)" @blur="setFocus('usernameFocused', false)" size="xl" placeholder="Email"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-2"  label-for="input-2">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrenIconClass('passwordFocused')" class="input-group-text login-input-span"><i class="fas fa-lock fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="password" type="password" :class="getCurrentClass('passwordFocused')" @focus="setFocus('passwordFocused', true)" @blur="setFocus('passwordFocused', false)" size="xl" placeholder="Password"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-button @click="login()" @mouseover="hovering = true" @mouseout="hovering = false" :class="getCurrentButtonClass()" class="login-button mt-4">Login</b-button>
                                                    <div class="mt-3">
                                                        <b-link class="light_red-font" href="#foo">Forgot your password?</b-link>
                                                    </div>
                                                </b-form>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                                <b-tab title="Register">
                                    <b-container class="centered-container">
                                        <b-row>
                                            <b-col>
                                                <b-form class="text-center">
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrenIconClass('usernameFocused')" class="input-group-text login-input-span"><i class="fa fa-user fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="email" class="login-input" :class="getCurrentClass('usernameFocused')" @focus="setFocus('usernameFocused', true)" @blur="setFocus('usernameFocused', false)" size="xl" placeholder="Email"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-2"  label-for="input-2">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrenIconClass('passwordFocused')" class="input-group-text login-input-span"><i class="fas fa-lock fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="password" type="password" :class="getCurrentClass('passwordFocused')" @focus="setFocus('passwordFocused', true)" @blur="setFocus('passwordFocused', false)" size="xl" placeholder="Password"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-button @click="login()" @mouseover="hovering = true" @mouseout="hovering = false" :class="getCurrentButtonClass()" class="login-button mt-4">Login</b-button>
                                                    <div class="mt-3">
                                                        <b-link class="light_red-font" href="#foo">Forgot your password?</b-link>
                                                    </div>
                                                </b-form>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                            </b-tabs>
                        </b-modal>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default{
    beforeCreate() {
		this.$store.commit('setStore');
	},
    data(){
        return{
            currentId: null,
            input: {usernameFocused: false, passwordFocused: false},
            inputCssClasses: {noFocused: 'login-input-no-focused', focused: 'login-input-focused'},
            iconCssClasses: {noFocused: 'black-font', focused: 'light-blue-2-font'},
            expanded: false,
            hovering: false,
            email: '',
            password: ''
      }
    },
    methods: {
        setFocus(input, focus) {
            this.input[input] = focus
        },
        getCurrentClass(input){
            var cssClass = this.inputCssClasses.noFocused
            if(this.input[input]){
                cssClass = this.inputCssClasses.focused
            }
            return cssClass
      },
        getCurrenIconClass(input){
            var cssClass = this.iconCssClasses.noFocused
            if(this.input[input]){
                cssClass = this.iconCssClasses.focused
            }
            return cssClass
      },
        getCurrentButtonClass(){
            var cssClass = 'login-button-hovered'
            if(this.hovering){
                cssClass = 'login-button'
            }
            return cssClass
      },
        login(){


        }
      }
  }
</script>