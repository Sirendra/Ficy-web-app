import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonCardComponent } from './common-card.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('CommonCardComponent', () => {
  let component: CommonCardComponent;
  let fixture: ComponentFixture<CommonCardComponent>;
  let store: any;
  let toastService: any;
  let router: any;

  beforeEach(async () => {
    const storeMock = {
      select: jest.fn().mockReturnValue(of(false)),
      dispatch: jest.fn(),
    };

    const toastServiceMock = {
      success: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonCardComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ToastrService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    toastService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addFavorite and show toast if not a favorite', () => {
    component.url = 'https://anapioficeandfire.com/api/books/1';
    component.header = 'A Game of Thrones';
    component.subTitle = 'First book';
    component.dataType = 'book';
    fixture.detectChanges();

    const mockEvent = new MouseEvent('click');
    component.toggleFavorite(mockEvent);

    expect(toastService.success).toHaveBeenCalledWith(
      'Added to favorites',
      'Success'
    );
  });

  it('should navigate to detail page correctly', () => {
    component.url = 'https://anapioficeandfire.com/api/characters/583';
    component.dataType = 'character';
    component.navigateToDetailPage();

    expect(router.navigate).toHaveBeenCalledWith(['/characters/583']);
  });
});
