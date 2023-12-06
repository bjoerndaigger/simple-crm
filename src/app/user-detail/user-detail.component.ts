import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('GOT ID', this.userId);
    this.getUser(this.userId);
  }

  async getUser(userId: string) {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      console.log('User data:', userDoc.data());
      this.user = new User(userDoc.data());
      console.log('User Object', this.user);
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }
}






