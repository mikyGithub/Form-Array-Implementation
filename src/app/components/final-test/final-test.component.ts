import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ICaption {
  caption: string;
  groupIdx: number;
  value: string;
}

@Component({
  selector: 'app-final-test',
  templateUrl: './final-test.component.html',
  styleUrls: ['./final-test.component.css'],
})
export class FinalTestComponent {
  showResult: boolean = false;
  constructor(private fb: FormBuilder) {}

  dynamicForm = this.fb.group({
    title: ['', Validators.required],
    abs: this.fb.array([]),
    groups: this.fb.array([]),
  });

  captionForm = this.fb.group({
    captions: this.fb.array([]),
  });

  get abs() {
    return this.dynamicForm.controls['abs'] as FormArray;
  }

  get captions() {
    return this.captionForm.controls['captions'] as FormArray;
  }

  get groups() {
    return this.dynamicForm.controls['groups'] as FormArray;
  }

  get absFormGroup() {
    let abFormArray = (this.dynamicForm.controls['abs'] as FormArray)
      .controls as FormGroup[];
    return abFormArray;
  }

  get groupsFormGroup() {
    let groupFormArray = (this.dynamicForm.controls['groups'] as FormArray)
      .controls as FormGroup[];
    return groupFormArray;
  }

  captionsFormGroup(groupIdx: number) {
    let captionFormArray = (this.captionForm.controls['captions'] as FormArray)
      .controls as FormGroup[];

    let filteredFormArray = captionFormArray.filter(
      (formGroup) => formGroup.value.groupIdx === groupIdx
    );

    return filteredFormArray;
  }

  addAB(): void {
    const abForm = this.fb.group({
      a: ['', Validators.required],
      b: ['', Validators.required],
    });
    this.abs.push(abForm);
  }

  addCaption(groupIdx: number): void {
    const captionForm = this.fb.group({
      caption: ['', Validators.required],
      value: ['', Validators.required],
      groupIdx: groupIdx,
    });
    this.captions.push(captionForm);
  }

  addGroup(): void {
    const groupForm = this.fb.group({
      groupName: ['', Validators.required],
      captions: this.fb.array([]),
    });
    this.groups.push(groupForm);
  }

  onSubmit(): void {
    this.captions?.value?.forEach((cap: ICaption) => {
      this.groups.value[cap.groupIdx].captions = this.captions?.value.filter(
        (c: ICaption) => c.groupIdx === cap.groupIdx
      );
    });
    this.showResult = true;
  }
}
