package com.dororo.api.convert;

public class AxisCalculator {

    //각도계산
    public static double calculateBearing(double lat1, double lon1, double lat2, double lon2) {
        double phi1 = Math.toRadians(lat1);
        double phi2 = Math.toRadians(lat2);
        double lambda1 = Math.toRadians(lon1);
        double lambda2 = Math.toRadians(lon2);

        double y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
        double x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);
        double theta = Math.atan2(y, x);
        double bearing = (Math.toDegrees(theta) + 360) % 360;

        //위도 0.001 10m 경도 0.001 8m
        //동쪽 출발좌표 아래로이동 도착좌표 왼쪽
        if((bearing > 60 && bearing < 90) ||  (bearing > 90 && bearing < 120)){
            lon2 = lon2 - 0.00015; //도착지점 서쪽으로
            lat2 = lat2 - 0.00004; //차선기준 아래로내리기
        }
        //남쪽 출발좌표 왼쪽이동 도착좌표 위로
        else if((bearing > 150 && bearing < 180) ||  (bearing > 180 && bearing < 210)){
            lat2 = lat2 + 0.00015; //도착지점 북쪽으로 올리기
            lon2 = lon2 - 0.00008; //차선기준 왼쪽
        }
        //서쪽 출발좌표 위로이동 도착좌표 오른쪽
        else if((bearing > 240 && bearing < 270) ||  (bearing > 270 && bearing < 300)){
            lon2 = lon2 + 0.00010; //도착지점 동쪽으로 당기기
            lat2 = lat2 + 0.00025; //차선기준 위로 올리기
        }
        //북쪽 출발좌표 오른쪽이동 도착 아래로
        else if((bearing > 330 && bearing < 360) ||  (bearing > 0 && bearing < 30)){
            lat2 = lat2 - 0.00015; //도착지점 남쪽으로 내리기
            lon2 = lon2 + 0.00008; //차선기준 오른쪽으로 옮기기
        }
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        //대각 선 좌표
        //lat 0.00001 = 1km   ,, lon 0.00001 = 0.8km
        //북동 진행방향 당기고 , 차선 내리기
        else if((bearing > 30 && bearing <45) || (bearing >45 && bearing < 60)){
            lon2 = lon2 - 0.00010; //도착지점 남서쪽으로 당기기
            lat2 = lat2 - 0.00025; //차선기준 아래로내리기
        }
        //남동
        else if((bearing > 120 && bearing <135) || (bearing >135 && bearing < 150)){
            lat2 = lat2 + 0.00015; //도착지점 북서쪽으로 올리기
            lon2 = lon2 - 0.00008; //차선기준 아래로 내리기
        }

        //남서
        else if((bearing > 210 && bearing <225) || (bearing >225 && bearing < 240)){
            lon2 = lon2 + 0.00010; //도착지점 북동쪽으로 당기기
            lat2 = lat2 + 0.00025; //차선기준 위로 올리기
        }
        //북서
        else if((bearing > 300 && bearing <315) || (bearing >315 && bearing < 330)){
            lat2 = lat2 - 0.00015; //도착지점 남동쪽으로 당기기
            lon2 = lon2 + 0.00008; //차선기준 위로 옮기기
        }
        System.out.println(lat2 + ", " + lon2);

        return 1.0;
    }

}
