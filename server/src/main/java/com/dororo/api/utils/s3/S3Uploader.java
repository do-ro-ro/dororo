package com.dororo.api.utils.s3;

import com.amazonaws.AmazonServiceException;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private final String bucket;

    public String uploadFileToS3(MultipartFile multipartFile, String filePath) {
        File uploadFile;
        try {
            uploadFile = convert(multipartFile) // MultipartFile -> File 로 변환
                    .orElseThrow(() -> new IllegalArgumentException("[error]: MultipartFile -> 파일 변환 실패")); // 추후 예외 처리 고민해볼 것(파일 업로드 중 실패 시 처리 등)
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String fileName = filePath + "/" + UUID.randomUUID();   // S3에 저장될 파일 이름

        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        removeNewFile(uploadFile);  // 그 후 로컬 파일 삭제

        return uploadImageUrl;
    }

    public String putS3(File uploadFile, String fileName) { // S3에 파일 업로드, uploadFile: 업로드 할 파일, fileName: 업로드 할 파일 이름
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
                CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();  // 업로드 경로 반환
    }

    public void deleteS3(String filePath) throws Exception {    // S3에 있는 파일 삭제하는 함수
        try {
            URI uri = new URI(filePath); // 파일 경로를 URI 객체로 변환
            String path = uri.getPath(); // URI의 path 부분을 가져옴
            String key = path.substring(1); // 맨 앞의 '/'를 제거하여 실제 S3 키를 추출
            amazonS3Client.deleteObject(bucket, key);
            log.info("[S3Uploader] : S3에 있는 파일 삭제");
        } catch (URISyntaxException e) {
            log.error("URI syntax exception: " + e.getMessage());
        } catch (AmazonServiceException e) {
            log.info(e.getErrorMessage());
        }
    }

    private void removeNewFile(File targetFile) {   // 로컬에 저장된 파일 지우는 함수, targetFile : 저장될 파일
        if (targetFile.delete()) log.info("[파일 업로드] : 파일 삭제 성공");
        else log.info("[파일 업로드] : 파일 삭제 실패");
    }

    private Optional<File> convert(MultipartFile file) throws IOException { // 로컬에 파일 업로드 및 변환하는 함수, file: 업로드 할 파일
        String dirPath = System.getProperty("user.dir") + "/" + file.getOriginalFilename(); // 로컬에서 저장할 파일 경로 : user.dir=현재 디렉토리 기준(우리 서버 기준으로는 .jar이 돌고 있는 /home/ubuntu/cd_server)
        File convertFile = new File(dirPath);
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {    // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

}
