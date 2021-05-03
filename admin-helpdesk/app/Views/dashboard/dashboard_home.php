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
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card card-stats">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col-5 col-md-4">
                                        <div class="icon-big text-center icon-warning">
                                            <i class="fa fa-user-o" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="col-7 col-md-8">
                                        <div class="numbers">
                                            <p class="card-category">Total</p>
                                            <p class="card-title">
                                                <?= $count_all_useradmin; ?>
                                            <p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer ">
                                <hr>
                                <div class="stats">
                                    User & Admin
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card card-stats">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col-5 col-md-4">
                                        <div class="icon-big text-center icon-warning">
                                            <i class="fa fa-outdent" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="col-7 col-md-8">
                                        <div class="numbers">
                                            <p class="card-category">Total</p>
                                            <p class="card-title text-warning">
                                                <?= $count_all_masalah; ?>
                                            <p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer ">
                                <hr>
                                <div class="stats">
                                    Laporan Masalah
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

             <!-- FOOTER -->
            <?php //echo $this->include('dashboard/blocks/footer'); ?>
            <!-- END FOOTER -->

        </div>
    </div>
  <?= $this->endSection() ?>