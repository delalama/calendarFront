import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../service/http-service.service";

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent {
  @Output()
  isLogged = new EventEmitter<boolean>();

  message: string;

  @ViewChild('name', {static: false}) nameRef: ElementRef;
  @ViewChild('pass', {static: false}) passRef: ElementRef;

  constructor(private httpService: HttpService) {
  }

  login() {
    let name: string = this.nameRef.nativeElement.value;
    let pass: string = this.passRef.nativeElement.value;

    if(name == '' || pass == ''){
      this.message = 'login error';
    }else{
      console.log(name + pass);

      let body = {name: name, pass: pass};

      this.httpService.postReturnString('login', body).subscribe(
        (response) => {
          const booleanResponse: boolean = response.toString() === 'true'

          if(booleanResponse){
            this.isLogged.emit(booleanResponse);
            this.message = 'logged';
          }else{
            this.message = 'no logged';
          }
        },
        (error) => {
          this.message = error;
          this.message = 'login error';
        });
    }
  }
  create(): void {
    let name: string = this.nameRef.nativeElement.value;
    let pass: string = this.passRef.nativeElement.value;

    if(name == '' || pass == ''){
      this.message = 'login error';
    }else{

      console.log(name + pass);

      let body = {name: name, pass: pass};

      this.httpService.postReturnString('createUser', body).subscribe(
        (response) => {
          console.log(response);
          let number = Number(response);
          if(number){
            this.message = 'created';
          }else{
            this.message = response;
          }

        },
        (error) => {
          this.message = error.error.text;
        });
    }

  }


}
