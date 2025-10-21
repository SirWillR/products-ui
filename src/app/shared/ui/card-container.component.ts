import { Component } from '@angular/core';

@Component({
  selector: 'app-card-container',
  template: `
    <div class="bg-surface-50 p-20 w-fit min-w-full">
      <div class="bg-surface-0 p-6 shadow rounded-2xl flex flex-col gap-4">
        <ng-content select="[header]" />
        <div class="flex flex-1">
          <div class="flex-1 border-1 border-surface-200 rounded-lg p-4">
            <ng-content select="[body]" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CardContainerComponent {}
