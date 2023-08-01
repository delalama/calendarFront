import {Component, Input, ViewChild} from '@angular/core';
import {HttpService} from "../../service/http-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyDTO} from "../../interface/CompanyDTO";
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Moment} from 'moment';
import {getMonthDate} from './utils/dateUtils';
import {Employee, EmployeeDTO, ScheduleData} from "../../interface/Interfaces";


@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {
  @Input()
  inputTag: string | undefined;
  private dateToPersist: string;

  constructor(private _formBuilder: FormBuilder,
              private httpService: HttpService) {
  }

  onSubmit(data: any) {
    console.log(data);
    let company: CompanyDTO = {
      name: data.companyName
    }

    console.log(company);

    this.httpService.post('company', company).subscribe(data => {
      console.log(data);
    })
  }

  firstFormGroup = this._formBuilder.group({
    employeesNumber: ['0', [Validators.required, Validators.min(1)]],
    datePicker: ['', Validators.nullValidator],
  });

  secondFormGroup = this._formBuilder.group({
    lefardo0: ['', Validators.required],
    employeeName0: ['', Validators.required],
    lefardo1: ['', Validators.required],
    employeeName1: ['', Validators.required],
    lefardo2: ['', Validators.required],
    employeeName2: ['', Validators.required],
    freeDates: ['', Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    companyName: [Validators.required],
  });

  getDate() {
    console.log(this.dateToPersist);
    return this.dateToPersist;
  }

  getEmployeesNumber() {
    let employeesNumber = this.firstFormGroup.get('employeesNumber')?.value;
    console.log(employeesNumber);
    return employeesNumber;
  }

  date = new FormControl(moment())

  monthSelected(event: { toISOString: () => string; }, dp: { close: () => void; }, input: { value: any; }) {
    dp.close();
    var month = getMonthDate(event);
    let year = event.toString().split(' ')[3];

    this.dateToPersist = month + '-' + year;

    let value1 = year + '-' + month + '-01';
    input.value = value1;
  }


  employees: Employee[] = [];
  employeesDTOs: EmployeeDTO[] = [];

  createEmployees() {
    let i = 0;
    this.employees = [];
    while (i < Number(this.getEmployeesNumber())) {
      let employee: Employee = {
        id: i,
        daysOff: []
      }
      this.employees.push(employee);
      i++;
    }
    console.log(this.employees);
  }


  // multiple datepicker
  public CLOSE_ON_SELECTED = false;
  public init = new Date();
  public resetModel: any = new Date(0);
  public model: any = [];
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;

  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>, employeeId: number): void {
    if (event.value) {
      const date = event.value;
      const index = this._findDate(date);
      let employee = this.employees.filter(e => e.id === employeeId)[0];

      if (index === -1) {
        if(date){
          employee.daysOff.push(date);
          this.model.push(date);
        }
      } else {
        this.model.splice(index, 1);
        employee.daysOff.splice(index, 1);
      }
      this.resetModel = new Date(0);
      if (this.CLOSE_ON_SELECTED) {
        const closeFn = this._picker.close;
        this._picker.close = () => { };
        // @ts-ignore
        this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._picker.close = closeFn;
        });
      }else{
        const closeFn = this._picker.open();
      }
    }
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    this.model.splice(index, 1)
  }

  private _findDate(date: Date): any {
    return this.model.map((m: string | number) => +m).indexOf(+date);
  }

  saveFreedays() {
    this.employees.forEach( e => {

      let employeeDTO: EmployeeDTO = {
        feId: 0,
        daysOff: [],
        name: ''
      };
      employeeDTO.feId = e.id;

      let dates = e.daysOff;
      dates.forEach(d => {
        let day = d.toString().split(' ')[2];
        let dayNum = Number(day);

        employeeDTO.daysOff.push(dayNum);
      })

      let employeeId = 'employeeName' + e.id
      employeeDTO.name = String(this.secondFormGroup.get(employeeId)?.value);
      this.employeesDTOs.push(employeeDTO)

    })

    let scheduleData: ScheduleData = {
      employees : this.employeesDTOs,
      month : this.dateToPersist
    }
    console.log(scheduleData);
    console.log(this.employeesDTOs);


    this.httpService.post('scheduleData', scheduleData).subscribe(data => {
      console.log(data);
    })
  }
}
