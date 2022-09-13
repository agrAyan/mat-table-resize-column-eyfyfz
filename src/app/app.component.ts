import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  name2: string;
  position2: number;
  weight2: number;
  symbol2: string;
  name3: string;
  position3: number;
  weight3: number;
  symbol3: string;
  name4: string;
  position4: number;
  weight4: number;
  symbol4: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
    position3: 1,
    name3: 'Hydrogen',
    weight3: 1.0079,
    symbol3: 'H',
    position4: 1,
    name4: 'Hydrogen',
    weight4: 1.0079,
    symbol4: 'H',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
    position3: 1,
    name3: 'Hydrogen',
    weight3: 1.0079,
    symbol3: 'H',
    position4: 1,
    name4: 'Hydrogen',
    weight4: 1.0079,
    symbol4: 'H',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
    position3: 1,
    name3: 'Hydrogen',
    weight3: 1.0079,
    symbol3: 'H',
    position4: 1,
    name4: 'Hydrogen',
    weight4: 1.0079,
    symbol4: 'H',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
    position3: 1,
    name3: 'Hydrogen',
    weight3: 1.0079,
    symbol3: 'H',
    position4: 1,
    name4: 'Hydrogen',
    weight4: 1.0079,
    symbol4: 'H',
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    position2: 1,
    name2: 'Hydrogen',
    weight2: 1.0079,
    symbol2: 'H',
    position3: 1,
    name3: 'Hydrogen',
    weight3: 1.0079,
    symbol3: 'H',
    position4: 1,
    name4: 'Hydrogen',
    weight4: 1.0079,
    symbol4: 'H',
  },
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Material Table column Resize';
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;

  columns: any[] = [
    { field: 'position', width: 40 },
    { field: 'name', width: 20 },
    { field: 'weight', width: 20 },
    { field: 'symbol', width: 20 },
    { field: 'position2', width: 20 },
    { field: 'name2', width: 20 },
    { field: 'weight2', width: 20 },
    { field: 'symbol2', width: 20 },
    { field: 'position3', width: 20 },
    { field: 'name3', width: 20 },
    { field: 'weight3', width: 20 },
    { field: 'symbol3', width: 20 },
    { field: 'position4', width: 20 },
    { field: 'name4', width: 20 },
    { field: 'weight4', width: 20 },
    { field: 'symbol4', width: 20 },
  ];
  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;
  freeze = 2;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

  setDisplayedColumns() {
    this.columns.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  onResizeColumn(event: any, index: number) {
    console.log(event.target.parentElement);
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.parentElement.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.columns.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow =
      this.matTableRef.nativeElement.children[0].querySelector('tr');
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX
            : -event.pageX + this.startX;
          const width = this.startWidth + dx;
          if (this.currentResizeIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      }
    );
    this.resizableMouseup = this.renderer.listen(
      'document',
      'mouseup',
      (event) => {
        if (this.pressed) {
          this.pressed = false;
          this.currentResizeIndex = -1;
          this.resizableMousemove();
          this.resizableMouseup();
        }
      }
    );
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if (newWidth > 50) {
        this.columns[index].width = width;
        this.setColumnWidth(this.columns[index]);
        this.columns[j].width = newWidth;
        this.setColumnWidth(this.columns[j]);
      }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(
      document.getElementsByClassName('mat-column-' + column.field)
    );
    columnEls.forEach((el: HTMLDivElement) => {
      el.style.width = column.width + 'px';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }
}
