const expression = document.getElementById("expression");
const result = document.getElementById("result");
const keyboard = document.querySelector(".keyboard");

let phepTinh = "";

function capNhatManHinh() {
  expression.textContent = phepTinh;
}

function tinhToan(chuoi) {
  chuoi = chuoi.replace(/×/g, "*").replace(/÷/g, "/");

  let viTri = 0;

  function docSo() {
    boQuaKhoangTrang();

    if (chuoi[viTri] === "+") {
      viTri++;
      return docSo();
    }

    if (chuoi[viTri] === "-") {
      viTri++;
      return -docSo();
    }

    if (chuoi[viTri] === "(") {
      viTri++;
      const so = docPhepCongTru();

      boQuaKhoangTrang();

      if (chuoi[viTri] !== ")") {
        throw new Error("Sai dấu ngoặc");
      }

      viTri++;
      return so;
    }

    const batDau = viTri;

    while (viTri < chuoi.length && /[0-9.]/.test(chuoi[viTri])) {
      viTri++;
    }

    const giaTri = chuoi.slice(batDau, viTri);

    if (giaTri === "" || !/^\d+(\.\d*)?|\.\d+$/.test(giaTri)) {
      throw new Error("Phép tính không hợp lệ");
    }

    return Number(giaTri);
  }

  function boQuaKhoangTrang() {
    while (/\s/.test(chuoi[viTri] || "") && viTri < chuoi.length) {
      viTri++;
    }
  }

  function docNhanChia() {
    let so = docSo();

    while (true) {
      boQuaKhoangTrang();

      const phep = chuoi[viTri];

      if (phep !== "*" && phep !== "/" && phep !== "%") {
        break;
      }

      viTri++;

      const soSau = docSo();

      if ((phep === "/" || phep === "%") && soSau === 0) {
        throw new Error("Không thể chia cho 0");
      }

      if (phep === "*") {
        so *= soSau;
      } else if (phep === "/") {
        so /= soSau;
      } else {
        so %= soSau;
      }
    }

    return so;
  }

  function docPhepCongTru() {
    let so = docNhanChia();

    while (true) {
      boQuaKhoangTrang();

      const phep = chuoi[viTri];

      if (phep !== "+" && phep !== "-") {
        break;
      }

      viTri++;

      const soSau = docNhanChia();

      if (phep === "+") {
        so += soSau;
      } else {
        so -= soSau;
      }
    }

    return so;
  }

  const ketQua = docPhepCongTru();

  boQuaKhoangTrang();

  if (viTri !== chuoi.length || !Number.isFinite(ketQua)) {
    throw new Error("Phép tính không hợp lệ");
  }

  return Number(ketQua.toPrecision(12));
}

keyboard.addEventListener("click", function (event) {
  const nut = event.target.closest("button");

  if (!nut) {
    return;
  }

  if (nut.dataset.action === "clear") {
    phepTinh = "";
    expression.textContent = "";
    result.textContent = "0";
    return;
  }

  if (nut.dataset.action === "calculate") {
    if (phepTinh.trim() === "") {
      return;
    }

    try {
      const ketQua = tinhToan(phepTinh);

      expression.textContent = phepTinh + " =";
      result.textContent = ketQua;
      phepTinh = String(ketQua);
    } catch (loi) {
      result.textContent = "Lỗi";
    }

    return;
  }

  const giaTri = nut.dataset.value;

  if (giaTri === "(") {
    const soNgoacMo = (phepTinh.match(/\(/g) || []).length;
    const soNgoacDong = (phepTinh.match(/\)/g) || []).length;
    const kyTuCuoi = phepTinh.slice(-1);

    if (soNgoacMo > soNgoacDong && /[0-9.)]/.test(kyTuCuoi)) {
      phepTinh += ")";
    } else {
      phepTinh += "(";
    }
  } else {
    phepTinh += giaTri;
  }

  capNhatManHinh();
});
