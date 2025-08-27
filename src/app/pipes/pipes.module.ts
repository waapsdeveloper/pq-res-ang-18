// src/app/pipes/pipes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPhonePipe } from './mask-phone.pipe';

@NgModule({
  declarations: [MaskPhonePipe],
  imports: [CommonModule],
  exports: [MaskPhonePipe] // <-- Important so other modules can use it
})
export class PipesModule {}
