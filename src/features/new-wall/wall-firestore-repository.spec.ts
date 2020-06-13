import { WallFirestoreRepository } from './wall-firestore-repository'
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito'
import { Firebase } from '../../core/firebase'
import { RxFire } from '../../core/rx-fire'
import * as firebase from 'firebase'
import { of } from 'rxjs'
import { take } from 'rxjs/operators'

describe('WallFirestoreRepository', () => {
  it('should create a wall', async () => {
    const { wallFirestoreRepository, documentReference } = setup()

    const actual = await wallFirestoreRepository.create('bar').pipe(take(1)).toPromise()

    expect(actual).toBe('foo')
    verify(documentReference.set(deepEqual({ name: 'bar' }))).once()
  })
})

function setup() {
  const firebase = mock<Firebase>()
  const firestore = mock<firebase.firestore.Firestore>()
  const collectionReference = mock<firebase.firestore.CollectionReference>()
  const documentReference = mock<firebase.firestore.DocumentReference>()

  when(firestore.collection('walls')).thenReturn(instance(collectionReference))
  when(collectionReference.doc()).thenReturn(instance(documentReference))
  when(firebase.firestore()).thenReturn(instance(firestore))

  const rxFire = mock<RxFire>()

  when(rxFire.doc(anything())).thenReturn(
    of({ id: 'foo', ref: instance(documentReference) } as any)
  )

  return {
    firebase,
    rxFire,
    documentReference,
    wallFirestoreRepository: new WallFirestoreRepository(instance(firebase), instance(rxFire))
  }
}
