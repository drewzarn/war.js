import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCountChartComponent } from './card-count-chart.component';

describe('CardCountChartComponent', () => {
  let component: CardCountChartComponent;
  let fixture: ComponentFixture<CardCountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
