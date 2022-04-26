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
  constructor(private _formBuilder: FormBuilder, private settingsService: SettingsService, private router: Router) { }
  settings: Settings | undefined;

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      currency: ['', Validators.required],
      naverfee: ['', Validators.required],
      coupangfee: ['', Validators.required],
      margin: ['', Validators.required],
    });

    this.settingsService.getSettings().subscribe((data: Settings) =>{
      this.settings = data;
      console.log(data);
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
