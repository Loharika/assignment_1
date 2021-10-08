import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes:Routes=[
    {path:'',redirectTo:'/home',pathMatch:'full',canActivate: [AuthGuard]},
    {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
    {path:'auth',loadChildren:'./auth/auth.module#AuthModule',pathMatch:'full'},
    {path:'**',component:NotFoundComponent}
    
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}