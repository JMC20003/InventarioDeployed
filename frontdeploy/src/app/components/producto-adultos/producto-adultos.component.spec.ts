import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAdultosComponent } from './producto-adultos.component';

describe('ProductoAdultosComponent', () => {
  let component: ProductoAdultosComponent;
  let fixture: ComponentFixture<ProductoAdultosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoAdultosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoAdultosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
