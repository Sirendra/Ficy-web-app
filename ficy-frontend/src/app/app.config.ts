import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { charactersReducer } from './store/characters/characters.reducer';
import { CharactersEffects } from './store/characters/characters.effects';
import { HousesEffects } from './store/houses/houses.effects';
import { housesReducer } from './store/houses/houses.reducer';
import { favoritesReducer } from './store/favorites/favorites.reducer';
import { localStorageMetaReducer } from './store/meta-reducers/localstorage.metareducer';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideAnimations(),
    provideStore(
      {
        books: booksReducer,
        characters: charactersReducer,
        houses: housesReducer,
        favorites: favoritesReducer,
      },
      { metaReducers: [localStorageMetaReducer] }
    ),
    provideEffects([BooksEffects, CharactersEffects, HousesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
      progressBar: true,
    }),
  ],
};
