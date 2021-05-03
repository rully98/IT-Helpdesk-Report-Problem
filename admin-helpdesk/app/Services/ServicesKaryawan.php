<?php namespace App\Services;

use App\Entities\ENKaryawan;
use App\Models\MOKaryawan;

class ServicesKaryawan extends \CodeIgniter\Controller
{
	protected $Admin, $AdminEN, $request;

	public function __construct()
	{
		$this->Admin = new MOKaryawan();
		$this->AdminEN = new ENKaryawan();
		$this->request = \Config\Services::request();
    }

    public function getDataUserByNip() {

        $result = $this->Admin->where('nip', session()->get('nip'))
                                ->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                                ->first();

        return $result;
    }

    public function countAdminOnline() {
        $where = "(status_u = 1 OR status_u = 3) AND status_o = 1";
        $data = $this->Admin->where($where)
                        ->countAllResults();
        return $data;
    }

    public function countUserOnline() {
        $where = "status_u = 2 AND status_o = 1";
        $data = $this->Admin->where($where)
                        ->countAllResults();
        return $data;
        
    }

    public function countAllKaryawan() {

        $data = $this->Admin->countAllResults();
        return $data;
    }

    public function listData() {

        $limit = $this->request->getVar('limit');
        $offset = $this->request->getVar('offset');
        $orderByNama = $this->request->getVar('order_by_name');

        if($limit == null)
            $limit = 10;

        if($offset == null)
            $offset = 1;

        if($orderByNama == null)
            $orderByNama = 'asc';

        $admin = $this->Admin->join('devisi', 'devisi.id_devisi = karyawan.id_devisi')
                            ->orderBy('nama', $orderByNama)
                            ->findAll($limit, ($offset - 1) * $limit);

        $count = $this->countAllKaryawan();

        if($admin !== null){
            $data['status'] = 200;
            $data['message'] = 'Berhasil';
            $data['result'] = $admin;
            $data['total'] = $count;
        } else {
            $data['status'] = 404;
            $data['message'] = "Data tidak ditemukan";
            $data['result'] = $admin;
            $data['total'] = $count;
        }

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }

    public function addKaryawan($var){
        $result = $this->Admin->insert($var);
        return $result;
    }

    public function updateKaryawan($var){
        $this->AdminEN->fill($var);
        unset($this->AdminEN->password);
        if($var['password'] != ''){
            $this->AdminEN->password = $var['password'];
            $result = $this->Admin->save($this->AdminEN);
        } else {
           $result = $this->Admin->save($this->AdminEN);
        }

        return $result;
    }

    public function updateStatusUser__() {
        $result = $this->Admin->save($this->request->getJson());
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