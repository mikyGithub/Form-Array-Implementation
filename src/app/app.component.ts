import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Icons
  faMinus = faMinus;
  faPlus = faPlus;

  constructor(private fb: FormBuilder) {}

  // FormGroups
  groupForm: FormGroup = this.fb.group({
    groups: this.fb.array([]),
  });

  slotForm: FormGroup = this.fb.group({
    slots: this.fb.array([]),
  });

  // Getters
  get groups() {
    return this.groupForm.controls['groups'] as FormArray;
  }

  get slots() {
    return this.slotForm.controls['slots'] as FormArray;
  }

  get groupsFormGroup() {
    return (this.groupForm.controls['groups'] as FormArray)
      .controls as FormGroup[];
  }

  slotsFormGroup(groupIdx: number) {
    let slotFormArray = (this.slotForm.controls['slots'] as FormArray)
      .controls as FormGroup[];

    let filteredFormArray = slotFormArray.filter(
      (formGroup) => formGroup.value.groupIdx === groupIdx
    );

    return filteredFormArray;
  }

  // Events
  addGroup(): void {
    const groupForm = this.fb.group({
      groupName: ['', Validators.required],
      slots: [[]],
    });

    this.groups.push(groupForm);
    this.slotForm.value.slots = [];
  }

  addSlot(groupIdx: number): void {
    const slotForm = this.fb.group({
      slotName: ['', Validators.required],
      groupIdx: groupIdx,
    });

    this.slots.push(slotForm);
    this.groups.value[groupIdx].slots = this.slots.value;
  }

  deleteGroup(groupIdx: number): void {
    this.groups.removeAt(groupIdx);
  }

  deleteSlot(groupIdx: number, slotIdx: number): void {
    this.slots.removeAt(slotIdx);
    this.groups.value[groupIdx].slots = this.slots.value;
  }
}
