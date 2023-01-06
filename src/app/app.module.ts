import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestOneComponent } from './components/test-one/test-one.component';
import { FinalTestComponent } from './components/final-test/final-test.component';

@NgModule({
  declarations: [AppComponent, TestOneComponent, FinalTestComponent],
  imports: [BrowserModule, NgbModule, FontAwesomeModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
