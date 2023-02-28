import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Viewing } from 'src/app/models/viewing.model';
import { ViewingService } from 'src/app/services/viewing.service';

@Component({
  selector: 'app-viewings',
  templateUrl: './viewings.component.html',
  styleUrls: ['./viewings.component.css'],
})
export class ViewingsComponent implements OnInit {
  viewings$?: Observable<Viewing[]>;

  constructor(public viewingService: ViewingService) {}

  ngOnInit(): void {
    this.viewings$ = this.viewingService.getViewings();
  }

  deleteViewing(id: number): void {
    this.viewingService.deleteViewing(id).subscribe(() => this.viewings$ = this.viewingService.getViewings());
  }
}
