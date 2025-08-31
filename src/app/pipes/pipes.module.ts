// src/app/pipes/pipes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaskPhonePipe } from './mask-phone.pipe';
import { AppNumberPipe } from './app-number.pipe';

@NgModule({
  declarations: [MaskPhonePipe,AppNumberPipe],
  imports: [CommonModule],
  providers: [DecimalPipe],
  exports: [MaskPhonePipe,AppNumberPipe] // <-- Important so other modules can use it
})
export class PipesModule {}
