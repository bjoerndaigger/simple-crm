import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent {

  userId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
      console.log('GOT ID', this.userId);
  }

}

