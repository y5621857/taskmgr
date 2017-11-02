import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSidenavModule,
  MdButtonToggleModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { DirectiveModule } from "../directive/directive.module";
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    MdButtonToggleModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdButtonToggleModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
  ],
  entryComponents: [ ConfirmDialogComponent ],
  declarations: [ ConfirmDialogComponent, ImageListSelectComponent, AgeInputComponent ]
})
export class SharedModule {
}
