import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { SmartTable3Component } from './smart-table3.component';

describe('SmartTable3Component', () => {
  let component: SmartTable3Component;
  let fixture: ComponentFixture<SmartTable3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTable3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTable3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
