import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),

    //Apollo setup 
    provideApollo(() => {
      return {
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: ' http://localhost:4000/graphql',
        }),
      };
    }),
  ],
}).catch((err) => console.error(err));







