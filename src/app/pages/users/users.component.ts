import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  searchTerm: string = '';
  visibleRows: number = 5; // Number of rows initially visible

  rows = [
    { first: 'Mark', last: 'Otto', handle: 'mdo' },
    { first: 'Jacob', last: 'Thornton', handle: 'fat' },
    { first: 'Larry', last: 'Bird', handle: 'twitter' },
  ];

  filteredRows() {
    if (!this.searchTerm) {
      return this.rows;
    }
    const term = this.searchTerm.toLowerCase();
    return this.rows.filter(row =>
      Object.values(row).some(val =>
        val.toLowerCase().includes(term)
      )
    );
  }


  addNewRow() {
    // Add a new blank row
    this.rows.push({ first: 'New', last: 'User', handle: 'new_handle' });
  }

  editRow(index: number) {
    const row = this.rows[index];
    const newFirst = prompt('Edit First Name:', row.first);
    const newLast = prompt('Edit Last Name:', row.last);
    const newHandle = prompt('Edit Handle:', row.handle);

    if (newFirst !== null) this.rows[index].first = newFirst;
    if (newLast !== null) this.rows[index].last = newLast;
    if (newHandle !== null) this.rows[index].handle = newHandle;
  }

  deleteRow(index: number) {
    if (confirm('Are you sure you want to delete this row?')) {
      this.rows.splice(index, 1);
    }
  }

  loadMore() {
    this.visibleRows += 5; // Load 5 more rows
  }

}
