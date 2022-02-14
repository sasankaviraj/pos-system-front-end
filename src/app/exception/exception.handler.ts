import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import Swal from 'sweetalert2';

export class ExceptionHandler {

   static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    Swal.fire(
       'Server Error Occurred!',
       'Something bad happened; please try again later!',
       'error'
     );
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
