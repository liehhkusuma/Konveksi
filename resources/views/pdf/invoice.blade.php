<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>
    <style>
        body {
            padding: 20px;
            font-size: 14px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 6px;
            border: 1px solid #000;
        }

        .no-border td,
        .no-border {
            border: none;
        }

        .header {
            text-align: center;
            color: #fff;
            background: #365B7F;
            margin-bottom: 10px;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0 10px 0;
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

        .mt-20 {
            margin-top: 20px;
        }

        .signature {
            text-align: right;
        }

        .flex-row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }

        .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .col-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        .title {
            text-align: center;
            font-weight: bold;
            color: #626262;
            font-size: 28px;
            margin: 20px 0;
        }
    </style>
</head>

<body>

    <!-- Header -->
    <img src="{{public_path('logo/logo-blue.png')}}" alt="Logo" height="100">
    <div class="header">
        <p>
            <span style="margin-right: 20px;">{{$company_address}}</span>
            <span style="margin-right: 20px;">{{$company_phone}}</span>
            <span>{{$company_email}}</span>
        </p>
    </div>

    <!-- Info Invoice -->

    <h2 class="title">INVOICE</h2>

    <table class="no-border">
        <tr>
            <td>No</td>
            <td>: {{ $no_invoice }}</td>
            <td>
                Kepada Yth
            </td>
        </tr>
        <tr>
            <td>Tanggal</td>
            <td>: {{ $tanggal }}</td>
            <td>
                <strong>{{ $kepada }}</strong>
            </td>
        </tr>
        <tr>
            <td>Pekerjaan</td>
            <td>: {{ $project_name }}</td>
            <td>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>
                {{ $alamat_tujuan }}
            </td>
        </tr>
    </table>
    <br>
    <!-- Proyek -->
    <table>
        <thead>
            <tr>
                <th>Keterangan</th>
                <th>Total (Rp)</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td style="width: 70%;">{{$project_description}}</td>
                <td style="width: 30%;" class="text-right">{{ number_format($project_sub_total, 0, ',', '.') }}</td>
            </tr>
            @if($project_discount > 0)
            <tr>
                <td class="text-right">DISCOUNT PROJECT</td>
                <td class="text-right">{{ number_format($project_discount, 0, ',', '.') }}</td>
            </tr>
            @endif
            @if($discount_amount > 0)
            <tr>
                <td class="text-right">DISCOUNT INVOICE</td>
                <td class="text-right">{{ number_format($discount_amount, 0, ',', '.') }}</td>
            </tr>
            @endif
            <tr>
                <td class="text-right">SUB TOTAL</td>
                <td class="text-right">{{ number_format($total_sub_price, 0, ',', '.') }}</td>
            </tr>
            @if($ppn > 0)
            <tr>
                <td class="text-right">PPN</td>
                <td class="text-right">{{ number_format($ppn, 0, ',', '.') }}</td>
            </tr>
            @endif
            @if($pph > 0)
            <tr>
                <td class="text-right">PPH</td>
                <td class="text-right">{{ number_format($pph, 0, ',', '.') }}</td>
            </tr>
            @endif
            <tr>
                <td class="text-right"><strong>TOTAL</strong></td>
                <td class="text-right"><strong>{{ number_format($project_total, 0, ',', '.') }}</strong></td>
            </tr>
        </tbody>
    </table>
    <br>
    <!-- Detail Invoice -->
    <table>
        <thead>
            <tr>
                <th>Invoice</th>
                <th>Jumlah (Rp)</th>
                <th>Total (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice_items as $item)
            <tr>
                <td style="width: 70%;">{{ $item['name'] }}</td>
                <td style="width: 15%;" class="text-right">{{ number_format($item['jumlah'], 0, ',', '.') }}</td>
                <td style="width: 15%;" class="text-right">{{ number_format($item['total'], 0, ',', '.') }}</td>
            </tr>
            @endforeach
            <tr>
                <td class="no-border"></td>
                <td class="text-right"><strong>Total (Rp.)</strong></td>
                <td class="text-right"><strong>{{ number_format($total, 0, ',', '.') }}</strong></td>
            </tr>
        </tbody>
    </table>

    <br>

    <table class="no-border">
        <tr>
            <td>
                <p>
                    Pembayaran dapat ditransfer ke : <br>
                    <strong>No. Rek. {{ $rekening }}</strong><br>
                    Atas Nama <strong>{{ $atas_nama }}</strong>
                </p>

                <!-- Terbilang -->
                <p><strong>TERBILANG</strong><br>
                    <em>{{ $terbilang }}</em>
                </p>
            </td>
            <td>
                <div class="signature">
                    <p><strong>{{$kota}}, {{ $tanggal }}</strong><br><br>
                        {{strtoupper($atas_nama)}}
                    </p>
                    <br><br><br><br><br><br>
                    <p><strong>{{ strtoupper($ttd) }}</strong></p>
                </div>
            </td>
        </tr>
    </table>

</body>

</html>
