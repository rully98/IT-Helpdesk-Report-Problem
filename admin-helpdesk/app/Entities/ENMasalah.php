<?php namespace App\Entities;

use CodeIgniter\Entity;

class ENMasalah extends Entity
{
    protected $id_helpdesk;
    protected $nip_user;
    protected $nama_helpdesk;
    protected $des_helpdesk;
    protected $id_status_pengerjaan;
    protected $nip_executor;
    protected $tanggal_selesai;
    protected $tanggal_pengerjaan;
    protected $tanggal_laporan;
    protected $feedback;

}