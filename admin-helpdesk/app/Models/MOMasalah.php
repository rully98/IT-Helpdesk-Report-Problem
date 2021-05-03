<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\I18n\Time;

class MOMasalah extends Model
{
    protected $table = 'helpdesk'; 
    protected $primaryKey = 'id_helpdesk';

    protected $returnType = '\App\Entities\ENMasalah';

    protected $allowedFields = [
        'id_helpdesk',
        'nip_user',
        'nama_helpdesk',
        'des_helpdesk',
        'id_status_pengerjaan',
        'nip_executor',
        'tanggal_selesai',
        'tanggal_pengerjaan',
        'tanggal_laporan',
        'feedback'
    ];
    
    protected $beforeUpdate = ['createTanggalPengerjaan_at'];

    protected function createTanggalPengerjaan_at(array $data) {

        if(isset($data['data']['id_status_pengerjaan'])) {
            if($data['data']['id_status_pengerjaan'] == "2"){
                $data['data']['tanggal_pengerjaan']  = new Time('now');
            } else if($data['data']['id_status_pengerjaan'] == "1") {
                $data['data']['tanggal_pengerjaan']  = null;
                $data['data']['nip_executor']  = null;
            } else if($data['data']['id_status_pengerjaan'] == "4") {
                $data['data']['tanggal_selesai']  = new Time('now');
            }
        }

        return $data;
    }

}