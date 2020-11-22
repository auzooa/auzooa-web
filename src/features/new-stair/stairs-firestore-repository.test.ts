import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito'
import { Firebase } from '../../core/firebase'
import { RxFire } from '../../core/rx-fire'
import firebase from 'firebase'
import { of } from 'rxjs'
import { StairsFirestoreRepository } from './stairs-firestore-repository'

describe('StairFirestoreRepository', () => {
  it('should create a stair', async () => {
    const { stairFirestoreRepository, documentReference } = setup()

    const actual = await stairFirestoreRepository.create('bar')

    expect(actual).toBe('foo')
    verify(documentReference.set(deepEqual({ name: 'bar' }))).once()
  })
})

function setup() {
  const firebase = mock<Firebase>()
  const firestore = mock<firebase.firestore.Firestore>()
  const collectionReference = mock<firebase.firestore.CollectionReference>()
  const documentReference = mock<firebase.firestore.DocumentReference>()

  when(firestore.collection('stairs')).thenReturn(instance(collectionReference))
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
    stairFirestoreRepository: new StairsFirestoreRepository(instance(firebase), instance(rxFire))
  }
}
