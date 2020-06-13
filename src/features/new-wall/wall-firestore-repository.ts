import { Observable, of } from 'rxjs'
import { RxFire } from '../../core/rx-fire'
import { switchMap, take, tap } from 'rxjs/operators'
import { WallRepository } from './wall-repository'
import { Id } from '../../core/types/id'
import { injectable } from '../../core/types/injectable'
import { Firebase } from '../../core/firebase'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import * as firebase from 'firebase'
import { Wall } from './wall'

@injectable()
export class WallFirestoreRepository implements WallRepository {
  private walls: firebase.firestore.CollectionReference

  constructor(
    @inject(TYPES.FIREBASE) private readonly firebase: Firebase,
    @inject(TYPES.RX_FIRE) private readonly rxFire: RxFire
  ) {
    this.walls = this.firebase.firestore().collection('walls')
  }

  create(name: string): Observable<Id> {
    return this.rxFire.doc(this.walls.doc()).pipe(
      take(1),
      tap(document => document.ref.set({ name })),
      switchMap(document => of(document.id))
    )
  }

  find(id: Id): Observable<Wall> {
    return this.rxFire.doc(this.walls.doc(id)).pipe(
      tap(console.warn),
      switchMap(x => of((x.data()! as unknown) as Wall))
    )
  }
}
