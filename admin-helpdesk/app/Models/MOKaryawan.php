<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\I18n\Time;

class MOKaryawan extends Model
{
    protected $table = 'karyawan'; 
    protected $primaryKey = 'nip';

    protected $allowedFields = [
        'nip',
        'id_devisi',
        'nama',
        'jk',
        'nama',
        'no_hp',
        'email',
        'jabatan',
        'status_u',
        'status_o',
        'status_a',
        'password',
        'updated_at',
        'created_at'
    ];

    protected $returnType = '\App\Entities\ENKaryawan';

    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $beforeInsert = ['defaultPassword'];
    protected $beforeUpdate = ['createUpdated_at'];
    protected $afterUpdate = ['change_Session'];

    protected function createUpdated_at(array $data) {

        $data['data']['updated_at']  = new Time('now') ;

        return $data;
    }

    protected function change_Session(array $data) {

        if(!isset($data['data']['nama'])) return $data;

        session()->remove('nama');
        session()->remove('email');
        session()->set('nama', $data['data']['nama']);
        session()->set('email', $data['data']['email']);

        return $data;
    }

    protected function defaultPassword(array $data){

        if(!isset($data['data']['status_u'])) return $data;

        if($data['data']['status_u'] != '2') {
            $data['data']['password'] = password_hash('123456', PASSWORD_BCRYPT);
        }

        return $data;

    }


}