import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-timing-settings',
  templateUrl: './timing-settings.component.html',
  styleUrl: './timing-settings.component.scss'
})
export class TimingSettingsComponent {

  globalStartTime: string = '09:00';
  globalEndTime: string = '17:00';
  globalDayType: string = 'week_days';
  globalBreakTimes: Array<{ start: string; end: string }> = [];
  global24h: boolean = false;
  globalOffDay: boolean = false;
  globalBreakStart: string = '12:00';
  globalBreakEnd: string = '13:00';
  restaurantId: string | null = null;

  schedule: any = {
    monday_day: 'Monday',
    monday_day_type: 'week_days',
    monday_start_time: '09:00',
    monday_end_time: '17:00',
    monday_status: 'active',
    monday_24h: false,
    monday_open: true,
    monday_off_day: false,
    monday_break_times: [],
    tuesday_day: 'Tuesday',
    tuesday_day_type: 'week_days',
    tuesday_start_time: '09:00',
    tuesday_end_time: '17:00',
    tuesday_status: 'active',
    tuesday_24h: false,
    tuesday_open: true,
    tuesday_off_day: false,
    tuesday_break_times: [],
    wednesday_day: 'Wednesday',
    wednesday_day_type: 'week_days',
    wednesday_start_time: '09:00',
    wednesday_end_time: '17:00',
    wednesday_status: 'active',
    wednesday_24h: false,
    wednesday_open: true,
    wednesday_off_day: false,
    wednesday_break_times: [],
    thursday_day: 'Thursday',
    thursday_day_type: 'week_days',
    thursday_start_time: '09:00',
    thursday_end_time: '17:00',
    thursday_status: 'active',
    thursday_24h: false,
    thursday_open: true,
    thursday_off_day: false,
    thursday_break_times: [],
    friday_day: 'Friday',
    friday_day_type: 'week_days',
    friday_start_time: '09:00',
    friday_end_time: '17:00',
    friday_status: 'active',
    friday_24h: false,
    friday_open: true,
    friday_off_day: false,
    friday_break_times: [],
    saturday_day: 'Saturday',
    saturday_day_type: 'weekends',
    saturday_start_time: '10:00',
    saturday_end_time: '18:00',
    saturday_status: 'inactive',
    saturday_24h: false,
    saturday_open: false,
    saturday_off_day: true,
    saturday_break_times: [],
    sunday_day: 'Sunday',
    sunday_day_type: 'weekends',
    sunday_start_time: '10:00',
    sunday_end_time: '16:00',
    sunday_status: 'inactive',
    sunday_24h: false,
    sunday_open: false,
    sunday_off_day: true,
    sunday_break_times: []
  };

  timingsJson: Array<any> = [];

  constructor(
    private network: NetworkService,
    private utility: UtilityService,
    private route: ActivatedRoute
  ) {
    this.syncScheduleToTimingsJson();
    this.getRestaurantIdFromParams();
  }

  getRestaurantIdFromParams() {
    const params = this.route.snapshot.params;
    this.restaurantId = params['id'] || null;
    console.log('Restaurant ID from URL params:', this.restaurantId);
    // Load timing data after getting restaurant ID
    this.loadTimingData();
  }

  async loadTimingData() {
    try {
      const response = await this.network.getTimingData(this.restaurantId);
      if (response && response.timing) {
        this.populateFormWithData(response.timing);
      }
    } catch (error) {
      console.error('Failed to load timing data:', error);
      // Don't show error toast as this might be first time setup
    }
  }

