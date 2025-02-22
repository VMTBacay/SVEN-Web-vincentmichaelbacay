<?php

namespace App\Constants;

class Times
{
    public const MORNING = 1;
    public const AFTERNOON = 2;
    public const EVENING = 3;

    public static function all(): array
    {
        return [
            self::MORNING,
            self::AFTERNOON,
            self::EVENING,
        ];
    }
} 