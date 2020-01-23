import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTableComponent } from './play-table.component';

describe('PlayTableComponent', () => {
  let component: PlayTableComponent;
  let fixture: ComponentFixture<PlayTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
