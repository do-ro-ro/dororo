package com.dororo.api.controller;


import com.dororo.api.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class TestController {
    @Autowired
    private ApiService apiService;

    @GetMapping("/vds-info")
    public String getVdsInfo() throws IOException {
        return apiService.fetchVdsInfo();
    }
}
