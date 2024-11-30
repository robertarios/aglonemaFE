import React, { useState } from "react";

const Panduan = () => {
  const [openSection, setOpenSection] = useState(null); // State untuk menentukan bagian mana yang terbuka

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index); // Toggle section yang diklik
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[black] text-left">
        Panduan Lengkap Manajemen Gudang
      </h1>

      {/* Bagian 1: Menambah Produk */}
      <div className="mt-6">
        <div>
          <button
            className="text-xl font-semibold text-gray-700 w-full text-left flex justify-between items-center bg-[#44746c] text-white py-2 px-4 rounded-md mt-2 cursor-pointer"
            onClick={() => toggleSection(1)}
          >
            1. Menambah Produk
            <span>{openSection === 1 ? "−" : "+"}</span>
          </button>
          {openSection === 1 && (
            <div className="mt-2 text-gray-600 pl-4 text-left">
              <p>
                Untuk menambah produk ke dalam sistem, klik tombol "Tambah
                Produk" di halaman Gudang, lalu isi detail produk. Berikut
                adalah langkah-langkah untuk mengisi detail produk:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Nama Produk:</strong> Masukkan nama produk yang ingin
                  Anda tambahkan. Misalnya: "Mangga", "Apel Fuji". Pastikan nama
                  produk sesuai dengan yang ada di pasar.
                </li>
                <li>
                  <strong>Kode Produk:</strong> Masukkan kode unik untuk produk
                  ini. Kode produk memudahkan identifikasi, seperti "MNG-001"
                  atau "APL-002".
                </li>
                <li>
                  <strong>Kategori Produk:</strong> Pilih kategori yang sesuai,
                  misalnya "Buah", "Sayur", atau "Produk Tahan Lama". Pastikan
                  produk dikelompokkan dengan benar untuk kemudahan pencarian.
                </li>
                <li>
                  <strong>Jumlah Stok:</strong> Isi dengan jumlah stok produk
                  yang tersedia. Misalnya, jika ada 50 buah Mangga, maka jumlah
                  stok adalah "50".
                </li>
                <li>
                  <strong>Harga Satuan:</strong> Masukkan harga per unit produk.
                  Misalnya, harga per buah Mangga adalah "Rp 5.000".
                </li>
                <li>
                  <strong>Masa Kadaluarsa:</strong> Untuk produk yang memiliki
                  kadaluarsa, masukkan tanggal kadaluarsa dalam format
                  "DD/MM/YYYY". Misalnya: "31/12/2024".
                </li>
                <li>
                  <strong>Deskripsi Produk:</strong> Berikan deskripsi singkat
                  tentang produk, misalnya: "Mangga ini berasal dari Kebun XYZ,
                  memiliki rasa manis dan segar, cocok untuk jus atau dimakan
                  langsung."
                </li>
                <li>
                  <strong>Gambar Produk:</strong> Upload gambar produk yang
                  jelas agar mudah dikenali di sistem.
                </li>
              </ul>
              <p>
                Setelah mengisi semua informasi dengan benar, klik tombol
                "Simpan" untuk menambahkan produk ke dalam sistem.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian 2: Mengelola Stok */}
      <div className="mt-6">
        <div>
          <button
            className="text-xl font-semibold text-gray-700 w-full text-left flex justify-between items-center bg-[#44746c] text-white py-2 px-4 rounded-md mt-2 cursor-pointer"
            onClick={() => toggleSection(2)}
          >
            2. Mengelola Stok
            <span>{openSection === 2 ? "−" : "+"}</span>
          </button>
          {openSection === 2 && (
            <div className="mt-2 text-gray-600 pl-4 text-left">
              <p>
                Untuk mengelola stok produk di gudang, Anda perlu memantau
                jumlah stok yang ada dan melakukan pembaruan secara berkala.
                Berikut adalah langkah-langkah yang perlu Anda lakukan:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Memeriksa Stok Tersedia:</strong> Di halaman Gudang,
                  Anda akan melihat daftar semua produk yang tersedia. Setiap
                  produk akan menampilkan informasi tentang jumlah stok yang
                  tersisa. Pastikan untuk memeriksa stok secara rutin.
                </li>
                <li>
                  <strong>Menambahkan Stok Baru:</strong> Jika Anda menerima
                  pasokan baru, klik tombol "Tambah Stok" di halaman produk
                  terkait. Isi jumlah produk yang baru diterima, dan pastikan
                  untuk memasukkan tanggal penerimaan produk.
                </li>
                <li>
                  <strong>Memperbarui Stok:</strong> Jika terjadi pengurangan
                  stok karena penjualan atau penggunaan, klik tombol "Edit Stok"
                  pada produk terkait dan update jumlah stok yang tersedia.
                  Misalnya, jika ada 10 produk yang terjual, kurangi jumlah stok
                  yang ada.
                </li>
                <li>
                  <strong>Menandai Produk yang Habis:</strong> Jika produk sudah
                  habis atau tidak tersedia lagi, Anda dapat menandainya dengan
                  status "Habis" untuk memudahkan pencarian dan untuk
                  menghindari kebingungannya.
                </li>
                <li>
                  <strong>Memantau Stok yang Dekat Kadaluarsa:</strong> Pastikan
                  untuk memantau produk yang mendekati masa kadaluarsa. Anda
                  akan melihat peringatan pada halaman Gudang jika produk
                  tersebut akan segera kadaluarsa. Segera lakukan tindakan yang
                  diperlukan untuk menangani produk tersebut.
                </li>
                <li>
                  <strong>Stok Minimum dan Pemesanan:</strong> Tentukan stok
                  minimum untuk setiap produk. Jika stok mencapai level minimum,
                  sistem akan memberi peringatan untuk melakukan pemesanan ulang
                  produk tersebut untuk menjaga ketersediaan barang di gudang.
                </li>
              </ul>
              <p>
                Selalu pastikan bahwa data stok yang ada di sistem mencerminkan
                keadaan stok di gudang secara akurat untuk menghindari kesalahan
                dalam pengelolaan produk.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian 3: Pengecekan Masa Kadaluarsa */}
      <div className="mt-6">
        <div>
          <button
            className="text-xl font-semibold text-gray-700 w-full text-left flex justify-between items-center bg-[#44746c] text-white py-2 px-4 rounded-md mt-2 cursor-pointer"
            onClick={() => toggleSection(3)}
          >
            3. Pengecekan Masa Kadaluarsa
            <span>{openSection === 3 ? "−" : "+"}</span>
          </button>
          {openSection === 3 && (
            <div className="mt-2 text-gray-600 pl-4 text-left">
              <p>
                Produk yang mendekati masa kadaluarsa membutuhkan perhatian
                khusus untuk menghindari kerugian atau masalah terkait keamanan
                produk. Berikut adalah langkah-langkah yang harus dilakukan:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Peringatan Kadaluarsa:</strong> Pada halaman Gudang,
                  sistem akan memberikan peringatan untuk produk yang akan
                  kadaluarsa dalam waktu dekat. Produk yang mendekati tanggal
                  kadaluarsa akan ditandai dengan warna atau label khusus agar
                  mudah dikenali.
                </li>
                <li>
                  <strong>Pemeriksaan Manual:</strong> Selain menggunakan
                  peringatan otomatis, lakukan pemeriksaan manual pada produk
                  yang ada di gudang. Periksa tanggal kadaluarsa pada kemasan
                  produk untuk memastikan bahwa produk tersebut masih dapat
                  digunakan atau perlu segera diproses.
                </li>
                <li>
                  <strong>Tindakan yang Diperlukan:</strong> Jika produk
                  mendekati kadaluarsa, pastikan untuk melakukan tindakan sesuai
                  dengan prosedur yang telah ditentukan, seperti menjual produk
                  tersebut dengan potongan harga, mendonasikan produk, atau
                  membuang produk yang tidak dapat dijual atau digunakan lagi.
                </li>
                <li>
                  <strong>Update Status Produk:</strong> Setelah mengambil
                  tindakan terhadap produk yang mendekati kadaluarsa, pastikan
                  untuk memperbarui status produk di sistem agar informasi yang
                  tercatat tetap akurat. Misalnya, jika produk sudah terjual
                  atau dibuang, tandai produk tersebut sebagai "Dihapus" atau
                  "Terjual" di halaman Gudang.
                </li>
                <li>
                  <strong>Penyusunan Ulang Stok:</strong> Setelah menangani
                  produk kadaluarsa, pastikan untuk menyusun ulang stok yang ada
                  di gudang agar produk yang masih baru dan memiliki masa
                  kadaluarsa lebih lama dapat diprioritaskan untuk penempatan di
                  rak depan atau yang lebih mudah dijangkau.
                </li>
                <li>
                  <strong>Laporan Kadaluarsa:</strong> Buat laporan rutin
                  terkait produk yang mendekati masa kadaluarsa untuk memantau
                  dan mencegah kerugian akibat produk yang tidak terjual.
                  Laporan ini dapat membantu tim pengelola gudang dalam
                  mengambil keputusan yang lebih baik ke depannya.
                </li>
              </ul>
              <p>
                Dengan melakukan pengecekan secara rutin terhadap produk yang
                mendekati kadaluarsa, Anda dapat meminimalkan kerugian dan
                menjaga kualitas produk yang ada di gudang.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian 4: Mengelola Notifikasi */}
      <div className="mt-6">
        <div>
          <button
            className="text-xl font-semibold text-gray-700 w-full text-left flex justify-between items-center bg-[#44746c] text-white py-2 px-4 rounded-md mt-2 cursor-pointer"
            onClick={() => toggleSection(4)}
          >
            4. Mengelola Notifikasi
            <span>{openSection === 4 ? "−" : "+"}</span>
          </button>
          {openSection === 4 && (
            <div className="mt-2 text-gray-600 pl-4 text-left">
              <p>
                Pastikan untuk memeriksa notifikasi yang muncul, dan tandai
                sebagai dibaca setelah mengambil tindakan yang diperlukan.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian 5: Bantuan Tambahan */}
      <div className="mt-6">
        <div>
          <button
            className="text-xl font-semibold text-gray-700 w-full text-left flex justify-between items-center bg-[#44746c] text-white py-2 px-4 rounded-md mt-2 cursor-pointer"
            onClick={() => toggleSection(5)}
          >
            5. Bantuan Tambahan
            <span>{openSection === 5 ? "−" : "+"}</span>
          </button>
          {openSection === 5 && (
            <div className="mt-2 text-gray-600 pl-4 text-left">
              <p>
                Jika Anda membutuhkan bantuan lebih lanjut atau memiliki
                pertanyaan, Anda dapat menghubungi tim support kami melalui:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>WhatsApp:</strong> Hubungi kami di{" "}
                  <a href="https://wa.me/1234567890" className="text-[#44746c]">
                    +62 123 456 7890
                  </a>{" "}
                  untuk dukungan langsung.
                </li>
                <li>
                  <strong>Email:</strong> Kirim email ke{" "}
                  <a
                    href="mailto:aglonema@gmail.com"
                    className="text-[#44746c]"
                  >
                    aglonema@gmail.com
                  </a>{" "}
                  untuk pertanyaan atau bantuan lebih lanjut.
                </li>
              </ul>
              <p>
                Tim support kami siap membantu Anda dengan masalah atau
                pertanyaan yang Anda miliki.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panduan;
