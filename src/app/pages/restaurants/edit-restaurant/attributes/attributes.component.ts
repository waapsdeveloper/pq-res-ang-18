import { Component, Input, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.scss'
})
export class AttributesComponent implements OnInit {
  @Input() form: any;
  @Input() attributesField: any;
  @Input() model: any;
  @Input() restaurantId: any;
  
  loading: boolean = false;

  constructor(
    private network: NetworkService,
    private utility: UtilityService,
    private globalData: GlobalDataService
  ) {}

  ngOnInit() {
    this.loadMetaData();
  }

  async loadMetaData() {
    if (!this.restaurantId) {
      return;
    }

    try {
      this.loading = true;
      
      // Get meta data for restaurant_attributes key
      const response = await this.network.getRestaurantMeta(this.restaurantId, 'restaurant_attributes');
      
      if (response && response.meta && response.meta.meta_value) {
        try {
          // Parse the JSON string back to object
          const metaData = JSON.parse(response.meta.meta_value);
          
          // Define the allowed keys
          const allowedKeys = ['home_page_title', 'home_page_slider', 'copyright_text', 'google_map'];
          
          // Update the model with the loaded meta data for allowed keys only
          if (this.model) {
            allowedKeys.forEach(key => {
              if (metaData.hasOwnProperty(key)) {
                this.model[key] = metaData[key];
              }
            });
          }
          
          // Update form values to reflect the model changes
          if (this.form) {
            allowedKeys.forEach(key => {
              if (metaData.hasOwnProperty(key)) {
                const control = this.form.get(key);
                if (control) {
                  control.setValue(metaData[key]);
                }
              }
            });
          }
          
          console.log('Loaded meta data:', metaData);
          console.log('Updated model:', this.model);
        } catch (parseError) {
          console.error('Error parsing meta data JSON:', parseError);
        }
      }
      
    } catch (error) {
      console.error('Error loading meta data:', error);
      // Don't show error toast for loading, as it might be normal for new restaurants
    } finally {
      this.loading = false;
    }
  }

  async saveMetaData() {
    const allowedKeys = ['home_page_title', 'home_page_slider', 'copyright_text', 'google_map'];
    
    if (!this.restaurantId) {
      this.utility.presentFailureToast('Restaurant ID is required');
      return;
    }

    if (!this.model) {
      this.utility.presentFailureToast('Model not found');
      return;
    }

    try {
      this.loading = true;
      
      // Extract only the allowed keys from the model and create a single object
      const metaObject: any = {};
      
      allowedKeys.forEach(key => {
        const value = this.model[key];
        if (value !== null && value !== undefined && value !== '') {
          metaObject[key] = value;
        }
      });
      
      console.log(metaObject);
      // Send as single meta entry with JSON string value
      if (Object.keys(metaObject).length > 0) {
        await this.network.storeRestaurantMeta({
          meta_key: 'restaurant_attributes',
          meta_value: JSON.stringify(metaObject)
        }, this.restaurantId);
      }
      
      this.utility.presentSuccessToast('Attributes saved successfully');
      
    } catch (error) {
      console.error('Error saving meta data:', error);
      this.utility.presentFailureToast('Failed to save attributes');
    } finally {
      this.loading = false;
    }
  }
}
