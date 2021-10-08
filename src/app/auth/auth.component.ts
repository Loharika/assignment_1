import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs"; 
import * as fromApp from '../store/app.reducer'
import { Store } from "@ngrx/store";
import * as AuthActions from './store/auth.actions'

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{

    isLoginMode:boolean=true
    isLoading:boolean=false
    error:string=null
    closeSub:Subscription
    storeSub:Subscription

    constructor( 
        private componentFactoryResolver:ComponentFactoryResolver,private store:Store<fromApp.AppState>){}
    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode
    }
ngOnInit(){
    this.storeSub=this.store.select('auth').subscribe(authState=>{
        this.isLoading=authState.loading
        this.error=authState.authError;
        
    })
}
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe()
        }
        if(this.storeSub){
            this.storeSub.unsubscribe()
        }
    }
    onSubmit(form:NgForm){

        if(!form.valid){
            return;
        } 
        const email=form.value.email;
        const password=form.value.password

        this.isLoading=true
        if(this.isLoginMode){ 
           
            this.store.dispatch(new AuthActions.LoginStart(
                {
                    email:email,
                    password:password
                }
            ))
        }else{
            
            this.store.dispatch(new AuthActions.SignupStart(
                {email:email,
                password:password}
            ))
        }

        this.store.select('auth').subscribe(authState=>{

        })
        
        form.reset()
    }

    onHandleError(){
        this.store.dispatch(new AuthActions.ClearError())
    }
}