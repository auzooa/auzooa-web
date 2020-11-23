import { Observable, of } from 'rxjs'
import { RxFire } from '../../core/rx-fire'
import { map, switchMap, take, tap } from 'rxjs/operators'
import { StairsRepository } from './stairs-repository'
import { Id } from '../../core/types/id'
import { injectable } from '../../core/types/injectable'
import { Firebase } from '../../core/firebase'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import firebase from 'firebase'
import { Stair } from '../stair'
import { Message } from '../message'

@injectable()
export class StairsFirestoreRepository implements StairsRepository {
  private stairs: firebase.firestore.CollectionReference = this.firebase
    .firestore()
    .collection('stairs')

  constructor(
    @inject(TYPES.FIREBASE) private readonly firebase: Firebase,
    @inject(TYPES.RX_FIRE) private readonly rxFire: RxFire
  ) {}

  create(name: string): Promise<Id> {
    return this.rxFire
      .doc(this.stairs.doc())
      .pipe(
        take(1),
        tap(document => document.ref.set({ name })),
        switchMap(document => of(document.id))
      )
      .toPromise()
  }

  find(id: Id): Promise<Stair> {
    return this.rxFire
      .doc(this.stairs.doc(id))
      .pipe(
        take(1),
        switchMap(x => of((x.data()! as unknown) as Stair))
      )
      .toPromise()
  }

  findMessages(id: Id): Observable<Message[]> {
    return this.rxFire.doc(this.stairs.doc(id)).pipe(
      switchMap(x => of((x.data()! as unknown) as Stair)),
      map(x => x.messages)
    )
  }
}
