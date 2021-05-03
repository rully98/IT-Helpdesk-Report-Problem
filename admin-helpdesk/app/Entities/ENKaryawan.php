<?php namespace App\Entities;

use CodeIgniter\Entity;
use CodeIgniter\I18n\Time;

class ENKaryawan extends Entity
{
    protected $nip;
    protected $id_devisi;
    protected $nama;
    protected $jk;
    protected $no_hp;
    protected $email;
    protected $jabatan;
    protected $status_u;
    protected $status_o;
    protected $status_a;
    protected $password;
    protected $updated_at;
    protected $created_at;

    protected $attributes = [
        'nip' => null,
        'id_devisi' => null,
        'nama' => null,
        'jk' => null,
        'nama' => null,
        'no_hp' => null,
        'email' => null,
        'jabatan' => null,
        'status_u' => null,
        'status_o' => null,
        'status_a' => null,
        'password' => null,
        'updated_at' => null,
        'created_at' => null,
    ];

    protected $dates = ['created_at', 'updated_at'];

    // public function __get($key)
    // {
    //     if (property_exists($this, $key))
    //     {
    //         return $this->$key;
    //     }
    // }

    // public function __set($key, $value)
    // {
    //     if (property_exists($this, $key))
    //     {
    //         $this->$key = $value;
    //     }
    // }

    protected function setPassword(string $pass)
    {
        $this->attributes['password'] = password_hash($pass, PASSWORD_BCRYPT);

        return $this;
    }

    public function setCreatedAt(string $dateString)
    {
        $this->attributes['created_at'] = new Time($dateString, 'UTC');

        return $this;
    }

    public function getCreatedAt(string $format = 'Y-m-d H:i:s')
    {
        // Convert to CodeIgniter\I18n\Time object
        $this->attributes['created_at'] = $this->mutateDate($this->attributes['created_at']);

        $timezone = $this->timezone ?? app_timezone();

        $this->attributes['created_at']->setTimezone($timezone);

        return $this->attributes['created_at']->format($format);
    }


}