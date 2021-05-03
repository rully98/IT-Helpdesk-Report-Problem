<?= $this->extend('layout-dashboard') ?>

<?= $this->section('content') ?>
    <div class="wrapper ">
        
        <!-- SIDEBAR -->
        <?= $this->include('dashboard/blocks/sidebar') ?>
        <!-- END SIDEBAR -->

        <div class="main-panel">

            <!-- NAVBAR -->
            <?= $this->include('dashboard/blocks/navbar') ?>
            <!-- END NAVBAR -->

            <div class="content">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card card-stats">
                            <div class="card-body">
                                <h3><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Tambah Data Karyawan</h3>
                                <a href="<?= base_url(); ?>/dashboard-admin/karyawan" class="btn btn-primary m-b-20">
                                    <i class="fa fa-angle-left" aria-hidden="true"></i> Kembali
                                </a>
                                <form method="post" action="<?= base_url(); ?>/dashboard-admin/karyawan/add">
					                <input type="hidden" id="hidden-csrf" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />
					                <input type="hidden" name="status_o" value="2" />
					                <input type="hidden" name="status_a" value="2" />
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div class="col-lg-8 col-md-8 col-sm-12" style="border: 1px solid #DDDDDD; padding: 15px; border-radius: 20px; margin-bottom: 20px;">
                                            <h4>Form Tambah Data Karyawan</h4>
                                            <hr/>
                                            <?php if(isset($_SESSION['status_code'])) {
                                                if($_SESSION['status_code'] == 200) { ?>
                                                    <div class="alert-success alert" id="success-message">   
                                                        <?= $_SESSION['message']; ?>
                                                    </div>
                                                <?php } else {?>
                                                    <div class="alert-danger alert" id="failed-message">
                                                        <?= $_SESSION['message']; ?>
                                                    </div>
                                            <?php } } ?>
                                            <div class="form-group m-b-20">
                                                <label>Nip</label>
                                                <input type="text" value="<?= set_value('nip'); ?>" name="nip" style="max-width: 250px;" class="form-control"/>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('nip')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('nip'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Nama Lengkap</label>
                                                <input type="text" name="nama" value="<?= set_value('nama'); ?>" style="max-width: 450px;" class="form-control"/>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('nama')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('nama'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Jenis Kelamin</label>
                                                <select class="form-control" name="jk" style="max-width: 180px;">
                                                    <option value="1">Laki-Laki</option>
                                                    <option value="2">Perempuan</option>
                                                </select>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('jk')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('jk'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>No Hp</label>
                                                <input type="text" name="no_hp" value="<?= set_value('no_hp'); ?>" style="max-width: 200px;" class="form-control"/>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('no_hp')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('no_hp'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Email</label>
                                                <input type="text" name="email" value="<?= set_value('email'); ?>" style="max-width: 280px;" class="form-control"/>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('email')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('email'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Devisi</label>
                                                <select class="form-control" name="id_devisi" style="max-width: 200px;">
                                                    <?php foreach($devisi as $value) { ?>
                                                        <option value="<?= $value->id_devisi ?>"><?= $value->nama_devisi ?></option>
                                                    <?php } ?>
                                                </select>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('id_devisi')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('id_devisi'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Jabatan</label>
                                                <input type="text" name="jabatan" value="<?= set_value('jabatan'); ?>" style="max-width: 230px;" class="form-control"/>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('jabatan')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('jabatan'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <label>Status User</label>
                                                <select class="form-control" name="status_u" style="max-width: 180px;">
                                                    <option value="2">User</option>
                                                    <option value="1">Admin</option>
                                                    <option value="3">Super Admin</option>
                                                </select>
                                                <?php if(isset($validation)) { 
                                                    if($validation->hasError('status_u')) { ?>
                                                    <div class="alert alert-danger">
                                                        <?= $validation->getError('status_u'); ?>
                                                </div>
                                                <?php } } ?>
                                            </div>
                                            <div class="form-group m-b-20">
                                                <input type="submit" class="btn btn-primary m-r-10" value="Simpan" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>

             <!-- FOOTER -->
            <?php //echo $this->include('dashboard/blocks/footer'); ?>


        </div>
    </div>
  <?= $this->endSection() ?>