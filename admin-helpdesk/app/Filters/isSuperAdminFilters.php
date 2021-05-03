<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class isSuperAdminFilters implements FilterInterface
{
    public function before(RequestInterface $request)
    {
      /* Check Login Or Not */
      if(session()->get('status') != 3)
        return redirect()->to('/dashboard-admin');
      
    }

    //--------------------------------------------------------------------

    public function after(RequestInterface $request, ResponseInterface $response)
    {

    }
}