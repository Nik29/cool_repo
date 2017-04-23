import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { SmartTable2Component } from './smart-table2.component';

describe('SmartTable2Component', () => {
  let component: SmartTable2Component;
  let fixture: ComponentFixture<SmartTable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
