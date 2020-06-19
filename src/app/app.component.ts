import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') public drawer: MatSidenav;
  title = 'corona';

  toogleMenu() {
    debugger
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
