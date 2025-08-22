import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class OrderExcelExportService {

  async exportOrdersExcel(data: any, type: 'daily' | 'monthly') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // --- Header Row
    worksheet.addRow(['Order no', 'time', 'type', 'status', 'tax', 'amount', 'total']);

    // Apply style to header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    });

    // --- Orders Data
    data.orders.forEach((order: any) => {
      worksheet.addRow([
        order.order_no,
        order.time,
        order.type,
        order.status,
        parseFloat(order.tax),
        parseFloat(order.tips),
        parseFloat(order.amount),
        parseFloat(order.total)
      ]);
    });

    // Empty row before totals
    worksheet.addRow([]);

    // --- Totals Row
    const totalsRow = worksheet.addRow([
      'Total',
      '',
      '',
      '',
      data.totals.total_tax,
      data.totals.tips,
      data.totals.total_sale,
      data.totals.grand_total
    ]);
    totalsRow.font = { bold: true };

    // --- Bottom Summary
    worksheet.addRow([]);
    worksheet.addRow(['', '', '', 'Total Sale', data.totals.total_sale]);
    worksheet.addRow(['', '', '', 'Total Tax', data.totals.total_tax]);
    worksheet.addRow(['', '', '', 'Total Tips', data.totals.tips]);
    worksheet.addRow(['', '', '', 'Total Discount', data.totals.total_discount]);
    worksheet.addRow(['', '', '', 'Grand Total', data.totals.grand_total]);

    // --- Column Widths
    worksheet.columns = [
      { key: 'order_no', width: 25 },
      { key: 'time', width: 20 },
      { key: 'type', width: 20 },
      { key: 'status', width: 15 },
      { key: 'tax', width: 12 },
      {key: 'tips', width: 12},
      { key: 'amount', width: 15 },
      { key: 'total', width: 15 }
    ];

    // --- Save File
    const buffer = await workbook.xlsx.writeBuffer();
const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

// --- Build filename
let fileName = '';
if (type === 'monthly') {
  fileName = `orders-monthly-${data.month}-${data.year}.xlsx`;
} else if (type === 'daily') {
  // if your API returns "date": "2025-08-22"
  const today = data.date ? data.date : new Date().toISOString().split('T')[0];
  fileName = `orders-daily-${today}.xlsx`;
}

// --- Save
saveAs(blob, fileName);

  }
}
