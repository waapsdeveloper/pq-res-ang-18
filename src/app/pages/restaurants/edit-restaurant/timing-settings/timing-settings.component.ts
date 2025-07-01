import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-timing-settings',
  templateUrl: './timing-settings.component.html',
  styleUrl: './timing-settings.component.scss'
})
export class TimingSettingsComponent {
  @Input() globalStartTime: any;
  @Input() globalEndTime: any;
  @Input() globalDayType: any;
  @Input() global24h: any;
  @Input() globalOffDay: any;
  @Input() globalBreakStart: any;
  @Input() globalBreakEnd: any;
  @Input() globalBreakTimes: any;
  @Input() model: any;
  @Input() timingsJson: any;
  @Input() restaurantId: any;
  @Input() toggleGlobal24h: any;
  @Input() toggleGlobalOffDay: any;
  @Input() applyToAllDays: any;
  @Input() addGlobalBreak: any;
  @Input() removeGlobalBreak: any;
  @Input() toggle24h: any;
  @Input() toggleOffDay: any;
  @Input() toggleOpen: any;
  @Input() addBreakTime: any;
  @Input() removeBreakTime: any;
  @Input() updateBreakTime: any;
  @Input() getBreakTimes: any;

  constructor(
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async submitTiming() {
    // Validate timing fields
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const missingFields = [];
    for (const day of days) {
      const startTime = this.model.schedule[`${day}_start_time`];
      const endTime = this.model.schedule[`${day}_end_time`];
      const status = this.model.schedule[`${day}_status`];
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
      const startTime = this.model.schedule[`${day}_start_time`];
      const endTime = this.model.schedule[`${day}_end_time`];
      if (startTime >= endTime) {
        this.utility.presentFailureToast(`${day.charAt(0).toUpperCase() + day.slice(1)}: End time must be after start time`);
        return;
      }
    }
    // Submit timing info via new API call
    try {
      const res = await this.network.updateTimingSettings(this.timingsJson, this.restaurantId);
      if (res) {
        this.utility.presentSuccessToast('Timing info updated!');
      } else {
        this.utility.presentFailureToast('Failed to update timing info.');
      }
    } catch (error) {
      this.utility.presentFailureToast('An error occurred while updating timing info.');
    }
  }
}
