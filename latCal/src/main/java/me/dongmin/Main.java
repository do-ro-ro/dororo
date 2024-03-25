package me.dongmin;


//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

        // 출발지 (바그다드)와 목적지 (오사카)의 위도와 경도
        double lat1 = 35.093481367865145;
        double lon1 = 128.85411060747438;
        double lat2 = 35.093476836277425;
        double lon2 = 128.85258707526907;

        // 위도와 경도를 라디안 단위로 변환
        double φ1 = Math.toRadians(lat1);
        double φ2 = Math.toRadians(lat2);
        double λ1 = Math.toRadians(lon1);
        double λ2 = Math.toRadians(lon2);

        // 방위각 계산
        double y = Math.sin(λ2 - λ1) * Math.cos(φ2);
        double x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
        double θ = Math.atan2(y, x); // 방위각 (라디안)
        double bearing = (Math.toDegrees(θ) + 360) % 360; // 방위각 (도, 정규화 완료)

        // 방위각 출력
        System.out.println("Bearing from Baghdad to Osaka: " + bearing + " degrees");
    }
}