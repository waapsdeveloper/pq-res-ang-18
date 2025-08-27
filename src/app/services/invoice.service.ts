import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { from, Observable } from 'rxjs';

export interface InvoiceState {
  restaurant_id: number;
  footer_text: string;
  size: number;
  font_size: number;
  left_margin: number;
  right_margin: number;
  invoice_logo: string;
  google_review_barcode: string;
  google_review_bar_code_base64: string;
  restaurant_address: string;
  invoice_base64: string;
}
@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends NgSimpleStateBaseRxjsStore<InvoiceState> {
  private restaurantId: string | null = null;
  constructor(private network: NetworkService) {
    super();
    // Force state initialization and storage registration
    this.setState(this.initialState());
    this.selectState(() => { }); // touch the state to ensure NgSimpleState registers it
  }
  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'InvoiceState',

    };
  }
  protected initialState(): InvoiceState {
    return {
      restaurant_id: 1,
      footer_text: '',
      size: 0,
      font_size: 0,
      left_margin: 0,
      right_margin: 0,
      invoice_logo: '',
      google_review_barcode: '',
      google_review_bar_code_base64: '',
      restaurant_address: '',
      invoice_base64: ''
    };
  }



  /** -------------------- Setters -------------------- */
  setRestaurantId(id: number): void {
    this.restaurantId = id.toString();
    this.setState((state) => ({ restaurant_id: id }));
  }

  setInvoiceLogo(value: string) { this.setState({ invoice_logo: value }); }
  setSize(value: number) { this.setState({ size: value }); }
  setLeftMargin(value: number) { this.setState({ left_margin: value }); }
  setRightMargin(value: number) { this.setState({ right_margin: value }); }
  setGoogleReviewBarcode(value: string | null) { this.setState({ google_review_barcode: value }); }
  setFooterText(value: string) { this.setState({ footer_text: value }); }
  setRestaurantAddress(value: string) { this.setState({ restaurant_address: value }); }
  setFontSize(value: number) { this.setState({ font_size: value }); }
  setGoogleReviewBarcodeBase64(value: string) { this.setState({ google_review_bar_code_base64: value }); }
  setInvoiceBase64(value: string) { this.setState({ invoice_base64: value }); }

  /** -------------------- Getters -------------------- */
  getRestaurantId(): Observable<number> { return this.selectState(state => state.restaurant_id); }
  getInvoiceLogo(): Observable<string> { return this.selectState(state => state.invoice_logo); }
  getSize(): Observable<number> { return this.selectState(state => state.size); }
  getLeftMargin(): Observable<number> { return this.selectState(state => state.left_margin); }
  getRightMargin(): Observable<number> { return this.selectState(state => state.right_margin); }
  getGoogleReviewBarcode(): Observable<string | null> { return this.selectState(state => state.google_review_barcode); }
  getFooterText(): Observable<string> { return this.selectState(state => state.footer_text); }
  getRestaurantAddress(): Observable<string> { return this.selectState(state => state.restaurant_address); }
  getFontSize(): Observable<number> { return this.selectState(state => state.font_size); }
  getGoogleReviewBarcodeBase64(): Observable<string> { return this.selectState(state => state.google_review_bar_code_base64); }
  getInvoiceBase64(): Observable<string> { return this.selectState(state => state.invoice_base64); }

  /** -------------------- Backend Fetch -------------------- */
  async fetchInvoiceData(restaurantId: number): Promise<InvoiceState> {
    // Fetch active restaurant from state or localStorage
    const activeRestaurantId = this.restaurantId || Number(localStorage.getItem('restaurant_id'));

    const res: any = await this.network.getInvoiceSettingById(restaurantId);
    const invoiceSettings = res?.invoice_setting;

    if (!invoiceSettings) throw new Error('No invoice settings found');

    // Parse numeric fields from API (removing 'mm' suffix if present)
    const parsedState: InvoiceState = {
      restaurant_id: restaurantId,
      invoice_logo: invoiceSettings.invoice_logo || '',
      footer_text: invoiceSettings.footer_text || '',
      size: invoiceSettings.size ? Number(invoiceSettings.size.replace('mm', '')) : 0,
      left_margin: invoiceSettings.left_margin ? Number(invoiceSettings.left_margin.replace('mm', '')) : 0,
      right_margin: invoiceSettings.right_margin ? Number(invoiceSettings.right_margin.replace('mm', '')) : 0,
      google_review_barcode: invoiceSettings.google_review_barcode || null,
      google_review_bar_code_base64: invoiceSettings.google_review_barcode_base64 || '',
      invoice_base64: invoiceSettings.invoice_logo_base64 || '', // empty for file input
      restaurant_address: invoiceSettings.restaurant_address || '',
      font_size: Number(invoiceSettings.font_size) || 0
    };

    // Only update state if requested restaurant is the active one
    if (activeRestaurantId === restaurantId) {
      this.setState(parsedState);
    }

    return parsedState;
  }
  fetchInvoiceDataObservable(restaurantId: number): Observable<InvoiceState> {
    return from(this.fetchInvoiceData(restaurantId));
  }

  updateInvoiceService(data) {
    this.setRestaurantId(data.restaurant_id);
    this.setFooterText(data.footer_text);
    this.setSize(Number(data.size.replace('mm', '')));
    this.setFontSize(Number(data.font_size));
    this.setLeftMargin(Number(data.left_margin.replace('mm', '')));
    this.setRightMargin(Number(data.right_margin.replace('mm', '')));
    this.setInvoiceLogo(data.invoice_logo);
    this.setGoogleReviewBarcode(data.google_review_barcode);
    this.setGoogleReviewBarcodeBase64(data.google_review_barcode_base64);
    this.setRestaurantAddress(data.restaurant_address);
    this.setInvoiceBase64(data.invoice_logo_base64);

  }

}