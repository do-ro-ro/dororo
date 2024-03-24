package com.dororo.api.User.common;

public interface ResponseMessage {
	String SUCCESS = "Success.";
	String VALIDATION_FAIL = "Validation failed.";
	String DUPLICATE_NICKNAME = "Duplicate Nickname.";
	String SIGN_UP_FAIL = "Already exists user.";
	String DATABASE_ERROR = "Database error.";
}
