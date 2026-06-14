pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Remote Deployment via SSH') {
            steps {
                // This safely fetches your .pem file path and puts it in the $EC2_KEY variable
                withCredentials([file(credentialsId: 'ec2-private-key', variable: 'EC2_KEY')]) {
                    bat """
                        @echo off
                        :: Use SSH to run commands directly on your Linux EC2 instance
                        :: Replace 1.2.3.4 with your actual EC2 Public IP address
                        ssh -i "%EC2_KEY%" -o StrictHostKeyChecking=no ubuntu@44.208.22.14 "cd ~/reactprojectdemo && git fetch origin && git reset --hard origin/main && docker compose down && docker compose up -d --build"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the logs.'
        }
    }
}