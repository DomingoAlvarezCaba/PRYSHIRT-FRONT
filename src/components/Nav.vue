<template>
    <div id="nav">
        <b-navbar class="nav" toggleable="sm">
            <b-navbar-brand class="white-font ml-3">Pryshirt</b-navbar-brand>
            <b-navbar-toggle v-model="expanded" @click="expanded = !expanded" target="nav-collapse">
                <i class="light_gray-font fas fa-angle-up" v-if="expanded"></i>
                <i class="light_gray-font fas fa-angle-down" v-else></i>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="navbar-container ml-auto text-center">
                    <b-nav-item :to="{name: 'Home-view'}" exact>Home</b-nav-item>
                    <b-nav-item-dropdown :class="this.$route.path == '/dashboard' ? 'main_active' : ''" v-if="$store.state.auth" :text="$store.state.user.name" id="user-dropdown" toggle-class="nav-link-custom" right>
                        <b-dropdown-item class="text-center" :to="{name: 'Dashboard-view'}">Dashboard</b-dropdown-item>
                        <b-dropdown-item class="text-center" @click="logout()">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-if="!$store.state.auth" v-b-modal.login-form>Login
                        <b-modal id="login-form" centered title="Login" hide-footer hide-header>
                            <b-tabs class="login-tab" content-class="mt-3">
                                <b-tab title="Login" @click="resetAll()">
                                    <b-container class="centered-container">
                                        <b-row>
                                            <b-col>
                                                <b-form class="text-center">
                                                    <p class="red-font" v-for="error in loginErrors" :key="error">{{error}}</p>
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('emailFocused')" class="input-group-text login-input-span"><i class="fas fa-envelope"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="email" class="login-input" :class="getCurrentClass('emailFocused')" @focus="setFocus('emailFocused', true)" @blur="setFocus('emailFocused', false)" size="xl" placeholder="Email"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in emailErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-2"  label-for="input-2">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('passwordFocused')" class="input-group-text login-input-span"><i class="fas fa-lock fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="password" type="password" :class="getCurrentClass('passwordFocused')" @focus="setFocus('passwordFocused', true)" @blur="setFocus('passwordFocused', false)" size="xl" placeholder="Password"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in passwordErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-button @click="checkLogin()" @mouseover="hovering = true" @mouseout="hovering = false" :class="getCurrentButtonClass()" class="login-button mt-4">Login</b-button>
                                                    <div class="mt-3">
                                                        <b-link class="dark_yellow-font" href="#foo">Forgot your password?</b-link>
                                                    </div>
                                                </b-form>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                                <b-tab title="Register" @click="resetAll()">
                                    <b-container class="centered-container">
                                        <b-row>
                                            <b-col>
                                                <b-form class="text-center">
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('nameFocused')" class="input-group-text login-input-span"><i class="fa fa-user fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="name" class="login-input" :class="getCurrentClass('nameFocused')" @focus="setFocus('nameFocused', true)" @blur="setFocus('nameFocused', false)" size="xl" placeholder="Name"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in nameErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('emailFocused')" class="input-group-text login-input-span"><i class="fas fa-envelope"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="email" class="login-input" :class="getCurrentClass('emailFocused')" @focus="setFocus('emailFocused', true)" @blur="setFocus('emailFocused', false)" size="xl" placeholder="Email"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in emailErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('passwordFocused')" class="input-group-text login-input-span"><i class="fa fa-lock fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="password" type="password" class="login-input" :class="getCurrentClass('passwordFocused')" @focus="setFocus('passwordFocused', true)" @blur="setFocus('passwordFocused', false)" size="xl" placeholder="Password"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in passwordErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-2"  label-for="input-2">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('repeatPasswordFocused')" class="input-group-text login-input-span"><i class="fas fa-lock fa-lg"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="repeatPassword" type="password" :class="getCurrentClass('repeatPasswordFocused')" @focus="setFocus('repeatPasswordFocused', true)" @blur="setFocus('repeatPasswordFocused', false)" size="xl" placeholder="Repeat password"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in repeatPasswordErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('addressFocused')" class="input-group-text login-input-span"><i class="fas fa-address-book"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="address" class="login-input" :class="getCurrentClass('addressFocused')" @focus="setFocus('addressFocused', true)" @blur="setFocus('addressFocused', false)" size="xl" placeholder="Address"></b-form-input>
                                                        </b-input-group>
                                                    </b-form-group>
                                                    <b-form-group class="text-left" id="input-group-1" label-for="input-1">
                                                        <b-input-group class="login-input">
                                                            <b-input-group-prepend class="mr-0">
                                                                <span :class="getCurrentIconClass('phoneFocused')" class="input-group-text login-input-span"><i class="fas fa-phone"></i></span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="phone" class="login-input" :class="getCurrentClass('phoneFocused')" @focus="setFocus('phoneFocused', true)" @blur="setFocus('phoneFocused', false)" size="xl" placeholder="Phone"></b-form-input>
                                                        </b-input-group>
                                                        <h3 class="form-errors text-left mt-1" v-for="error in phoneErrors" :key="error">{{error}}</h3>
                                                    </b-form-group>
                                                    <b-form-checkbox class="text-left" id="type-input" v-model="type" name="checkbox-1" unchecked-value="empresa">Company</b-form-checkbox>
                                                    <b-button @click="checkRegister()" @mouseover="hovering = true" @mouseout="hovering = false" :class="getCurrentButtonClass()" class="login-button mt-4">Register</b-button>
                                                    <div class="mt-3">
                                                        <b-link class="dark_yellow-font" href="#foo">Forgot your password?</b-link>
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
        data(){
            return{
                userName: '',
                currentId: 0,
                input: {nameFocused: false, emailFocused: false, passwordFocused: false, repeatPasswordFocused: false, addressFocused: false, phoneFocused: false},
                nameErrors: [],
                emailErrors: [],
                passwordErrors: [],
                repeatPasswordErrors: [],
                addressErrors: [],
                phoneErrors: [],
                loginErrors: [],
                inputCssClasses: {noFocused: 'login-input-no-focused', focused: 'login-input-focused', error: 'login-input-error'},
                iconCssClasses: {noFocused: 'black-font', focused: 'light-blue-2-font', error: 'red-font'},
                expanded: false,
                hovering: false,
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
                address: '',
                phone: '',
                type: 'particular',
                rules: [
                    { message:'One lowercase letter required.', regex:/[a-z]+/ },
                    { message:"One uppercase letter required.",  regex:/[A-Z]+/ },
                    { message:"8 characters minimum.", regex:/.{8,}/ },
                    { message:"One number required.", regex:/[0-9]+/ }
                ]
            }
        },
        methods: {
            subIsActive(input) {
                const paths = Array.isArray(input) ? input : [input]
                return paths.some(path => {
                return this.$route.path.indexOf(path) === 0
                })
            },
            setFocus(input, focus) {
                this.input[input] = focus
            },
            getCurrentClass(input){
                var cssClass = this.inputCssClasses.noFocused
                if(this.input[input]){
                    cssClass = this.inputCssClasses.focused
                }
                return cssClass;
            },
            getCurrentIconClass(input){
                var cssClass = this.iconCssClasses.noFocused
                if(this.input[input]){
                    cssClass = this.iconCssClasses.focused
                }
                return cssClass;
            },
            getCurrentButtonClass(){
                var cssClass = 'login-button-hovered'
                if(this.hovering){
                    cssClass = 'login-button'
                }
                return cssClass;
            },
            async logout(){
                await this.$store.dispatch('logout')
                this.$router.push({ name: 'Login-view' })
            },
            async checkLogin(){
                this.emailErrors = []
                this.passwordErrors = []
                this.loginErrors = []
                if(!this.email){
                    this.emailErrors.push('This field cannot be blank.')
                }
                if (this.email && !this.validEmail(this.email)) {
                    this.emailErrors.push('The email address is not valid.')
                }
                if(!this.password){
                    this.passwordErrors.push('This field cannot be blank.')
                }
                if(this.password){
                    this.validPassword()
                }
                if (!this.emailErrors.length && !this.passwordErrors.length){
                    const form = {
                        userName: this.email,
                        password: this.password
                    }
                    await this.$store.dispatch('login', form).then(response => {
                        if(response == ''){
                            this.loginErrors.push('Your username or password may be incorrect.')
                        }else{
                            this.$bvModal.hide('login-form')
                            this.$router.push({ name: 'Dashboard-view' })
                        }
                    })
                }
            },
            async checkRegister(){
                this.resetErrors()
                if (!this.name) {
                    this.nameErrors.push('This field cannot be blank.')
                }
                if(!this.email){
                    this.emailErrors.push('This field cannot be blank.')
                }
                if (this.email && !this.validEmail(this.email)) {
                    this.emailErrors.push('The email address is not valid.')
                }
                if(!this.password){
                    this.passwordErrors.push('This field cannot be blank.')
                } 
                if(!this.repeatPassword){
                    this.repeatPasswordErrors.push('This field cannot be blank.')
                }
                if(this.password != this.repeatPassword && this.password && this.repeatPassword){
                    this.repeatPasswordErrors.push('Does not match password field.')
                }
                if(this.password == this.repeatPassword && this.password && this.repeatPassword){
                    this.validPassword()
                }
                if(this.phone && !this.validPhone()){
                    this.phoneErrors.push('The phone is not valid.')
                }
                if (!this.nameErrors.length && !this.nameErrors.length && !this.passwordErrors.length && !this.repeatPasswordErrors.length && !this.phoneErrors.length){
                    const user = {
                        name: this.name,
                        userName: this.email,
                        password: this.password,
                        address: this.address,
                        phone: this.phone,
                        type: this.type
                    }
                    await this.$store.dispatch('register', user).then( response => {
                        if(response == ''){
                            this.loginErrors.push('Your username or password may be incorrect.')
                        }else{
                            this.$bvModal.hide('login-form')
                            this.$router.push({ name: 'Dashboard-view' })
                        }
                    })
                }
            },
            resetAll(){
                this.resetErrors()
                this.resetValues()
            },
            resetErrors(){
                this.nameErrors = []
                this.emailErrors = []
                this.passwordErrors = []
                this.repeatPasswordErrors = []
                this.phoneErrors = []
                this.loginErrors = []
            },
            resetValues(){
                this.name = ''
                this.email = ''
                this.password = ''
                this.repeatPassword = ''
                this.address = ''
                this.phone = ''
            },
            validPassword() {
                for (let condition of this.rules) {
                    if (!condition.regex.test(this.password)) {
                        this.passwordErrors.push('Password must be at least 8 characters long, must contain at least one lowercase letter, one uppercase letter and one non-letter character.')
                        break
                    }
                }
            },
            validEmail(email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(email)
            },
            validPhone() {
                var valid = false
                var phone = /^[6-9]{1}\d{8}$/
                if (this.phone.match(phone)) {
                    valid = true
                }
                return valid
            }
        }
    }
</script>