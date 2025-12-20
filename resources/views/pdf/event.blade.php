<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Berita Acara Serah Terima</title>
    <style>
        body {
            padding: 20px;
            font-size: 14px;
        }

        .header {
            text-align: center;
            color: #fff;
            background: #365B7F;
            margin-bottom: 10px;
        }

        .header img {
            height: 60px;
        }

        .title {
            text-align: center;
            font-weight: bold;
            color: #626262;
            font-size: 28px;
            margin: 20px 0;
        }

        .content {
            text-align: justify;
            font-size: 20px;
        }

        .signature {
            margin-top: 40px;
        }

        table {
            width: 100%;
            border: none;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }
    </style>
</head>

<body>

    <!-- HEADER -->
    <img src="{{public_path('logo/logo-blue.png')}}" alt="Logo" height="100">
    <div class="header">
        <p>
            <span style="margin-right: 20px;">{{$company_address}}</span>
            <span style="margin-right: 20px;">{{$company_phone}}</span>
            <span>{{$company_email}}</span>
        </p>
    </div>
    <!-- TITLE -->
    <div class="title">
        {{$title}}
    </div>

    <!-- ISI -->
    <div class="content">
        Pada hari ini <strong>{{ $hari }}</strong>, tanggal <strong>{{ $tanggal }}</strong> yang bertanda tangan di bawah ini : <br><br>

        1. Nama : <strong>{{ strtoupper($pihak_pertama['nama']) }}</strong> <br>
        Dalam hal ini bertindak untuk dan atas nama <strong>{{ strtoupper($pihak_pertama['perusahaan']) }}</strong> selanjutnya disebut <strong>PIHAK PERTAMA</strong>. <br><br>

        2. Nama : <strong>{{ strtoupper($pihak_kedua['nama']) }}</strong> <br>
        Dalam hal ini bertindak untuk dan atas nama <strong>{{strtoupper($pihak_kedua['perusahaan'])}}</strong>, bertindak sebagai <strong>{{ strtoupper($pihak_kedua['jabatan']) }}</strong>, selanjutnya disebut <strong>PIHAK KEDUA</strong>. <br><br>

        <p>
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama telah melakukan Pemeriksaan
            Pekerjaan {{ $pekerjaan }} yang telah selesai dikerjakan pada tanggal {{ $tanggal }}.
        </p>

        <p>
            Berdasarkan hasil pemeriksaan, kedua belah pihak setuju dan menyatakan bahwa pekerjaan
            telah selesai sesuai progres dengan hasil pekerjaan sesuai kesepakatan.
        </p>

        <p>
            Dengan demikian PIHAK KEDUA menyampaikan hasil pekerjaan tersebut kepada PIHAK PERTAMA
            dan PIHAK PERTAMA dapat menerima dengan baik.
        </p>

        <p>
            Demikian berita acara ini dibuat dan ditandatangani oleh kedua belah pihak untuk dapat
            dipergunakan sebagaimana mestinya.
        </p>
    </div>

    <!-- TANDA TANGAN -->
    <div class="signature">
        <table>
            <tr>
                <td class="text-center"><strong>PIHAK PERTAMA</strong><br>{{ strtoupper($pihak_pertama['perusahaan']) }}
                    <br><br><br><br><br><br><u>{{ strtoupper($pihak_pertama['nama']) }}</u>
                </td>
                <td class="text-center"><strong>PIHAK KEDUA</strong><br>{{ strtoupper($pihak_kedua['perusahaan']) }}
                    <br><br><br><br><br><br><u>{{ strtoupper($pihak_kedua['nama']) }}</u>
                </td>
            </tr>
        </table>
    </div>

</body>

</html>
