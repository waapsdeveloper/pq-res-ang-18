import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { NetworkService } from './network.service';

@Injectable({ providedIn: 'root' })
export class PrinterService {
  private initialized = false;
  private certificate: string | null = null;
  private signature: string | null = null;

  constructor(private network: NetworkService) {
    (window as any).qz = qz;
    this.setupSecurity();
  }

  private setupSecurity() {
    // Use arrow functions to preserve 'this' context
    qz.security.setCertificatePromise(() => {
      return new Promise((resolve, reject) => {
        if (this.certificate) {
          resolve(this.certificate);
        } else {
          this.network.getCertificate()
            .then((resp: any) => {
              this.certificate = resp?.certificate || "";
              resolve(this.certificate);
            })
            .catch(reject);
        }
      });
    });

    qz.security.setSignaturePromise((toSign: any) => {
      return new Promise((resolve, reject) => {
        this.network.signData(toSign)
          .then((resp: any) => {
            this.signature = resp?.signature || "";
            resolve(this.signature);
          })
          .catch(reject);
      });
    });
  }

  /** Connect to QZ Tray if not already connected */
  async init() {
    if (this.initialized) return;

    try {
      if (!qz.websocket.isActive()) {
        console.log("🔌 Connecting to QZ Tray...");
        await qz.websocket.connect().catch(err => {
          console.error("Failed to connect to QZ Tray:", err);
          throw new Error("Please ensure QZ Tray is installed and running");
        });
        console.log("✅ QZ Tray connected");
      }

      if (!this.certificate) {
        const response: any = await this.network.getCertificate();
        this.certificate = response?.certificate;
        console.log("📄 Certificate prefetched");
      }

      this.initialized = true;
    } catch (err) {
      console.error("❌ Initialization failed:", err);
      throw err;
    }
  }

  /** Print PDF to the default printer */
  async printPdf(dataUri: string) {
    try {
      await this.init();

      // Get the default printer directly
      let printer: string;
      try {
        printer = await qz.printers.getDefault();
        if (!printer) {
          throw new Error("No default printer found");
        }
        console.log(`📡 Using default printer: ${printer}`);
      } catch (err) {
        console.error("❌ Error getting default printer:", err);
        // Fallback to a known printer name
        printer = "Microsoft Print to PDF";
        console.warn(`⚠️ Using fallback printer: ${printer}`);
      }

      const config = qz.configs.create(printer, {
        size: { width: 80 }
      });

      // Add validation for dataUri
      if (!dataUri || !dataUri.includes(',')) {
        throw new Error("Invalid data URI format");
      }

      const base64 = dataUri.split(',')[1];
      const data = [{ type: 'pdf', format: 'base64', data: base64 }] as any;

      await qz.print(config, data);
      console.log("✅ Print job sent");
    } catch (err) {
      console.error("❌ Print error", err);
      throw err;
    }
  }

  /** Optional: disconnect safely */
  disconnect() {
    if (qz.websocket.isActive()) {
      qz.websocket.disconnect();
      console.log("🔌 QZ Tray disconnected");
    }
  }
}