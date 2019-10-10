package com.s3.fileupload.Controller;

import com.s3.fileupload.Service.AmazonS3BucketService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class S3BucketController {

    private AmazonS3BucketService amazonS3BucketService;

    S3BucketController(AmazonS3BucketService amazonS3BucketService) {
        this.amazonS3BucketService = amazonS3BucketService;
    }

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonS3BucketService.uploadFile(file);
    }

    @PostMapping("/deleteFile")
    public String deleteFile(@RequestBody String fileURL) {
        return this.amazonS3BucketService.deleteFileFromBucket(fileURL);
    }
}
