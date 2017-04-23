import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { SmartTable1Component } from './smart-table1.component';

describe('SmartTable1Component', () => {
  let component: SmartTable1Component;
  let fixture: ComponentFixture<SmartTable1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTable1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
