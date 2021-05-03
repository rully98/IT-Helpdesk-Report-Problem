-- -------------------------------------------------------------
-- TablePlus 3.6.1(320)
--
-- https://tableplus.com/
--
-- Database: skripsi-rully
-- Generation Time: 2020-07-13 23:44:04.2190
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `devisi`;
CREATE TABLE `devisi` (
  `id_devisi` int NOT NULL AUTO_INCREMENT,
  `nama_devisi` varchar(255) DEFAULT NULL,
  `des_devisi` text,
  PRIMARY KEY (`id_devisi`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `helpdesk`;
CREATE TABLE `helpdesk` (
  `id_helpdesk` int NOT NULL AUTO_INCREMENT,
  `nip_user` varchar(255) DEFAULT NULL,
  `nama_helpdesk` varchar(255) DEFAULT NULL,
  `des_helpdesk` text,
  `id_status_pengerjaan` int DEFAULT NULL,
  `nip_executor` int DEFAULT NULL,
  `tanggal_selesai` timestamp NULL DEFAULT NULL,
  `tanggal_pengerjaan` timestamp NULL DEFAULT NULL,
  `tanggal_laporan` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `feedback` int DEFAULT NULL COMMENT '1 "PUAS" 2 "TIDAK PUAS"',
  PRIMARY KEY (`id_helpdesk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `karyawan`;
CREATE TABLE `karyawan` (
  `nip` varchar(255) NOT NULL,
  `id_devisi` int DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `jk` int DEFAULT NULL COMMENT '1 "Laki Laki" 2 "Perempuan"',
  `no_hp` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `status_u` int DEFAULT NULL COMMENT '1 "Admin" 2 "User" 3 "Super Admin"',
  `status_o` int DEFAULT NULL COMMENT '1 "Online" 2 "Offline"',
  `status_a` int DEFAULT NULL COMMENT '1 "Aktif" 2 "Tidak Aktif"',
  `password` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `list_waktu_pengerjaan`;
CREATE TABLE `list_waktu_pengerjaan` (
  `id_list_waktu` int NOT NULL AUTO_INCREMENT,
  `nama_pengerjaan` varchar(255) DEFAULT NULL,
  `deskripsi_waktu_pengerjaan` text,
  PRIMARY KEY (`id_list_waktu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `message_helpdesk`;
CREATE TABLE `message_helpdesk` (
  `id_message_helpdesk` int NOT NULL AUTO_INCREMENT,
  `id_helpdesk` int DEFAULT NULL,
  `nip_pengirim` int DEFAULT NULL,
  `message` text,
  `message_updated_at` timestamp NULL DEFAULT NULL,
  `message_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_message_helpdesk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `status_pengerjaan`;
CREATE TABLE `status_pengerjaan` (
  `id_status_pengerjaan` int NOT NULL AUTO_INCREMENT,
  `status_pengerjaan` varchar(255) DEFAULT NULL,
  `des_pengerjaan` text,
  PRIMARY KEY (`id_status_pengerjaan`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

INSERT INTO `devisi` (`id_devisi`, `nama_devisi`, `des_devisi`) VALUES
('1', 'GA', 'General Afair  '),
('2', 'IT', 'Informasi Teknologi'),
('3', 'HRD', 'Human Resourse Development'),
('4', 'ADM', 'Administrasi'),
('5', 'AKUNTASI', 'Keuangan');

INSERT INTO `karyawan` (`nip`, `id_devisi`, `nama`, `jk`, `no_hp`, `email`, `jabatan`, `status_u`, `status_o`, `status_a`, `password`, `updated_at`, `created_at`) VALUES
('123455', '1', 'Andi', '1', '089293323', 'andi@email.com', 'Staf', '1', '2', '1', '$2y$10$1L6ZmEJinXlJTTaSi8fy3.lrO/tya0WxG9XQxQORAQJClBJIXxQQG', '2020-06-25 00:59:34', '2020-06-22 16:15:31'),
('123456', '2', 'Joko Waluyo', '1', '081219221922', 'joko@gmail.com', 'Staf', '3', '2', '1', '$2y$10$ojyCuXN5BkKTQ850tcz6Ou3D/FNW52Z7cW8/cLW5PMZ.IxRXshifC', '2020-07-13 23:37:52', '2020-06-22 16:02:37');

INSERT INTO `status_pengerjaan` (`id_status_pengerjaan`, `status_pengerjaan`, `des_pengerjaan`) VALUES
('1', 'On Verify', 'proses verifikasi dulu oleh admin sebelum di kerjakan'),
('2', 'On Progress', 'sedang di kerjakan'),
('3', 'Pending', 'pending karna sesuatu'),
('4', 'Done', 'pengerjaan selesai');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;