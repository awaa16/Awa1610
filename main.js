import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
    authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
    projectId: "insan-cemerlang-92ee0",
    storageBucket: "insan-cemerlang-92ee0.appspot.com",
    messagingSenderId: "332441427242",
    appId: "1:332441427242:web:73c31309147ef1dab15253",
    measurementId: "G-JW04DZL85R"
  };
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarProduk() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahProduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('Berhasil menambah produk ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah produk ' + e);
  }
}

export async function hapusProduk(docid) {
  await deleteDoc(doc(db, "produk", docid));
}
export async function ubahProduk(docId, nama, harga, stok) {
  await updateDoc(doc(db, "produk", docId), {
    nama: nama,
    harga: harga,
    stok: stok
  });
}

export async function ambilProduk(docId) {
  const docRef = await doc(db, "produk", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}