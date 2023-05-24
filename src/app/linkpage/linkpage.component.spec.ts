import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpageComponent } from './linkpage.component';

describe('LinkpageComponent', () => {
  let component: LinkpageComponent;
  let fixture: ComponentFixture<LinkpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
