import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Subscription, Subject } from 'rxjs';
import { tap, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {


  private subs: Subscription = new Subscription();

  highLightSelectedUser = new Subject<number>();
  highLightSelectedUser$ = this.highLightSelectedUser.asObservable();


  constructor(private userService: UserService) { }
  loadUsers$ = this.userService.currentUsers$;

  ngOnInit(): void {
    this.userService.loadUsers();
    this.subs.add(
      this.highLightSelectedUser$
        .pipe(
          withLatestFrom(this.loadUsers$),
          map(([x, d]) => {
            d.map(user => {
              if (user.id == x)
                user.isSelected = true;
              else
                user.isSelected = false;
            })
          })
        ).subscribe()
    );
  }

  public userOnChanged(id: number): void {
    this.userService.getUser(id);
    this.highLightSelectedUser.next(id);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
