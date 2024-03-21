package com.dororo.api.User.dto.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.dororo.api.User.common.ResponseCode;
import com.dororo.api.User.common.ResponseMessage;

import lombok.Getter;

@Getter
public class SignUpResponseDto extends ResponseDto{

	private SignUpResponseDto () {
		super();
	}

	public static ResponseEntity<SignUpResponseDto> success() {
		SignUpResponseDto responseBody = new SignUpResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> isExistUser() {
		ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_UP_FAIL, ResponseMessage.SIGN_UP_FAIL);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}
}