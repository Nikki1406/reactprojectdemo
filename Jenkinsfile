pipeline {
    agent any

    environment {
        // Replace with your actual EC2 Public IP address
        EC2_HOST = '44.208.22.14' 
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
                sshagent(credentials: ['ec2-ssh-key']) {
                    
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