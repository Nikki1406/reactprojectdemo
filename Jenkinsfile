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
                // Securely fetches your .pem file from Jenkins credentials
                withCredentials([file(credentialsId: 'ec2-private-key', variable: 'EC2_KEY')]) {
                    bat """
                        @echo off
                        :: 1. Fix Windows file permissions to make the .pem key secure
                        icacls "%EC2_KEY%" /c /t /inheritance:d
                        icacls "%EC2_KEY%" /c /t /remove *S-1-5-32-545
                        icacls "%EC2_KEY%" /c /t /remove "Users"

                        :: 2. Grant exclusive full control to the user executing the build
                        icacls "%EC2_KEY%" /grant:r "%USERNAME%":(F)

                        :: 3. Execute the remote deployment commands on your AWS EC2 Instance
                        ssh -i "%EC2_KEY%" -o StrictHostKeyChecking=no ubuntu@44.208.22.14 "cd ~/reactprojectdemo && git fetch origin && git reset --hard origin/main && docker compose down && docker compose up -d --build"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully! Your live site is updated.'
        }
        failure {
            echo 'Deployment failed. Check the Jenkins console logs.'
        }
    }
}