<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Penawaran Harga</title>
    <style>
        body {
            padding: 20px;
            font-size: 14px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 4px;
            border: 1px solid #000;
            text-align: left;
        }

        .with-border {
            border: 1px solid #000;
        }

        .text-right {
            text-align: right;
        }

        .text-red {
            color: red;
        }

        .text-green {
            color: green;
        }

        .text-center {
            text-align: center;
        }

        .header {
            text-align: center;
            color: #fff;
            background: #365B7F;
            margin-bottom: 10px;
        }

        .logo {
            text-align: center !important;
        }

        .section-title {
            font-weight: bold;
            background: #f0f0f0;
            padding: 5px;
        }

        .title {
            text-align: center;
            font-weight: bold;
            color: #626262;
            font-size: 28px;
            margin: 20px 0;
        }

        .no-border {
            border: none;
        }
    </style>
</head>

<body>

    <img src="{{public_path('logo/logo-blue.png')}}" alt="Logo" height="100">
    <div class="header">
        <p>
            <span style="margin-right: 20px;">{{$company_address}}</span>
            <span style="margin-right: 20px;">{{$company_phone}}</span>
            <span>{{$company_email}}</span>
        </p>
    </div>

    <div class="title">
        {{$title}}
    </div>

    <table>
        <tr>
            <td class="no-border" style="width: 20%;"><strong>NOMOR</strong></td>
            <td class="no-border">: {{ $nomor }}</td>
        </tr>
        <tr>
            <td class="no-border" style="width: 20%;"><strong>PROYEK</strong></td>
            <td class="no-border">: {{ $proyek }}</td>
        </tr>
        <tr>
            <td class="no-border" style="width: 20%;"><strong>ALAMAT</strong></td>
            <td class="no-border">: {{ $alamat }}</td>
        </tr>
        <tr>
            <td class="no-border" style="width: 20%;"><strong>PEKERJAAN</strong></td>
            <td class="no-border">: {{ $description }}</td>
        </tr>
    </table>

    <br>

    <table class="table-border">
        <thead class="with-border">
            <tr>
                <th class="text-center with-border">NO</th>
                <th class="text-center with-border">KETERANGAN</th>
                <th class="text-center with-border">SAT</th>
                <th class="text-center with-border">VOLUME</th>
                <th class="text-center with-border">HARGA SAT (Rp)</th>
                <th class="text-center with-border">SUB JUMLAH (Rp)</th>
                <th class="text-center with-border">JUMLAH (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $index => $product)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td colspan="6"><strong>{{ $product['name'] }} {{ isset($product['identifier']) ? '- '.$product['identifier'] : '' }}</strong></td>
            </tr>

            @foreach($product['materials'] as $materialIndex => $material)
            <tr>
                <td class="text-right">{{$materialIndex + 1}}</td>
                <td>{{ $material['name'] }} {{ isset($material['type'])? '- '.$material['type'] : '' }}</td>
                <td class="text-center">{{ $material['measurement'] }}</td>
                <td class="text-center">{{ $material['quantity'] }}</td>
                <td class="text-right">{{ number_format($material['price'], 0, ',', '.') }}</td>
                <td class="text-right">
                    {{ number_format($material['total_price'], 0, ',', '.') }}
                </td>
                <td class="text-right"> </td>
            </tr>
            @endforeach

            <tr>
                <td colspan="2" class="text-right"><strong>Subtotal</strong></td>
                <td class="text-center"><strong>{{ number_format($product['quantity'], 0, ',', '.') }}</strong></td>
                <td class="text-center"><strong>unit</strong></td>
                <td class="text-right"><strong></strong></td>
                <td class="text-right"><strong>{{ number_format($product['price'], 0, ',', '.') }}</strong></td>
                <td class="text-right"><strong>{{ number_format($product['total_price'], 0, ',', '.') }}</strong></td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <br><br>

    <table class="no-border">
        <tr>
            <td class="no-border" style="width: 60%;"></td>
            <td>TOTAL PENAWARAN</td>
            <td class="text-right" style="width: 16%;"><strong>{{ number_format($sub_price, 0, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td class="no-border"></td>
            <td>DISCOUNT : {{$discount}}%</td>
            <td class="text-right"><strong>{{ number_format($discount_amount, 0, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td class="no-border" style="width: 60%;"></td>
            <td>SUB TOTAL</td>
            <td class="text-right"><strong>{{ number_format($total_sub_price, 0, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td class="no-border"></td>
            <td>PPN</td>
            <td class="text-right"><strong>{{ number_format($ppn, 0, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td class="no-border"></td>
            <td>PPH</td>
            <td class="text-right"><strong>{{ number_format($pph, 0, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td class="no-border"></td>
            <td><strong>TOTAL</strong></td>
            <td class="text-right"><strong>Rp {{ number_format($total_price, 0, ',', '.') }}</strong></td>
        </tr>
    </table>

    <br><br>

    <table>
        <tr>
            <td width="30%">
                <p><strong>Tangerang, {{ $tanggal }}</strong><br><br>
                    {{strtoupper($signatory_company)}}
                </p>
                @if($status == 'approved')
                <img src="{{public_path('logo/signed_logo.png')}}" alt="Logo" height="100">
                @else
                <br><br><br><br><br><br>
                @endif
                <p><strong>{{ strtoupper($ttd_nama) }}</strong></p>
            </td>
            <td width="70%">
                <p class="section-title">Keterangan:</p>
                <div class="section-title">{!! $statement !!}</div>
                <p class="section-title">Syarat Pembayaran:</p>
                <div class="section-title">{!! $payment_terms !!}</div>
            </td>
        </tr>
    </table>

</body>

</html>