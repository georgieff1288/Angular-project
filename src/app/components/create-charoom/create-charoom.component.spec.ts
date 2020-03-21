import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharoomComponent } from './create-charoom.component';

describe('CreateCharoomComponent', () => {
  let component: CreateCharoomComponent;
  let fixture: ComponentFixture<CreateCharoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCharoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
