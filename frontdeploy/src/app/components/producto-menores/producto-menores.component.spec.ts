import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMenoresComponent } from './producto-menores.component';

describe('ProductoMenoresComponent', () => {
  let component: ProductoMenoresComponent;
  let fixture: ComponentFixture<ProductoMenoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoMenoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMenoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
