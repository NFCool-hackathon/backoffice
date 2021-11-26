import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pages = [
    {
      title: 'Tokens',
      route: '/tokens'
    },
    {
      title: 'Roles',
      route: '/roles'
    }
  ];

  actualRoute = this.router.url;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualRoute = event.url;
        console.log(this.actualRoute);
      }
    });
  }
}
