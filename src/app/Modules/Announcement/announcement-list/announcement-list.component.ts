import { ChangeDetectionStrategy,Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [RouterLink,MatExpansionModule],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementListComponent {
  readonly panelOpenState = signal(false);

  
}
