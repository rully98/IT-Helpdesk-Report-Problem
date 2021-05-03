<?php namespace App\Services;

use App\Entities\ENDevisi;
use App\Models\MODevisi;

class ServicesDevisi extends \CodeIgniter\Controller
{
    protected $Devisi, $DevisiEN, $request;
    
	public function __construct()
	{
		$this->Devisi = new MODevisi();
		$this->DevisiEN = new ENDevisi();
		$this->request = \Config\Services::request();
    }

    public function getAllDevisi() {

        $data = $this->Devisi->findAll();

        return $data;
    }

}