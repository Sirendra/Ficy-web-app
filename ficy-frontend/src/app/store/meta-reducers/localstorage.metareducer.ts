import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../auth/interface/jwt-payload.interface';

export function localStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    const token = localStorage.getItem('token');
    if (!token) {
      return nextState;
    }
    const { userId } = jwtDecode<JwtPayload>(token);
    if (!userId) {
      return nextState;
    }

    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      const storageValue = localStorage.getItem(`favorites${userId}`);
      if (storageValue) {
        return {
          ...nextState,
          favorites: JSON.parse(storageValue),
        };
      }
    }

    if (nextState.favorites) {
      localStorage.setItem(
        `favorites${userId}`,
        JSON.stringify(nextState.favorites)
      );
    }

    return nextState;
  };
}
