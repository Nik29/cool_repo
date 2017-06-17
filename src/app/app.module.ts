import { NgModule, ApplicationRef } from '@angular/core';
//import {GooglePlaceModule} from "angular2-google-place";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { AngularFireModule, AuthMethods } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
//import {FlashMessagesModule} from 'angular2-flash-messages'
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routes } from './app.routing';
import { AuthGuard } from './auth.service';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export const firebaseConfig = {
    apiKey: "AIzaSyAo06YbouNNY2AS6JxCfg2DphT8WodqiAw",
    authDomain: "drivool-eb297.firebaseapp.com",
    databaseURL: "https://drivool-eb297.firebaseio.com",
    projectId: "drivool-eb297",
    storageBucket: "drivool-eb297.appspot.com",
    messagingSenderId: "236549372153"
  };

const firebaseAuthConfig = {
  providerId:'google.com',
  method: AuthMethods.Popup
};

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    PagesModule,
    AngularFireModule.initializeApp(firebaseConfig , firebaseAuthConfig),
    routes,
    //GooglePlaceModule


  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    FirebaseService,
    AuthGuard,

  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
