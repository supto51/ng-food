import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSortModalComponent } from './food-sort-modal.component';

describe('FoodSortModalComponent', () => {
  let component: FoodSortModalComponent;
  let fixture: ComponentFixture<FoodSortModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodSortModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSortModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