  populateFormWithData(timingData: any) {
    // Populate global settings
    if (timingData.global) {
      this.globalStartTime = timingData.global.start_time || '09:00';
      this.globalEndTime = timingData.global.end_time || '17:00';
      this.globalDayType = timingData.global.day_type || 'week_days';
      this.global24h = timingData.global.is_24h || false;
      this.globalBreakTimes = timingData.global.break_times || [];
    }

    // Populate days settings
    if (timingData.days && Array.isArray(timingData.days)) {
      timingData.days.forEach((dayData: any) => {
        const dayKey = dayData.day.toLowerCase();
        this.schedule[`${dayKey}_day`] = dayData.day;
        this.schedule[`${dayKey}_start_time`] = dayData.start_time || '09:00';
        this.schedule[`${dayKey}_end_time`] = dayData.end_time || '17:00';
        this.schedule[`${dayKey}_status`] = dayData.status || 'active';
        this.schedule[`${dayKey}_24h`] = dayData.is_24h || false;
        this.schedule[`${dayKey}_open`] = dayData.is_open || true;
        this.schedule[`${dayKey}_off_day`] = dayData.is_off_day || false;
        this.schedule[`${dayKey}_break_times`] = dayData.break_times || [];
      });
    }

    // Sync the data to timingsJson
    this.syncScheduleToTimingsJson();
  }

