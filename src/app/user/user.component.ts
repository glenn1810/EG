import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {


  private subs: Subscription = new Subscription();

  userInfo$ = this.userService.currentUser$;
  currentUserId$ = this.userService.currentUserIdSelected$;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.subs.add(
      this.currentUserId$
        .pipe(
          tap(x => {
            this.userService.loadUser(x);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
