import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilentForm } from './cilent-form';

describe('CilentForm', () => {
  let component: CilentForm;
  let fixture: ComponentFixture<CilentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CilentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CilentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
