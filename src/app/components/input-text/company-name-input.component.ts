import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpService} from "../../service/http-service.service";
import {ScheduleData} from "../../interface/Interfaces";

@Component({
  selector: 'app-input-text',
  templateUrl: './company-name-input.component.html',
  styleUrls: ['./company-name-input.component.css']
})
export class CompanyNameInput {
  @Input()
  inputTag: string = '';
  isOpen: boolean = false;
  private answer: Object;

  constructor(private httpService: HttpService) {
  }

  openDialog = () => {
    this.isOpen = !this.isOpen;
  };
  @ViewChild('error', {static: false}) errorRef: ElementRef;
  errorMessage: string = '';
  okMessage: string;

  onClickSubmit(result: { companyName: string; }) {
    console.log(result.companyName);

    if (result.companyName == "") {
      this.errorRef.nativeElement.className = 'blink_me';
      this.errorMessage = 'campo vacío ';
    } else {
      this.errorRef.nativeElement.className = '';
      this.errorMessage = '';
      this.postCompany(result.companyName);
      setTimeout(() => {
        this.isOpen = false;
      }, 2000);
    }
  }

  private postCompany(companyName: string) {
    let scheduleData: ScheduleData = {
      companyName: companyName,
      scheduleDataDTOId: null,
      month: null,
      employees: null
    };

    this.httpService.post('scheduleData', scheduleData).subscribe(
      (response) => {
        let scheduleData: ScheduleData = response;
        this.answer = response;
        this.okMessage = 'a tope, scheduleId = ' + scheduleData.scheduleDataDTOId;
      },
      (error) => {
        this.errorMessage = error;
      });
  }
}



