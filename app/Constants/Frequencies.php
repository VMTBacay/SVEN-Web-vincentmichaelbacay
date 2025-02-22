<?php

namespace App\Constants;

class Frequencies
{
    public const RECURRING = 1;
    public const ONE_TIME = 2;

    public static function all(): array
    {
        return [
            self::RECURRING,
            self::ONE_TIME,
        ];
    }
} 