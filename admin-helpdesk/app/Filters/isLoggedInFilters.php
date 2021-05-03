<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class isLoggedInFilters implements FilterInterface
{
    public function before(RequestInterface $request)
    {
      /* Check Login Or Not */
      if(!session()->get('isLoggedIn'))
        return redirect()->to('/login');
      
    }

    //--------------------------------------------------------------------

    public function after(RequestInterface $request, ResponseInterface $response)
    {

    }
}