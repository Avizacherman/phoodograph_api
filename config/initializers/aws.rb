# Initialize AWS classes to use AWS resources
# Credentials = Aws::Credentials.new(ENV["AWS_KEY"], ENV["AWS_SECRET"])
 AWS = Aws.config

S3_Bucket = Aws::S3::Resource.new
PhoodographyBucket = S3_Bucket.bucket('phoodography')
