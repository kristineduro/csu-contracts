// ================================================================
// FIREBASE SETUP
// ================================================================
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, doc,
  getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
  increment, setDoc, getDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBqIeD3XC5nLSdKkPMhkcUReU532GrMPyA",
  authDomain: "gso-contracts.firebaseapp.com",
  projectId: "gso-contracts",
  storageBucket: "gso-contracts.firebasestorage.app",
  messagingSenderId: "461401507866",
  appId: "1:461401507866:web:45786a3bb80b10d3afe9a3"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)


// ================================================================
// CONTRACTS
// ================================================================

export async function getAllContracts(filters) {
  const q = query(collection(db, 'contracts'), orderBy('created_at', 'desc'))
  const snap = await getDocs(q)

  let rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  if (filters?.search) {
    const s = filters.search.toLowerCase()
    rows = rows.filter(c =>
      (c.last_name || '').toLowerCase().includes(s) ||
      (c.first_name || '').toLowerCase().includes(s) ||
      (c.contract_no || '').toLowerCase().includes(s)
    )
  }

  if (filters?.status) {
    rows = rows.filter(c => c.status === filters.status)
  }

  return rows
}


export async function createContract(data) {
  const year = new Date().getFullYear()
  const counterRef = doc(db, 'counters', 'contracts_' + year)

  const counterSnap = await getDoc(counterRef)

  let nextNumber = 1

  if (counterSnap.exists()) {
    nextNumber = counterSnap.data().count + 1
    await setDoc(counterRef, { count: increment(1) }, { merge: true })
  } else {
    await setDoc(counterRef, { count: 1 })
  }

  const contract_no =
    'GSO-' + year + '-' + String(nextNumber).padStart(3, '0')

  const ref = await addDoc(collection(db, 'contracts'), {
    ...data,
    contract_no,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  })

  return { id: ref.id, contract_no, ...data }
}


export async function updateContract(id, data) {
  await updateDoc(doc(db, 'contracts', id), {
    ...data,
    updated_at: serverTimestamp()
  })
}


export async function deleteContract(id) {
  await deleteDoc(doc(db, 'contracts', id))
}


// ================================================================
// FAST STATS
// ================================================================

export async function getStats() {
  const snap = await getDocs(collection(db, 'contracts'))

  let total = 0
  let active = 0
  let draft = 0
  let expired = 0
  let terminated = 0

  snap.forEach(doc => {
    total++
    const status = doc.data().status
    if (status === 'active') active++
    if (status === 'draft') draft++
    if (status === 'expired') expired++
    if (status === 'terminated') terminated++
  })

  return { total, active, draft, expired, terminated }
}


// ================================================================
// SAVED FILES
// ================================================================

export async function getSavedFiles(contractId) {
  const q = query(
    collection(db, 'contracts', contractId, 'saved_files'),
    orderBy('saved_at', 'desc')
  )

  const snap = await getDocs(q)

  return snap.docs.map(d => {
    const data = d.data()
    let displayDate = 'Saved'

    if (data.saved_at?.toDate) {
      displayDate = data.saved_at.toDate().toLocaleString('en-PH')
    }

    return { id: d.id, ...data, saved_at_display: displayDate }
  })
}

export async function addSavedFile(contractId, fileData) {
  const ref = await addDoc(
    collection(db, 'contracts', contractId, 'saved_files'),
    { ...fileData, saved_at: serverTimestamp() }
  )
  return ref.id
}

export async function deleteSavedFile(contractId, fileId) {
  await deleteDoc(doc(db, 'contracts', contractId, 'saved_files', fileId))
}