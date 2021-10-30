# Top 20 Movies
(Tugas GDSC ITB, Oleh M Isa Al Anshori dari Telkom University)

## This project has been updated with ReactJS :)
Versi terakhir tanpa framework terdapat pada commit [109ed32](https://github.com/misaalanshori/GDSC-Website-List-Movie/commit/109ed32620566250f8f738f4c85a613ca5a6aae0)

[Live Version Available Here!](https://misaalanshori.github.io/projects/GDSC-Website-List-Movie/html)

Website ini menampilkan 20 film dengan penilaian paling tinggi di IMDB. Fitur yang saya buat adalah daftar film, sebuah modal untuk detail film seperti tahun rilis, rating, dan deskripsi singkat film, dan ada juga kolom pencarian judul film. Semua data disini di load dari file json dan bisa dengan mudah diganti dengan API public atau backend. Semua data di render client-side. Desainnya simple-simple aja karena saya belum bisa design hehe.

Untuk kedepannya tetep pake data hardcoded di JSON, karena kayaknya kalau nyari api yang cocok ribet. Kalau hardcoded bikin sendiri kan udah diatur sendiri semua data yang diperlukan. Mungkin kapan kapan nyoba bikin backend jadi API-nya

## Info/notes about this project (mostly just for myself)
- Folder src tempat file js original
- Folder html tempat static files dan folder destinasi js yang di compile babel
- Jangan lupa, file js yang di edit itu yang di folder src bukan folder html
- Untuk compile js pakai perintah npm run babelwatch
- Dan untuk install modules jalankan npm install saat baru di clone

# Gambar

![Front Page](https://github.com/misaalanshori/GDSC-Website-List-Movie/blob/master/GHImg/mainpage.png?raw=true)

![Search Feature](https://github.com/misaalanshori/GDSC-Website-List-Movie/blob/master/GHImg/searchfeature.png?raw=true)

![Movie Modal](https://github.com/misaalanshori/GDSC-Website-List-Movie/blob/master/GHImg/modalfeature.png?raw=true)
