<?php

namespace App\Helpers;

class Terbilang
{
    protected static $angka = [
        "",
        "Satu",
        "Dua",
        "Tiga",
        "Empat",
        "Lima",
        "Enam",
        "Tujuh",
        "Delapan",
        "Sembilan",
        "Sepuluh",
        "Sebelas"
    ];

    public static function convert($nilai)
    {
        $nilai = abs((int)$nilai);

        if ($nilai < 12) {
            return self::$angka[$nilai];
        } elseif ($nilai < 20) {
            return self::convert($nilai - 10) . " Belas";
        } elseif ($nilai < 100) {
            return self::convert(intval($nilai / 10)) . " Puluh " . self::convert($nilai % 10);
        } elseif ($nilai < 200) {
            return "Seratus " . self::convert($nilai - 100);
        } elseif ($nilai < 1000) {
            return self::convert(intval($nilai / 100)) . " Ratus " . self::convert($nilai % 100);
        } elseif ($nilai < 2000) {
            return "Seribu " . self::convert($nilai - 1000);
        } elseif ($nilai < 1000000) {
            return self::convert(intval($nilai / 1000)) . " Ribu " . self::convert($nilai % 1000);
        } elseif ($nilai < 1000000000) {
            return self::convert(intval($nilai / 1000000)) . " Juta " . self::convert($nilai % 1000000);
        } elseif ($nilai < 1000000000000) {
            return self::convert(intval($nilai / 1000000000)) . " Miliar " . self::convert(fmod($nilai, 1000000000));
        } elseif ($nilai < 1000000000000000) {
            return self::convert(intval($nilai / 1000000000000)) . " Triliun " . self::convert(fmod($nilai, 1000000000000));
        }

        return "";
    }

    public static function rupiah($nilai)
    {
        if ($nilai < 0) {
            return "Minus " . trim(self::convert($nilai)) . " Rupiah";
        }
        return strtoupper(trim(self::convert($nilai)) . " Rupiah");
    }
}
