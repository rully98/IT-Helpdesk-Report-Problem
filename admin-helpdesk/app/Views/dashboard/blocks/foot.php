
  <!--   Core JS Files   -->
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/core/jquery.min.js"></script>
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/core/popper.min.js"></script>
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/core/bootstrap.min.js"></script>
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
  <!-- Chart JS -->
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/plugins/chartjs.min.js"></script>
  <!--  Notifications Plugin    -->
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/plugins/bootstrap-notify.js"></script>
  <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="<?= base_url() ?>/assets/dashboard-assets/js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script><!-- Paper Dashboard DEMO methods, don't include it in your project! -->
  <!-- <script src="<?= base_url() ?>/assets/dashboard-assets/demo/demo.js"></script>
  <script>
    $(document).ready(function() {
      // Javascript method's body can be found in assets/assets-for-demo/js/demo.js
      demo.initChartsPages();
    });
  </script> -->
  <script>
    setTimeout(function(){
      $('#success-message').css({'display': 'none'})
      $('#failed-message').css({'display': 'none'})
    }, 7000)
  </script>
</body>

</html>