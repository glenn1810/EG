import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = { email: '', id: 0, name: '', phone: '', isSelected: false };
  

  private userIdSource = new Subject<number>();
  currentUserIdSelected$ = this.userIdSource.asObservable();

  private userSource = new BehaviorSubject<User>(this.user);
  currentUser$ = this.userSource.asObservable();

  private usersSource = new Subject<User[]>();
  currentUsers$ = this.usersSource.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  public loadUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";
    this.httpClient.get<User[]>(url)
      .subscribe(x => {
        this.setDefaultHighlightStatus(x);
        this.usersSource.next(x);
      })
  }

  public loadUser(id: number) {
    const url = "https://jsonplaceholder.typicode.com/users/";
    this.httpClient.get<User>(url + id)
      .subscribe(x => {
        x.isSelected = true;
        this.userSource.next(x);
      });
  }

  public getUser(id: number) {
    this.userIdSource.next(id);
  }

  private setDefaultHighlightStatus(users: User[]): void {
    for (var i = 0; i < users.length; i++) {
      users[i].isSelected = false;
    }
  }

}
