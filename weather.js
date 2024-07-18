import { cityXYList } from "./apiList.js";

    //
    // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
    //


    // function dfs_xy_conv(code, v1, v2) {
    //     //
    //     // LCC DFS 좌표변환을 위한 기초 자료
    //     //
    //     var RE = 6371.00877; // 지구 반경(km)
    //     var GRID = 5.0; // 격자 간격(km)
    //     var SLAT1 = 30.0; // 투영 위도1(degree)
    //     var SLAT2 = 60.0; // 투영 위도2(degree)
    //     var OLON = 126.0; // 기준점 경도(degree)
    //     var OLAT = 38.0; // 기준점 위도(degree)
    //     var XO = 43; // 기준점 X좌표(GRID)
    //     var YO = 136; // 기1준점 Y좌표(GRID)


    //     var DEGRAD = Math.PI / 180.0;
    //     var RADDEG = 180.0 / Math.PI;

    //     var re = RE / GRID;
    //     var slat1 = SLAT1 * DEGRAD;
    //     var slat2 = SLAT2 * DEGRAD;
    //     var olon = OLON * DEGRAD;
    //     var olat = OLAT * DEGRAD;

    //     var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    //     sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    //     var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    //     sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    //     var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    //     ro = re * sf / Math.pow(ro, sn);
    //     var rs = {};
    //     if (code == "toXY") {
    //         rs['lat'] = v1;
    //         rs['lng'] = v2;
    //         var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
    //         ra = re * sf / Math.pow(ra, sn);
    //         var theta = v2 * DEGRAD - olon;
    //         if (theta > Math.PI) theta -= 2.0 * Math.PI;
    //         if (theta < -Math.PI) theta += 2.0 * Math.PI;
    //         theta *= sn;
    //         rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    //         rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    //     }
    //     else {
    //         rs['x'] = v1;
    //         rs['y'] = v2;
    //         var xn = v1 - XO;
    //         var yn = ro - v2 + YO;
    //         ra = Math.sqrt(xn * xn + yn * yn);
    //         if (sn < 0.0) - ra;
    //         var alat = Math.pow((re * sf / ra), (1.0 / sn));
    //         alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    //         if (Math.abs(xn) <= 0.0) {
    //             theta = 0.0;
    //         }
    //         else {
    //             if (Math.abs(yn) <= 0.0) {
    //                 theta = Math.PI * 0.5;
    //                 if (xn < 0.0) - theta;
    //             }
    //             else theta = Math.atan2(xn, yn);
    //         }
    //         var alon = theta / sn + olon;
    //         rs['lat'] = alat * RADDEG;
    //         rs['lng'] = alon * RADDEG;
    //     }
    //     return rs;
    // }

    // console.log(dfs_xy_conv("toXY", 38, 128));


// 날씨정보 불러오기 - 수정
const serviceKey = 'ui5W61Qvj9ahZI1O8GFd%2B%2FQZjHpq5VXGsL70C1ux98Rzj97jqIoynNK4AtFCQ7eygK79sd0IUBumhbCgGZsQqA%3D%3D'; // 발급받은 서비스 키를 여기에 넣어주세요
const pyt_code = {0 : '강수 없음', 1 : '비', 2 : '비/눈', 3 : '눈', 5 : '빗방울', 6 : '진눈깨비', 7 : '눈날림'}
const sky_code = {1 : '맑음', 3 : '구름많음', 4 : '흐림'};
let apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
let queryParams = '?' + encodeURIComponent('serviceKey') + '='+`${serviceKey}`; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20240718'); /**/
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('1500'); /**/
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/

fetch(apiUrl + queryParams)
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다. 오류 코드: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
      const weatherData = data.response.body.items.item;
      let weatherKeys = Object.keys(weatherData);
        console.log(weatherKeys);

        // 데이터가 있는지 확인 후 출력
        if (weatherData) {
            console.log('현재 날씨 정보:');
            console.log('날짜 및 시간:', weatherData.baseDate + ' ' + weatherData.baseTime);
            console.log('현재 기온:', weatherData.temperature + '℃');
            console.log('습도:', weatherData.humidity + '%');

            // sky 객체가 있는지 확인 후 출력
            if (weatherData.sky) {
                console.log('하늘 상태:', weatherData.sky.name);
            } else {
                console.log('하늘 상태 데이터 없음');
            }

            // rainfall 객체가 있는지 확인 후 출력
            if (weatherData.rainfall) {
                console.log('강수 확률:', weatherData.rainfall.probability + '%');
            } else {
                console.log('강수 확률 데이터 없음');
            }
        } else {
            console.error('API 응답 데이터 없음');
        }
    })
    .catch(error => {
        console.error('API 요청 중 오류 발생:', error.message);
    });