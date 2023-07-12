import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidoComponent } from './olvido.component';

describe('OlvidoComponent', () => {
  let component: OlvidoComponent;
  let fixture: ComponentFixture<OlvidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
