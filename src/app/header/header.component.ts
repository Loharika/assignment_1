   
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription'; 
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions' 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated=false
  private userSub:Subscription
  constructor( 
    private store:Store<fromApp.AppState>){

  }

  ngOnInit(){
    this.userSub=this.store.select('auth').pipe(map(authState=>authState.user )).subscribe(user=>{
      this.isAuthenticated=!!user
    })
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

  onLogout(){ 
    this.store.dispatch(new AuthActions.Logout())
  }
}