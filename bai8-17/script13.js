const digits = document.querySelector("#digits");
const greeting = document.querySelector("#greeting");

function updateClock() {
  const now = new Date();

  const gio = String(now.getHours()).padStart(2, "0");
  const phut = String(now.getMinutes()).padStart(2, "0");
  const giay = String(now.getSeconds()).padStart(2, "0");

  const thoiGian = gio + phut + giay;
  const cacAnh = digits.querySelectorAll("img");

  for (let i = 0; i < cacAnh.length; i++) {
    if (i === 2 || i === 5) {
      continue;
    }

    const viTri = i < 2 ? i : i - 1;
    const so = thoiGian[viTri];

    cacAnh[i].src = "../Anh/Bai13/" + so.padStart(2, "0") + ".gif";
    cacAnh[i].alt = so;
  }

  if (now.getHours() < 12) {
    greeting.textContent = "Chào buổi sáng";
  } else if (now.getHours() < 18) {
    greeting.textContent = "Chào buổi chiều";
  } else {
    greeting.textContent = "Chào buổi tối";
  }
}

updateClock();
setInterval(updateClock, 1000);
