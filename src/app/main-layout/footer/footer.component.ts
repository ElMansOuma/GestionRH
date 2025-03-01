import { Component, OnInit } from '@angular/core';
import {IconsModule} from "angular-bootstrap-md";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    IconsModule
  ],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
