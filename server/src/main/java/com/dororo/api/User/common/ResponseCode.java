package com.dororo.api.User.common;

public interface ResponseCode {
	String SUCCESS = "SU";
	String VALIDATION_FAIL = "VF";
	String DUPLICATE_ID = "DI";

	String SIGN_IN_FAIL = "SF";
	String SIGN_UP_FAIL = "SUF";
	String CERTIFICATION_FAIL = "CF";

	String DATABASE_ERROR = "DBE";
}
