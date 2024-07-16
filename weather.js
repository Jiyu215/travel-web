import { cities } from "./apiList.js";

// 날씨정보 불러오기
const apiUrl = 'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList'; // API URL
const serviceKey = 'ui5W61Qvj9ahZI1O8GFd%2B%2FQZjHpq5VXGsL70C1ux98Rzj97jqIoynNK4AtFCQ7eygK79sd0IUBumhbCgGZsQqA%3D%3D'; // 발급받은 서비스 키를 여기에 넣어주세요
// const queryParams = `?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&dataType=XML&dataCd=ASOS&dateCd=HR&startDt=20100101&startHh=01&endDt=20100601&endHh=01&stnIds=108`;
const queryParams = `?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&dataType=XML&dataCd=ASOS&dateCd=HR&startDt=20100101&startHh=01&endDt=20100601&endHh=01&stnIds=100`;


fetch(apiUrl + queryParams)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // XML 형식의 데이터를 텍스트로 변환하여 반환
  })
  .then(xmlData => {
    console.log(xmlData); // 받은 XML 데이터를 콘솔에 출력하거나 원하는 방식으로 처리
    // 여기서부터 XML 데이터를 원하는 방식으로 처리할 수 있습니다.
    // 예를 들어, XML을 파싱하여 정보를 추출하거나 다른 형식으로 변환하는 등의 작업을 수행할 수 있습니다.
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  const citiesList = document.getElementById("cities-list");
  
  for (let index = 0; index < cities.length; index++) {
    citiesList.insertAdjacentHTML(
        "beforeend",
        `<li value="${cities[index]}">${cities[index]}</li>`
    );
  }