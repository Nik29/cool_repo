import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideriderMapComponent } from './riderider-map.component';

describe('RideriderMapComponent', () => {
  let component: RideriderMapComponent;
  let fixture: ComponentFixture<RideriderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideriderMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideriderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
