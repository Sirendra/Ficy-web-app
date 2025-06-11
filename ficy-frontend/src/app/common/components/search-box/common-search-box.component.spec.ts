import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CommonSearchBoxComponent } from './common-search-box.component';

describe('CommonSearchBoxComponent', () => {
  let component: CommonSearchBoxComponent;
  let fixture: ComponentFixture<CommonSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSearchBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChanged after debounce when input changes', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.searchChanged, 'emit');

    component.onSearchChange({ target: { value: 'hello' } } as any);
    expect(component.searchTerm).toBe('hello');

    tick(400);
    expect(emitSpy).toHaveBeenCalledWith('hello');
  }));

  it('should not emit if value is unchanged', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.searchChanged, 'emit');

    component.onSearchChange({ target: { value: 'test' } } as any);
    tick(400);
    expect(emitSpy).toHaveBeenCalledTimes(1);

    component.onSearchChange({ target: { value: 'test' } } as any);
    tick(400);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  }));

  it('clearSearch should reset term and emit empty string', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.searchChanged, 'emit');

    component.searchTerm = 'abc';
    component.clearSearch();

    expect(component.searchTerm).toBe('');
    tick(400);
    expect(emitSpy).toHaveBeenCalledWith('');
  }));

  it('should complete subscription on destroy', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
