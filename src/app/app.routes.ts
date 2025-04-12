import { NotfoundComponent } from './components/notfound/notfound.component';
import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { SupplierRegisterComponent } from './components/supplier-register/supplier-register.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './Payment/checkout/checkout.component';
import { PayComponent } from './Payment/pay/pay.component';
import { ConfirmOrderComponent } from './Payment/confirm-order/confirm-order.component';



export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path:'',redirectTo:'Homepage',pathMatch:'full'}, 
            {path:'Homepage',component:HomepageComponent},
            {path:'details/:id',component:ProductDetailsComponent},
            {path:'shop',component:ShopComponent},
            {path:'cart',component:CartComponent,canActivate:[authGuard]},
            {path:'checkout/:id',component:CheckoutComponent,canActivate:[authGuard]},
            {path:'pay',component:PayComponent,canActivate:[authGuard]},
            {path:'confirmOrder',component:ConfirmOrderComponent,canActivate:[authGuard]},
            
        ],
      },
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path:'register',component:RegisterComponent,canActivate:[loggedGuard]},
            {path:'supregister',component:SupplierRegisterComponent,canActivate:[loggedGuard]},
            {path:'login',component:LoginComponent,canActivate:[loggedGuard]},
        ],
      },
      { path: 'reset-password', component: ResetPasswordComponent },
      {path:'verify-reset-code',component:VerifyResetCodeComponent},
      {path:'set-new-password',component:SetNewPasswordComponent},
      {path:'**',component:NotfoundComponent}

    
    
    
   


];
