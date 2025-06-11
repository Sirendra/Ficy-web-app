import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonPaginationComponent } from './common-pagination.component';

describe('CommonPaginationComponent', () => {
  let component: CommonPaginationComponent;
  let fixture: ComponentFixture<CommonPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange with valid page number', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();

    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(3);
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should not emit when page is the same as current', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();

    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(2);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit when page is out of range (too low)', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    fixture.detectChanges();

    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit when page is out of range (too high)', () => {
    component.totalPages = 5;
    component.currentPage = 5;
    fixture.detectChanges();

    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(6);
    expect(spy).not.toHaveBeenCalled();
  });
});
