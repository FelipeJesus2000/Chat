import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivConversationComponent } from './div-conversation.component';

describe('DivConversationComponent', () => {
  let component: DivConversationComponent;
  let fixture: ComponentFixture<DivConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
