<?php namespace App\Controllers\User;

use App\Entities\ENMasalah;
use App\Models\MOMasalah;
use App\Models\MOMessage;

class Masalah extends \CodeIgniter\Controller
{
    protected $Admin, $AdminEN, $request, $Pesan;
 

	public function __construct()
	{
		$this->Masalah = new MOMasalah();
        $this->MasalahEN = new ENMasalah();
        $this->Pesan = new MOMessage();
		$this->request = \Config\Services::request();
	}
	
	
    public function countAllMasalah($nip) {

        $data = $this->Masalah->where('nip_user',$nip)
                        ->countAllResults();

        return $data;
    }
    
    public function listMasalah() {

        $nip = $this->request->getVar('nip');
        $limit = $this->request->getVar('limit');
        $offset = $this->request->getVar('offset');
        $orderByDate = $this->request->getVar('order_by_date');
        
        if($limit == null)
            $limit = 10;

        if($offset == null)
            $offset = 1;

        if($orderByDate == null)
            $orderByDate = 'desc';

        $result = $this->Masalah
                            ->select('*')
                            ->where('nip_user', $nip)
                            ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                            ->orderBy('helpdesk.tanggal_laporan', $orderByDate)
                            ->findAll($limit, ($offset - 1) * $limit);

        $total = $this->countAllMasalah($nip);

        if($total !== 0){
            $data['status'] = 200;
            $data['message'] = 'Berhasil';
            $data['result'] = $result;
            $data['total'] = $total;
        } else {
            $data['status'] = 404;
            $data['message'] = "Data tidak ditemukan";
            $data['result'] = $result;
            $data['total'] = $total;
        }

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function detailMasalah() {

        $id = $this->request->getVar('id');

        $where = "helpdesk.id_helpdesk = '".$id."' && helpdesk.nip_executor <> '".NULL."'";
        
        $hasil = $this->Masalah
                            ->select('*')
                            ->where($where)
                            ->findAll();
        
        if(count($hasil) != 0) {
            $result = $this->Masalah
                        ->select('*')
                        ->where($where)
                        ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                        ->join('karyawan', 'karyawan.nip = helpdesk.nip_executor')
                        ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                        ->findAll();
            $pesan = $this->Pesan
                        ->select('*')
                        ->where('id_helpdesk', $id)
                        ->orderby('message_created_at','desc')
                        ->findAll();
        } else {
            $where1 = "helpdesk.id_helpdesk = '".$id."'";
            $result = $this->Masalah
                        ->select('*')
                        ->where($where1)
                        ->join('status_pengerjaan', 'status_pengerjaan.id_status_pengerjaan = helpdesk.id_status_pengerjaan')
                        ->findAll();
            $pesan = 0;
        }

        $data['status'] = 200;
        $data['message'] = 'Berhasil';
        $data['result'] = $result[0];
        $data['pesan'] = $pesan;

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function addMasalah(){

        $result = $this->Masalah->save($this->request->getJson());
        if($result) {
            $data['status_code'] = 200;
            $data['message'] = "Berhasil";
        } else {
            $data['status_code'] = 400;
            $data['message'] = "Gagal";
        }
        // $data['result'] = $result;

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }
    
    public function updateMasalah(){

        // $result = $this->Masalah->save($this->request->getJson());

		$id = $this->request->getJson()->id_helpdesk;
		$feedback = $this->request->getJson()->feedback;
		
        $this->MasalahEN->id_status_pengerjaan = 4;
        $this->MasalahEN->feedback = $feedback;
        $this->MasalahEN->id_helpdesk = $id;

        $result = $this->Masalah->update($id, $this->MasalahEN);
        
        if($result) {
            $data['status_code'] = 200;
            $data['message'] = "Berhasil";
        } else {
            $data['status_code'] = 400;
            $data['message'] = "Gagal";
        }
        // $data['result'] = $result;

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }
}
