import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { sha256 } from 'js-sha256';
import { NetworkService } from './network.service';
import { UtilityService } from './utility.service'; // for toast/loader, etc

@Injectable({ providedIn: 'root' })
export class PrintingService {
  private connected = false;
  printerName = '';
  constructor(private network: NetworkService, private utility: UtilityService) {
    qz.api.setPromiseType((resolver: any) => new Promise(resolver));
    qz.api.setSha256Type((data: string) => sha256(data));

    // Provide certificate from Laravel
    qz.security.setCertificatePromise((resolve, reject) => {
      this.network.getQzCertificate()
        .then((res: any) => resolve(res.data))
        .catch(() => reject('Certificate fetch failed'));
    });

    // Provide signature from Laravel
    qz.security.setSignaturePromise(toSign => (resolve, reject) => {
      this.network.signQzMessage({ request: toSign })
        .then((res: any) => resolve(res.data))
        .catch(() => reject('Signature failed'));
    });
  }

  private async ensureConnected(): Promise<boolean> {
    if (this.connected && qz.websocket.isActive()) return true;
    try {
      await qz.websocket.connect();
      this.printerName = await qz.printers.getDefault();
      console.log('Connected to QZ Tray. Default printer:', this.printerName);
      
      this.connected = true;
      return true;
    } catch (err) {
      console.error('QZ connect failed:', err);
      this.utility.presentFailureToast('Printer connection failed');
      return false;
    }
  }

  private getConfig(printer?: string) {
    const name = printer || localStorage.getItem('qzPrinter');
    if (!name) {
      this.utility.presentFailureToast('No printer selected');
      throw new Error('No printer selected');
    }
   const printerConfig = qz.configs.create(this.printerName, {
  size: { width: 80, height: null }, // force width to 80mm, auto height
  units: 'mm',                       // make sure units are in millimeters
  orientation: 'portrait',
  copies: 1,
  margins: { top: 0, right: 0, bottom: 0, left: 0 } // no margins for thermal
});

  }

  // Print PDF directly from blob or URL
  async printPdf(pdfUrlOrBlob: string | Blob): Promise<boolean> {
    if (!(await this.ensureConnected())) return false;

    try {
      const cfg = this.getConfig(this.printerName);

      const data = [{
        type: 'pdf',
        format: pdfUrlOrBlob instanceof Blob ? 'base64' : 'file',
        data: pdfUrlOrBlob instanceof Blob
          ? await this.blobToBase64(pdfUrlOrBlob)
          : pdfUrlOrBlob
      }];

      await qz.print(cfg, data);
      return true;
    } catch (err) {
      console.error('PDF print error:', err);
      this.utility.presentFailureToast('Failed to print PDF');
      return false;
    }
  }

  // Print HTML directly
  async printHtml(html: string, printer?: string): Promise<boolean> {
    if (!(await this.ensureConnected())) return false;

    try {
      const cfg = this.getConfig(printer);
      const data = [{
        type: 'html',
        format: 'plain',
        data: html,
        options: {
          pageWidth: 80,
          units: 'mm',
          margins: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      }];
      await qz.print(cfg, data);
      return true;
    } catch (err) {
      console.error('HTML print error:', err);
      this.utility.presentFailureToast('Failed to print slip');
      return false;
    }
  }

  // Helper: Blob → Base64
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
