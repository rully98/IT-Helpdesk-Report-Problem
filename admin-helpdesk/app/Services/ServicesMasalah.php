<?php namespace App\Services;

use App\Entities\ENMasalah;
use App\Models\MOMasalah;

class ServicesMasalah extends \CodeIgniter\Controller
{
    protected $Masalah, $MasalahEN, $request;
    
	public function __construct()
	{
		$this->Masalah = new MOMasalah();
		$this->MasalahEN = new ENMasalah();
		$this->request = \Config\Services::request();
    }

    public function countAllMasalah($where = "id_status_pengerjaan = 1") {

        $data = $this->Masalah->where($where)
                        ->countAllResults();

        return $data;
    }

    public function listData() {
        
        $db      = \Config\Database::connect();
        $builder = $db->table('helpdesk');

        $limit = $this->request->getVar('limit');
        $offset = $this->request->getVar('offset');
        $where = $this->request->getVar('nip');
        $orderByDate = $this->request->getVar('order_by_date');
        $statusU = $this->request->getVar('status_u');
        $not_in_nip = $this->request->getVar('not_in_nip'); /* Jika Ada Where Wajib 1 Or 0 */

        if($limit == null)
            $limit = 50;

        if($offset == null)
            $offset = 1;

        if($orderByDate == null)
            $orderByDate = 'asc';

        // if($statusU == null) {
        //     $statusU = 'karyawan.nip = helpdesk.nip_user';
        // } else {
        //     if($statusU == 'admin'){
        //         $statusU = 'karyawan.nip = helpdesk.nip_user';
        //     } elseif($statusU == 'user') {
        //         $statusU = 'karyawan.nip = helpdesk.nip_executor';
        //     } else {
        //         $statusU = 'karyawan.nip = helpdesk.nip_user';
        //     }
        // }

        // $masalah = $this->Masalah
        //     ->select('*')
        //     ->where('helpdesk.nip_user', $where)
        //     ->orWhere('helpdesk.nip_executor', $where)
        //     ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
        //     ->join('karyawan', $statusU)
        //     ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
        //     ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
        //     ->findAll($limit, ($offset - 1) * $limit);
                
        // $count = $this->Masalah
        //     ->select('*')
        //     ->where('helpdesk.nip_user', $where)
        //     ->orWhere('helpdesk.nip_executor', $where)
        //     ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
        //     ->join('karyawan', $statusU)
        //     ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
        //     ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
        //     ->countAllResults();

        // $masalah = '';
        // $count = '';

        if($where != null) {

            if($statusU == 'admin') {

                if($not_in_nip == '1'){

                    $masalah = $this->Masalah
                                    ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                    ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                                    ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                    ->where('helpdesk.nip_executor', NULL)
                                    ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                    ->findAll($limit, ($offset - 1) * $limit);
                        
                    $count = $this->Masalah
                                    ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                    ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                                    ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                    ->where('helpdesk.nip_executor', NULL)
                                    ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                    ->countAllResults();

                } else {

                    $masalah = $this->Masalah
                                    ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                    ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                                    ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                    ->where('helpdesk.nip_executor', $where)
                                    ->where('helpdesk.id_status_pengerjaan !=', '4')
                                    ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                    ->findAll($limit, ($offset - 1) * $limit);
                        
                    $count = $this->Masalah
                                    ->where('helpdesk.nip_executor', $where)
                                    ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                    ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                                    ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                    ->where('helpdesk.nip_executor', $where)
                                    ->where('helpdesk.id_status_pengerjaan !=', '4')
                                    ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                    ->countAllResults();
                                    
                }

            } else {

                $masalah = $this->Masalah
                                ->select('*')
                                ->where('helpdesk.nip_user', $where)
                                ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                ->join('karyawan', 'karyawan.nip = helpdesk.nip_executor')
                                ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                ->findAll($limit, ($offset - 1) * $limit);
                                    
                $count = $this->Masalah
                                ->select('*')
                                ->where('helpdesk.nip_user', $where)
                                ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                                ->join('karyawan', 'karyawan.nip = helpdesk.nip_executor')
                                ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                                ->countAllResults();

            }

        } else {
            
            $masalah = $this->Masalah
                            ->select('*')
                            ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                            ->join('karyawan', $statusU)
                            ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                            ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                            ->findAll($limit, ($offset - 1) * $limit);
                                
            $count = $this->Masalah
                            ->select('*')
                            ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                            ->join('karyawan', $statusU)
                            ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                            ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                            ->countAllResults();
        }

        if($masalah !== null){
            $data['status'] = 200;
            $data['message'] = 'Berhasil';
            $data['result'] = $masalah;
            $data['total'] = $count;
        } else {
            $data['status'] = 404;
            $data['message'] = "Data tidak ditemukan";
            $data['result'] = $masalah;
            $data['total'] = $count;
        }

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function updateStatusMasalah__() {
        $result = $this->Masalah->save($this->request->getJson());
        if($result) {
            $data['status_code'] = 200;
            $data['message'] = "Berhasil update";
        } else {
            $data['status_code'] = 400;
            $data['message'] = "Gagal update";
        }
        // $data['result'] = $result;

        $data['token'] = csrf_hash();
        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function listDataHistory() {
        
        $limit = $this->request->getVar('limit');
        $offset = $this->request->getVar('offset');
        $nip = $this->request->getVar('nip');
        $orderByDate = $this->request->getVar('order_by_date');

        if($limit == null)
            $limit = 15;

        if($offset == null)
            $offset = 1;

        if($orderByDate == null)
            $orderByDate = 'asc';

        
        $masalah = $this->Masalah
                        ->select('*')
                        ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                        ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                        ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                        ->where('helpdesk.nip_executor', $nip)
                        ->where('helpdesk.id_status_pengerjaan', '4')
                        ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                        ->findAll($limit, ($offset - 1) * $limit);
                            
        $count = $this->Masalah
                        ->select('*')
                        ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                        ->join('karyawan', 'karyawan.nip = helpdesk.nip_user')
                        ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                        ->where('helpdesk.nip_executor', $nip)
                        ->where('helpdesk.id_status_pengerjaan', '4')
                        ->orderBy('helpdesk.tanggal_selesai', $orderByDate)
                        ->countAllResults();

        if($masalah !== null){
            $data['status'] = 200;
            $data['message'] = 'Berhasil';
            $data['result'] = $masalah;
            $data['total'] = $count;
        } else {
            $data['status'] = 404;
            $data['message'] = "Data tidak ditemukan";
            $data['result'] = $masalah;
            $data['total'] = $count;
        }

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
        

    }

}