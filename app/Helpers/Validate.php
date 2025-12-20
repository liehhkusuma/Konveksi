<?php

namespace App\Helpers;

class Validate
{

    public static function fieldExist(array $array, array $keys): bool
    {
        foreach ($keys as $key) {
            if (!array_key_exists($key, $array) || $array[$key] === null) {
                return false;
            }
        }
        return true;
    }
}
