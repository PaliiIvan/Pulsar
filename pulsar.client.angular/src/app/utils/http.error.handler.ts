import { of } from 'rxjs';
import { RequestResult } from '../models';


export function handleError(response: any) {
    console.log(response);
    return of(response.error as RequestResult<any>);

}
