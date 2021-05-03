<?php namespace App\Services;

use App\Entities\ENListWaktu;
use App\Models\MOListWaktu;

class ServicesListWaktu extends \CodeIgniter\Controller
{
    protected $ListWaktu, $ListWaktuEN, $request;
    
	public function __construct()
	{
		$this->ListWaktu = new MOListWaktu();
		$this->ListWaktuEN = new ENListWaktu();
		$this->request = \Config\Services::request();
    }

    public function listData() {

        $limit = $this->request->getVar('limit');
        $offset = $this->request->getVar('offset');
        $orderBy = $this->request->getVar('order_by_id');

        if($limit == null)
            $limit = 50;

        if($offset == null)
            $offset = 1;

        if($orderBy == null)
            $orderBy = 'desc';

        $listwaktu = $this->ListWaktu
                            ->orderBy('id_list_waktu',$orderBy)
                            ->findAll();

        if($listwaktu !== null){
            $data['status'] = 200;
            $data['message'] = 'Berhasil';
            $data['result'] = $listwaktu;
        } else {
            $data['status'] = 404;
            $data['message'] = "Data tidak ditemukan";
            $data['result'] = $listwaktu;
        }

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }
    
    public function add() {
        $result = $this->ListWaktu->save($this->request->getJson());

        if($result) {
            $data['status_code'] = 200;
            $data['message'] = "Berhasil add";
        } else {
            $data['status_code'] = 400;
            $data['message'] = "Gagal add";
        }

        $data['token'] = csrf_hash();
        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function update() {
        $result = $this->ListWaktu->save($this->request->getJson());
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


}