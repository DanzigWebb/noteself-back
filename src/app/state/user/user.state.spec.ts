import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './user.state';
import { UserActions } from "@state/user/user.actions";


describe('User actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new UserActions.Login({
      name: 'name',
      password: 'pass',
    }));
    store.select(state => state.user.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
