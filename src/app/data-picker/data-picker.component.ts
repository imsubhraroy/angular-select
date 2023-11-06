import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css'],
})
export class DataPickerComponent {
  @Input() startDate: any = '';
  @Input() endDate: any = '';
  @Input() maxDate: any;
  @Input() placeHolder: string = 'Select a date';
  @Input() label: string = 'DOB';
  @Input() dateRange: boolean = false;
  @Output() setDate = new EventEmitter<any>();
  @Input() selectedDate: Date | null = null;
  @Input() labelText!: string;
  @Input() mandatory: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() height!: string;

  //Time
  @Input() time: boolean = true;
  selectedTime: boolean = false;
  hourValue!: number;
  hour!: number;
  minuteValue!: number;
  minute!: number;
  terrestrialTime!: string;

  currentDay!: number;
  lastDay: number = 7;
  currentDate: Date = new Date();
  previousMonthDays: any = [];
  nextMonthDays: any = [];
  days: number[] = [];
  currentMonthYear: string = '';
  currentMonth: string = '';
  selectedMonth!: number;
  showDayModal: boolean = true;
  showMonthModal: boolean = false;
  showYearModal: boolean = false;
  months: any = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Apr', value: 3 },
    { label: 'May', value: 4 },
    { label: 'Jun', value: 5 },
    { label: 'Jul', value: 6 },
    { label: 'Aug', value: 7 },
    { label: 'Sep', value: 8 },
    { label: 'Oct', value: 9 },
    { label: 'Nov', value: 10 },
    { label: 'Dec', value: 11 },
  ];

  bars: any = [
    { value: 'M', label: 'Monday' },
    { value: 'T', label: 'Tuesday' },
    { value: 'W', label: 'Wednesday' },
    { value: 'T', label: 'Thursday' },
    { value: 'F', label: 'Friday' },
    { value: 'S', label: 'Saturday' },
    { value: 'S', label: 'Sunday' },
  ];
  currentYear: number = new Date().getFullYear();
  yearRange: number[] = [];
  isDisplayedAbove: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderCalendar();
    this.initializeYearRange();
    this.positionCalendar();
    if (this.dateRange && this.startDate && this.endDate) {
      const dateInput = this.el.nativeElement.querySelector('#dateInput');
      dateInput.value = `${this.formatDate(
        this.startDate
      )}  -  ${this.formatDate(this.endDate)}`;
    }
    const today = new Date();
    this.hour = today.getHours();
    this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
    this.minute = today.getMinutes();
    this.hourValue = this.hour;
    this.minuteValue = this.minute;
    setInterval(() => {
      if (!this.selectedTime) {
        const today = new Date();
        this.hour = today.getHours();
        this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
        this.minute = today.getMinutes();
      }
    }, 1000);
  }

  //Show Whole month date base selected month and yesr

  renderCalendar() {
    this.days = [];
    this.previousMonthDays = [];
    this.nextMonthDays = [];
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    this.currentDay = firstDay.getDay();

    this.currentYear = this.currentDate.getFullYear();

    this.currentMonthYear = `${this.currentDate.getFullYear()}`;
    this.currentMonth = `${this.currentDate.toLocaleString('default', {
      month: 'long',
    })}`;

    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.days.push(day);
    }
    this.getLastDaysOfPreviousMonth();
    this.getNextDaysOfNextMonth();
  }

  getLastDaysOfPreviousMonth() {
    const firstDayOfCurrentMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
    lastDayOfPreviousMonth.setDate(0); // Set the date to 0 to get the last day of the previous month
    const lastDay = lastDayOfPreviousMonth.getDate();

    // Create an array of days for the previous month
    let ld = lastDay - ((this.currentDay === 0 ? 7 : this.currentDay) - 2);
    for (let i = 1; i < (this.currentDay === 0 ? 7 : this.currentDay); i++) {
      this.previousMonthDays.push(ld);
      ld++;
    }
  }

  // Function to get the days of the next month
  getNextDaysOfNextMonth() {
    const lastDayOfCurrentMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    this.lastDay = lastDayOfCurrentMonth.getDay();

    const firstDayOfNextMonth = new Date(lastDayOfCurrentMonth);
    firstDayOfNextMonth.setDate(1); // Set the date to 1 to get the first day of the next month
    const firstDay = firstDayOfNextMonth.getDate();

    // Create an array of days for the next month
    let fd = firstDay;
    for (let i = 0; i < 7 - (this.lastDay === 0 ? 7 : this.lastDay); i++) {
      // You can adjust the upper limit as needed
      this.nextMonthDays.push(fd);
      fd++;
    }
  }

  formatDate(date: Date): string {
    if (!date) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  showCalendar() {
    if (!this.showDayModal) {
      if (this.showMonthModal || this.showYearModal) {
        this.showDayModal = false;
        this.showMonthModal = false;
        this.showYearModal = false;
      } else {
        this.showDayModal = true;
      }
    } else {
      this.showMonthModal = false;
      this.showYearModal = false;
      this.showDayModal = false;
    }
    this.positionCalendar();
  }

  //*Day

  isMaxDate(day: number) {
    const d = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
    if (this.maxDate && d > this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentDay(day: number): boolean {
    const currentDate = new Date();
    return (
      currentDate.getDate() === day &&
      currentDate.getMonth() === this.currentDate.getMonth() &&
      currentDate.getFullYear() === this.currentDate.getFullYear()
    );
  }

  isSelectedDay(day: number): boolean {
    if (this.dateRange && this.startDate && this.endDate) {
      const d = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      if (d >= this.startDate && d <= this.endDate) {
        return true;
      }
    }
    if (this.maxDate && this.selectedDate && this.selectedDate > this.maxDate) {
      return false;
    } else if (this.dateRange) {
      return false;
    } else {
      if (this.selectedDate) {
        return (
          this.selectedDate.getDate() === day &&
          this.selectedDate.getMonth() === this.currentDate.getMonth() &&
          this.selectedDate.getFullYear() === this.currentDate.getFullYear()
        );
      }
      return false;
    }
  }

  selectDay(day: number) {
    this.selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );

    if (this.maxDate) {
      if (this.selectedDate < this.maxDate) {
        const dateInput = this.el.nativeElement.querySelector('#dateInput');
        if (this.dateRange) {
          if (this.endDate) {
            this.startDate = this.selectedDate;
            this.endDate = '';
            dateInput.value = `${this.formatDate(
              this.startDate
            )}  -  ${this.formatDate(this.endDate)}`;
          } else {
            if (this.startDate) {
              if (this.startDate <= this.selectedDate) {
                this.endDate = this.selectedDate;
                dateInput.value = `${this.formatDate(
                  this.startDate
                )}  -  ${this.formatDate(this.endDate)}`;
              } else {
                return;
              }
            } else {
              this.startDate = this.selectedDate;
              dateInput.value = `${this.formatDate(
                this.startDate
              )}  -  ${this.formatDate(this.endDate)}`;
            }
          }
        } else {
          dateInput.value = `${this.formatDate(this.selectedDate)}`;
        }
        if (!this.time) {
          this.showDayModal = false;
        }
        this.renderCalendar();
      }
    } else {
      const dateInput = this.el.nativeElement.querySelector('#dateInput');
      if (this.dateRange) {
        if (this.endDate) {
          this.startDate = this.selectedDate;
          this.endDate = '';
          dateInput.value = `${this.formatDate(
            this.startDate
          )}  -  ${this.formatDate(this.endDate)}`;
        } else {
          if (this.startDate) {
            if (this.startDate <= this.selectedDate) {
              this.endDate = this.selectedDate;
              dateInput.value = `${this.formatDate(
                this.startDate
              )}  -  ${this.formatDate(this.endDate)}`;
            } else {
              return;
            }
          } else {
            this.startDate = this.selectedDate;
            dateInput.value = `${this.formatDate(
              this.startDate
            )}  -  ${this.formatDate(this.endDate)}`;
          }
        }
      } else {
        dateInput.value = `${this.formatDate(this.selectedDate)}`;
      }
      if (!this.time) {
        this.showDayModal = false;
      }
      this.renderCalendar();
    }
    if (this.dateRange) {
      const value = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.setDate.emit(value);
    } else {
      this.setDate.emit(this.selectedDate);
    }
  }

  //*Month

  showMonth() {
    this.showDayModal = false;
    this.showMonthModal = true;
    this.renderCalendar();
    this.positionCalendar();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  selectMonth = (month: any) => {
    if (this.maxDate) {
      if (this.currentDate && this.currentDate < this.maxDate) {
        this.showMonthModal = false;
        this.currentDate.setMonth(month);
        this.renderCalendar();
        setTimeout(() => {
          this.showDayModal = true;
          this.positionCalendar();
        }, 10);
      }
    } else {
      this.showMonthModal = false;
      this.currentDate.setMonth(month);
      this.renderCalendar();
      setTimeout(() => {
        this.showDayModal = true;
        this.positionCalendar();
      }, 10);
    }
  };

  isCurrentMonth(month: number): boolean {
    const currentDate = new Date();
    return (
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === this.currentDate.getFullYear()
    );
  }

  isMaxMonth(month: number) {
    const d = new Date(this.currentDate.getFullYear(), month);
    if (this.maxDate && d > this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  //*Year

  showYear() {
    this.showMonthModal = false;
    this.showYearModal = true;
    this.renderCalendar();
    this.positionCalendar();
  }

  isMaxYear(year: number) {
    const d = new Date(year, this.currentDate.getMonth());
    if (this.maxDate && d > this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  prevYear() {
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.renderCalendar();
  }

  nextYear() {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    this.renderCalendar();
  }

  selectYear = (year: any) => {
    if (this.maxDate) {
      if (this.currentDate && this.currentDate < this.maxDate) {
        this.showYearModal = false;
        this.currentDate.setFullYear(year);
        this.renderCalendar();
        setTimeout(() => {
          this.showMonthModal = true;
          this.positionCalendar();
        }, 10);
      }
    } else {
      this.showYearModal = false;
      this.currentDate.setFullYear(year);
      this.renderCalendar();
      setTimeout(() => {
        this.showMonthModal = true;
        this.positionCalendar();
      }, 10);
    }
  };

  isCurrentYear(year: number): boolean {
    const currentDate = new Date();
    return currentDate.getFullYear() === year;
  }

  initializeYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    for (let year = startYear; year < endYear; year++) {
      this.yearRange.push(year);
    }
  }

  previousYearRange() {
    this.currentYear -= 10;
    this.yearRange = this.generateYearRange();
  }

  nextYearRange() {
    this.currentYear += 10;
    this.yearRange = this.generateYearRange();
  }

  generateYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    const range = [];
    for (let year = startYear; year < endYear; year++) {
      range.push(year);
    }
    return range;
  }

  //Time

  setHour() {
    this.selectedTime = true;
    this.hourValue = this.hour;
  }

  setMinute() {
    this.selectedTime = true;
    this.minuteValue = this.minute;
  }

  setTime() {
    this.selectedTime = true;
    const dateInput = this.el.nativeElement.querySelector('#dateInput');
    if (this.selectedDate) {
      dateInput.value = '';
      dateInput.value = ` ${this.formatDate(this.selectedDate)} ${
        this.hourValue
      } : ${this.minuteValue} ${this.terrestrialTime}`;
      this.showDayModal = false;
    }
  }

  reset() {
    this.currentDate = new Date();
    this.selectedDate = null;
    const dateInput = this.el.nativeElement.querySelector('#dateInput');
    dateInput.value = '';
    if (this.time) {
      this.selectedTime = false;
      const today = new Date();
      this.hour = today.getHours();
      this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
      this.minute = today.getMinutes();
      this.hourValue = this.hour;
      this.minuteValue = this.minute;
    }
    this.renderCalendar();
  }

  //*Outside Close

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      if (this.showDayModal) {
        this.showDayModal = false;
      }
      // if (this.showMonthModal) {
      //   this.showMonthModal = false;
      // }
      // if (this.showYearModal) {
      //   this.showYearModal = false;
      // }
    }
  }

  //* On Resize Position
  @HostListener('window:resize')
  onWindowResize() {
    this.positionCalendar();
  }

  positionCalendar() {
    setTimeout(() => {
      const dateInput = this.el.nativeElement.querySelector('#dateInput');
      const calendar = this.el.nativeElement.querySelector('#calendar');

      if (dateInput && calendar) {
        const inputRect = dateInput.getBoundingClientRect();
        if (inputRect.bottom + calendar.clientHeight > window.innerHeight) {
          this.renderer.setStyle(
            calendar,
            'top',
            inputRect.top - calendar.clientHeight - 20 + 'px'
          );
        } else {
          this.renderer.setStyle(calendar, 'top', inputRect.bottom + 'px');
          // this.renderer.setStyle(calendar, 'left', inputRect.left + 'px');
        }
      }
    }, 0);
  }
}
