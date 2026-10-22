const formLich = document.getElementById("form-lich");

const oNgay = document.getElementById("ngay");
const oThang = document.getElementById("thang");
const oNam = document.getElementById("nam");

const ketQuaNam = document.getElementById("ket-qua-nam");
const ketQuaThang = document.getElementById("ket-qua-thang");
const ketQuaNgay = document.getElementById("ket-qua-ngay");
const ketQuaThu = document.getElementById("ket-qua-thu");

const loiChao = document.getElementById("loi-chao");
const thongBao = document.getElementById("thong-bao");

const homNay = new Date();

oNgay.value = homNay.getDate();
oThang.value = homNay.getMonth() + 1;
oNam.value = homNay.getFullYear();

const tenThu = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

function hienThiLoiChao() {
  const gio = new Date().getHours();

  if (gio >= 5 && gio < 12) {
    loiChao.textContent = "Chào buổi sáng!";
  } else if (gio >= 12 && gio < 18) {
    loiChao.textContent = "Chào buổi chiều!";
  } else if (gio >= 18 && gio < 22) {
    loiChao.textContent = "Chào buổi tối!";
  } else {
    loiChao.textContent = "Chúc bạn ngủ ngon!";
  }
}

function inLich(ngay, thang, nam) {
  const ngayChon = new Date(nam, thang - 1, ngay);

  ketQuaNam.textContent = ngayChon.getFullYear();
  ketQuaThang.textContent = "Tháng " + (ngayChon.getMonth() + 1);
  ketQuaNgay.textContent = ngayChon.getDate();
  ketQuaThu.textContent = tenThu[ngayChon.getDay()];

  hienThiLoiChao();
}

formLich.addEventListener("submit", function (event) {
  event.preventDefault();

  const ngay = Number(oNgay.value);
  const thang = Number(oThang.value);
  const nam = Number(oNam.value);

  if (
    !Number.isInteger(ngay) ||
    !Number.isInteger(thang) ||
    !Number.isInteger(nam) ||
    nam < 1 ||
    nam > 9999 ||
    thang < 1 ||
    thang > 12 ||
    ngay < 1 ||
    ngay > 31
  ) {
    thongBao.textContent = "Vui lòng nhập ngày, tháng, năm hợp lệ.";
    return;
  }

  const ngayChon = new Date(nam, thang - 1, ngay);

  if (
    ngayChon.getFullYear() !== nam ||
    ngayChon.getMonth() !== thang - 1 ||
    ngayChon.getDate() !== ngay
  ) {
    thongBao.textContent = "Ngày đã chọn không tồn tại trong lịch.";
    return;
  }

  thongBao.textContent = "";
  inLich(ngay, thang, nam);
});

inLich(homNay.getDate(), homNay.getMonth() + 1, homNay.getFullYear());
