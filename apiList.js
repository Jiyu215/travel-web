const cityXYList = {
  서울 : {x : 96, y: 74},
  부산 : {x : 98, y: 76},
  인천 : {x : 55, y: 124},
  대구 : {x : 89, y: 90},
  대전 : {x : 67, y: 100},
  광주 : {x : 65, y: 123},
  울산 : {x : 102, y: 84},
  세종 : {x : 65, y: 104},
  강릉 : {x : 92, y: 131},
  수원 : {x : 61, y: 120},
  청주 : {x : 69, y: 107},
  안동 : {x : 91, y: 106},
  울릉도 : {x : 127, y: 127},
  전주 : {x : 63, y: 89},
  포항 : {x : 102, y: 94},
  목포 : {x : 50, y: 67},
  여수 : {x : 73, y: 66},
  제주 : {x : 55, y: 39},
}

const cityKeys = Object.keys(cityXYList);
const citiesList = document.getElementById("cities-list");

for (let index = 0; index < cityKeys.length; index++) {
  citiesList.insertAdjacentHTML(
      "beforeend",
      `<li value="${cityKeys[index]}">
      <ul>
        <li class="image"></li>
        <li class="text">${cityKeys[index]}</li>
      </ul>
      </li>`
  );
}
citiesList.addEventListener("click",(e)=>{
  
});
export {cityXYList,cityKeys};

