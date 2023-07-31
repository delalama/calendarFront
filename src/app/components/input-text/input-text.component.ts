import {Component, Input} from '@angular/core';
import {HttpService} from "../../service/http-service.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CompanyDTO} from "../../interface/CompanyDTO";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {
    @Input()
    inputTag: string | undefined;
    formdata = new FormGroup({
        companyName: new FormControl()
    });

    constructor(private httpService: HttpService) {

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
}
