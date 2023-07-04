import {Observable} from 'rxjs';
export interface UseCase<S, T> { 
    execute(parámetros: S): Observable<T>; 
}