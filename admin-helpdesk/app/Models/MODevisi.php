<?php namespace App\Models;

use CodeIgniter\Model;

class MODevisi extends Model
{
    protected $table = 'devisi'; 
    protected $primaryKey = 'id_devisi';

    protected $returnType = '\App\Entities\ENDevisi';

    protected $allowedFields = [
            'nama_devisi',
            'des_devisi'
    ];

}