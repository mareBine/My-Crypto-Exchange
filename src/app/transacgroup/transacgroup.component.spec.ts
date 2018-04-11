import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransacgroupComponent} from './transacgroup.component';

describe('TransacgroupComponent', () => {
  let component: TransacgroupComponent;
  let fixture: ComponentFixture<TransacgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransacgroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
