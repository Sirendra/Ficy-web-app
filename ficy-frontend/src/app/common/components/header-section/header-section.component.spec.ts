import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonPictureComponent } from './header-section.component';

describe('CommonPictureComponent', () => {
  let component: CommonPictureComponent;
  let fixture: ComponentFixture<CommonPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonPictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the explore section when scrollToExplore is called', () => {
    const scrollMock = jest.fn();
    const element = document.createElement('div');
    element.scrollIntoView = scrollMock;
    jest.spyOn(document, 'getElementById').mockReturnValue(element);

    component.scrollToExplore();

    expect(document.getElementById).toHaveBeenCalledWith('explore-section');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should not throw if explore-section element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    expect(() => component.scrollToExplore()).not.toThrow();
  });
});
