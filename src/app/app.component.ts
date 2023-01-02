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

  // Value Getters
  getter(type: string) {
    return this.groupForm.controls[type] as FormArray;
  }

  // Form Group getters
  getGroupsFG() {
    return (this.groupForm.controls['groups'] as FormArray)
      .controls as FormGroup[];
  }

  getSlotsFG(groupIdx: number) {
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
    this.getter('groups').push(groupForm);
    this.slotForm.value.slots = [];
  }

  addSlot(groupIdx: number): void {
    const slotForm = this.fb.group({
      slotName: ['', Validators.required],
      groupIdx: groupIdx,
    });
    this.getter('slots').push(slotForm);
    this.getter('groups').value[groupIdx].slots = this.getter('slots').value;
  }

  deleteGroup(groupIdx: number): void {
    this.getter('groups').removeAt(groupIdx);
  }

  deleteSlot(groupIdx: number, slotIdx: number): void {
    this.getter('slots').removeAt(slotIdx);
    this.getter('groups').value[groupIdx].slots = this.getter('slots').value;
  }
}
