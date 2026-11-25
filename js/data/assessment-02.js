
/*
==========================================
MATHSPACE — ASSESSMENT 02
Topic: Kaidah Pencacahan

Presentation format:
1 Question = 1 Complete Slide

Content:
- Question
- Supporting information
- Calculations
- Conclusion

No answer input, quiz interaction, or scoring.
==========================================
*/


// ==========================================
// CONTENT HELPERS
// ==========================================

const heading = (content, level = 3) => ({
    type: "heading",
    level,
    content
});

const paragraph = (content) => ({
    type: "paragraph",
    content
});

const formula = (content) => ({
    type: "formula",
    content
});

const list = (items, ordered = false) => ({
    type: "list",
    ordered,
    items
});

const table = (headers, rows) => ({
    type: "table",
    headers,
    rows
});


// ==========================================
// ASSESSMENT DATA
// ==========================================

export const assessment02 = {

    id: "assessment-02",
    title: "Asesmen 2",
    subject: "Matematika",
    topic: "Kaidah Pencacahan",

    sections: [

        // ======================================
        // SECTION 1 — PERJALANAN ANTAR KOTA
        // ======================================

        {
            id: "section-road",

            title: "Perjalanan Antar Kota",

            sharedContentLabel: "Informasi Pendukung Soal 1 dan 2",

            sharedContentLayout: "two-column",

            sharedContent: [

                paragraph(
                    "Kota A, B, dan C berada di provinsi yang sama. Kota B berada di antara kota A dan kota C. Perjalanan dari kota A ke kota B dapat melewati 5 jalan, sedangkan perjalanan dari kota B ke kota C dapat melewati 3 jalan."
                ),

                {
                    type: "diagram",
                    diagram: "road-network",

                    alt: "Diagram jaringan jalan Kota A, B, dan C",

                    caption: "Jaringan jalan antarkota.",

                    data: {
                        cities: [
                            { id: "A", label: "Kota A" },
                            { id: "B", label: "Kota B" },
                            { id: "C", label: "Kota C" }
                        ],

                        roads: [
                            {
                                from: "A",
                                to: "B",
                                count: 5
                            },
                            {
                                from: "B",
                                to: "C",
                                count: 3
                            }
                        ]
                    }
                }
            ],

            questions: [

                // ==================================
                // SOAL 1
                // ==================================

                {
                    id: "question-01",
                    number: 1,
                    usesSharedContent: true,

                    slides: [
                        {
                            id: "q1-complete",
                            type: "question",
                            template: "question",

                            title: "Soal 1 — Perjalanan Pergi Pulang Dio",

                            blocks: [

                                paragraph(
                                    "Dio akan melakukan perjalanan pergi pulang dari kota A ke kota C melewati kota B. Banyak variasi jalan yang dapat dilewati Dio adalah ...."
                                ),

                                heading(
                                    "Menghitung Perjalanan Pergi Pulang Dio"
                                ),

                                paragraph(
                                    "Perjalanan pergi dilakukan dari A menuju B, kemudian B menuju C. Saat pulang, Dio melewati jalur sebaliknya. Karena tidak ada larangan menggunakan kembali jalan yang sama, semua pilihan jalan tetap tersedia."
                                ),

                                paragraph("Perjalanan pergi:"),

                                formula(
                                    String.raw`N_{\text{pergi}}=5\times3=15`
                                ),

                                paragraph("Perjalanan pulang:"),

                                formula(
                                    String.raw`N_{\text{pulang}}=3\times5=15`
                                ),

                                paragraph(
                                    "Setiap variasi perjalanan pergi dapat dipasangkan dengan setiap variasi perjalanan pulang."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N_{\text{total}}&=N_{\text{pergi}}\times N_{\text{pulang}}\\&=15\times15\\&=\boxed{225}\end{aligned}`
                                ),

                                heading("Kesimpulan"),

                                paragraph(
                                    "Jadi, terdapat 225 variasi perjalanan pergi-pulang yang dapat dilakukan Dio."
                                )
                            ]
                        }
                    ]
                },


                // ==================================
                // SOAL 2
                // ==================================

                {
                    id: "question-02",
                    number: 2,
                    usesSharedContent: true,

                    slides: [
                        {
                            id: "q2-complete",
                            type: "question",
                            template: "question",

                            title: "Soal 2 — Perjalanan Arga",

                            blocks: [

                                paragraph(
                                    "Arga tinggal di kota C. Arga akan pergi ke kota A melalui kota B, lalu kembali lagi ke kota C. Jika saat pulang Arga tidak melalui jalan yang sama, berapa banyak variasi jalan yang dapat dilalui Arga?"
                                ),

                                heading(
                                    "Menghitung Perjalanan Pergi Pulang Arga"
                                ),

                                paragraph(
                                    "Arga berangkat dari C menuju B, kemudian menuju A. Ketika pulang, jalan yang sudah digunakan tidak boleh digunakan kembali."
                                ),

                                paragraph("Perjalanan pergi:"),

                                formula(
                                    String.raw`N_{\text{pergi}}=3\times5=15`
                                ),

                                paragraph(
                                    "Ketika pulang, jumlah jalan yang tersedia berkurang karena satu jalan pada setiap jalur telah digunakan sebelumnya."
                                ),

                                list([
                                    "A ke B: 5 - 1 = 4 jalan tersisa.",
                                    "B ke C: 3 - 1 = 2 jalan tersisa."
                                ]),

                                paragraph("Perjalanan pulang:"),

                                formula(
                                    String.raw`N_{\text{pulang}}=4\times2=8`
                                ),

                                paragraph(
                                    "Gabungkan variasi perjalanan pergi dan pulang menggunakan aturan perkalian."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N_{\text{total}}&=N_{\text{pergi}}\times N_{\text{pulang}}\\&=15\times8\\&=\boxed{120}\end{aligned}`
                                ),

                                heading("Kesimpulan"),

                                paragraph(
                                    "Jadi, banyak variasi perjalanan Arga tanpa menggunakan kembali jalan yang sama adalah 120 variasi perjalanan."
                                )
                            ]
                        }
                    ]
                }
            ]
        },


        // ======================================
        // SECTION 2 — SUSUNAN TEMPAT DUDUK
        // ======================================

        {
            id: "section-round-table",

            title: "Susunan Tempat Duduk",

            sharedContentLabel: "Informasi Pendukung Soal 3",

            sharedContentLayout: "stack",

            sharedContent: [

                paragraph(
                    "Vito, ayah, ibu, serta dua adiknya, Rina dan Rani akan makan malam bersama di sebuah restoran. Mereka duduk di kursi yang mengelilingi meja bundar. Banyak kursi yang ada di meja tersebut sama dengan banyak anggota keluarga Vito."
                )
            ],

            questions: [

                // ==================================
                // SOAL 3
                // ==================================

                {
                    id: "question-03",
                    number: 3,
                    usesSharedContent: true,

                    slides: [
                        {
                            id: "q3-complete",
                            type: "question",
                            template: "question",

                            title: "Soal 3 — Susunan Tempat Duduk Melingkar",

                            blocks: [

                                paragraph(
                                    "Pernyataan berikut yang benar terkait banyak cara duduk Vito dan keluarganya adalah .... (Jawaban lebih dari satu)."
                                ),

                                list([
                                    "Jika ayah dan ibu harus duduk berdampingan, ada 12 cara mereka duduk.",
                                    "Jika Rani harus duduk di antara ayah dan ibu, ada 24 cara mereka duduk.",
                                    "Jika Vito harus duduk di antara Rina dan Rani, ada 4 cara mereka duduk.",
                                    "Jika Vito harus duduk di dekat ayah dan Rina harus duduk di dekat ibu, ada 4 cara mereka duduk.",
                                    "Jika Vito dan kedua adiknya harus duduk berdampingan, ada 12 cara mereka duduk."
                                ], true),

                                heading(
                                    "Menganalisis Susunan Tempat Duduk"
                                ),

                                paragraph(
                                    "Terdapat lima orang yang duduk mengelilingi meja bundar. Karena susunannya melingkar, rotasi dianggap menghasilkan susunan yang sama. Untuk menyelesaikan setiap kondisi, orang atau kelompok tertentu dapat dijadikan satu unit."
                                ),

                                formula(
                                    String.raw`P_{\text{melingkar}}=(n-1)!`
                                ),

                                // PERNYATAAN 1

                                heading(
                                    "Ayah dan Ibu Harus Berdampingan",
                                    4
                                ),

                                paragraph(
                                    "Anggap ayah dan ibu sebagai satu kelompok. Bersama Vito, Rina, dan Rani, terdapat empat unit yang disusun mengelilingi meja. Ayah dan ibu juga dapat bertukar posisi di dalam kelompok."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=(4-1)!\times2!\\&=3!\times2!\\&=6\times2\\&=\boxed{12}\end{aligned}`
                                ),

                                paragraph(
                                    "Hasilnya 12 cara. Jadi, pernyataan pertama benar."
                                ),

                                // PERNYATAAN 2

                                heading(
                                    "Rani Harus Duduk di Antara Ayah dan Ibu",
                                    4
                                ),

                                paragraph(
                                    "Ayah, Rani, dan ibu harus duduk berurutan dengan Rani di tengah. Kelompok tersebut memiliki dua susunan: Ayah–Rani–Ibu atau Ibu–Rani–Ayah. Bersama Vito dan Rina terdapat tiga unit yang disusun melingkar."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=(3-1)!\times2!\\&=2\times2\\&=\boxed{4}\end{aligned}`
                                ),

                                paragraph(
                                    "Hasilnya 4 cara, bukan 24 cara. Jadi, pernyataan kedua salah."
                                ),

                                // PERNYATAAN 3

                                heading(
                                    "Vito Harus Duduk di Antara Rina dan Rani",
                                    4
                                ),

                                paragraph(
                                    "Rina, Vito, dan Rani dianggap sebagai satu kelompok. Vito harus berada di tengah, sehingga kedua adiknya dapat bertukar tempat. Setelah dikelompokkan, terdapat tiga unit yang disusun melingkar."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=(3-1)!\times2!\\&=2\times2\\&=\boxed{4}\end{aligned}`
                                ),

                                paragraph(
                                    "Hasilnya 4 cara. Jadi, pernyataan ketiga benar."
                                ),

                                // PERNYATAAN 4

                                heading(
                                    "Vito Dekat Ayah dan Rina Dekat Ibu",
                                    4
                                ),

                                paragraph(
                                    "Kita tetapkan posisi Vito sebagai acuan agar susunan yang hanya berbeda akibat rotasi tidak dihitung berulang."
                                ),

                                paragraph(
                                    "Ayah memiliki dua pilihan kursi yang berdekatan dengan Vito. Setelah posisi ayah ditetapkan, tersisa tiga kursi berurutan untuk ibu, Rina, dan Rani."
                                ),

                                paragraph(
                                    "Dari tiga kursi tersebut, ibu dan Rina dapat menempati dua pasangan kursi yang berdekatan. Pada setiap pasangan terdapat dua kemungkinan urutan. Rani menempati kursi yang tersisa."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=2\times2\times2\\&=\boxed{8}\end{aligned}`
                                ),

                                paragraph(
                                    "Hasilnya 8 cara, bukan 4 cara. Jadi, pernyataan keempat salah."
                                ),

                                // PERNYATAAN 5

                                heading(
                                    "Vito dan Kedua Adiknya Harus Berdampingan",
                                    4
                                ),

                                paragraph(
                                    "Vito, Rina, dan Rani dianggap sebagai satu kelompok. Bersama ayah dan ibu terdapat tiga unit yang disusun mengelilingi meja. Ketiga orang dalam kelompok tersebut juga dapat bertukar posisi."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=(3-1)!\times3!\\&=2\times6\\&=\boxed{12}\end{aligned}`
                                ),

                                paragraph(
                                    "Hasilnya 12 cara. Jadi, pernyataan kelima benar."
                                ),

                                heading("Kesimpulan"),

                                table(
                                    ["Pernyataan", "Hasil", "Keterangan"],
                                    [
                                        ["1", "12 cara", "Benar"],
                                        ["2", "4 cara", "Salah"],
                                        ["3", "4 cara", "Benar"],
                                        ["4", "8 cara", "Salah"],
                                        ["5", "12 cara", "Benar"]
                                    ]
                                ),

                                paragraph(
                                    "Jadi, pernyataan yang benar adalah nomor 1, 3, dan 5."
                                )
                            ]
                        }
                    ]
                }
            ]
        },


        // ======================================
        // SECTION 3 — PASSWORD RUANG RAHASIA
        // ======================================

        {
            id: "section-password",

            title: "Password Ruang Rahasia",

            sharedContentLabel: "Informasi Pendukung Soal 4 dan 5",

            sharedContentLayout: "stack",

            sharedContent: [

                paragraph(
                    "Sebuah ruang rahasia memiliki password yang terdiri atas 4 huruf dan 2 angka untuk membuka pintu ruangan. Untuk membuat password tersebut disediakan pilihan berikut:"
                ),

                list([
                    "Angka prima kurang dari 10: 2, 3, 5, dan 7.",
                    "Huruf: b, c, r, s, t, a, dan v."
                ], true),

                paragraph(
                    "Catatan: Karena ketentuan pengulangan karakter tidak diberikan, perhitungan mengasumsikan setiap huruf dan angka hanya digunakan satu kali."
                )
            ],

            questions: [

                // ==================================
                // SOAL 4
                // ==================================

                {
                    id: "question-04",
                    number: 4,
                    usesSharedContent: true,

                    slides: [
                        {
                            id: "q4-complete",
                            type: "question",
                            template: "question",

                            title: "Soal 4 — Menyusun Password",

                            blocks: [

                                paragraph(
                                    "Pasangkan ketentuan dengan banyak password yang dapat disusun."
                                ),

                                list([
                                    "Angka harus ganjil dan huruf harus konsonan.",
                                    "Tanpa ketentuan angka dan huruf yang dipilih.",
                                    "Harus terdapat huruf vokal.",
                                    "Harus terdapat angka genap."
                                ], true),

                                heading("Pilihan Banyak Password", 4),

                                list([
                                    "86.400",
                                    "75.600",
                                    "32.400",
                                    "151.200",
                                    "34.600"
                                ]),

                                heading(
                                    "Menghitung Banyak Password Berdasarkan Ketentuan"
                                ),

                                paragraph(
                                    "Password terdiri atas enam karakter: empat huruf dan dua angka. Dua posisi angka dapat ditentukan dari enam posisi yang tersedia."
                                ),

                                formula(
                                    String.raw`\binom{6}{2}=15`
                                ),

                                paragraph(
                                    "Setelah posisi angka ditentukan, empat posisi lainnya digunakan untuk menyusun huruf."
                                ),

                                // KETENTUAN 1

                                heading(
                                    "Angka Ganjil dan Huruf Konsonan",
                                    4
                                ),

                                paragraph(
                                    "Angka ganjil yang tersedia adalah 3, 5, dan 7 sehingga terdapat tiga pilihan angka. Huruf konsonan yang tersedia adalah b, c, r, s, t, dan v sehingga terdapat enam pilihan huruf."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=\binom{6}{2}\times{}_6P_4\times{}_3P_2\\&=15\times360\times6\\&=\boxed{32.400}\end{aligned}`
                                ),

                                // KETENTUAN 2

                                heading(
                                    "Tanpa Ketentuan Tambahan",
                                    4
                                ),

                                paragraph(
                                    "Seluruh tujuh huruf dan empat angka prima dapat digunakan. Pilih posisi angka, susun empat huruf, kemudian susun dua angka."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=\binom{6}{2}\times{}_7P_4\times{}_4P_2\\&=15\times840\times12\\&=\boxed{151.200}\end{aligned}`
                                ),

                                // KETENTUAN 3

                                heading(
                                    "Harus Terdapat Huruf Vokal",
                                    4
                                ),

                                paragraph(
                                    "Hanya terdapat satu huruf vokal, yaitu a. Karena huruf vokal harus ada di dalam password, huruf a wajib digunakan. Huruf a dapat menempati salah satu dari empat posisi huruf."
                                ),

                                paragraph(
                                    "Tiga posisi huruf lainnya diisi dengan tiga konsonan berbeda dari enam konsonan yang tersedia."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=\binom{6}{2}\times4\times{}_6P_3\times{}_4P_2\\&=15\times4\times120\times12\\&=\boxed{86.400}\end{aligned}`
                                ),

                                // KETENTUAN 4

                                heading(
                                    "Harus Terdapat Angka Genap",
                                    4
                                ),

                                paragraph(
                                    "Dari angka prima 2, 3, 5, dan 7, hanya angka 2 yang genap. Maka angka 2 wajib digunakan. Angka kedua dipilih dari tiga angka ganjil yang tersisa dan kedua angka dapat bertukar posisi."
                                ),

                                formula(
                                    String.raw`3\times2!=6`
                                ),

                                paragraph(
                                    "Empat huruf disusun dari tujuh pilihan huruf yang tersedia. Dua posisi angka ditentukan dari enam posisi password."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=\binom{6}{2}\times{}_7P_4\times6\\&=15\times840\times6\\&=\boxed{75.600}\end{aligned}`
                                ),

                                // KESIMPULAN

                                heading("Kesimpulan"),

                                table(
                                    ["Ketentuan", "Banyak Password"],
                                    [
                                        ["Angka ganjil dan huruf konsonan", "32.400"],
                                        ["Tanpa ketentuan tambahan", "151.200"],
                                        ["Terdapat huruf vokal", "86.400"],
                                        ["Terdapat angka genap", "75.600"]
                                    ]
                                ),

                                paragraph(
                                    "Urutan pasangan hasil sesuai empat ketentuan adalah 32.400, 151.200, 86.400, dan 75.600. Pilihan 34.600 tidak digunakan."
                                )
                            ]
                        }
                    ]
                },


                // ==================================
                // SOAL 5
                // ==================================

                {
                    id: "question-05",
                    number: 5,
                    usesSharedContent: true,

                    slides: [
                        {
                            id: "q5-complete",
                            type: "question",
                            template: "question",

                            title: "Soal 5 — Password Diawali Huruf V",

                            blocks: [

                                paragraph(
                                    "Jika password diawali dengan huruf v, banyak password yang dapat disusun ada ...."
                                ),

                                list([
                                    "A. 86.400",
                                    "B. 43.200",
                                    "C. 32.400",
                                    "D. 14.400",
                                    "E. 12.200"
                                ], true),

                                heading(
                                    "Menghitung Password yang Diawali Huruf V"
                                ),

                                paragraph(
                                    "Karakter pertama sudah ditentukan, yaitu huruf v. Karena itu, tersisa lima posisi yang harus diisi dengan tiga huruf dan dua angka."
                                ),

                                paragraph(
                                    "Dua posisi angka dipilih dari lima posisi yang tersisa."
                                ),

                                formula(
                                    String.raw`\binom{5}{2}=10`
                                ),

                                paragraph(
                                    "Setelah huruf v digunakan, masih tersedia enam huruf untuk mengisi tiga posisi huruf lainnya."
                                ),

                                formula(
                                    String.raw`{}_6P_3=6\times5\times4=120`
                                ),

                                paragraph(
                                    "Dua angka disusun dari empat angka prima yang tersedia."
                                ),

                                formula(
                                    String.raw`{}_4P_2=4\times3=12`
                                ),

                                paragraph(
                                    "Gabungkan ketiga tahap menggunakan aturan perkalian."
                                ),

                                formula(
                                    String.raw`\begin{aligned}N&=\binom{5}{2}\times{}_6P_3\times{}_4P_2\\&=10\times120\times12\\&=\boxed{14.400}\end{aligned}`
                                ),

                                heading("Kesimpulan"),

                                paragraph(
                                    "Jadi, banyak password yang dapat disusun dengan huruf pertama v adalah 14.400 password."
                                ),

                                paragraph(
                                    "Jawaban yang sesuai adalah D. 14.400."
                                )
                            ]
                        }
                    ]
                }
            ]
        },
        // ======================================
        // SECTION 4 — PELUANG MENGAMBIL BOLA
        // ======================================
        {
            id: "section-ball-probability",
            title: "Peluang Mengambil Bola",
            sharedContentLabel: "Informasi Pendukung Soal 6 dan 7",
            sharedContentLayout: "stack",
            sharedContent: [
                paragraph(
                    "Tasya memasukkan 20 bola berbagai warna ke dalam kotak. Terdapat 7 bola biru, 4 bola merah, dan 6 bola kuning. Sisanya adalah bola hijau. Tasya mengambil bola secara acak."
                ),
                formula(
                    String.raw`n_{\text{hijau}}=20-7-4-6=3`
                ),
                table(
                    ["Warna bola", "Jumlah"],
                    [
                        ["Biru", "7"],
                        ["Merah", "4"],
                        ["Kuning", "6"],
                        ["Hijau", "3"],
                        ["Total", "20"]
                    ]
                )
            ],
            questions: [
                {
                    id: "question-06",
                    number: 6,
                    usesSharedContent: true,
                    slides: [
                        {
                            id: "q6-complete",
                            type: "question",
                            template: "question",
                            title: "Soal 6 — Peluang Mengambil Bola Biru atau Hijau (Asesmen 2, Soal 1)",
                            blocks: [
                                paragraph(
                                    "Tentukan peluang Tasya mengambil bola biru atau hijau. Pilihan jawaban yang benar adalah E."
                                ),
                                heading("Menghitung Peluang Bola Biru atau Hijau"),
                                paragraph(
                                    "Karena hanya satu bola yang diambil, kejadian mengambil bola biru dan mengambil bola hijau saling lepas."
                                ),
                                formula(
                                    String.raw`P(B\cup H)=P(B)+P(H)`
                                ),
                                formula(
                                    String.raw`P(B\cup H)=\frac{7}{20}+\frac{3}{20}`
                                ),
                                formula(
                                    String.raw`P(B\cup H)=\frac{10}{20}=\boxed{\frac{1}{2}}`
                                ),
                                heading("Kesimpulan"),
                                paragraph(
                                    "Jadi, peluang Tasya mengambil bola biru atau hijau adalah 1/2. Jawaban pilihan ganda: E."
                                )
                            ]
                        }
                    ]
                },
                {
                    id: "question-10",
                    number: 7,
                    slides: [
                        {
                            id: "q10-complete",
                            type: "question",
                            template: "question",
                            title: "Soal 7 — Peluang Pengambilan Dua Bola (Asesmen 2, Soal 2)",
                            blocks: [
                                paragraph(
                                    "Tasya memiliki bola-bola dengan jumlah seperti pada tabel dan mengambil dua bola sekaligus secara acak. Tentukan peluang untuk setiap kejadian berikut."
                                ),
                                table(
                                    ["Warna bola", "Jumlah"],
                                    [
                                        ["Biru", "7"],
                                        ["Merah", "4"],
                                        ["Kuning", "6"],
                                        ["Hijau", "3"],
                                        ["Total", "20"]
                                    ]
                                ),
                                list([
                                    "Kedua bola berwarna biru.",
                                    "Kedua bola berwarna merah.",
                                    "Kedua bola berwarna kuning.",
                                    "Terambil bola merah dan bola hijau.",
                                    "Terambil bola kuning dan bola hijau."
                                ], true),
                                heading("Pilihan Jawaban pada Buku"),
                                list([
                                    "1/38",
                                    "3/38",
                                    "2/95",
                                    "3/100",
                                    "7/190",
                                    "21/190",
                                    "9/200"
                                ]),
                                heading("Menghitung Banyak Pasangan"),
                                paragraph(
                                    "Karena dua bola diambil sekaligus, urutan tidak diperhatikan. Banyak pasangan yang dapat dibentuk dari 20 bola dihitung dengan kombinasi."
                                ),
                                formula(
                                    String.raw`\binom{20}{2}=\frac{20!}{2!(20-2)!}=\frac{20\times19}{2}=190`
                                ),
                                heading("Menghitung Peluang Setiap Kejadian"),
                                paragraph("1. Kedua bola berwarna biru:"),
                                formula(
                                    String.raw`P(\text{dua biru})=\frac{\binom{7}{2}}{\binom{20}{2}}=\frac{21}{190}`
                                ),
                                paragraph("2. Kedua bola berwarna merah:"),
                                formula(
                                    String.raw`P(\text{dua merah})=\frac{\binom{4}{2}}{\binom{20}{2}}=\frac{6}{190}=\frac{3}{95}`
                                ),
                                paragraph("3. Kedua bola berwarna kuning:"),
                                formula(
                                    String.raw`P(\text{dua kuning})=\frac{\binom{6}{2}}{\binom{20}{2}}=\frac{15}{190}=\frac{3}{38}`
                                ),
                                paragraph(
                                    "4. Satu bola merah dan satu bola hijau: pilih satu dari 4 bola merah dan satu dari 3 bola hijau."
                                ),
                                formula(
                                    String.raw`P(\text{merah dan hijau})=\frac{4\times3}{190}=\frac{12}{190}=\frac{6}{95}`
                                ),
                                paragraph(
                                    "5. Satu bola kuning dan satu bola hijau: pilih satu dari 6 bola kuning dan satu dari 3 bola hijau."
                                ),
                                formula(
                                    String.raw`P(\text{kuning dan hijau})=\frac{6\times3}{190}=\frac{18}{190}=\frac{9}{95}`
                                ),
                                heading("Catatan Verifikasi Pilihan Jawaban"),
                                paragraph(
                                    "Hasil perhitungan berdasarkan jumlah bola pada soal tidak seluruhnya tersedia pada pilihan jawaban tercetak. Dari lima hasil tersebut, hanya 21/190 dan 3/38 yang ditemukan pada pilihan. Tiga hasil lainnya, yaitu 3/95, 6/95, dan 9/95, tidak tersedia. Pilihan jawaban dipertahankan sesuai sumber dan tidak dipasangkan dengan hasil yang berbeda."
                                ),
                                heading("Kesimpulan"),
                                paragraph(
                                    "Peluang kedua bola biru adalah 21/190, kedua bola merah 3/95, kedua bola kuning 3/38, bola merah dan hijau 6/95, serta bola kuning dan hijau 9/95."
                                )
                            ]
                        }
                    ]
                },
                {
                    id: "question-07",
                    number: 7,
                    usesSharedContent: true,
                    slides: [
                        {
                            id: "q7-complete",
                            type: "question",
                            template: "question",
                            title: "Soal 7 — Peluang Mengambil Tiga Bola Kuning (Asesmen 2, Soal 3)",
                            blocks: [
                                paragraph(
                                    "Tasya mengambil tiga bola sekaligus secara acak. Tentukan peluang ketiga bola yang terambil berwarna kuning."
                                ),
                                heading("Menghitung Peluang Tiga Bola Kuning"),
                                paragraph(
                                    "Gunakan kombinasi karena tiga bola diambil sekaligus, sehingga urutan pengambilan tidak diperhatikan."
                                ),
                                formula(
                                    String.raw`\binom{20}{3}=1.140`
                                ),
                                paragraph(
                                    "Banyak cara memilih tiga bola dari enam bola kuning adalah:"
                                ),
                                formula(
                                    String.raw`\binom{6}{3}=20`
                                ),
                                paragraph(
                                    "Peluang diperoleh dari banyak pilihan tiga bola kuning dibagi banyak pilihan tiga bola dari seluruh kotak."
                                ),
                                formula(
                                    String.raw`P(\text{ketiganya kuning})=\frac{\binom{6}{3}}{\binom{20}{3}}`
                                ),
                                formula(
                                    String.raw`P=\frac{20}{1.140}=\boxed{\frac{1}{57}}`
                                ),
                                heading("Kesimpulan"),
                                paragraph(
                                    "Jadi, peluang ketiga bola yang diambil sekaligus semuanya berwarna kuning adalah 1/57."
                                )
                            ]
                        }
                    ]
                }
            ]
        },
        // ======================================
        // SECTION 5 — PELUANG BANJIR DI KOTA
        // ======================================
        {
            id: "section-city-flood",
            title: "Peluang Banjir di Tiga Kota",
            sharedContentLabel: "Informasi Pendukung Soal 8 dan 9",
            sharedContentLayout: "stack",
            sharedContent: [
                paragraph(
                    "Seorang ahli geologi mengatakan bahwa dalam lima tahun ke depan, di beberapa kota akan terjadi banjir. Peluang banjir di setiap kota adalah sebagai berikut."
                ),
                table(
                    ["Kota", "Peluang banjir"],
                    [
                        ["Kota X", "2/3"],
                        ["Kota Y", "1/4"],
                        ["Kota Z", "1/2"]
                    ]
                ),
                paragraph(
                    "Untuk mengerjakan soal ini, kejadian banjir antarkota diasumsikan saling bebas. Independensi ini merupakan asumsi pengerjaan karena tidak dinyatakan secara eksplisit pada informasi sumber."
                )
            ],
            questions: [
                {
                    id: "question-08",
                    number: 8,
                    usesSharedContent: true,
                    slides: [
                        {
                            id: "q8-complete",
                            type: "question",
                            template: "question",
                            title: "Soal 8 — Memeriksa Peluang Banjir di Tiga Kota (Asesmen 2, Soal 4)",
                            blocks: [
                                paragraph(
                                    "Tentukan benar atau salah untuk setiap pernyataan berikut tentang peluang banjir di kota-kota tersebut."
                                ),
                                list([
                                    "Peluang di kota X dan kota Y terjadi banjir sebesar 1/6.",
                                    "Peluang di kota X dan kota Z terjadi banjir sebesar 1/4.",
                                    "Peluang di kota Y dan kota Z terjadi banjir sebesar 1/8.",
                                    "Peluang di kota X dan kota Y terjadi banjir lebih kecil daripada kota X dan kota Z.",
                                    "Peluang di kota X dan kota Z terjadi banjir lebih besar daripada kota Y dan kota Z."
                                ], true),
                                heading("Menghitung Peluang Banjir Bersama"),
                                paragraph(
                                    "Dengan asumsi kejadian banjir antarkota saling bebas, peluang dua kota mengalami banjir bersama dihitung menggunakan aturan perkalian."
                                ),
                                formula(
                                    String.raw`P(X\cap Y)=\frac{2}{3}\times\frac{1}{4}=\frac{1}{6}`
                                ),
                                formula(
                                    String.raw`P(X\cap Z)=\frac{2}{3}\times\frac{1}{2}=\frac{1}{3}`
                                ),
                                formula(
                                    String.raw`P(Y\cap Z)=\frac{1}{4}\times\frac{1}{2}=\frac{1}{8}`
                                ),
                                formula(
                                    String.raw`\frac{1}{6}<\frac{1}{3}`
                                ),
                                formula(
                                    String.raw`\frac{1}{3}>\frac{1}{8}`
                                ),
                                heading("Evaluasi Pernyataan"),
                                table(
                                    ["Pernyataan", "Hasil perhitungan", "Status"],
                                    [
                                        ["1. Kota X dan kota Y sebesar 1/6", "1/6", "Benar"],
                                        ["2. Kota X dan kota Z sebesar 1/4", "1/3", "Salah"],
                                        ["3. Kota Y dan kota Z sebesar 1/8", "1/8", "Benar"],
                                        ["4. X dan Y lebih kecil daripada X dan Z", "1/6 dibanding 1/3", "Benar"],
                                        ["5. X dan Z lebih besar daripada Y dan Z", "1/3 dibanding 1/8", "Benar"]
                                    ]
                                ),
                                heading("Kesimpulan"),
                                paragraph(
                                    "Urutan status kelima pernyataan adalah Benar, Salah, Benar, Benar, dan Benar."
                                )
                            ]
                        }
                    ]
                },
                {
                    id: "question-09",
                    number: 9,
                    usesSharedContent: true,
                    slides: [
                        {
                            id: "q9-complete",
                            type: "question",
                            template: "question",
                            title: "Soal 9 — Peluang Ketiga Kota Terjadi Banjir (Asesmen 2, Soal 5)",
                            blocks: [
                                paragraph(
                                    "Tentukan peluang ketiga kota X, Y, dan Z mengalami banjir."
                                ),
                                heading("Menghitung Peluang Ketiga Kota Banjir"),
                                paragraph(
                                    "Dengan asumsi ketiga kejadian saling bebas, gunakan aturan perkalian peluang."
                                ),
                                formula(
                                    String.raw`P(X\cap Y\cap Z)=P(X)\times P(Y)\times P(Z)`
                                ),
                                formula(
                                    String.raw`P=\frac{2}{3}\times\frac{1}{4}\times\frac{1}{2}`
                                ),
                                formula(
                                    String.raw`P=\frac{2}{24}`
                                ),
                                formula(
                                    String.raw`P=\boxed{\frac{1}{12}}`
                                ),
                                heading("Kesimpulan"),
                                paragraph(
                                    "Jadi, dengan asumsi kejadian banjir di ketiga kota saling bebas, peluang kota X, Y, dan Z semuanya mengalami banjir adalah 1/12."
                                )
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
