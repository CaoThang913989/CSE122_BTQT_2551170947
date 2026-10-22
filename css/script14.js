const wonders = [
  {
    id: 1,
    title: "1. Vịnh Hạ Long",
    desc: "Gần 2.000 đảo đá vôi, Di sản thiên nhiên thế giới, thuộc Quảng Ninh.",
    imgSrc: "../Anh/Bai14/1-vinh-ha-long.jpg",
  },
  {
    id: 2,
    title: "2. Hang Sơn Đoòng",
    desc: "Hang động tự nhiên lớn nhất thế giới, thuộc Quảng Bình.",
    imgSrc: "../Anh/Bai14/2-son-doong.jpg",
  },
  {
    id: 3,
    title: "3. Thác Bản Giốc",
    desc: "Thác nước đẹp nhất Việt Nam, nằm ở Cao Bằng.",
    imgSrc: "../Anh/Bai14/3-thac-ban-gioc.jpg",
  },
  {
    id: 4,
    title: "4. Fansipan",
    desc: "“Mái nhà Đông Dương”, cao 3.147 m, thuộc Lào Cai.",
    imgSrc: "../Anh/Bai14/4-fansipan.jpg",
  },
  {
    id: 5,
    title: "5. Đồng bằng sông Cửu Long",
    desc: "Vựa lúa, miệt vườn sông nước trù phú miền Nam.",
    imgSrc: "../Anh/Bai14/5-mekong.jpg",
  },
  {
    id: 6,
    title: "6. Động Phong Nha",
    desc: "Hệ thống hang động kỳ vĩ, Di sản thiên nhiên thế giới.",
    imgSrc: "../Anh/Bai14/6-phong-nha.jpg",
  },
];

const container = document.getElementById("wonders-container");

function renderWonders() {
  wonders.forEach((wonder) => {
    const cardHTML = `
            <article class="card">
                <img src="${wonder.imgSrc}" alt="${wonder.title}">
                
                <div class="card-content">
                    <h3>${wonder.title}</h3>
                    <p>${wonder.desc}</p>
                </div>
            </article>
        `;

    container.innerHTML += cardHTML;
  });
}

window.onload = renderWonders;
