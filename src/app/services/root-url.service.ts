import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RootUrlService {
  //url="http://localhost:5000/"
  url=environment.API_URL;
}
