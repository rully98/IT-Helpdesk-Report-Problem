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
                                <h3><i class="fa fa-list-alt" aria-hidden="true"></i> Data Semua Laporan Masalah</h3>
					            <input type="hidden" id="hidden-csrf" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />
                            </div>
                        </div>
                        <div id="list-masalah"></div>
                    </div>

                </div>
            </div>

             <!-- FOOTER -->
            <?php //echo $this->include('dashboard/blocks/footer'); ?>
            <!-- END FOOTER -->

            <?php if(getenv('CI_ENVIRONMENT') == 'development') { ?>
                <script src="<?= base_url() ?>/assets/reactjs/vendor/react.development.js"></script>
                <script src="<?= base_url() ?>/assets/reactjs/vendor/react-dom.development.js"></script>
            <?php } else { ?>
                <script src="<?= base_url() ?>/assets/reactjs/vendor/react.production.min.js"></script>
                <script src="<?= base_url() ?>/assets/reactjs/vendor/react-dom.production.min.js"></script>
            <?php } ?>

            <script src="<?= base_url() ?>/assets/reactjs/vendor/babel.min.js"></script>
            <script src="<?= base_url() ?>/assets/reactjs/vendor/axios.min.js"></script>

            <script src="<?= base_url() ?>/assets/dashboard-assets/js/moment-with-locales.min.js"></script>
            <script type="text/babel" id="scripts-list-data" src="<?= base_url() ?>/assets/reactjs/list-masalah.js?endpoint=<?= base_url(); ?>&status_user=<?= $_SESSION['status']; ?>&nipdata=<?= $_SESSION['nip']; ?>"></script>

        </div>
    </div>
  <?= $this->endSection() ?>