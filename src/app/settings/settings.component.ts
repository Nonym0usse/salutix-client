import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../services/settings.service";
import {Settings} from "../interfaces/settings";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // @ts-ignore
  secondFormGroup: FormGroup;
  // @ts-ignore
  deliveryFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private settingsService: SettingsService, private router: Router) { }
  settings: Settings | undefined;
  delivery: any | undefined;

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      currency: ['', Validators.required],
      naverfee: ['', Validators.required],
      coupangfee: ['', Validators.required],
      margin: ['', Validators.required],
    });

    this.deliveryFormGroup = this._formBuilder.group({
      form1: ['', Validators.required],
      form2: ['', Validators.required],
      form3: ['', Validators.required],
      form4: ['', Validators.required],
      form5: ['', Validators.required],
      form6: ['', Validators.required],
      form7: ['', Validators.required],
      form8: ['', Validators.required],
      form9: ['', Validators.required],
      form10: ['', Validators.required],
      form11: ['', Validators.required],
      form12: ['', Validators.required],
      form13: ['', Validators.required],
      form14: ['', Validators.required],
      form15: ['', Validators.required],
      form16: ['', Validators.required],
      form17: ['', Validators.required],
      form18: ['', Validators.required],
      form19: ['', Validators.required],
    });

    this.settingsService.getSettings().subscribe((data: Settings) =>{
      this.settings = data;
      this.secondFormGroup.setValue({
        margin: this.settings!.margin ?? null,
        coupangfee: this.settings!.coupangfee ?? null,
        naverfee: this.settings!.naverfee ?? null,
        currency: this.settings!.currency ?? null,
      });
    });
  }

  saveData(){
    const dataForm = this.secondFormGroup.value;
    this.settingsService.setSettings(dataForm).subscribe(() => {
      this.router.navigate(['dashboard'])
    });
  }

}
