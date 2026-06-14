pipeline {
    agent any

    environment {
        // Replace with your actual EC2 Public IP address
        EC2_HOST = '54.84.216.79' 
        EC2_USER = 'ubuntu'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code you just pushed to GitHub
                checkout scm
            }
        }

        stage('Remote Deployment via SSH') {
            steps {
                // Securely use the SSH credential we saved in Jenkins
                sshAgent(credentials: ['ec2-ssh-key']) {
                    
                    // 1. Tell the live EC2 instance to navigate into the repo, pull changes, and rebuild
                    bat """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                            cd ~/reactprojectdemo &&
                            git pull origin main &&
                            docker compose up -d --build
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Changes deployed successfully to your live website!'
        }
        failure {
            echo 'Deployment failed. Check the Jenkins console logs.'
        }
    }
}