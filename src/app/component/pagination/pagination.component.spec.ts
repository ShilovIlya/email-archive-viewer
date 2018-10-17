import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';
import { PagingInfo } from '../../model/pagingInfo';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  });

  function testUpdatePagination(totalItems: number, pageSize: number, currentPage: number, expectedPages: number[]) {
    component.pagingInfo = new PagingInfo(totalItems, pageSize, currentPage);
    fixture.detectChanges();
    expect(component.pages).toEqual(expectedPages);
  }

  it('should emit first page when current page is less then 1', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(10, 10, 0);
    fixture.detectChanges();
    expect(currentPage).toBe(1);
  })

  it('should emit last page when current page is greater then totalItems/pageSize', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => {currentPage = page; console.log(currentPage)});
    component.pagingInfo = new PagingInfo(32, 10, 5);
    fixture.detectChanges();
    expect(currentPage).toBe(4);
  })

  it('should have pages from 1 to 10 when current page is less then 6 and totalItems/pageSize is greater then 10', () => {
    const expectedPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    testUpdatePagination(188, 10, 6, expectedPages);
  })

  it('should have pages from 1 to totalItems/pageSize when totalItems/pageSize is less then then 10', () => {
    const expectedPages = [1, 2, 3, 4];
    testUpdatePagination(152, 50, 3, expectedPages);
  })

  it('should have pages from currentPage-5 to currentPage+4 when totalItems/pageSize > currentPage + 4', () => {
    const expectedPages = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    testUpdatePagination(188, 10, 10, expectedPages);
  })

  it('should have pages from totalItems/pageSize-9 to totalItems/pageSize when totalItems/pageSize <= currentPage+4', () => {
    const expectedPages = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    testUpdatePagination(188, 10, 15, expectedPages);
  })

  it('should emit first page when click to <<', () => {
    let currentPage = 0;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 10, 5);
    fixture.detectChanges();
    const first = fixture.debugElement.query(By.css('#first'));
    first.triggerEventHandler('click', {button: 0});
    expect(currentPage).toBe(1);
  })

  it('should emit previous page when click to <', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 10, 5);
    fixture.detectChanges();
    const prev = fixture.debugElement.query(By.css('#prev'));
    prev.triggerEventHandler('click', {button: 0});
    expect(currentPage).toBe(4);
  })

  it('should emit next page when click to >', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 10, 5);
    fixture.detectChanges();
    const next = fixture.debugElement.query(By.css('#next'));
    next.triggerEventHandler('click', {button: 0});
    expect(currentPage).toBe(6);
  })

  it('should emit last page when click to >>', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 10, 5);
    fixture.detectChanges();
    const last = fixture.debugElement.query(By.css('#last'));
    last.triggerEventHandler('click', {button: 0});
    expect(currentPage).toBe(19);
  })

  it('should emit selected page when click to some page', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 10, 10);
    fixture.detectChanges();
    const page = fixture.debugElement.queryAll(By.css('span'))[4];
    page.triggerEventHandler('click', {button: 0});
    expect(currentPage).toBe(7);
  })

  it('should not have <<,<,>,>> when pages less then 10', () => {
    let currentPage: number;
    component.changePage.subscribe((page: number) => currentPage = page);
    component.pagingInfo = new PagingInfo(188, 50, 2);
    fixture.detectChanges();
    const spanNumber = fixture.debugElement.queryAll(By.css('span')).length;
    expect(spanNumber).toBe(4);
  })
});
