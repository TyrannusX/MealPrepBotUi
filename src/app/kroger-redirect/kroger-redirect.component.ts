import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kroger-redirect',
  templateUrl: './kroger-redirect.component.html',
  styleUrls: ['./kroger-redirect.component.scss']
})
export class KrogerRedirectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = `https://api.kroger.com/v1/connect/oauth2/authorize?scope=cart.basic:write&client_id=${environment.krogerAppId}&redirect_uri=http://localhost:4200/ChooseYourRecipe&response_type=code`
  }

}
