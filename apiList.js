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

// for (let index = 0; index < cityKeys.length; index++) {
//   citiesList.insertAdjacentHTML(
//       "beforeend",
//       `<li value="${cityKeys[index]}">
//       <ul>
//         <li class="image"></li>
//         <li class="text">${cityKeys[index]}</li>
//       </ul>
//       </li>`
//   );
// }


//메인화면 날씨가 좋은 여행지 추천 카드
const weatherTripList = document.getElementById("card-list-box");
for (let index = 0; index < cityKeys.length; index++) {
  weatherTripList.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
      <ul>
          <div class="card_top"><img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6287cec8-b327-463a-9fc6-2651c9e2cc57.jpeg" alt="" draggable="false"></div>
          <div class="card_bottom">
              <h2 class="card_title">${cityKeys[index]}</h2>
              <span class="card_body">현재 기온, 온도, 상태</span>
            </div>
        </ul>
    </li>`
  );
}

// 슬라이더
document.addEventListener("DOMContentLoaded", function() { 
  const listBox = document.getElementById("card-list-box"); 
  const arrowBtns = document.querySelectorAll("#best-weather-warp .btn"); 
  const wrapper = document.getElementById("best-weather-warp"); 

  const firstCard = listBox.querySelector(".card"); 
  const firstCardWidth = firstCard.offsetWidth; 

  let isDragging = false, 
      startX, 
      startScrollLeft, 
      timeoutId; 

  const dragStart = (e) => {  
      isDragging = true; 
      listBox.classList.add("dragging"); 
      startX = e.pageX; 
      startScrollLeft = listBox.scrollLeft; 
  }; 

  const dragging = (e) => { 
      if (!isDragging) return; 
    
      const newScrollLeft = startScrollLeft - (e.pageX - startX); 
    
      if (newScrollLeft <= 0 || newScrollLeft >=  
          listBox.scrollWidth - listBox.offsetWidth) { 
            
          isDragging = false; 
          return; 
      } 
    
      listBox.scrollLeft = newScrollLeft; 
  }; 

  const dragStop = () => { 
      isDragging = false;  
      listBox.classList.remove("dragging"); 
  }; 

  const autoPlay = () => { 
    
      if (window.innerWidth < 800) return;  
        
      const totalCardWidth = listBox.scrollWidth; 
        
      const maxScrollLeft = totalCardWidth - listBox.offsetWidth; 
        
      if (listBox.scrollLeft >= maxScrollLeft) return; 
        
      timeoutId = setTimeout(() =>  
          listBox.scrollLeft += firstCardWidth, 2500); 
  }; 

  listBox.addEventListener("mousedown", dragStart); 
  listBox.addEventListener("mousemove", dragging); 
  listBox.addEventListener("mouseup", dragStop); 
  wrapper.addEventListener("mouseenter", () =>  
      clearTimeout(timeoutId)); 
  wrapper.addEventListener("mouseleave", autoPlay); 

  arrowBtns.forEach(btn => { 
      btn.addEventListener("click", () => { 
          listBox.scrollLeft += btn.id === "prev" ?  -firstCardWidth : firstCardWidth; 
      }); 
  }); 
}); 

// 날씨정보 불러오기
// const apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; // API URL
// let queryParams = `?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20240718&base_time=0600&nx=55&ny=127`;
// for (let index = 0; index < cityKeys.length; index++) {
  // fetch(apiUrl + queryParams)
  //   .then(response => {
    //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.text(); // JSON 형식의 데이터를 텍스트로 변환하여 반환
      //   })
      //   .then(jsonData => {
        //     console.log(jsonData);
        //   })
        //   .catch(error => {
          //     console.error('There has been a problem with your fetch operation:', error);
          //   });
          // }

export {cityXYList,cityKeys};

