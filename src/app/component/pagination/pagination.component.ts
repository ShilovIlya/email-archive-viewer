import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagingInfo } from '../../model/pagingInfo';

@Component({
  selector: 'eav-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  private _pagingInfo: PagingInfo;
  private _totalPages: number;
  private pages: number[];
  @Input()
  set pagingInfo(pagingInfo: PagingInfo) {
    this._pagingInfo = pagingInfo;
    this.updatePagination();
  }
  @Output() changePage = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  updatePagination() {
    this._totalPages = Math.ceil(this._pagingInfo.totalItems / this._pagingInfo.pageSize);
    const page = this._pagingInfo.currentPage;
    if (page < 1) {
      this.changePage.emit(1);
    } else if (page > this._totalPages) {
      this.changePage.emit(this._totalPages);
    }
    let startPage: number;
    let endPage: number;
    if (this._totalPages <= 10) {
      startPage = 1;
      endPage = this._totalPages;
    } else {
      if (page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (page + 4 >= this._totalPages) {
        startPage = this._totalPages - 9;
        endPage = this._totalPages;
      } else {
        startPage = page - 5;
        endPage = page + 4;
      }
    }
    this.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => i + startPage);
  }

  selectPage(page: number) {
    this.changePage.emit(page);
  }

  firstPage() {
    this.changePage.emit(1);
  }

  prevPage() {
    if (this._pagingInfo.currentPage > 1) {
      this.changePage.emit(this._pagingInfo.currentPage - 1);
    }
  }

  nexPage() {
    if (this._pagingInfo.currentPage < this._totalPages) {
      this.changePage.emit(this._pagingInfo.currentPage + 1);
    }
  }

  lastPage() {
    this.changePage.emit(this._totalPages);
  }
}
