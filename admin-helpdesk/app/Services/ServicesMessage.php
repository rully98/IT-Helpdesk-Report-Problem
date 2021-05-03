<?php namespace App\Services;

use App\Entities\ENMessage;
use App\Models\MOMessage;

class ServicesMessage extends \CodeIgniter\Controller
{
    protected $Message, $MessageEN, $request;
    
	public function __construct()
	{
		$this->Message = new MOMessage();
		$this->MessageEN = new ENMessage();
		$this->request = \Config\Services::request();
    }

    public function listData() {

        $id_helpdesk = $this->request->getVar('id_helpdesk');


        $message = $this->Message->where('id_helpdesk', $id_helpdesk)
                        ->orderBy('message_created_at', 'desc')
                        ->findAll();

        
        $data['status'] = 200;
        $data['result'] = $message;

        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);

    }

    public function add() {
        $result = $this->Message->save($this->request->getJson());
        if($result) {
            $data['status_code'] = 200;
            $data['message'] = "Berhasil menyimpan";
        } else {
            $data['status_code'] = 400;
            $data['message'] = "Gagal menyimpan";
        }
        // $data['result'] = $result;

        $data['token'] = csrf_hash();
        $this->response->setHeader('Content-Type', 'application/json');
        return $this->response->setJSON($data);
    }


}