import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrogerRedirectComponent } from './kroger-redirect.component';

describe('KrogerRedirectComponent', () => {
  let component: KrogerRedirectComponent;
  let fixture: ComponentFixture<KrogerRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrogerRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrogerRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
