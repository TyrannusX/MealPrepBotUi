import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseYourRecipeComponent } from './choose-your-recipe.component';

describe('ChooseYourRecipeComponent', () => {
  let component: ChooseYourRecipeComponent;
  let fixture: ComponentFixture<ChooseYourRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseYourRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseYourRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
