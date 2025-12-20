<?php

namespace App\Helpers;

class PHPURL
{

    public static function getUrlQuery($url, $params = null)
    {
        $query = [];
        $parsedUrl = parse_url($url, PHP_URL_QUERY);
        if (isset($parsedUrl)) {
            parse_str($parsedUrl, $query);
        }
        if (isset($params)) {
            $query = isset($query[$params]) ? $query[$params] : null;;
        }
        return $query;
    }
}
