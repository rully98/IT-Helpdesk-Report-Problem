<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\I18n\Time;

class MOListWaktu extends Model
{
    protected $table = 'list_waktu_pengerjaan'; 
    protected $primaryKey = 'id_list_waktu';

    protected $returnType = '\App\Entities\ENListWaktu';

    protected $allowedFields = [
        'id_list_waktu',
        'nama_pengerjaan',
        'deskripsi_waktu_pengerjaan',
    ];

}