  syncScheduleToTimingsJson() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.timingsJson = days.map((day) => ({
      day: this.schedule[`${day}_day`],
      day_type: this.schedule[`${day}_day_type`],
      start_time: this.schedule[`${day}_start_time`],
      end_time: this.schedule[`${day}_end_time`],
      status: this.schedule[`${day}_status`],
      is_24h: this.schedule[`${day}_24h`],
      is_open: this.schedule[`${day}_open`],
      is_off_day: this.schedule[`${day}_off_day`],
      break_times: this.schedule[`${day}_break_times`] || []
    }));
  }

  async submitTiming() {
    // Validate timing fields
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const missingFields = [];
    for (const day of days) {
      const startTime = this.schedule[`${day}_start_time`];
      const endTime = this.schedule[`${day}_end_time`];
      const status = this.schedule[`${day}_status`];
      if (!startTime || !endTime || !status) {
        missingFields.push(day.charAt(0).toUpperCase() + day.slice(1));
      }
    }
    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in timing for the following days: ${missingFields.join(', ')}`);
      return;
    }
    // Validate time format and logic
    for (const day of days) {
      const startTime = this.schedule[`${day}_start_time`];
      const endTime = this.schedule[`${day}_end_time`];
      if (startTime >= endTime) {
        this.utility.presentFailureToast(`${day.charAt(0).toUpperCase() + day.slice(1)}: End time must be after start time`);
        return;
      }
    }
    // Build payload for backend
    const payload = {
      global: {
        start_time: this.globalStartTime,
        end_time: this.globalEndTime,
        day_type: this.globalDayType,
        is_24h: this.global24h,
        break_times: this.globalBreakTimes
      },
      days: days.map(day => ({
        day: this.schedule[`${day}_day`],
        start_time: this.schedule[`${day}_start_time`],
        end_time: this.schedule[`${day}_end_time`],
        status: this.schedule[`${day}_status`],
        is_24h: this.schedule[`${day}_24h`],
        is_open: this.schedule[`${day}_open`],
        is_off_day: this.schedule[`${day}_off_day`],
        break_times: this.schedule[`${day}_break_times`] || []
      }))
    };
    const wrappedPayload = { timing: payload };
    console.log('Timing wrapped payload:', wrappedPayload);
    // Submit timing info via new API call
    const res = await this.network.addTimingSettings(wrappedPayload);
    console.log(res)
  }

  applyToAllDays() {


    



    let targetDays: string[] = [];
    if (this.globalDayType === 'week_days') {
      targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    } else if (this.globalDayType === 'weekends') {
      targetDays = ['saturday', 'sunday'];
    } else if (this.globalDayType === 'all') {
      targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    }

    targetDays.forEach((day) => {
      if (this.global24h) {
        this.schedule[`${day}_24h`] = true;
        this.schedule[`${day}_start_time`] = '00:00';
        this.schedule[`${day}_end_time`] = '23:59';
        this.schedule[`${day}_open`] = true;
        this.schedule[`${day}_off_day`] = false;
      } else if (this.globalOffDay) {
        this.schedule[`${day}_24h`] = false;
        this.schedule[`${day}_open`] = false;
        this.schedule[`${day}_off_day`] = true;
      } else {
        this.schedule[`${day}_24h`] = false;
        this.schedule[`${day}_open`] = true;
        this.schedule[`${day}_off_day`] = false;
        this.schedule[`${day}_start_time`] = this.globalStartTime;
        this.schedule[`${day}_end_time`] = this.globalEndTime;
      }
      this.schedule[`${day}_day_type`] = this.globalDayType;
      this.schedule[`${day}_break_times`] = this.globalBreakTimes.map(breakTime => ({ ...breakTime }));
    });
    this.syncScheduleToTimingsJson();
    if (this.utility && typeof this.utility.presentSuccessToast === 'function') {
      const dayTypeText = this.globalDayType === 'week_days' ? 'Week Days (Monday-Friday)' : this.globalDayType === 'weekends' ? 'Weekends (Saturday-Sunday)' : 'All Days';
      this.utility.presentSuccessToast(`Settings applied to ${dayTypeText} successfully!`);
    }
  }

  // toggleGlobal24h() {
  //   console.log('it is not being toggle')
  //   let targetDays: string[] = [];
  //   if (this.globalDayType === 'week_days') {
  //     targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  //   } else if (this.globalDayType === 'weekends') {
  //     targetDays = ['saturday', 'sunday'];
  //   } else if (this.globalDayType === 'all') {
  //     targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  //   }
  //   targetDays.forEach(day => {
  //     this.schedule[`${day}_24h`] = this.global24h;
  //     if (this.global24h) {
  //       this.schedule[`${day}_start_time`] = '00:00';
  //       this.schedule[`${day}_end_time`] = '23:59';
  //     } else {
  //       this.schedule[`${day}_start_time`] = this.globalStartTime;
  //       this.schedule[`${day}_end_time`] = this.globalEndTime;
  //     }
  //   });
  // }

  toggleGlobalOffDay() {
    this.globalOffDay = !this.globalOffDay;
  }

  addGlobalBreak() {
    this.globalBreakTimes.push({ start: '12:00', end: '13:00' });
  }

  removeGlobalBreak(index: number) {
    this.globalBreakTimes.splice(index, 1);
  }

  toggle24h(day: string) {
    this.schedule[`${day}_24h`] = !this.schedule[`${day}_24h`];
    if (this.schedule[`${day}_24h`]) {
      this.schedule[`${day}_start_time`] = '00:00';
      this.schedule[`${day}_end_time`] = '23:59';
    }
    this.syncGlobal24hWithDays();
  }

  toggleOffDay(day: string) {
    this.schedule[`${day}_off_day`] = !this.schedule[`${day}_off_day`];
    if (this.schedule[`${day}_off_day`]) {
      this.schedule[`${day}_open`] = false;
      this.schedule[`${day}_24h`] = false;
    } else {
      this.schedule[`${day}_open`] = true;
      this.schedule[`${day}_24h`] = false;
      this.schedule[`${day}_start_time`] = this.globalStartTime;
      this.schedule[`${day}_end_time`] = this.globalEndTime;
    }
  }

  addBreakTime(day: string) {
    if (!this.schedule[`${day}_break_times`]) {
      this.schedule[`${day}_break_times`] = [];
    }
    this.schedule[`${day}_break_times`].push({ start: '12:00', end: '13:00' });
  }

  removeBreakTime(day: string, index: number) {
    this.schedule[`${day}_break_times`].splice(index, 1);
  }

  updateBreakTime(day: string, index: number, breakTime: { start: string; end: string }) {
    this.schedule[`${day}_break_times`][index] = breakTime;
  }

  syncGlobal24hWithDays() {
    let targetDays: string[] = [];
    if (this.globalDayType === 'week_days') {
      targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    } else if (this.globalDayType === 'weekends') {
      targetDays = ['saturday', 'sunday'];
    } else if (this.globalDayType === 'all') {
      targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    }
    this.global24h = targetDays.every(day => this.schedule[`${day}_24h`]);
  }

  toggleGlobal24h() {
    
  }
}
