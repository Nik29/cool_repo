import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { SmartTable4Component } from './smart-table4.component';

describe('SmartTable4Component', () => {
  let component: SmartTable4Component;
  let fixture: ComponentFixture<SmartTable4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTable4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTable4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
